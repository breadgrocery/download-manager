<script setup lang="ts">
  import { t } from "@/utils/i18n";
  import { debounce } from "lodash-es";

  const emit = defineEmits<{ search: [string] }>();

  const handleChange = debounce((value: string) => emit("search", value), 200);
</script>

<template>
  <NFlex>
    <NInput
      type="text"
      :placeholder="t(`search_placeholder`)"
      :input-props="{ spellcheck: false }"
      clearable
      @input="handleChange"
    >
      <template #prefix>
        <NIcon><IconMdiSearch /> </NIcon>
      </template>
    </NInput>
  </NFlex>
</template>
