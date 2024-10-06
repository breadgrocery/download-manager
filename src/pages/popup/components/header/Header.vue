<script setup lang="ts">
  import { deleteDownload } from "@/utils/download";
  import { t } from "@/utils/i18n";
  import { state } from "@/utils/state";
  import { useMessage } from "naive-ui";
  import browser from "webextension-polyfill";
  import { CategoryDetails } from "./Category";
  import CategoryBox from "./CategoryBox.vue";
  import SearchBox from "./SearchBox.vue";
  import Toolbar from "./Toolbar.vue";

  interface Props {
    downloads: browser.Downloads.DownloadItem[];
  }
  const { downloads } = defineProps<Props>();

  const emit = defineEmits<{
    search: [string];
    categoryClick: [CategoryDetails];
  }>();

  const message = useMessage();
  const settings = useSettings();

  const handleSearch = (value: string) => emit("search", value);
  const handleCategoryCilck = (category: CategoryDetails) => emit("categoryClick", category);

  const deleteFilters: { [key: string]: (download: browser.Downloads.DownloadItem) => boolean } = {
    all: () => true,
    failed: download => state.interrupted(download) || state.expired(download),
    missing: download => state.deleted(download)
  };
  const handleDeleteSelect = async (key: string, disk: boolean, close?: () => void) => {
    const deleteFilter = deleteFilters[key] || (() => false);
    const tasks = downloads.filter(deleteFilter).map(download => deleteDownload(download, disk));
    Promise.allSettled(tasks)
      .then(ids => message.success(t(`toolbar_delete_downloads_completed`, [`${ids.length}`])))
      .finally(close);
  };

  // Detect long tasks and suggest the user to delete unnecessary downloads
  onMounted(() => {
    if (PerformanceObserver) {
      const observer = new PerformanceObserver(list => {
        if (list.getEntries()[0].duration >= 1000) {
          // Wait for settings to load before showing lag warning
          setTimeout(() => {
            settings.value.notifications.messages.lag && message.warning(t(`messages_lag`));
          }, 200);
        }
      });
      observer.observe({ entryTypes: ["longtask"] });
      return () => observer.disconnect();
    }
  });
</script>

<template>
  <NFlex class="popup-header-wrapper" justify="space-between" :wrap="false">
    <!-- Search Box -->
    <SearchBox v-if="settings.interactions.search" class="search-box" @search="handleSearch" />

    <!-- Category Box -->
    <CategoryBox
      v-if="!settings.interactions.categories || settings.interactions.categories.length > 0"
      class="category-box"
      :categories="settings.interactions.categories"
      @category-click="handleCategoryCilck"
    />

    <!-- Toolbar -->
    <Toolbar class="toolbar" @delete="handleDeleteSelect" />
  </NFlex>
</template>

<style scoped lang="scss">
  .popup-header-wrapper {
    padding: 10px;
    .search-box {
      flex-grow: 1;
    }
    .toolbar {
      margin-left: auto;
    }
  }
</style>
