import { browserAction } from "@/utils/action";
import {
  addDownloadListeners,
  deleteDownload,
  getDownloads,
  setDownloadManagerState
} from "@/utils/download";
import { send } from "@/utils/message";
import { audio } from "@/utils/notifications";
import { type Settings, mergedSettings } from "@/utils/settings";
import type { State } from "@/utils/state";
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

      // Cache the last toolbar icon to minimize redundant network requests
      let lastIcon = "/images/icon-idle.png";

      // Define download listeners
      const notifyPopup = debounce(() => send({ channel: "background-to-popup:update" }), 200, {
        maxWait: 1000
      });
      addDownloadListeners({
        onCreated: () => {
          if (settings.notifications.download.created.sound) audio.created();
          if (settings.notifications.download.created.popup) browserAction.openPopup();
          notifyPopup();
        },
        onErased: () => notifyPopup(),
        onChanged: () => notifyPopup(),
        onCompleted: () => {
          if (settings.notifications.download.completed.sound) audio.completed();
          if (settings.notifications.download.completed.popup) browserAction.openPopup();
        },
        onInterrupted: () => {
          if (settings.notifications.download.interrupted.sound) audio.interrupted();
          if (settings.notifications.download.interrupted.popup) browserAction.openPopup();
          notifyPopup();
        },
        onDangerous: () => {
          if (settings.notifications.download.dangerous.sound) audio.dangerous();
          if (settings.notifications.download.dangerous.popup) browserAction.openPopup();
          notifyPopup();
        },
        onStatistics: statistics => {
          // Update the badge displayed on the toolbar icon to reflect the current status
          const statusArray = ["dangerous", "downloading", "paused"] as State[];
          const iconStatus = statusArray.find(status => statistics[status] > 0) || "idle";
          const icon = `/images/icon-${iconStatus}.png`;
          const active = statistics.downloading + statistics.paused;
          const text = active > 0 ? `${active}` : null;
          if (icon !== lastIcon) {
            browserAction.setIcon({ path: icon });
            lastIcon = icon;
          }
          browserAction.setBadgeText({ text });
          browserAction.setBadgeTextColor({ color: "#FFFFFF" });
          browserAction.setBadgeBackgroundColor({ color: "#2C4E5F" });

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
      });
    });
  }
});
