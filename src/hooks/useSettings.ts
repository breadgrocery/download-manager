import { defaults, proxiedSettings } from "@/utils/settings";
import { ref, toRaw } from "vue";
import { browser } from "wxt/browser";

const settings = ref(defaults);

const loadSettings = () => proxiedSettings().then(data => (settings.value = data));

loadSettings().then(() => {
  // Try syncing settings to the cloud
  Object.assign(settings.value, toRaw(settings.value));
  // Update settings when storage changes
  browser.storage.onChanged.addListener(loadSettings);
});

export const useSettings = () => settings;
