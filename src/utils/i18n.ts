import { type Locale, arDZ, enUS, es, fr, ru, zhCN } from "date-fns/locale";
import {
  type NDateLocale,
  type NLocale,
  arDZ as uiArDZ,
  dateArDZ as uiDateArDZ,
  dateEnUS as uiDateEnUS,
  dateEsAR as uiDateEsAR,
  dateFrFR as uiDateFrFR,
  dateRuRU as uiDateRuRU,
  dateZhCN as uiDateZhCN,
  enUS as uiEnUS,
  esAR as uiEsAR,
  frFR as uiFrFR,
  ruRU as uiRuRU,
  zhCN as uiZhCN
} from "naive-ui";

export type Entry = {
  [key: string]: { locale: Locale; ui: { locale: NLocale; dateLocale: NDateLocale } };
};

const locales: Entry = {
  ar: { locale: arDZ, ui: { locale: uiArDZ, dateLocale: uiDateArDZ } },
  en: { locale: enUS, ui: { locale: uiEnUS, dateLocale: uiDateEnUS } },
  es: { locale: es, ui: { locale: uiEsAR, dateLocale: uiDateEsAR } },
  fr: { locale: fr, ui: { locale: uiFrFR, dateLocale: uiDateFrFR } },
  ru: { locale: ru, ui: { locale: uiRuRU, dateLocale: uiDateRuRU } },
  zh: { locale: zhCN, ui: { locale: uiZhCN, dateLocale: uiDateZhCN } }
};

export const getLocale = (lang: string) => {
  const locale = lang.substring(0, 2);
  return locales[locale] || locales.en;
};
