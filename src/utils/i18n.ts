import {
  NDateLocale,
  NLocale,
  arDZ,
  dateArDZ,
  dateEnUS,
  dateEsAR,
  dateFrFR,
  dateRuRU,
  dateZhCN,
  enUS,
  esAR,
  frFR,
  ruRU,
  zhCN
} from "naive-ui";
import browser from "webextension-polyfill";

const locales: { [key: string]: { locale: NLocale; dateLocale: NDateLocale } } = {
  "ar": { locale: arDZ, dateLocale: dateArDZ },
  "en": { locale: enUS, dateLocale: dateEnUS },
  "es": { locale: esAR, dateLocale: dateEsAR },
  "fr": { locale: frFR, dateLocale: dateFrFR },
  "ru": { locale: ruRU, dateLocale: dateRuRU },
  "zh": { locale: zhCN, dateLocale: dateZhCN }
};

export const getLocale = (lang: string) => {
  lang = lang.substring(0, 2);
  return locales[lang] || locales["en"];
};

export const t = (messageName: string, substitutions?: string[] | string) => {
  const message = browser.i18n.getMessage(messageName, substitutions);
  return message ? message : messageName;
};
