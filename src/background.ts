import {
  addDownloadListeners,
  deleteDownload,
  getDownloads,
  setDownloadManagerState
} from "@/utils/download";
import { send } from "@/utils/message";
import { audio } from "@/utils/notifications";
import { Settings, mergedSettings } from "@/utils/settings";
import { State } from "@/utils/state";
import { differenceInDays } from "date-fns";
import { debounce } from "lodash-es";
import browser from "webextension-polyfill";

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
  let lastIcon: string = "/images/icon-idle.png";

  // Define download listeners
  const notifyPopup = debounce(() => send({ channel: "background-to-popup:update" }), 200, {
    maxWait: 1000
  });
  addDownloadListeners({
    onCreated: () => {
      settings.notifications.download.created.sound && audio.created();
      settings.notifications.download.created.popup && browser.action.openPopup();
      notifyPopup();
    },
    onErased: () => notifyPopup(),
    onChanged: () => notifyPopup(),
    onCompleted: () => {
      settings.notifications.download.completed.sound && audio.completed();
      settings.notifications.download.completed.popup && browser.action.openPopup();
    },
    onInterrupted: () => {
      settings.notifications.download.interrupted.sound && audio.interrupted();
      settings.notifications.download.interrupted.popup && browser.action.openPopup();
      notifyPopup();
    },
    onDangerous: () => {
      settings.notifications.download.dangerous.sound && audio.dangerous();
      settings.notifications.download.dangerous.popup && browser.action.openPopup();
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
        browser.action.setIcon({ path: icon });
        lastIcon = icon;
      }
      browser.action.setBadgeText({ text });
      browser.action.setBadgeTextColor({ color: "#FFFFFF" });
      browser.action.setBadgeBackgroundColor({ color: "#2C4E5F" });

      // Check for downloads that need to be automatically deleted
      if (settings.features.cleanup.enabled) {
        getDownloads().then(downloads => {
          downloads
            .filter(download => {
              const diff = differenceInDays(Date.now(), download.startTime);
              return diff >= settings.features.cleanup.retention;
            })
            .forEach(download => deleteDownload(download, settings.features.cleanup.revmove));
        });
      }
      notifyPopup();
    }
  });
});
