<script setup lang="ts">
  import { NText } from "naive-ui";

  export interface Props {
    icon?: string;
    title: string;
    description?: string;
    tooltip?: string;
  }

  const { icon, title, description, tooltip } = defineProps<Props>();
</script>

<template>
  <NFlex class="setting-detail-wrapper" justify="space-between">
    <NFlex class="info" vertical>
      <NFlex :size="5">
        <Icon v-if="icon" class="icon" :icon="icon" :width="18" />
        <NText>{{ title }}</NText>
        <IconButton v-if="tooltip" icon="mdi:question-mark-circle" :tooltip="tooltip" />
      </NFlex>
      <span v-if="description" class="description">{{ description }}</span>
    </NFlex>
    <NFlex class="actions" justify="end">
      <slot />
    </NFlex>
  </NFlex>
</template>

<style scoped lang="scss">
  .setting-detail-wrapper {
    width: 100%;
    .info {
      flex-basis: auto;
      align-self: center;
      .icon {
        align-self: center;
      }
      .description {
        font-size: 12px;
        color: gray;
      }
    }
    .actions {
      flex-grow: 1;
      align-self: center;
      & > * {
        justify-content: end;
      }
    }
  }
</style>
