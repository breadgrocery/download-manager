import {
  type NDateLocale,
  type NLocale,
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

const locales: { [key: string]: { locale: NLocale; dateLocale: NDateLocale } } = {
  ar: { locale: arDZ, dateLocale: dateArDZ },
  en: { locale: enUS, dateLocale: dateEnUS },
  es: { locale: esAR, dateLocale: dateEsAR },
  fr: { locale: frFR, dateLocale: dateFrFR },
  ru: { locale: ruRU, dateLocale: dateRuRU },
  zh: { locale: zhCN, dateLocale: dateZhCN }
};

export const getLocale = (lang: string) => {
  const locale = lang.substring(0, 2);
  return locales[locale] || locales.en;
};
