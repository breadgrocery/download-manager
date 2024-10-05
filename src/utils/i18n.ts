import { dateEnUS, dateZhCN, dateZhTW, enUS, zhCN, zhTW } from "naive-ui";
import browser from "webextension-polyfill";

export const getLocale = () => {
  switch (navigator.language) {
    case "en-US":
      return { dateLocale: dateEnUS, locale: enUS };
    case "zh-CN":
      return { dateLocale: dateZhCN, locale: zhCN };
    case "zh-TW":
      return { dateLocale: dateZhTW, locale: zhTW };
    default:
      return { dateLocale: dateEnUS, locale: enUS };
  }
};

export const t = (messageName: string, substitutions?: string[] | string) => {
  const message = browser.i18n.getMessage(messageName, substitutions);
  return message ? message : messageName;
};
