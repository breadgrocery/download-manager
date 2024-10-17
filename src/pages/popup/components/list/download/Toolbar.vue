<script setup lang="ts">
  import type { DropdownIconOption } from "@/components/DropdownIcon.vue";
  import { deleteDownload } from "@/utils/download";
  import { state } from "@/utils/state";
  import copy from "copy-to-clipboard";
  import { useMessage } from "naive-ui";
  import { useModal } from "naive-ui";
  import { type Downloads, browser } from "wxt/browser";
  import MdiDelete from "~icons/mdi/delete";
  import MdiFileRestoreOutline from "~icons/mdi/file-restore-outline";
  import MdiFolderOutline from "~icons/mdi/folder-outline";
  import MdiGarbage from "~icons/mdi/garbage";
  import MdiHarddisk from "~icons/mdi/harddisk";
  import MdiHistory from "~icons/mdi/history";
  import MdiLink from "~icons/mdi/link";
  import MdiLinkVariant from "~icons/mdi/link-variant";
  import MdiPause from "~icons/mdi/pause";
  import MdiPlay from "~icons/mdi/play";
  import MdiQrcode from "~icons/mdi/qrcode";
  import MdiRemove from "~icons/mdi/remove";
  import MdiReplay from "~icons/mdi/replay";
  import QRCode from "./QRCode.vue";

  interface Props {
    download: Downloads.DownloadItem;
  }
  const { download } = defineProps<Props>();
  const message = useMessage();
  const modal = useModal();

  // Link select
  const linkOptions: DropdownIconOption[] = [
    { key: "link", label: i18n.t("download.link.copy"), icon: MdiLink },
    { key: "qrcode", label: i18n.t("download.link.qrcode"), icon: MdiQrcode }
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
    message.success(i18n.t("download.link.copied"));
  };
  const createQRCode = () => {
    if (download.url.length <= 57 * 57) {
      modal.create({
        preset: "card",
        style: { width: "auto" },
        title: i18n.t("download.link.scan_qr_code"),
        content: () => h(QRCode, { value: download.url })
      });
    } else {
      message.error(i18n.t("download.link.data_too_long"));
    }
  };

  // Show in folder
  const handleShowInFolder = () => browser.downloads.show(download.id);

  // Delete select
  const deleteOptions = [
    {
      key: "history",
      label: i18n.t("download.delete.history"),
      icon: MdiHistory
    },
    { key: "disk", label: i18n.t("download.delete.disk"), icon: MdiHarddisk }
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
      message.success(i18n.t("download.delete.completed"));
    });
  };
  const deleteFromDisk = () => {
    deleteDownload(download, true).finally(() => {
      message.success(i18n.t("download.delete.completed"));
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
  const handleAcceptDanger = (download: Downloads.DownloadItem) => {
    chrome?.downloads.acceptDanger(download.id);
  };
  const handleCancel = () => browser.downloads.cancel(download.id);
</script>

<template>
  <NFlex justify="end">
    <!-- Link select -->
    <DropdownIcon :icon="MdiLinkVariant" :options="linkOptions" @select="handleLinkSelect" />

    <!-- Show in folder -->
    <IconButton
      v-if="state.completed(download) && !state.deleted(download)"
      :icon="MdiFolderOutline"
      :tooltip="i18n.t(`download.show`)"
      @click="handleShowInFolder"
    />

    <!-- Operations -->
    <NFlex v-if="!state.dangerous(download)" v-assert-children>
      <IconButton
        v-if="state.interrupted(download) || state.deleted(download)"
        :icon="MdiReplay"
        :tooltip="i18n.t(`download.retry`)"
        @click="handleRetry"
      />
      <IconButton
        v-if="state.downloading(download)"
        :icon="MdiPause"
        :tooltip="i18n.t(`download.pause`)"
        @click="handlePause"
      />
      <IconButton
        v-if="state.paused(download)"
        :icon="MdiPlay"
        :tooltip="i18n.t(`download.resume`)"
        @click="handleResume"
      />
      <IconButton
        v-if="state.ongoing(download)"
        :icon="MdiRemove"
        :tooltip="i18n.t(`download.cancel`)"
        @click="handleCancel"
      />
    </NFlex>

    <!-- Dangerous file operations -->
    <NFlex v-if="state.dangerous(download)" v-assert-children>
      <IconButton
        v-if="state.ongoing(download)"
        :icon="MdiFileRestoreOutline"
        :tooltip="i18n.t(`download.dangerous.keep`)"
        @click="handleAcceptDanger(download)"
      />
      <IconButton
        v-if="state.ongoing(download)"
        :icon="MdiDelete"
        :tooltip="i18n.t(`download.dangerous.remove`)"
        @click="deleteFromDisk"
      />
    </NFlex>

    <!-- Delete select -->
    <DropdownIcon
      v-if="state.completed(download) || state.interrupted(download) || state.expired(download)"
      :icon="MdiGarbage"
      :options="deleteOptions"
      @select="handleDeleteSelect"
    />
  </NFlex>
</template>
