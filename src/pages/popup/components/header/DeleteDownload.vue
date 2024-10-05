<script setup lang="ts">
  import { t } from "@/utils/i18n";

  interface Props {
    onConfirm?: (disk: boolean) => void;
  }

  const { onConfirm } = defineProps<Props>();
  const disk = ref<boolean>(false);

  const handleConfirm = () => onConfirm && onConfirm(disk.value);
</script>

<template>
  <NFlex class="delete-download-wrapper" vertical>
    <NCheckbox v-model:checked="disk" class="delete-from-disk">
      {{ t(`download_delete_disk`) }}
    </NCheckbox>
    <NFlex justify="end">
      <NButton type="primary" @click="handleConfirm">{{ t(`common_confirm`) }}</NButton>
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
