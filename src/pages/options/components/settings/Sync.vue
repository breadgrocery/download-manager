<script setup lang="ts">
  import { t } from "@/utils/i18n";
  import { reset } from "@/utils/settings";
  import { useMessage } from "naive-ui";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const settings = useSettings();
  const message = useMessage();

  const updateEnabled = (value: boolean) => {
    settings.value.sync.enabled = value;
  };
  const resetSetting = () => {
    reset();
    message.success(t(`options_sync_reset_completed`));
  };
</script>

<template>
  <SettingWrapper>
    <SettingItem :title="t(`options_sync_menu`)" icon="mdi:web-sync">
      <SettingDetail
        :title="t(`options_sync_enabled_title`)"
        icon="mdi:monitor-account"
        :description="t(`options_sync_enabled_description`)"
      >
        <NSwitch :default-value="settings.sync.enabled" :on-update:value="updateEnabled" />
      </SettingDetail>
      <SettingDetail
        :title="t(`options_sync_reset_title`)"
        icon="mdi:restore"
        :description="t(`options_sync_reset_description`)"
      >
        <NButton type="error" @click="resetSetting">
          <template #icon><Icon icon="mdi:restore" /></template>
        </NButton>
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>
