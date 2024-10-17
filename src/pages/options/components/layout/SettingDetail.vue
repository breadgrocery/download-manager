<script setup lang="ts">
  import { h } from "vue";
  import MdiQuestionMarkCircle from "~icons/mdi/question-mark-circle";

  export interface Props {
    icon?: Component;
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
        <NIcon v-if="icon" class="icon">
          <component :is="() => h(icon || MdiQuestionMarkCircle)" />
        </NIcon>
        <NText>{{ title }}</NText>
        <IconButton v-if="tooltip" :icon="MdiQuestionMarkCircle" :tooltip="tooltip" />
      </NFlex>
      <span v-if="description" class="description">
        {{ description }}
      </span>
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
    :deep(.n-input-wrapper) {
      width: 250px;
    }
    :deep(.n-select) {
      width: 270px;
    }
  }
</style>
