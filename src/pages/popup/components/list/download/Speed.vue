<script setup lang="ts">
  import bytes from "bytes";
  import browser from "webextension-polyfill";

  interface Props {
    download: browser.Downloads.DownloadItem;
  }
  const { download } = defineProps<Props>();

  const downloadSpeed = computed(() => {
    if (download.estimatedEndTime) {
      const remaining = (new Date(download.estimatedEndTime).getTime() - Date.now()) / 1000;
      if (remaining > 0) {
        const speed = bytes((download.totalBytes - download.bytesReceived) / remaining);
        return `${speed}/s`;
      }
    }
  });
</script>

<template>
  <NFlex class="download-speed-wrapper" justify="space-between">
    <!-- Download progress -->
    <NFlex class="progress" :size="0">
      <NText>{{ bytes(download.bytesReceived) }}</NText>
      <NDivider vertical />
      <NText> {{ bytes(download.totalBytes) }}</NText>
    </NFlex>

    <!-- Download speed -->
    <NText class="speed">{{ downloadSpeed }}</NText>

    <!-- Estimated remaining -->
    <NTime
      v-if="download.estimatedEndTime"
      type="relative"
      :time="new Date(download.estimatedEndTime)"
      :to="Date.now()"
    />
  </NFlex>
</template>

<style scoped lang="scss">
  .download-speed-wrapper {
    .progress {
      width: 180px;
    }
    .speed {
      flex-grow: 1;
    }
  }
</style>
