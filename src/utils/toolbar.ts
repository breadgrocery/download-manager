import { setBadgeBackgroundColor, setBadgeText, setBadgeTextColor, setIcon } from "@/utils/action";
import { createImageData } from "@/utils/icon";
import { type Settings } from "@/utils/settings";
import { type State, state } from "@/utils/state";
import { type Action, type Downloads } from "wxt/browser";

export type IconStyle = Settings["appearance"]["icon"];

export type IconUpdate = {
  icon?: () => void | Promise<void>;
  text?: () => void | Promise<void>;
  textColor?: () => void | Promise<void>;
  backgroundColor?: () => void | Promise<void>;
};

export const updateToolbarIcon = (
  style: IconStyle,
  data?: { statistics?: Record<State, number>; downloads?: Downloads.DownloadItem[] }
) => {
  const updates = (() => {
    switch (style) {
      case "general":
        return {
          text: updateBadgeText(""),
          icon: updateIcon(getIcon(data?.statistics))
        };
      case "badge":
        return {
          text: updateBadgeText(getBadgeText(data?.statistics)),
          textColor: updateBadgeTextColor(getBadgeTextColor(data?.statistics)),
          backgroundColor: updateBadgeBackgroundColor(getBadgeBackgroundColor(data?.statistics)),
          icon: updateIcon(getIcon(data?.statistics))
        };
      case "animated":
      case "animated_stroke":
      case "animated_pie":
        return {
          text: updateBadgeText(""),
          icon: () => {
            const state = getAnimatedState(data?.statistics, data?.downloads);
            createImageData({
              progress: state.progress,
              colorName: state.status as AnimatedIconInfo["colorName"],
              style
            }).then(imageData => {
              if (imageData) updateAnimatedIcon(imageData as Action.ImageDataType)();
            });
          }
        };
    }
  })();
  Object.values(updates).forEach(update => update && update());
};

const statusArray: State[] = ["dangerous", "paused", "downloading"];
const getIcon = (statistics?: Record<State, number>) => {
  if (statistics) {
    const status = statusArray.find(status => statistics[status] > 0);
    if (status) return `/images/icon-${status}.png`;
  }
  return "/images/icon-idle.png";
};

const getAnimatedState = (
  statistics?: Record<State, number>,
  downloads?: Downloads.DownloadItem[]
) => {
  let progress = 0;
  let status = "idle";
  if (statistics && downloads) {
    const [totalBytes, bytesReceived] = downloads
      .filter(download => state.ongoing(download) && download.totalBytes > 0)
      .map(({ totalBytes, bytesReceived }) => [totalBytes, bytesReceived])
      .reduce(([tAcc, rCur], [t, r]) => [tAcc + t, rCur + r], [0, 0]);
    if (statistics.ongoing > 0) {
      progress = Math.floor(
        totalBytes === 0 ? 90 : Math.max((bytesReceived / totalBytes) * 100, 1)
      );
    }
    status = statusArray.find(status => statistics[status] > 0) || "idle";
  }
  return { progress, status };
};

const getBadgeText = (statistics?: Record<State, number>) => {
  return statistics && statistics.ongoing > 0 ? `${statistics?.ongoing}` : "";
};

const getBadgeTextColor = (statistics?: Record<State, number>) => {
  return statistics ? "#FFFFFF" : "#000000";
};

const getBadgeBackgroundColor = (statistics?: Record<State, number>) => {
  return statistics ? "#2C4E5F" : "#FFFFFF";
};

const lastValues: { [key: string]: unknown } = {
  icon: undefined,
  text: undefined,
  textColor: undefined,
  backgroundColor: undefined
};
const updateIfNessesary = <T>(
  callback: (value: T) => void | Promise<void>,
  key: keyof typeof lastValues,
  value?: T
) => {
  return () => {
    if (value !== lastValues[key]) {
      lastValues[key] = value;
      if (value !== undefined) {
        return callback(value);
      }
    }
  };
};

const updateIcon = (icon?: string) => {
  return updateIfNessesary<string>(path => setIcon({ path }), "icon", icon);
};

const updateAnimatedIcon = (imageData?: Action.ImageDataType) => {
  return updateIfNessesary<Action.ImageDataType>(
    imageData => setIcon({ imageData }),
    "icon",
    imageData
  );
};

const updateBadgeText = (text?: string) => {
  return updateIfNessesary<string>(text => setBadgeText({ text }), "text", text);
};

const updateBadgeTextColor = (color?: string) => {
  return updateIfNessesary<string>(color => setBadgeTextColor({ color }), "textColor", color);
};
const updateBadgeBackgroundColor = (color?: string) => {
  return updateIfNessesary<string>(
    color => setBadgeBackgroundColor({ color }),
    "backgroundColor",
    color
  );
};
