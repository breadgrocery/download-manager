<script setup lang="ts">
  import { env } from "@/utils/env";
  import { audio } from "@/utils/notifications";
  import MdiAppBadgeOutline from "~icons/mdi/app-badge-outline";
  import MdiBellNotificationOutline from "~icons/mdi/bell-notification-outline";
  import MdiMessageBadgeOutline from "~icons/mdi/message-badge-outline";
  import MdiVolumeHigh from "~icons/mdi/volume-high";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const settings = useSettings();

  const sounds = computed(() => {
    return Object.keys(settings.value.notifications.download).map(key => {
      const state = key as keyof typeof settings.value.notifications.download;
      return {
        title: i18n.t(`options.notifications.download.state.${state}`),
        proxy: settings.value.notifications.download[state],
        audio: () => audio[state as keyof typeof audio]()
      };
    });
  });

  const popups = computed(() => {
    return Object.keys(settings.value.notifications.download).map(key => {
      const state = key as keyof typeof settings.value.notifications.download;
      return {
        title: i18n.t(`options.notifications.download.state.${state}`),
        proxy: settings.value.notifications.download[state]
      };
    });
  });

  const messages = computed(() => {
    return Object.keys(settings.value.notifications.messages).map(key => {
      const type = key as keyof typeof settings.value.notifications.messages;
      return {
        title: i18n.t(`options.notifications.messages.${type}`),
        proxy: settings.value.notifications.messages,
        type
      };
    });
  });
</script>

<template>
  <SettingWrapper>
    <SettingItem
      :title="i18n.t(`options.notifications.download.sound`)"
      :icon="MdiBellNotificationOutline"
    >
      <SettingDetail v-for="(sound, index) in sounds" :key="index" :title="sound.title">
        <IconButton :icon="MdiVolumeHigh" @click="sound.audio" />
        <NSwitch
          :value="sound.proxy.sound"
          :on-update:value="value => (sound.proxy.sound = value)"
        />
      </SettingDetail>
    </SettingItem>

    <SettingItem
      v-if="!env.is.firefox"
      :title="i18n.t(`options.notifications.download.popup`)"
      :icon="MdiAppBadgeOutline"
    >
      <SettingDetail v-for="(popup, index) in popups" :key="index" :title="popup.title">
        <NSwitch
          :value="popup.proxy.popup"
          :on-update:value="value => (popup.proxy.popup = value)"
        />
      </SettingDetail>
    </SettingItem>

    <SettingItem
      :title="i18n.t(`options.notifications.messages.title`)"
      :icon="MdiMessageBadgeOutline"
    >
      <SettingDetail v-for="(message, index) in messages" :key="index" :title="message.title">
        <NSwitch
          :value="message.proxy[message.type]"
          :on-update:value="value => (message.proxy[message.type] = value)"
        />
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>
