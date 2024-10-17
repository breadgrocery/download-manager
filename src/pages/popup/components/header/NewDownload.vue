<script setup lang="ts">
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
    onConfirm?.(links, value => (loading.value = value));
  };
</script>

<template>
  <NSpin :show="loading">
    <NFlex class="new-download-wrapper" vertical>
      <NInput
        v-model:value="text"
        class="input"
        type="textarea"
        :placeholder="i18n.t(`toolbar.create_downloads.placeholder`)"
        :autosize="{ minRows: 3, maxRows: 5 }"
      />
      <NFlex justify="end">
        <NButton type="primary" @click="handleConfirm">
          {{ i18n.t(`common.confirm`) }}
        </NButton>
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
