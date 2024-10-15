<script setup lang="ts">
  import { NIcon } from "naive-ui";
  import { h } from "vue";
  import type { Icon } from "./IconButton.vue";

  export interface DropdownIconOption extends Icon {
    key: string;
    label: string;
    disabled?: boolean;
  }

  export interface Props extends Icon {
    options: DropdownIconOption[];
  }
  const { icon, color, size = 20, options } = defineProps<Props>();

  const emit = defineEmits<{
    select: [string];
  }>();
  const handleSelect = (key: string) => emit("select", key);

  const list = computed(() => {
    return options.map(option => ({
      key: option.key,
      label: option.label,
      ...(option.icon && {
        icon: () =>
          h(
            NIcon,
            { size: option.size, color: option.color },
            {
              default: () => h(option.icon)
            }
          )
      }),
      disabled: option.disabled
    }));
  });
</script>

<template>
  <NDropdown
    :options="list"
    @select="handleSelect"
  >
    <NFlex
      class="dropdown-icon-wrapper"
      style="cursor: pointer"
    >
      <NIcon
        :color="color"
        :size="size"
      >
        <component :is="() => h(icon)" />
      </NIcon>
    </NFlex>
  </NDropdown>
</template>

<style scoped>
  .dropdown-icon-wrapper {
    align-self: center;
  }
</style>
