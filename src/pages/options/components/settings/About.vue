<script setup lang="ts">
  import { constants } from "@/utils/constants";
  import { t } from "@/utils/i18n";
  import Bowser from "bowser";
  import browser from "webextension-polyfill";
  import MdiGithub from "~icons/mdi/github";
  import MdiGoogleChrome from "~icons/mdi/google-chrome";
  import MdiLike from "~icons/mdi/like";
  import MdiMicrosoftEdge from "~icons/mdi/microsoft-edge";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const manifest = browser.runtime.getManifest();
  const agent = Bowser.getParser(window.navigator.userAgent);

  const openUrl = (url: string) => browser.tabs.create({ url });
</script>

<template>
  <SettingWrapper>
    <NFlex class="info" vertical>
      <NAvatar class="logo" src="/images/icon-256.png" color="transparent" :size="128" />
      <NText>{{ t(`extension_name`) }} </NText>
      <NText>
        {{ `${t(`options_about_version`)} ${manifest.version}` }}
      </NText>
      <NText>{{ t(`extension_description`) }} </NText>
    </NFlex>
    <SettingItem :title="t(`options_about_rate_title`)" :icon="MdiLike">
      <SettingDetail :title="t(`options_about_rate_github`)" :icon="MdiGithub">
        <NButton secondary @click="openUrl(constants.about.github)">
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="agent.satisfies({ chrome: `>=71` })"
        :title="t(`options_about_rate_chrome`)"
        :icon="MdiGoogleChrome"
      >
        <NButton secondary @click="openUrl(constants.about.chrome)">
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="agent.satisfies({ edge: `>=79` })"
        :title="t(`options_about_rate_edge`)"
        :icon="MdiMicrosoftEdge"
      >
        <NButton secondary @click="openUrl(constants.about.edge)">
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>

<style scoped lang="scss">
  .info {
    align-self: center;
    text-align: center;
    .logo {
      align-self: center;
    }
  }
</style>
