<script setup lang="ts">
  import { state } from "@/utils/state";
  import { deletedStyle } from "@/utils/styles";
  import { useToggle } from "@vueuse/core";
  import bytes from "bytes";
  import { formatDistance } from "date-fns";
  import { useThemeVars } from "naive-ui";
  import { type Downloads } from "wxt/browser";
  import FileInfo from "./download/FileInfo.vue";
  import Progress from "./download/Progress.vue";
  import Speed from "./download/Speed.vue";
  import DownloadItemToolbar from "./download/Toolbar.vue";

  interface Props {
    download: Downloads.DownloadItem;
    highlights?: string[];
  }
  const { download, highlights } = defineProps<Props>();
  const colors = useThemeVars();
  const { locale } = useLocale();

  const [startTimeFormat, toggle] = useToggle();
  const startTime = computed(() => {
    return startTimeFormat.value
      ? formatDistance(download.startTime, Date.now(), {
          addSuffix: true,
          includeSeconds: true,
          locale: locale.value
        })
      : new Date(download.startTime).toLocaleString();
  });
</script>

<template>
  <NCard ref="download-item" size="small" hoverable>
    <NFlex :size="10" justify="end" :wrap="false">
      <!-- Progress icon -->
      <Progress :download="download" />

      <NFlex vertical style="flex-grow: 1">
        <NFlex justify="end" :wrap="false">
          <!-- File Info -->
          <FileInfo :download="download" :highlights="highlights" />

          <!-- Toolbar -->
          <DownloadItemToolbar style="flex-grow: 1" :download="download" />
        </NFlex>

        <!-- Footer -->
        <NFlex vertical>
          <!-- Download speed -->
          <Speed v-if="state.ongoing(download)" :download="download" />
          <!-- File Size -->
          <NFlex v-if="state.completed(download)">
            <NText :style="deletedStyle(download, colors)" code>
              {{ bytes(download.fileSize) }}
            </NText>
            <NText
              :style="deletedStyle(download, colors)"
              style="margin-left: auto"
              code
              @click="toggle()"
            >
              {{ startTime }}
            </NText>
          </NFlex>
        </NFlex>
      </NFlex>
    </NFlex>
  </NCard>
</template>
