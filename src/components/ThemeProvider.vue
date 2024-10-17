<script setup lang="ts">
  import { type ConfigProviderProps, NConfigProvider, darkTheme, lightTheme } from "naive-ui";

  export type Picked = "theme" | "themeOverrides" | "locale" | "dateLocale";

  export interface Props extends Pick<ConfigProviderProps, Picked> {
    adaptive?: boolean;
  }

  const { adaptive = true, theme = lightTheme } = defineProps<Props>();

  const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
  const matches = ref(mediaQueryList.matches);
  onMounted(() => {
    // Automatically adapt the theme based on the user's color scheme preference
    const onChange = (event: MediaQueryListEvent) => (matches.value = event.matches);
    mediaQueryList.addEventListener("change", onChange);
    return () => mediaQueryList.removeEventListener("change", onChange);
  });

  const computedTheme = computed(() => {
    if (adaptive) {
      return matches.value ? darkTheme : lightTheme;
    }
    return theme;
  });
</script>

<template>
  <NConfigProvider v-bind="$props" :theme="computedTheme" class="theme-provider-wrapper">
    <NLayout class="theme-provider-wrapper">
      <slot />
    </NLayout>
  </NConfigProvider>
</template>

<style scoped>
  .theme-provider-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
