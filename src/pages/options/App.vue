<script setup lang="ts">
  import Settings from "./components/Settings.vue";

  // Set document title
  document.title = i18n.t("toolbar.extension_settings");

  // Theme and locale
  const { adaptive, theme } = useTheme();
  const { locale, dateLocale } = useLocale();
</script>

<template>
  <ThemeProvider
    :adaptive="adaptive"
    :theme="theme"
    :locale="locale"
    :date-locale="dateLocale"
  >
    <NModalProvider>
      <NMessageProvider>
        <NFlex
          class="options-wrapper"
          vertical
          :size="0"
        >
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

<style scoped>
  .options-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
