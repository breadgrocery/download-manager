<script setup lang="ts">
  import { constants } from "@/utils/constants";
  import { env } from "@/utils/env";
  import { browser } from "wxt/browser";
  import MdiFirefox from "~icons/mdi/firefox";
  import MdiGithub from "~icons/mdi/github";
  import MdiGoogleChrome from "~icons/mdi/google-chrome";
  import MdiLike from "~icons/mdi/like";
  import MdiMicrosoftEdge from "~icons/mdi/microsoft-edge";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const manifest = browser.runtime.getManifest();

  const openUrl = (url: string) => browser.tabs.create({ url });
</script>

<template>
  <SettingWrapper>
    <NFlex class="info" vertical>
      <NAvatar class="logo" src="/images/icon.svg" color="transparent" :size="128" />
      <NText>{{ i18n.t(`extension.name`) }} </NText>
      <NText>
        {{ `${i18n.t(`options.about.version`)} ${manifest.version}` }}
      </NText>
      <NText>{{ i18n.t(`extension.description`) }} </NText>
    </NFlex>
    <SettingItem :title="i18n.t(`options.about.rate.title`)" :icon="MdiLike">
      <SettingDetail
        :title="i18n.t(`options.about.rate.github`)"
        :icon="MdiGithub"
        :description="constants.about.github"
      >
        <NButton secondary @click="openUrl(constants.about.github)">
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="env.browser.satisfies({ chrome: `>=71` })"
        :title="i18n.t(`options.about.rate.chrome`)"
        :icon="MdiGoogleChrome"
        :description="constants.about.chrome"
      >
        <NButton secondary @click="openUrl(constants.about.chrome)">
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="env.browser.satisfies({ edge: `>=79` })"
        :title="i18n.t(`options.about.rate.edge`)"
        :icon="MdiMicrosoftEdge"
        :description="constants.about.edge"
      >
        <NButton secondary @click="openUrl(constants.about.edge)">
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="env.browser.satisfies({ firefox: `>=57` })"
        :title="i18n.t(`options.about.rate.firefox`)"
        :icon="MdiFirefox"
        :description="constants.about.firefox"
      >
        <NButton secondary @click="openUrl(constants.about.firefox)">
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
