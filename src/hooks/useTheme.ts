import { useSettings } from "@/hooks/useSettings";
import { darkTheme, lightTheme } from "naive-ui";
import { computed } from "vue";

const settings = useSettings();
const adaptive = computed(() => {
  return settings.value.appearance.theme.scheme === "auto";
});
const theme = computed(() => {
  return settings.value.appearance.theme.scheme === "dark" ? darkTheme : lightTheme;
});

export const useTheme = () => {
  return { adaptive, theme };
};
