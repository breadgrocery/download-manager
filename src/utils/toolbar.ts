import { browserAction } from "@/utils/action";
import { createImageData } from "@/utils/image";
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
      case "badge":
        return {
          text: updateBadgeText(getBadgeText(data?.statistics)),
          textColor: updateBadgeTextColor(getBadgeTextColor(data?.statistics)),
          backgroundColor: updateBadgeBackgroundColor(getBadgeBackgroundColor(data?.statistics)),
          icon: updateIcon(getIcon(data?.statistics))
        };
      case "general":
        return {
          text: updateBadgeText(""),
          icon: updateIcon(getIcon(data?.statistics))
        };
      case "animated":
        return {
          text: updateBadgeText(""),
          icon: updateAnimatedIcon(getAnimatedIcon(data?.statistics, data?.downloads))
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

const getAnimatedIcon = (
  statistics?: Record<State, number>,
  downloads?: Downloads.DownloadItem[]
): Action.ImageDataType => {
  let progress = 0;
  let status = "idle";
  if (statistics && downloads) {
    const [totalBytes, bytesReceived] = downloads
      .filter(download => state.ongoing(download) && download.totalBytes > 0)
      .map(({ totalBytes, bytesReceived }) => [totalBytes, bytesReceived])
      .reduce(([tAcc, rCur], [t, r]) => [tAcc + t, rCur + r], [0, 0]);
    if (statistics.ongoing > 0) {
      progress = totalBytes === 0 ? 90 : Math.max((bytesReceived / totalBytes) * 100, 1);
    }
    status = statusArray.find(status => statistics[status] > 0) || "idle";
  }
  return createImageData(progress, status as "idle") as Action.ImageDataType;
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
  return updateIfNessesary<string>(path => browserAction.setIcon({ path }), "icon", icon);
};

const updateAnimatedIcon = (imageData?: Action.ImageDataType) => {
  return updateIfNessesary<Action.ImageDataType>(
    imageData => browserAction.setIcon({ imageData }),
    "icon",
    imageData
  );
};

const updateBadgeText = (text?: string) => {
  return updateIfNessesary<string>(text => browserAction.setBadgeText({ text }), "text", text);
};

const updateBadgeTextColor = (color?: string) => {
  return updateIfNessesary<string>(
    color => browserAction.setBadgeTextColor({ color }),
    "textColor",
    color
  );
};
const updateBadgeBackgroundColor = (color?: string) => {
  return updateIfNessesary<string>(
    color => browserAction.setBadgeBackgroundColor({ color }),
    "backgroundColor",
    color
  );
};
