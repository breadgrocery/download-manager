<script setup lang="ts">
  import { DropdownIconOption } from "@/components/DropdownIcon.vue";
  import { t } from "@/utils/i18n";
  import { useModal } from "naive-ui";
  import { useMessage } from "naive-ui";
  import pQueue from "p-queue";
  import pRetry from "p-retry";
  import pTimeout from "p-timeout";
  import browser from "webextension-polyfill";
  import DeleteDownload from "./DeleteDownload.vue";
  import NewDownload from "./NewDownload.vue";

  const emit = defineEmits<{
    delete: [string, boolean, (() => void)?];
  }>();

  const modal = useModal();
  const message = useMessage();
  const settings = useSettings();

  const cleanOptions: DropdownIconOption[] = [
    { key: "all", label: "toolbar_delete_downloads_all", icon: "mdi:file-outline" },
    { key: "failed", label: "toolbar_delete_downloads_failed", icon: "mdi:file-refresh-outline" },
    { key: "missing", label: "toolbar_delete_downloads_missing", icon: "mdi:file-remove-outline" }
  ];

  const handleCreateNewDownload = () => {
    const handleConfirm = (links: string[], loading: (value: boolean) => void) => {
      if (links.length === 0) {
        handle.destroy();
        message.warning(t(`toolbar_create_downloads_failed`));
        return;
      }
      // Remove duplicate links
      links = Array.from(new Set(links));
      // Create download tasks with timeout handling
      const { timeout, retries, conflict } = settings.value.interactions.download;
      const limit = conflict !== "uniquify" ? 1 : Infinity;
      const queue = new pQueue({
        concurrency: limit,
        intervalCap: limit,
        interval: 1000 // Prevent conflict prompt when creating downloads too frequently
      });
      let failures = 0;
      loading(true);
      queue
        .onIdle()
        .catch(() => failures++)
        .finally(() => {
          loading(false);
          handle.destroy();
          if (failures > 0) {
            message.warning(t(`toolbar_create_downloads_timeout`, [`${failures}`]));
          } else {
            message.success(t(`toolbar_create_downloads_completed`, [`${links.length}`]));
          }
        });
      const createTask = (link: string) => {
        return pRetry(
          () =>
            pTimeout(browser.downloads.download({ url: link, conflictAction: conflict }), {
              milliseconds: timeout * 1000
            }),
          { retries }
        );
      };
      queue.addAll(links.map(link => () => createTask(link)));
    };
    const handle = modal.create({
      preset: "card",
      style: { width: "auto" },
      title: t(`toolbar_create_downloads_tooltip`),
      content: () => h(NewDownload, { onConfirm: handleConfirm })
    });
  };

  const handleDeleteSelect = (key: string) => {
    const deleteDownload = (disk: boolean, close?: () => void) => emit("delete", key, disk, close);
    if (key === "missing") {
      deleteDownload(false);
    } else {
      const handle = modal.create({
        preset: "card",
        style: { width: "auto" },
        title: t(`${cleanOptions.find(option => option.key === key)?.label || ""}`),
        content: () =>
          h(DeleteDownload, {
            type: key,
            onConfirm: (disk: boolean) => deleteDownload(disk, () => handle.destroy())
          })
      });
    }
  };

  const handleOpenDownloadFolder = () => browser.downloads.showDefaultFolder();
  const handleExtensionSettings = () => browser.tabs.create({ url: "src/options.html" });
</script>

<template>
  <NFlex justify="end" :wrap="false">
    <IconButton
      icon="mdi:link-variant-plus"
      :tooltip="t(`toolbar_create_downloads_tooltip`)"
      width="20"
      @click="handleCreateNewDownload"
    />
    <DropdownIcon
      icon="mdi:delete-forever"
      :width="20"
      :options="cleanOptions"
      @select="handleDeleteSelect"
    />
    <IconButton
      icon="mdi:folder-arrow-down-outline"
      :tooltip="t(`toolbar_open_download_folder`)"
      width="20"
      @click="handleOpenDownloadFolder"
    />
    <IconButton
      icon="mdi:settings-outline"
      :tooltip="t(`toolbar_extension_settings`)"
      width="20"
      @click="handleExtensionSettings"
    />
  </NFlex>
</template>
