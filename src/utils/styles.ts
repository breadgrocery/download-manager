import { state } from "@/utils/state";
import { CustomThemeCommonVars, ThemeCommonVars } from "naive-ui";
import { CSSProperties } from "vue";
import browser from "webextension-polyfill";

export const deletedStyle = (
  download: browser.Downloads.DownloadItem,
  colors: ThemeCommonVars & CustomThemeCommonVars
): CSSProperties => {
  return state.deleted(download)
    ? {
        filter: "grayscale(1)",
        opacity: colors.opacityDisabled,
        "text-decoration": "line-through"
      }
    : {};
};

export const downloadStyle = (
  download: browser.Downloads.DownloadItem,
  colors: ThemeCommonVars & CustomThemeCommonVars
) => {
  let type = "info";
  let color = colors.infoColor;
  if (state.dangerous(download)) {
    type = "error";
    color = colors.errorColor;
  } else {
    if (state.completed(download)) {
      type = "success";
      color = colors.successColor;
    }
    if (state.paused(download)) {
      type = "warning";
      color = colors.warningColor;
    }
    if (state.interrupted(download)) {
      type = "error";
      color = colors.errorColor;
    }
  }
  return { type, color };
};
