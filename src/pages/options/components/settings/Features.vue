<script setup lang="ts">
  import { type Category, categoryEnums } from "@/pages/popup/components/header/Category";
  import MdiCategoryPlusOutline from "~icons/mdi/category-plus-outline";
  import MdiContentDuplicate from "~icons/mdi/content-duplicate";
  import MdiDeleteClock from "~icons/mdi/delete-clock";
  import MdiFileSearchOutline from "~icons/mdi/file-search-outline";
  import MdiFilterOutline from "~icons/mdi/filter-outline";
  import MdiHarddisk from "~icons/mdi/harddisk";
  import MdiLinkVariantPlus from "~icons/mdi/link-variant-plus";
  import MdiRobotOutline from "~icons/mdi/robot-outline";
  import MdiTimerOutline from "~icons/mdi/timer-outline";
  import MdiTimerRefreshOutline from "~icons/mdi/timer-refresh-outline";
  import MdiTimerSand from "~icons/mdi/timer-sand";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const settings = useSettings();

  const categories = categoryEnums.filter(category => category !== "all");
  const updateCategories = (value: Array<string | number>) => {
    settings.value.features.categories = value as Category[];
  };

  const conflicts = [
    {
      value: "uniquify",
      label: i18n.t("options.features.download.conflict.uniquify")
    },
    {
      value: "overwrite",
      label: i18n.t("options.features.download.conflict.overwrite")
    },
    {
      value: "prompt",
      label: i18n.t("options.features.download.conflict.prompt")
    }
  ];
</script>

<template>
  <SettingWrapper>
    <SettingItem :title="i18n.t(`options.features.filter.title`)" :icon="MdiFilterOutline">
      <SettingDetail
        :title="i18n.t(`options.features.filter.search.title`)"
        :icon="MdiFileSearchOutline"
        :description="i18n.t(`options.features.filter.search.description`)"
      >
        <NSwitch
          :default-value="settings.features.search"
          :on-update:value="value => (settings.features.search = value)"
        />
      </SettingDetail>
      <SettingDetail
        :title="i18n.t(`options.features.filter.categories.title`)"
        :icon="MdiCategoryPlusOutline"
        :description="i18n.t(`options.features.filter.categories.description`)"
      >
        <NCheckboxGroup :value="settings.features.categories" :on-update:value="updateCategories">
          <NCheckbox
            v-for="category in categories"
            :key="category"
            :label="i18n.t(`categories.${category}`)"
            :value="category"
          />
        </NCheckboxGroup>
      </SettingDetail>
    </SettingItem>

    <SettingItem :title="i18n.t(`options.features.download.title`)" :icon="MdiLinkVariantPlus">
      <SettingDetail :title="i18n.t(`options.features.download.timeout`)" :icon="MdiTimerOutline">
        <NInputNumber
          :default-value="settings.features.download.timeout"
          :min="10"
          :max="60"
          :precision="0"
          :on-update:value="value => (settings.features.download.timeout = value || 30)"
        >
          <template #suffix>
            {{ i18n.t(`unit.seconds`) }}
          </template>
        </NInputNumber>
      </SettingDetail>
      <SettingDetail
        :title="i18n.t(`options.features.download.retries`)"
        :icon="MdiTimerRefreshOutline"
      >
        <NInputNumber
          :default-value="settings.features.download.retries"
          :min="1"
          :max="5"
          :precision="0"
          :on-update:value="value => (settings.features.download.retries = value || 1)"
        />
      </SettingDetail>
      <SettingDetail
        :title="i18n.t(`options.features.download.conflict.title`)"
        :icon="MdiContentDuplicate"
      >
        <NSelect
          :options="conflicts"
          :default-value="settings.features.download.conflict"
          :on-update:value="value => (settings.features.download.conflict = value)"
        />
      </SettingDetail>
    </SettingItem>

    <SettingItem :title="i18n.t(`options.features.cleanup.title`)" :icon="MdiRobotOutline">
      <SettingDetail :title="i18n.t(`options.features.cleanup.enabled`)" :icon="MdiDeleteClock">
        <NSwitch
          :default-value="settings.features.cleanup.enabled"
          :on-update:value="value => (settings.features.cleanup.enabled = value)"
        />
      </SettingDetail>
      <SettingDetail :title="i18n.t(`options.features.cleanup.retention`)" :icon="MdiTimerSand">
        <NInputNumber
          :disabled="!settings.features.cleanup.enabled"
          :default-value="settings.features.cleanup.retention"
          :min="1"
          :max="9999"
          :precision="0"
          :on-update:value="value => (settings.features.cleanup.retention = value || 30)"
        >
          <template #suffix>
            {{ i18n.t(`unit.day`) }}
          </template>
        </NInputNumber>
      </SettingDetail>
      <SettingDetail :title="i18n.t(`download.delete.disk`)" :icon="MdiHarddisk">
        <NSwitch
          :disabled="!settings.features.cleanup.enabled"
          :default-value="settings.features.cleanup.revmove"
          :on-update:value="value => (settings.features.cleanup.revmove = value)"
        />
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>
