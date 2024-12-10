import { defaults, proxiedSettings } from "@/utils/settings";
import { ref } from "vue";
import { browser } from "wxt/browser";

const settings = ref(defaults);

const loadSettings = () => proxiedSettings().then(data => (settings.value = data));

loadSettings().then(() => {
  // Try syncing settings to the cloud
  const raw = JSON.parse(JSON.stringify(settings.value));
  Object.assign(settings.value, raw);
  // Update settings when storage changes
  browser.storage.onChanged.addListener(loadSettings);
});

export const useSettings = () => settings;
