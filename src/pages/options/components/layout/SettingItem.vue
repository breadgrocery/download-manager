<script setup lang="ts">
  import { NText } from "naive-ui";
  import { NDivider } from "naive-ui";
  import { h } from "vue";
  import MdiQuestionMarkCircle from "~icons/mdi/question-mark-circle";

  export interface Props {
    title: string;
    icon?: Component;
  }

  const { title, icon } = defineProps<Props>();
</script>

<template>
  <NCard class="setting-item-wrapper">
    <template #header>
      <NFlex>
        <NIcon v-if="icon" class="icon">
          <component :is="() => h(icon || MdiQuestionMarkCircle)" />
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
