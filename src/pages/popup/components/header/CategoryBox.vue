<script setup lang="ts">
  import { useThemeVars } from "naive-ui";
  import { type Category, type CategoryDetails, categoryDetails } from "./Category";

  export interface Props {
    categories?: Category[];
  }
  const { categories } = defineProps<Props>();

  const emit = defineEmits<{
    categoryClick: [CategoryDetails];
  }>();
  const handleCategoryClick = (category: CategoryDetails) => {
    current.value = category.id;
    emit("categoryClick", category);
  };

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
    }
    return list.filter(detail => detail.id === "all" || categories.includes(detail.id));
  });

  const current = ref(categoryButtons.value[0].id);
  const colors = useThemeVars();
</script>

<template>
  <NFlex>
    <NButtonGroup>
      <NTooltip v-for="button in categoryButtons" :key="button.id" :show-arrow="false" :delay="500">
        <template #trigger>
          <NButton @click="handleCategoryClick(button)">
            <template #icon>
              <IconButton
                :icon="button.icon"
                :size="18"
                :color="button.id == current ? colors.primaryColor : undefined"
              />
            </template>
          </NButton>
        </template>
        <template #default>
          {{ button.tooltip }}
        </template>
      </NTooltip>
    </NButtonGroup>
  </NFlex>
</template>
