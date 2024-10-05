import { NDateLocale, NLocale } from "naive-ui";
import { dateEnUS, dateZhCN, dateZhTW, enUS, zhCN, zhTW } from "naive-ui";
import { computed, ref } from "vue";

const locales: { [key: string]: { locale: NLocale; dateLocale: NDateLocale } } = {
  "en-US": { locale: enUS, dateLocale: dateEnUS },
  "zh-CN": { locale: zhCN, dateLocale: dateZhCN },
  "zh-TW": { locale: zhTW, dateLocale: dateZhTW }
};
const getLocale = (lang: string) => locales[lang] || locales["en-US"];

const language = ref<string>(window.navigator.language);
const locale = computed(() => getLocale(language.value).locale);
const dateLocale = computed(() => getLocale(language.value).dateLocale);

export const useLocale = () => ({ locale, dateLocale });
