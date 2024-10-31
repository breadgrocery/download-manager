import { openPopup } from "@/utils/action";
import {
  addDownloadListeners,
  deleteDownload,
  getDownloads,
  setDownloadManagerState
} from "@/utils/download";
import { send } from "@/utils/message";
import { audio } from "@/utils/notifications";
import { type Settings, mergedSettings } from "@/utils/settings";
import { updateToolbarIcon } from "@/utils/toolbar";
import { differenceInDays } from "date-fns";
import { debounce } from "lodash-es";
import { browser } from "wxt/browser";

export default defineBackground({
  type: "module",
  main: () => {
    // Disable the built-in download manager, restore it when suspended
    setDownloadManagerState(false);
    browser.runtime.onSuspend.addListener(() => setDownloadManagerState(true));

    // Load extension settings
    let settings: Settings;
    const loadSettings = () => mergedSettings().then(_settings => (settings = _settings));
    loadSettings().then(() => {
      // Reload extension settings on storage changed
      browser.storage.onChanged.addListener(loadSettings);

      const notifyPopup = debounce(() => send({ channel: "background-to-popup:update" }), 200, {
        maxWait: 1000
      });
      const notifyIfNecessary = (type: keyof typeof settings.notifications.download) => {
        if (settings.notifications.download[type].sound) audio[type]();
        if (settings.notifications.download[type].popup) openPopup();
        notifyPopup();
      };
      // Define download listeners
      addDownloadListeners(
        {
          onCreated: () => notifyIfNecessary("created"),
          onErased: () => notifyPopup(),
          onChanged: () => notifyPopup(),
          onCompleted: () => notifyIfNecessary("completed"),
          onInterrupted: download => {
            const error = download.error?.current;
            if (error && ["USER_CANCELED", "USER_SHUTDOWN"].includes(error)) return;
            notifyIfNecessary("interrupted");
          },
          onDangerous: () => notifyIfNecessary("dangerous"),
          onStatistics: (statistics, downloads) => {
            // Update toolbar icon
            updateToolbarIcon(settings.appearance.icon, { statistics, downloads });

            // Check for downloads that need to be automatically deleted
            if (settings.features.cleanup.enabled) {
              getDownloads().then(downloads => {
                for (const download of downloads) {
                  const diff = differenceInDays(Date.now(), download.startTime);
                  if (diff >= settings.features.cleanup.retention) {
                    deleteDownload(download, settings.features.cleanup.revmove);
                  }
                }
              });
            }
            notifyPopup();
          }
        },
        (() => {
          if (settings.appearance.icon === "animated") return 1000;
          return settings.misc.performance.pulse;
        })()
      );
    });
  }
});
