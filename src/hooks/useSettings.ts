import { defaults, proxiedSettings } from "@/utils/settings";
import { ref } from "vue";
import { browser } from "wxt/browser";

const settings = ref(defaults);

const loadSettings = () => proxiedSettings().then(data => (settings.value = data));

loadSettings().then(() => {
  // Update settings when storage changes
  browser.storage.onChanged.addListener(loadSettings);
});

export const useSettings = () => settings;
