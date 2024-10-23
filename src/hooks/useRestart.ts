import { i18n } from "#i18n";
import { useModal } from "naive-ui";
import { browser } from "wxt/browser";

export const useRestart = () => {
  const modal = useModal();
  return () =>
    modal.create({
      preset: "dialog",
      type: "info",
      title: i18n.t("common.info"),
      content: i18n.t("common.restart"),
      positiveText: i18n.t("common.confirm"),
      onPositiveClick: browser.runtime.reload,
      closable: false,
      maskClosable: false,
      closeOnEsc: false
    });
};
