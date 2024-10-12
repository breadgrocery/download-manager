<script setup lang="ts">
  import { t } from "@/utils/i18n";
  import { debounce } from "lodash-es";
  import browser from "webextension-polyfill";
  import MdiArrowExpandAll from "~icons/mdi/arrow-expand-all";
  import MdiArrowExpandHorizontal from "~icons/mdi/arrow-expand-horizontal";
  import MdiArrowExpandVertical from "~icons/mdi/arrow-expand-vertical";
  import MdiMathCompassVariant from "~icons/mdi/math-compass-variant";
  import MdiThemeLightDark from "~icons/mdi/theme-light-dark";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const settings = useSettings();

  const popup = debounce(browser.action.openPopup, 200);

  const updateTheme = (value: typeof settings.value.appearance.theme.scheme) => {
    settings.value.appearance.theme.scheme = value;
    popup();
  };
</script>

<template>
  <SettingWrapper>
    <SettingItem :title="t(`options_appearance_theme_title`)" :icon="MdiMathCompassVariant">
      <SettingDetail :title="t(`options_appearance_theme_scheme_title`)" :icon="MdiThemeLightDark">
        <NRadioGroup :value="settings.appearance.theme.scheme" :on-update:value="updateTheme">
          <NRadioButton v-for="scheme in [`auto`, `light`, `dark`]" :key="scheme" :value="scheme">
            {{ t(`options_appearance_theme_scheme_${scheme}`) }}
          </NRadioButton>
        </NRadioGroup>
      </SettingDetail>
    </SettingItem>

    <SettingItem :title="t(`options_appearance_bounds_title`)" :icon="MdiArrowExpandAll">
      <SettingDetail :title="t(`options_appearance_bounds_width`)" :icon="MdiArrowExpandHorizontal">
        <NSlider
          :min="645"
          :max="800"
          :value="settings.appearance.width"
          :on-update:value="value => (settings.appearance.width = value)"
          :on-dragend="popup"
        />
      </SettingDetail>
      <SettingDetail :title="t(`options_appearance_bounds_height`)" :icon="MdiArrowExpandVertical">
        <NSlider
          :min="300"
          :max="600"
          :value="settings.appearance.height"
          :on-update:value="value => (settings.appearance.height = value)"
          :on-dragend="popup"
        />
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>
