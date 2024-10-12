<script setup lang="ts">
  import { Category, categoryEnums } from "@/pages/popup/components/header/Category";
  import { t } from "@/utils/i18n";
  import MdiCategoryPlusOutline from "~icons/mdi/category-plus-outline";
  import MdiContentDuplicate from "~icons/mdi/content-duplicate";
  import MdiFileSearchOutline from "~icons/mdi/file-search-outline";
  import MdiFilterOutline from "~icons/mdi/filter-outline";
  import MdiLinkVariantPlus from "~icons/mdi/link-variant-plus";
  import MdiTimerOutline from "~icons/mdi/timer-outline";
  import MdiTimerRefreshOutline from "~icons/mdi/timer-refresh-outline";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const settings = useSettings();

  const categories = categoryEnums.filter(category => category !== "all");
  const updateCategories = (value: Array<string | number>) => {
    settings.value.features.categories = value as Category[];
  };

  const conflicts = [
    { value: "uniquify", label: t(`options_features_download_conflict_uniquify`) },
    { value: "overwrite", label: t(`options_features_download_conflict_overwrite`) },
    { value: "prompt", label: t(`options_features_download_conflict_prompt`) }
  ];
</script>

<template>
  <SettingWrapper>
    <SettingItem :title="t(`options_features_filter_title`)" :icon="MdiFilterOutline">
      <SettingDetail
        :title="t(`options_features_filter_search_title`)"
        :icon="MdiFileSearchOutline"
        :description="t(`options_features_filter_search_description`)"
      >
        <NSwitch
          :default-value="settings.features.search"
          :on-update:value="value => (settings.features.search = value)"
        />
      </SettingDetail>
      <SettingDetail
        :title="t(`options_features_filter_categories_title`)"
        :icon="MdiCategoryPlusOutline"
        :description="t(`options_features_filter_categories_description`)"
      >
        <NCheckboxGroup
          :value="settings.features.categories"
          :on-update:value="updateCategories"
        >
          <NCheckbox
            v-for="category in categories"
            :key="category"
            :label="t(`categories_${category}`)"
            :value="category"
          />
        </NCheckboxGroup>
      </SettingDetail>
    </SettingItem>

    <SettingItem :title="t(`options_features_download_title`)" :icon="MdiLinkVariantPlus">
      <SettingDetail :title="t(`options_features_download_timeout`)" :icon="MdiTimerOutline">
        <NInputNumber
          class="input"
          :default-value="settings.features.download.timeout"
          :min="10"
          :max="60"
          :precision="0"
          :on-update:value="value => (settings.features.download.timeout = value || 30)"
        >
          <template #suffix> {{ t(`unit_seconds`) }} </template>
        </NInputNumber>
      </SettingDetail>
      <SettingDetail
        :title="t(`options_features_download_retries`)"
        :icon="MdiTimerRefreshOutline"
      >
        <NInputNumber
          class="input"
          :default-value="settings.features.download.retries"
          :min="1"
          :max="5"
          :precision="0"
        />
      </SettingDetail>
      <SettingDetail
        :title="t(`options_features_download_conflict_title`)"
        :icon="MdiContentDuplicate"
      >
        <NSelect
          class="input"
          :options="conflicts"
          :default-value="settings.features.download.conflict"
          :on-update:value="value => (settings.features.download.conflict = value)"
        />
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>

<style scoped>
  .input {
    width: 250px;
  }
</style>
