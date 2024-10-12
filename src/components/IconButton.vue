<script setup lang="ts">
  import { h } from "vue";

  export type Icon = {
    icon: Component;
    color?: string;
    size?: number | string;
  };

  export interface Props extends Icon {
    tooltip?: string;
    showArrow?: boolean;
  }

  const { icon, color, size = 20, tooltip, showArrow } = defineProps<Props>();

  const emit = defineEmits<{
    click: [];
  }>();
  const handleClick = () => emit("click");
</script>

<template>
  <NTooltip :show-arrow="showArrow" :delay="500" :disabled="tooltip === undefined">
    <template #trigger>
      <NButton text @click="handleClick">
        <NIcon :color="color" :size="size">
          <component :is="() => h(icon)" />
        </NIcon>
      </NButton>
    </template>
    <template #default> {{ tooltip }} </template>
  </NTooltip>
</template>
