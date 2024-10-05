<script setup lang="ts">
  import { t } from "@/utils/i18n";
  import { debounce } from "lodash-es";
  import browser from "webextension-polyfill";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const settings = useSettings();

  const popup = debounce(browser.action.openPopup, 200);

  const updateTheme = (value: typeof settings.value.appearance.theme.scheme) => {
    settings.value.appearance.theme.scheme = value;
    popup();
  };

  const updateWidth = (width: number) => {
    settings.value.appearance.width = width;
  };
  const updateHeight = (height: number) => {
    settings.value.appearance.height = height;
  };
</script>

<template>
  <SettingWrapper>
    <SettingItem :title="t(`options_appearance_theme_title`)" icon="mdi:math-compass-variant">
      <SettingDetail
        :title="t(`options_appearance_theme_scheme_title`)"
        icon="mdi:theme-light-dark"
      >
        <NRadioGroup :value="settings.appearance.theme.scheme" :on-update:value="updateTheme">
          <NRadioButton v-for="scheme in [`auto`, `light`, `dark`]" :key="scheme" :value="scheme">
            {{ t(`options_appearance_theme_scheme_${scheme}`) }}
          </NRadioButton>
        </NRadioGroup>
      </SettingDetail>
    </SettingItem>

    <SettingItem :title="t(`options_appearance_bounds_title`)" icon="mdi:arrow-expand-all">
      <SettingDetail
        :title="t(`options_appearance_bounds_width`)"
        icon="mdi:arrow-expand-horizontal"
      >
        <NSlider
          :min="645"
          :max="800"
          :value="settings.appearance.width"
          :on-update:value="updateWidth"
          :on-dragend="popup"
        />
      </SettingDetail>
      <SettingDetail
        :title="t(`options_appearance_bounds_height`)"
        icon="mdi:arrow-expand-vertical"
      >
        <NSlider
          :min="300"
          :max="600"
          :value="settings.appearance.height"
          :on-update:value="updateHeight"
          :on-dragend="popup"
        />
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>
