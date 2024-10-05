<script setup lang="ts">
  import { Category, CategoryDetails, categoryDetails } from "./Category";

  export interface Props {
    categories?: Category[];
  }
  const { categories } = defineProps<Props>();

  const emit = defineEmits<{
    categoryClick: [CategoryDetails];
  }>();
  const handleCategoryClick = (category: CategoryDetails) => emit("categoryClick", category);

  const categoryButtons = computed(() => {
    const list = categoryDetails(categories);
    if (categories === undefined) {
      return list;
    }
    if (categories.length === 0) {
      return [];
    }
    if (categories.length === 1 && categories[0] === "all") {
      return list;
    } else {
      return list.filter(category => category.id === "all" || categories.includes(category.id));
    }
  });
</script>

<template>
  <NFlex>
    <NButtonGroup>
      <NTooltip v-for="button in categoryButtons" :key="button.id" :show-arrow="false">
        <template #trigger>
          <NButton @click="handleCategoryClick(button)">
            <template #icon> <IconButton :icon="button.icon" /> </template>
          </NButton>
        </template>
        <template #default> {{ button.tooltip }} </template>
      </NTooltip>
    </NButtonGroup>
  </NFlex>
</template>
