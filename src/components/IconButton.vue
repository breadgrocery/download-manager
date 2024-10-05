<script setup lang="ts">
  import { IconProps } from "@iconify/vue";

  export type Picked = "icon" | "mode" | "color" | "width" | "height";

  export interface Props extends Pick<IconProps, Picked> {
    tooltip?: string;
    showArrow?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    tooltip: undefined,
    width: 18,
    showArrow: false
  });

  const emit = defineEmits<{
    click: [];
  }>();
  const handleClick = () => emit("click");
</script>

<template>
  <NTooltip :show-arrow="props.showArrow" :disabled="props.tooltip === undefined">
    <template #trigger>
      <NButton text @click="handleClick">
        <Icon v-bind="props" />
      </NButton>
    </template>
    <template #default> {{ props.tooltip }} </template>
  </NTooltip>
</template>
