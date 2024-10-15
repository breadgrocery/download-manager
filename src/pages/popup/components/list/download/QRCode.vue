<script setup lang="ts">
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
      const url = canvas.toDataURL();
      const filename = "QRCode.png";
      const fallbackDownload = () => {
        const a = document.createElement("a");
        a.download = filename;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
      try {
        browser.downloads.download({ url, filename }).catch(fallbackDownload);
      } catch {
        fallbackDownload();
      }
    }
  };
</script>

<template>
  <NFlex vertical>
    <NQrCode
      v-if="renderable"
      id="qr-code"
      :value="value"
      :size="180"
      error-correction-level="M"
    />
    <NButton @click="handleDownload">
      <template #icon>
        <NIcon> <IconMdiTrayDownload /> </NIcon>
      </template>
      {{ i18n.t(`download.link.download_qr_code`) }}
    </NButton>
  </NFlex>
</template>
