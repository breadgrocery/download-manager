<script setup lang="ts">
  import { openPopup } from "@/utils/action";
  import MdiArrowExpandAll from "~icons/mdi/arrow-expand-all";
  import MdiArrowExpandHorizontal from "~icons/mdi/arrow-expand-horizontal";
  import MdiArrowExpandVertical from "~icons/mdi/arrow-expand-vertical";
  import MdiMathCompassVariant from "~icons/mdi/math-compass-variant";
  import MdiThemeLightDark from "~icons/mdi/theme-light-dark";
  import MdiToysOutline from "~icons/mdi/toys-outline";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const settings = useSettings();
  const restart = useRestart();

  const updateTheme = (value: typeof settings.value.appearance.theme.scheme) => {
    settings.value.appearance.theme.scheme = value;
    openPopup();
  };
  const updateIconStyle = (value: typeof settings.value.appearance.icon) => {
    settings.value.appearance.icon = value;
    restart();
  };

  const iconStyles = [
    {
      value: "general",
      label: i18n.t("options.appearance.theme.icon.general")
    },
    {
      value: "badge",
      label: i18n.t("options.appearance.theme.icon.badge")
    },
    {
      value: "animated",
      label: i18n.t("options.appearance.theme.icon.animated")
    },
    {
      value: "animated_stroke",
      label: i18n.t("options.appearance.theme.icon.animated_stroke")
    },
    {
      value: "animated_pie",
      label: i18n.t("options.appearance.theme.icon.animated_pie")
    }
  ];
</script>

<template>
  <SettingWrapper>
    <SettingItem :title="i18n.t(`options.appearance.theme.title`)" :icon="MdiMathCompassVariant">
      <SettingDetail
        :title="i18n.t(`options.appearance.theme.scheme.title`)"
        :icon="MdiThemeLightDark"
      >
        <NRadioGroup :value="settings.appearance.theme.scheme" :on-update:value="updateTheme">
          <NRadioButton
            v-for="scheme in [`auto`, `light`, `dark`] as const"
            :key="scheme"
            :value="scheme"
          >
            {{ i18n.t(`options.appearance.theme.scheme.${scheme}`) }}
          </NRadioButton>
        </NRadioGroup>
      </SettingDetail>
      <SettingDetail :title="i18n.t(`options.appearance.theme.icon.title`)" :icon="MdiToysOutline">
        <NSelect
          :options="iconStyles"
          :value="settings.appearance.icon"
          :on-update:value="updateIconStyle"
        />
      </SettingDetail>
    </SettingItem>

    <SettingItem :title="i18n.t(`options.appearance.bounds.title`)" :icon="MdiArrowExpandAll">
      <SettingDetail
        :title="i18n.t(`options.appearance.bounds.width`)"
        :icon="MdiArrowExpandHorizontal"
      >
        <NSlider
          :min="645"
          :max="800"
          :value="settings.appearance.width"
          :on-update:value="value => (settings.appearance.width = value)"
          :on-dragend="openPopup"
        />
      </SettingDetail>
      <SettingDetail
        :title="i18n.t(`options.appearance.bounds.height`)"
        :icon="MdiArrowExpandVertical"
      >
        <NSlider
          :min="300"
          :max="600"
          :value="settings.appearance.height"
          :on-update:value="value => (settings.appearance.height = value)"
          :on-dragend="openPopup"
        />
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>
