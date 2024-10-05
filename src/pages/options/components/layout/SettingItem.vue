<script setup lang="ts">
  import { NText } from "naive-ui";
  import { NDivider } from "naive-ui";
  import { h } from "vue";

  export interface Props {
    title: string;
    icon?: string;
  }

  const { title, icon } = defineProps<Props>();
</script>

<template>
  <NCard class="setting-item-wrapper">
    <template #header>
      <NFlex>
        <NIcon v-if="icon" class="icon">
          <Icon :icon="icon" />
        </NIcon>
        <NText>{{ title }}</NText>
      </NFlex>
    </template>
    <div v-divider="() => h(NDivider)">
      <slot />
    </div>
  </NCard>
</template>

<style scoped lang="scss">
  .setting-item-wrapper {
    margin-bottom: 10px;
    .icon {
      align-self: center;
    }
  }
</style>
