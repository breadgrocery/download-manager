<script setup lang="ts">
  import { useModal } from "naive-ui";
  import { useMessage } from "naive-ui";
  import pQueue from "p-queue";
  import pRetry from "p-retry";
  import pTimeout from "p-timeout";
  import { browser } from "wxt/browser";
  import MdiDeleteForever from "~icons/mdi/delete-forever";
  import MdiFileCheckOutline from "~icons/mdi/file-check-outline";
  import MdiFileHidden from "~icons/mdi/file-hidden";
  import MdiFileOutline from "~icons/mdi/file-outline";
  import MdiFileRemoveOutline from "~icons/mdi/file-remove-outline";
  import MdiFolderArrowDownOutline from "~icons/mdi/folder-arrow-down-outline";
  import MdiLinkVariantPlus from "~icons/mdi/link-variant-plus";
  import MdiSettingsOutline from "~icons/mdi/settings-outline";
  import DeleteDownload from "./DeleteDownload.vue";
  import NewDownload from "./NewDownload.vue";

  const emit = defineEmits<{
    delete: [string, boolean, (() => void)?];
  }>();

  const modal = useModal();
  const message = useMessage();
  const settings = useSettings();

  const deleteOptions = [
    {
      key: "all",
      label: i18n.t("toolbar.delete_downloads.all"),
      icon: MdiFileOutline
    },
    {
      key: "completed",
      label: i18n.t("toolbar.delete_downloads.completed"),
      icon: MdiFileCheckOutline
    },
    {
      key: "failed",
      label: i18n.t("toolbar.delete_downloads.failed"),
      icon: MdiFileRemoveOutline
    },
    {
      key: "missing",
      label: i18n.t("toolbar.delete_downloads.missing"),
      icon: MdiFileHidden
    }
  ] as const;

  const handleCreateNewDownload = () => {
    const handleConfirm = (links: string[], loading: (value: boolean) => void) => {
      if (links.length === 0) {
        handle.destroy();
        message.warning(i18n.t("toolbar.create_downloads.failed"));
        return;
      }
      // Remove duplicate links
      const urls = Array.from(new Set(links));
      // Create download tasks with timeout handling
      const { timeout, retries, conflict } = settings.value.features.download;
      const limit = conflict !== "uniquify" ? 1 : Number.POSITIVE_INFINITY;
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
            message.warning(i18n.t("toolbar.create_downloads.timeout", [`${failures}`]));
          } else {
            message.success(i18n.t("toolbar.create_downloads.completed", [`${urls.length}`]));
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
      queue.addAll(urls.map(link => () => createTask(link)));
    };
    const handle = modal.create({
      preset: "card",
      style: { width: "auto" },
      title: i18n.t("toolbar.create_downloads.tooltip"),
      content: () => h(NewDownload, { onConfirm: handleConfirm })
    });
  };

  const handleDeleteSelect = (key: string) => {
    const deleteDownload = (disk: boolean, close?: () => void) => emit("delete", key, disk, close);
    if (key !== "missing") {
      const handle = modal.create({
        preset: "card",
        style: { width: "auto" },
        title: deleteOptions.find(option => option.key === key)?.label,
        content: () =>
          h(DeleteDownload, {
            type: key,
            onConfirm: (disk: boolean) => deleteDownload(disk, () => handle.destroy())
          })
      });
    } else {
      deleteDownload(false);
    }
  };

  const handleOpenDownloadFolder = () => browser.downloads.showDefaultFolder();
  const handleExtensionSettings = () => browser.tabs.create({ url: "/options.html" });
</script>

<template>
  <NFlex justify="end" :wrap="false">
    <IconButton
      :icon="MdiLinkVariantPlus"
      :tooltip="i18n.t(`toolbar.create_downloads.tooltip`)"
      @click="handleCreateNewDownload"
    />
    <DropdownIcon :icon="MdiDeleteForever" :options="deleteOptions" @select="handleDeleteSelect" />
    <IconButton
      :icon="MdiFolderArrowDownOutline"
      :tooltip="i18n.t(`toolbar.open_download_folder`)"
      @click="handleOpenDownloadFolder"
    />
    <IconButton
      :icon="MdiSettingsOutline"
      :tooltip="i18n.t(`toolbar.extension_settings`)"
      @click="handleExtensionSettings"
    />
  </NFlex>
</template>
