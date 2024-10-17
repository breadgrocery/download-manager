<script setup lang="ts">
  import { getFileName } from "@/utils/path";
  import { state } from "@/utils/state";
  import { deletedStyle, downloadStyle } from "@/utils/styles";
  import { useThemeVars } from "naive-ui";
  import { type Downloads, browser } from "wxt/browser";

  interface Props {
    download: Downloads.DownloadItem;
    highlights?: string[];
  }
  const { download, highlights } = defineProps<Props>();
  const colors = useThemeVars();

  // Split filename into parts for highlighting
  const filenameParts = computed(() => {
    const filename = getFileName(download.filename);
    if (highlights && download.exists) {
      const escaped = highlights.map(h => h.replace(/([.*+?^${}()|[\]\\])/g, "\\$1"));
      const pattern = `(${escaped.join("|")})`;
      const parts = filename.split(new RegExp(pattern, "gi")).filter(Boolean);
      return parts.map(part => ({
        text: part,
        highlight: highlights.some(highlight => highlight.toLowerCase() === part.toLowerCase())
      }));
    }
    return [{ text: filename, highlight: false }];
  });

  const handleOpenFile = () => {
    if (state.completed(download)) {
      browser.downloads.open(download.id);
    }
  };
</script>

<template>
  <NFlex vertical>
    <NTooltip :show-arrow="false" :delay="500">
      <template #trigger>
        <NText
          class="filename"
          :style="deletedStyle(download, colors)"
          :type="downloadStyle(download, colors).type"
          :onclick="handleOpenFile"
        >
          <!-- Render each part with or without highlight -->
          <template v-for="(part, index) in filenameParts" :key="index">
            <span v-if="part.highlight">
              <span class="highlight">{{ part.text }}</span>
            </span>
            <span v-else>{{ part.text }}</span>
          </template>
        </NText>
      </template>
      <template v-if="state.dangerous(download)" #default>
        {{ i18n.t(`danger.${download.danger}`) }}
      </template>
      <template v-else-if="state.ongoing(download)" #default>
        {{ download.filename }}
      </template>
      <template v-else-if="state.deleted(download)" #default>
        {{ i18n.t(`download.gone`) }}
      </template>
      <template v-else-if="state.completed(download)" #default>
        {{ i18n.t(`download.open`) }}
      </template>
      <template v-else #default>
        {{ download.error && i18n.t(`error.${download.error}`) }}
      </template>
    </NTooltip>
  </NFlex>
</template>

<style scoped lang="scss">
  .filename {
    max-width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  :deep(.highlight) {
    background-color: #fbec46;
  }
</style>
