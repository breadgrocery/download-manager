<script setup lang="ts">
  import { reset } from "@/utils/settings";
  import { useMessage } from "naive-ui";
  import MdiMonitorAccount from "~icons/mdi/monitor-account";
  import MdiRestore from "~icons/mdi/restore";
  import MdiWebSync from "~icons/mdi/web-sync";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const settings = useSettings();
  const message = useMessage();

  const resetSetting = () => {
    reset();
    message.success(i18n.t("options.sync.reset.completed"));
  };
</script>

<template>
  <SettingWrapper>
    <SettingItem :title="i18n.t(`options.sync.menu`)" :icon="MdiWebSync">
      <SettingDetail
        :title="i18n.t(`options.sync.enabled.title`)"
        :icon="MdiMonitorAccount"
        :description="i18n.t(`options.sync.enabled.description`)"
      >
        <NSwitch
          :default-value="settings.sync.enabled"
          :on-update:value="value => (settings.sync.enabled = value)"
        />
      </SettingDetail>
      <SettingDetail
        :title="i18n.t(`options.sync.reset.title`)"
        :icon="MdiRestore"
        :description="i18n.t(`options.sync.reset.description`)"
      >
        <NButton type="error" @click="resetSetting">
          <template #icon>
            <NIcon> <IconMdiRestore /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>
