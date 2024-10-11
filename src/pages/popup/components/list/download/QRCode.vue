<script setup lang="ts">
  import { t } from "@/utils/i18n";
  import browser from "webextension-polyfill";

  export interface Props {
    value: string;
  }

  const props = defineProps<Props>();

  // Convert value to a non-reactive reference
  const { value } = props;
  const renderable = value.length <= 57 * 57;

  const handleDownload = () => {
    const canvas = document.querySelector("#qr-code")?.querySelector<HTMLCanvasElement>("canvas");
    if (canvas) {
      browser.downloads.download({ url: canvas.toDataURL(), filename: "QRCode.png" });
    }
  };
</script>

<template>
  <NFlex vertical>
    <NQrCode v-if="renderable" id="qr-code" :value="value" :size="180" error-correction-level="M" />
    <NButton @click="handleDownload">
      <template #icon>
        <NIcon> <IconMdiTrayDownload /> </NIcon>
      </template>
      {{ t(`download_link_download_qr_code`) }}
    </NButton>
  </NFlex>
</template>
