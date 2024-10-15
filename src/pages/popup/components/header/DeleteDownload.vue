<script setup lang="ts">
  interface Props {
    onConfirm?: (disk: boolean) => void;
  }

  const { onConfirm } = defineProps<Props>();
  const disk = ref<boolean>(false);

  const handleConfirm = () => onConfirm?.(disk.value);
</script>

<template>
  <NFlex
    class="delete-download-wrapper"
    vertical
  >
    <NCheckbox
      v-model:checked="disk"
      class="delete-from-disk"
    >
      {{ i18n.t(`download.delete.disk`) }}
    </NCheckbox>
    <NFlex justify="end">
      <NButton
        type="primary"
        @click="handleConfirm"
      >
        {{ i18n.t(`common.confirm`) }}
      </NButton>
    </NFlex>
  </NFlex>
</template>

<style scoped lang="scss">
  .delete-download-wrapper {
    width: 400px;
    .delete-from-disk {
      width: fit-content;
    }
  }
</style>
