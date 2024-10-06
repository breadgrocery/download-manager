<script setup lang="ts">
  import bytes from "bytes";
  import browser from "webextension-polyfill";

  interface Props {
    download: browser.Downloads.DownloadItem;
  }
  const { download } = defineProps<Props>();

  const bps = ref<number>(0);
  const lastUpdate = ref<number>(Date.now());
  watch(
    () => download.bytesReceived,
    (newVal, oldVal) => {
      if (newVal === oldVal) return;
      const now = Date.now();
      bps.value = (newVal - oldVal) / ((now - lastUpdate.value) / 1000);
      lastUpdate.value = now;
    }
  );
</script>

<template>
  <NFlex class="download-speed-wrapper" justify="space-between">
    <!-- Download progress -->
    <NFlex class="progress" :size="0">
      <NText>{{ bytes(download.bytesReceived) }}</NText>
      <span v-if="download.totalBytes > 0">
        <NDivider vertical />
        <NText> {{ bytes(download.totalBytes) }}</NText>
      </span>
    </NFlex>

    <!-- Download speed -->
    <NText class="speed">{{ `${bytes(bps)}/s` }}</NText>

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
