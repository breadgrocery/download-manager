<script setup lang="ts">
  import { getDownloads } from "@/utils/download";
  import { listen } from "@/utils/message";
  import { useVirtualList } from "@vueuse/core";
  import { type Downloads } from "wxt/browser";
  import { type CategoryDetails } from "./components/header/Category";
  import Header from "./components/header/Header.vue";
  import DownloadItem from "./components/list/DownloadItem.vue";

  // Set document title
  document.title = i18n.t("toolbar.extension_settings");

  // Theme and locale
  const { adaptive, theme } = useTheme();
  const { ui } = useLocale();

  // Width and height
  const settings = useSettings();
  const popupStyle = computed(() => ({
    width: `${settings.value.appearance.width}px`,
    height: `${settings.value.appearance.height}px`
  }));

  // Raw download items
  const downloads = ref<Downloads.DownloadItem[]>([]);
  const refresh = () => getDownloads().then(data => (downloads.value = data));
  // Update download items on receiveing from background.js
  refresh().then(() => listen("background-to-popup:update", refresh));
  // Refresh regularly to prevent unexpected exceptions
  onMounted(() => {
    const intervalId = setInterval(refresh, 1000);
    return () => clearInterval(intervalId);
  });

  // Download items filters
  const baseFilter = (download: Downloads.DownloadItem) => download.filename;
  const searchFilter = ref<(download: Downloads.DownloadItem) => boolean>(() => true);
  const categoryFilter = ref<(download: Downloads.DownloadItem) => boolean>(() => true);
  // Filtered download items
  const filtered = computed(() =>
    downloads.value.filter(download => {
      return baseFilter(download) && searchFilter.value(download) && categoryFilter.value(download);
    })
  );
  const { list, containerProps, wrapperProps } = useVirtualList(filtered, {
    itemHeight: 80,
    overscan: 5
  });
  // Download item highlight content
  const highlights = ref<string[]>();

  const handleSearch = (value: string) => {
    const search = value.trim().toLowerCase();
    searchFilter.value = search
      ? download => download.filename.toLowerCase().includes(search)
      : () => true;
    highlights.value = [search];
  };

  const handleCategoryCilck = (category: CategoryDetails) => {
    categoryFilter.value = download => category.match(download.filename);
  };
</script>

<template>
  <ThemeProvider
    :adaptive="adaptive"
    :theme="theme"
    :locale="ui.locale"
    :date-locale="ui.dateLocale"
  >
    <NModalProvider>
      <NMessageProvider>
        <NFlex class="popup-wrapper" :style="popupStyle" vertical :size="0">
          <!-- Header -->
          <Header
            class="header"
            :downloads="downloads"
            @search="handleSearch"
            @category-click="handleCategoryCilck"
          />

          <!-- Download List -->
          <div v-if="filtered.length > 0" v-bind="containerProps" class="scroller">
            <div v-bind="wrapperProps">
              <div v-for="item in list" :key="item.data.id" class="item">
                <DownloadItem :download="item.data" :highlights="highlights" />
              </div>
            </div>
            <NBackTop :bottom="5" :right="10" :visibility-height="300" />
          </div>
          <!-- Empty Box -->
          <NFlex v-if="filtered.length === 0" class="empty" vertical justify="space-around">
            <NEmpty :description="i18n.t(`empty`)">
              <template #icon>
                <NIcon><IconMdiTrayDownload /> </NIcon>
              </template>
            </NEmpty>
          </NFlex>
        </NFlex>
      </NMessageProvider>
    </NModalProvider>
  </ThemeProvider>
</template>

<style scoped lang="scss">
  .popup-wrapper {
    min-width: 645px;
    max-width: 800px;
    min-height: 300px;
    max-height: 600px;
    overflow: hidden;
    &,
    &:deep(img) {
      -webkit-user-drag: none;
      user-select: none;
    }
    .scroller {
      scroll-behavior: auto;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        cursor: pointer;
        background-color: transparent;
        &:hover {
          background-color: rgba(0, 0, 0, 0.4);
        }
        transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      &:hover::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.25);
      }
      .item {
        margin: 2px;
      }
    }
    .empty {
      flex-grow: 1;
    }
  }
</style>
