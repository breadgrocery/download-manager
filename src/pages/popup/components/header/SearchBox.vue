<script setup lang="ts">
  import { debounce } from "lodash-es";

  const emit = defineEmits<{ search: [string] }>();

  const handleChange = debounce((value: string) => emit("search", value), 100);
</script>

<template>
  <NFlex>
    <NInput
      type="text"
      :placeholder="i18n.t(`search.placeholder`)"
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
