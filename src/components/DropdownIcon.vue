<script setup lang="ts">
  import { t } from "@/utils/i18n";
  import { Icon, IconProps } from "@iconify/vue";

  export interface DropdownIconOption {
    key: string;
    label: string;
    icon: string;
    disabled?: boolean;
  }

  export type Picked = "icon" | "mode" | "color" | "width" | "height";

  export interface Props extends Pick<IconProps, Picked> {
    options: DropdownIconOption[];
  }
  const props = defineProps<Props>();

  const emit = defineEmits<{
    select: [string];
  }>();
  const handleSelect = (key: string) => emit("select", key);

  const options = computed(() => {
    return props.options.map(option => ({
      key: option.key,
      label: t(option.label),
      ...(option.icon && { icon: () => h(Icon, { icon: option.icon }) }),
      disabled: option.disabled
    }));
  });
</script>

<template>
  <NDropdown :options="options" @select="handleSelect">
    <NFlex class="dropdown-icon-wrapper" style="cursor: pointer">
      <Icon v-bind="props" />
    </NFlex>
  </NDropdown>
</template>

<style scoped lang="scss">
  .dropdown-icon-wrapper {
    align-self: center;
  }
</style>
