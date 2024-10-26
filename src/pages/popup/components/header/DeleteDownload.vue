<script setup lang="ts">
  import { useThemeVars } from "naive-ui";

  interface Props {
    onConfirm?: (disk: boolean) => void;
  }

  const { onConfirm } = defineProps<Props>();
  const colors = useThemeVars();

  const disk = ref<boolean>(false);
  const diskRef = useTemplateRef<HTMLElement>("disk-check-box");
  nextTick(() => diskRef.value?.focus());

  const handleConfirm = () => onConfirm?.(disk.value);
</script>

<template>
  <NFlex class="delete-download-wrapper" vertical>
    <NCheckbox
      ref="disk-check-box"
      v-model:checked="disk"
      :theme-overrides="{ colorChecked: colors.errorColor }"
      class="delete-from-disk"
    >
      {{ i18n.t(`download.delete.disk`) }}
    </NCheckbox>
    <NFlex justify="end">
      <NButton type="primary" @click="handleConfirm">
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
