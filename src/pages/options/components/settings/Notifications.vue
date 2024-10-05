<script setup lang="ts">
  import { t } from "@/utils/i18n";
  import { audio } from "@/utils/notifications";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const settings = useSettings();

  const popups = computed(() => {
    return Object.keys(settings.value.notifications).map(key => {
      const state = key as keyof typeof settings.value.notifications;
      return {
        title: t(`options_notifications_state_${state}`),
        proxy: settings.value.notifications[state]
      };
    });
  });

  const sounds = computed(() => {
    return Object.keys(settings.value.notifications).map(key => {
      const state = key as keyof typeof settings.value.notifications;
      return {
        title: t(`options_notifications_state_${state}`),
        proxy: settings.value.notifications[state],
        audio: () => audio[state as keyof typeof audio]()
      };
    });
  });
</script>

<template>
  <SettingWrapper>
    <SettingItem :title="t(`options_notifications_popup`)" icon="mdi:app-badge-outline">
      <SettingDetail v-for="(popup, index) in popups" :key="index" :title="popup.title">
        <NSwitch
          :default-value="popup.proxy.popup"
          :on-update:value="value => (popup.proxy.popup = value)"
        />
      </SettingDetail>
    </SettingItem>

    <SettingItem :title="t(`options_notifications_sound`)" icon="mdi:bell-notification-outline">
      <SettingDetail v-for="(sound, index) in sounds" :key="index" :title="sound.title">
        <IconButton icon="mdi:volume-high" @click="sound.audio" />
        <NSwitch
          :default-value="sound.proxy.sound"
          :on-update:value="value => (sound.proxy.sound = value)"
        />
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>
