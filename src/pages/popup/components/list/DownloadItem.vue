<script setup lang="ts">
  import { state } from "@/utils/state";
  import { deletedStyle } from "@/utils/styles";
  import bytes from "bytes";
  import { useThemeVars } from "naive-ui";
  import browser from "webextension-polyfill";
  import FileInfo from "./download/FileInfo.vue";
  import Progress from "./download/Progress.vue";
  import Speed from "./download/Speed.vue";
  import DownloadItemToolbar from "./download/Toolbar.vue";

  interface Props {
    download: browser.Downloads.DownloadItem;
    highlights?: string[];
  }
  const { download, highlights } = defineProps<Props>();
  const colors = useThemeVars();
</script>

<template>
  <NCard ref="download-item" class="download-item-wrapper" size="small" hoverable>
    <NFlex :size="10" justify="end" :wrap="false">
      <!-- Progress icon -->
      <Progress :download="download" />

      <NFlex vertical class="main">
        <NFlex justify="end" :wrap="false">
          <!-- File Info -->
          <FileInfo :download="download" :highlights="highlights" />

          <!-- Toolbar -->
          <DownloadItemToolbar class="toolbar" :download="download" />
        </NFlex>

        <!-- Footer -->
        <NFlex vertical>
          <!-- Download speed -->
          <Speed v-if="state.ongoing(download)" :download="download" />
          <!-- File Size -->
          <NFlex v-if="state.completed(download)" class="file-size" justify="space-between">
            <NText :style="deletedStyle(download, colors)" code>
              {{ bytes(download.fileSize) }}
            </NText>
            <NText :style="deletedStyle(download, colors)" code>
              {{ new Date(download.startTime).toLocaleString() }}
            </NText>
          </NFlex>
        </NFlex>
      </NFlex>
    </NFlex>
  </NCard>
</template>

<style scoped lang="scss">
  .download-item-wrapper {
    .main {
      flex-grow: 1;
    }
    .toolbar {
      flex-grow: 1;
    }
    .file-size {
      user-select: none;
    }
  }
</style>
