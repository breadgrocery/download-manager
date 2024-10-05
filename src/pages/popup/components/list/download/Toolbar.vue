<script setup lang="ts">
  import { DropdownIconOption } from "@/components/DropdownIcon.vue";
  import { deleteDownload } from "@/utils/download";
  import { t } from "@/utils/i18n";
  import { state } from "@/utils/state";
  import copy from "copy-to-clipboard";
  import { useMessage } from "naive-ui";
  import { useModal } from "naive-ui";
  import browser from "webextension-polyfill";
  import QRCode from "./QRCode.vue";

  interface Props {
    download: browser.Downloads.DownloadItem;
  }
  const { download } = defineProps<Props>();
  const message = useMessage();
  const modal = useModal();

  // Link select
  const linkOptions: DropdownIconOption[] = [
    { key: "link", label: "download_link_copy", icon: "mdi:link" },
    { key: "qrcode", label: "download_link_qrcode", icon: "mdi:qrcode" }
  ];
  const handleLinkSelect = (key: string) => {
    switch (key) {
      case "link":
        copyToClipboard();
        break;
      case "qrcode":
        createQRCode();
        break;
    }
  };
  const copyToClipboard = () => {
    copy(download.url, { format: "text/plain" });
    message.success(t(`download_link_copied`));
  };
  const createQRCode = () => {
    if (download.url.length <= 57 * 57) {
      modal.create({
        preset: "card",
        style: { width: "auto" },
        title: t(`download_link_scan_qr_code`),
        content: () => h(QRCode, { value: download.url })
      });
    } else {
      message.error(t(`download_link_data_too_long`));
    }
  };

  // Show in folder
  const handleShowInFolder = () => browser.downloads.show(download.id);

  // Delete select
  const deleteOptions = [
    { key: "history", label: "download_delete_history", icon: "mdi:history" },
    { key: "disk", label: "download_delete_disk", icon: "mdi:harddisk" }
  ];
  const handleDeleteSelect = (key: string) => {
    switch (key) {
      case "history":
        deleteFromHistory();
        break;
      case "disk":
        deleteFromDisk();
        break;
    }
  };
  const deleteFromHistory = () => {
    deleteDownload(download, false).finally(() => {
      message.success(t(`download_delete_completed`));
    });
  };
  const deleteFromDisk = () => {
    deleteDownload(download, true).finally(() => {
      message.success(t(`download_delete_completed`));
    });
  };
  const handleRetry = () => {
    if (state.deleted(download)) {
      browser.downloads.download({ url: download.url }).then(() => {
        deleteDownload(download, false);
      });
    } else if (download.canResume) {
      handleResume();
    } else {
      browser.downloads.download({ url: download.url }).then(() => {
        deleteDownload(download, true);
      });
    }
  };
  const handlePause = () => browser.downloads.pause(download.id);
  const handleResume = () => browser.downloads.resume(download.id);
  const handleAcceptDanger = (aaa: browser.Downloads.DownloadItem) => {
    chrome && chrome.downloads.acceptDanger(aaa.id);
  };
  const handleCancel = () => browser.downloads.cancel(download.id);
</script>

<template>
  <NFlex justify="end">
    <!-- Link select -->
    <DropdownIcon
      icon="mdi:link-variant"
      width="18"
      :options="linkOptions"
      @select="handleLinkSelect"
    />

    <!-- Show in folder -->
    <IconButton
      v-if="state.completed(download) && !state.deleted(download)"
      icon="mdi:folder-outline"
      :tooltip="t(`download_show`)"
      @click="handleShowInFolder"
    />

    <!-- Operations -->
    <NFlex v-if="!state.dangerous(download)" v-assert-children>
      <IconButton
        v-if="state.interrupted(download) || state.deleted(download)"
        icon="mdi:replay"
        :tooltip="t(`download_retry`)"
        @click="handleRetry"
      />
      <IconButton
        v-if="state.downloading(download)"
        icon="mdi:pause"
        :tooltip="t(`download_pause`)"
        @click="handlePause"
      />
      <IconButton
        v-if="state.paused(download)"
        icon="mdi:play"
        :tooltip="t(`download_resume`)"
        @click="handleResume"
      />
      <IconButton
        v-if="state.ongoing(download)"
        icon="mdi:remove"
        :tooltip="t(`download_cancel`)"
        @click="handleCancel"
      />
    </NFlex>

    <!-- Dangerous file operations -->
    <NFlex v-if="state.dangerous(download)" v-assert-children>
      <IconButton
        v-if="state.ongoing(download)"
        icon="mdi:file-restore-outline"
        :tooltip="t(`download_dangerous_keep`)"
        @click="handleAcceptDanger(download)"
      />
      <IconButton
        v-if="state.ongoing(download)"
        icon="mdi:delete"
        :tooltip="t(`download_dangerous_remove`)"
        @click="deleteFromDisk"
      />
    </NFlex>

    <!-- Delete select -->
    <DropdownIcon
      v-if="state.completed(download) || state.interrupted(download) || state.expired(download)"
      icon="mdi:garbage"
      width="18"
      :options="deleteOptions"
      @select="handleDeleteSelect"
    />
  </NFlex>
</template>
