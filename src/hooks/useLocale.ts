import { getLocale } from "@/utils/i18n";
import { computed, ref } from "vue";

const language = ref<string>(window.navigator.language);
const ui = computed(() => getLocale(language.value).ui);
const locale = computed(() => getLocale(language.value).locale);

export const useLocale = () => ({ ui, locale });
