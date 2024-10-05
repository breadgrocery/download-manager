<script setup lang="ts">
  import { t } from "@/utils/i18n";
  import Settings from "./components/Settings.vue";

  // Set title on mounted
  onMounted(() => (document.title = t(`toolbar_extension_settings`)));

  // Theme and locale
  const { adaptive, theme } = useTheme();
  const { locale, dateLocale } = useLocale();
</script>

<template>
  <ThemeProvider :adaptive="adaptive" :theme="theme" :locale="locale" :date-locale="dateLocale">
    <NModalProvider>
      <NMessageProvider>
        <NFlex class="options-wrapper" vertical :size="0">
          <Settings />
        </NFlex>
      </NMessageProvider>
    </NModalProvider>
  </ThemeProvider>
</template>

<style>
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
  }
</style>

<style scoped lang="scss">
  .options-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
