<script setup lang="ts">
  import { getDownloads } from "@/utils/download";
  import { t } from "@/utils/i18n";
  import { listen } from "@/utils/message";
  import { RecycleScroller } from "vue-virtual-scroller";
  import browser from "webextension-polyfill";
  import { CategoryDetails } from "./components/header/Category";
  import Header from "./components/header/Header.vue";
  import DownloadItem from "./components/list/DownloadItem.vue";

  // Set title on mounted
  onMounted(() => (document.title = t(`extension_name`)));

  // Theme and locale
  const { adaptive, theme } = useTheme();
  const { locale, dateLocale } = useLocale();

  // Width and height
  const settings = useSettings();
  const popupStyle = computed(() => ({
    "width": `${settings.value.appearance.width}px`,
    "height": `${settings.value.appearance.height}px`
  }));

  // Raw download items
  const downloads = ref<browser.Downloads.DownloadItem[]>([]);
  const refresh = () => getDownloads().then(data => (downloads.value = data));
  // Update download items on receiveing from background.js
  refresh().then(() => listen("background-to-popup:update", refresh));
  // Refresh regularly to prevent unexpected exceptions
  onMounted(() => {
    const intervalId = setInterval(refresh, 1000);
    return () => clearInterval(intervalId);
  });

  // Download items filters
  const baseFilter = (download: browser.Downloads.DownloadItem) => download.filename;
  const searchFilter = ref<(download: browser.Downloads.DownloadItem) => boolean>(() => true);
  const categoryFilter = ref<(download: browser.Downloads.DownloadItem) => boolean>(() => true);
  // Filtered download items
  const filtered = computed(() =>
    downloads.value.filter(download => {
      return baseFilter(download) && searchFilter.value(download) && categoryFilter.value(download);
    })
  );
  // Download item highlight content
  const highlights = ref<string[]>();

  const handleSearch = (value: string) => {
    const search = value.trim().toLocaleLowerCase();
    searchFilter.value = search
      ? download => download.filename.toLocaleLowerCase().includes(search)
      : () => true;
    highlights.value = [value];
  };

  const handleCategoryCilck = (category: CategoryDetails) => {
    categoryFilter.value = download => category.match(download.filename);
  };
</script>

<template>
  <ThemeProvider :adaptive="adaptive" :theme="theme" :locale="locale" :date-locale="dateLocale">
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
          <NScrollbar v-if="filtered.length > 0">
            <RecycleScroller
              v-slot="{ item }"
              class="scroller"
              :items="filtered"
              :item-size="80"
              key-field="id"
              :buffer="160"
            >
              <DownloadItem :key="item.id" class="item" :download="item" :highlights="highlights" />
            </RecycleScroller>
            <NBackTop :bottom="5" :right="15" :visibility-height="300" />
          </NScrollbar>

          <!-- Empty Box -->
          <NFlex v-if="filtered.length === 0" class="empty" vertical justify="space-around">
            <NEmpty :description="t(`empty`)">
              <template #icon> <Icon icon="mdi:tray-download" /> </template>
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
    .scroller {
      .item {
        position: absolute;
        width: 100%;
      }
      :deep(.resize-observer) {
        display: none;
      }
    }
    .empty {
      flex-grow: 1;
    }
  }
</style>
