import { getLocale } from "@/utils/i18n";
import { computed, ref } from "vue";

const language = ref<string>(window.navigator.language);
const locale = computed(() => getLocale(language.value).locale);
const dateLocale = computed(() => getLocale(language.value).dateLocale);

export const useLocale = () => ({ locale, dateLocale });
