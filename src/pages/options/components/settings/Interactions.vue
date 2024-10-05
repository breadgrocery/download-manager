<script setup lang="ts">
  import { Category, categoryEnums } from "@/pages/popup/components/header/Category";
  import { t } from "@/utils/i18n";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const settings = useSettings();

  const updateSearch = (value: boolean) => {
    settings.value.interactions.search = value;
  };

  const categories = categoryEnums.filter(category => category !== "all");
  const updateCategories = (value: Array<string | number>) => {
    settings.value.interactions.categories = value as Category[];
  };
</script>

<template>
  <SettingWrapper>
    <SettingItem :title="t(`options_interactions_filter_title`)" icon="mdi:filter-outline">
      <SettingDetail
        :title="t(`options_interactions_filter_search_title`)"
        icon="mdi:file-search-outline"
        :description="t(`options_interactions_filter_search_description`)"
      >
        <NSwitch :default-value="settings.interactions.search" :on-update:value="updateSearch" />
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
  </SettingWrapper>
</template>
