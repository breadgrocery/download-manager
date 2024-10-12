<script setup lang="ts">
  import { t } from "@/utils/i18n";
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
    message.success(t(`options_sync_reset_completed`));
  };
</script>

<template>
  <SettingWrapper>
    <SettingItem :title="t(`options_sync_menu`)" :icon="MdiWebSync">
      <SettingDetail
        :title="t(`options_sync_enabled_title`)"
        :icon="MdiMonitorAccount"
        :description="t(`options_sync_enabled_description`)"
      >
        <NSwitch
          :default-value="settings.sync.enabled"
          :on-update:value="value => (settings.sync.enabled = value)"
        />
      </SettingDetail>
      <SettingDetail
        :title="t(`options_sync_reset_title`)"
        :icon="MdiRestore"
        :description="t(`options_sync_reset_description`)"
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
