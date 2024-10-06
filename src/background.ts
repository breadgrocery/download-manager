import { addDownloadListeners, setDownloadManagerState } from "@/utils/download";
import { send } from "@/utils/message";
import { audio } from "@/utils/notifications";
import { Settings, mergedSettings } from "@/utils/settings";
import { State } from "@/utils/state";
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
      settings.notifications.created.sound && audio.created();
      settings.notifications.created.popup && browser.action.openPopup();
      notifyPopup();
    },
    onErased: () => notifyPopup(),
    onChanged: () => notifyPopup(),
    onCompleted: () => {
      settings.notifications.completed.sound && audio.completed();
      settings.notifications.completed.popup && browser.action.openPopup();
    },
    onInterrupted: () => {
      settings.notifications.interrupted.sound && audio.interrupted();
      settings.notifications.interrupted.popup && browser.action.openPopup();
      notifyPopup();
    },
    onDangerous: () => {
      settings.notifications.dangerous.sound && audio.dangerous();
      settings.notifications.dangerous.popup && browser.action.openPopup();
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
      notifyPopup();
    }
  });
});
