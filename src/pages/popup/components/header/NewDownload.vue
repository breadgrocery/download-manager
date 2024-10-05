<script setup lang="ts">
  import { t } from "@/utils/i18n";

  interface Props {
    onConfirm?: (links: string[], loading: (value: boolean) => void) => void;
  }

  const { onConfirm } = defineProps<Props>();
  const text = ref<string>();

  const loading = ref(false);

  const handleConfirm = () => {
    const links = (text.value?.replace("\r\n", "\n").split("\n") || [])
      .map(link => link.trim())
      .filter(link => URL.canParse(link));
    onConfirm && onConfirm(links, value => (loading.value = value));
  };
</script>

<template>
  <NSpin :show="loading">
    <NFlex class="new-download-wrapper" vertical>
      <NInput
        v-model:value="text"
        class="input"
        type="textarea"
        :placeholder="t(`toolbar_create_downloads_placeholder`)"
        :autosize="{ minRows: 3, maxRows: 5 }"
      />
      <NFlex justify="end">
        <NButton type="primary" @click="handleConfirm">{{ t(`common_confirm`) }}</NButton>
      </NFlex>
    </NFlex>
  </NSpin>
</template>

<style scoped lang="scss">
  .new-download-wrapper {
    .input {
      width: 400px;
    }
    .timeout {
      width: 100px;
    }
  }
</style>
