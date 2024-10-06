<script setup lang="ts">
  import { Category, categoryEnums } from "@/pages/popup/components/header/Category";
  import { t } from "@/utils/i18n";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const settings = useSettings();

  const categories = categoryEnums.filter(category => category !== "all");
  const updateCategories = (value: Array<string | number>) => {
    settings.value.interactions.categories = value as Category[];
  };

  const conflicts = [
    { value: "uniquify", label: t(`options_interactions_download_conflict_uniquify`) },
    { value: "overwrite", label: t(`options_interactions_download_conflict_overwrite`) },
    { value: "prompt", label: t(`options_interactions_download_conflict_prompt`) }
  ];
</script>

<template>
  <SettingWrapper>
    <SettingItem :title="t(`options_interactions_filter_title`)" icon="mdi:filter-outline">
      <SettingDetail
        :title="t(`options_interactions_filter_search_title`)"
        icon="mdi:file-search-outline"
        :description="t(`options_interactions_filter_search_description`)"
      >
        <NSwitch
          :default-value="settings.interactions.search"
          :on-update:value="value => (settings.interactions.search = value)"
        />
      </SettingDetail>
      <SettingDetail
        :title="t(`options_interactions_filter_categories_title`)"
        icon="mdi:category-plus-outline"
        :description="t(`options_interactions_filter_categories_description`)"
      >
        <NCheckboxGroup
          :value="settings.interactions.categories"
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

    <SettingItem :title="t(`options_interactions_download_title`)" icon="mdi:link-variant-plus">
      <SettingDetail :title="t(`options_interactions_download_timeout`)" icon="mdi:timer-outline">
        <NInputNumber
          class="input"
          :default-value="settings.interactions.download.timeout"
          :min="10"
          :max="60"
          :precision="0"
          :on-update:value="value => (settings.interactions.download.timeout = value || 30)"
        >
          <template #suffix> {{ t(`unit_seconds`) }} </template>
        </NInputNumber>
      </SettingDetail>
      <SettingDetail
        :title="t(`options_interactions_download_retries`)"
        icon="mdi:timer-refresh-outline"
      >
        <NInputNumber
          class="input"
          :default-value="settings.interactions.download.retries"
          :min="1"
          :max="5"
          :precision="0"
        />
      </SettingDetail>
      <SettingDetail
        :title="t(`options_interactions_download_conflict_title`)"
        icon="mdi:content-duplicate"
      >
        <NSelect
          class="input"
          :options="conflicts"
          :default-value="settings.interactions.download.conflict"
          :on-update:value="value => (settings.interactions.download.conflict = value)"
        />
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>

<style scoped lang="scss">
  .input {
    width: 250px;
  }
</style>
