<script setup lang="ts">
  import { t } from "@/utils/i18n";
  import { getFileName } from "@/utils/path";
  import { state } from "@/utils/state";
  import { deletedStyle, downloadStyle } from "@/utils/styles";
  import { useThemeVars } from "naive-ui";
  import browser from "webextension-polyfill";

  interface Props {
    download: browser.Downloads.DownloadItem;
    highlights?: string[];
  }
  const { download, highlights } = defineProps<Props>();
  const colors = useThemeVars();

  const wrapper = (highlight: string) => `<span class="highlight">${highlight}</span>`;
  const html = computed(() => {
    const filename = getFileName(download.filename);
    if (highlights) {
      const escaped = highlights.map(h => h.replace(/([.*+?^${}()|[\]\\])/g, "\\$1"));
      const pattern = `(${escaped.join("|")})`;
      const regex = new RegExp(pattern, "gi");
      return filename.replace(regex, wrapper);
    }
    return filename;
  });

  const handleOpenFile = () => {
    if (state.completed(download)) {
      browser.downloads.open(download.id);
    }
  };
</script>

<template>
  <NFlex vertical>
    <NTooltip :show-arrow="false">
      <template #trigger>
        <NText
          class="filename"
          :style="deletedStyle(download, colors)"
          :type="downloadStyle(download, colors).type"
          :onclick="handleOpenFile"
          v-html="html"
        />
      </template>
      <template v-if="state.dangerous(download)" #default>
        {{ `${t("danger_" + download.danger)}` }}
      </template>
      <template v-else-if="state.ongoing(download)" #default>
        {{ download.filename }}
      </template>
      <template v-else-if="state.completed(download)" #default>
        {{ t(`download_open`) }}
      </template>
      <template v-else #default>
        {{ t(`error_${download.error}`) }}
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
