<script setup lang="ts">
  import { getCacheAsync } from "@/utils/cache";
  import { getFileExtension } from "@/utils/path";
  import { state } from "@/utils/state";
  import { deletedStyle, downloadStyle } from "@/utils/styles";
  import { useThemeVars } from "naive-ui";
  import browser from "webextension-polyfill";

  interface Props {
    download: browser.Downloads.DownloadItem;
  }

  const { download } = defineProps<Props>();
  const colors = useThemeVars();

  // Progress cycle
  const progressClass = computed(() => ({
    "progress": true,
    "no-progress": !state.ongoing(download),
    "fade": download.totalBytes === 0 && state.downloading(download)
  }));
  const percentage = computed(() => {
    if (download.totalBytes > 0) {
      return Math.round((download.bytesReceived / download.totalBytes) * 100);
    } else {
      return 100;
    }
  });

  // File Icon
  const src = ref<string | undefined>(undefined);
  onBeforeMount(async () => {
    const cacheKey = `file-icon:${download.mime || getFileExtension(download.filename)}`;
    const icon = await getCacheAsync(cacheKey, () => {
      return browser.downloads.getFileIcon(download.id, { size: 32 });
    });
    src.value = icon;
  });
</script>

<template>
  <NFlex :size="5">
    <NProgress
      :class="progressClass"
      type="circle"
      :color="downloadStyle(download, colors).color"
      :offset-degree="180"
      :percentage="percentage"
    >
      <NAvatar
        v-if="src"
        :size="32"
        color="transparent"
        :style="deletedStyle(download, colors)"
        :src="src"
      />
      <NIcon v-else :size="32" :style="deletedStyle(download, colors)">
        <Icon icon="mdi:file-question-outline" />
      </NIcon>
    </NProgress>
    <NDivider class="divider" vertical />
  </NFlex>
</template>

<style scoped lang="scss">
  .progress {
    width: 52px;
    align-self: center;
  }
  .no-progress {
    :deep(.n-progress-graph) {
      opacity: 0;
    }
  }
  .divider {
    height: 52px;
  }
  @keyframes fade-animation {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }
  :deep(.fade) {
    svg {
      animation: fade-animation 2s ease-in-out infinite;
    }
  }
</style>
