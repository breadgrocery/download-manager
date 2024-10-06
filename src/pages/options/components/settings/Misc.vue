<script setup lang="ts">
  import { clearCache } from "@/utils/cache";
  import { t } from "@/utils/i18n";
  import Bowser from "bowser";
  import { useMessage } from "naive-ui";
  import browser from "webextension-polyfill";
  import SettingDetail from "../layout/SettingDetail.vue";
  import SettingItem from "../layout/SettingItem.vue";
  import SettingWrapper from "../layout/SettingList.vue";

  const message = useMessage();

  const agent = Bowser.getParser(window.navigator.userAgent);

  const localResource = (path: string) => {
    const protocol = (() => {
      const browserName = agent.getBrowserName(true);
      switch (browserName) {
        case "microsoft edge":
          return "edge://";
        default:
          return `${browserName}://`;
      }
    })();
    browser.tabs.create({ url: `${protocol}${path}` });
  };

  const handleClearCache = () => {
    clearCache();
    message.success(t(`options_misc_storage_cache_completed`));
  };
</script>

<template>
  <SettingWrapper>
    <SettingItem :title="t(`options_misc_browser_title`)" icon="mdi:web-asset">
      <SettingDetail
        :title="t(`options_misc_browser_download_title`)"
        icon="mdi:settings-outline"
        :description="t(`options_misc_browser_download_description`)"
      >
        <NButton secondary @click="localResource(`settings/downloads`)">
          <template #icon> <Icon icon="mdi:external-link" /> </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="agent.satisfies({ chrome: `>=64`, edge: `>=80` })"
        :title="t(`options_misc_browser_parallel_title`)"
        icon="mdi:parallel"
        :description="t(`options_misc_browser_parallel_description`)"
      >
        <NButton secondary @click="localResource(`flags/#enable-parallel-downloading`)">
          <template #icon><Icon icon="mdi:external-link" /> </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="agent.satisfies({ edge: `>=113` })"
        :title="t(`options_misc_browser_toolbar_title`)"
        icon="mdi:hide"
        :description="t(`options_misc_browser_toolbar_description`)"
      >
        <NButton secondary @click="localResource(`settings/appearance`)">
          <template #icon><Icon icon="mdi:external-link" /> </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="agent.satisfies({ edge: `>=79` })"
        :title="t(`options_misc_browser_smartscreen_title`)"
        icon="mdi:shield-half-full"
        :description="t(`options_misc_browser_smartscreen_description`)"
      >
        <NButton secondary @click="localResource(`settings/?search=Smartscreen`)">
          <template #icon><Icon icon="mdi:external-link" /> </template>
        </NButton>
      </SettingDetail>
    </SettingItem>

    <SettingItem :title="t(`options_misc_storage_title`)" icon="mdi:storage">
      <SettingDetail
        :title="t(`options_misc_storage_cache_title`)"
        icon="mdi:database-refresh-outline"
        :description="t(`options_misc_storage_cache_description`)"
      >
        <NButton secondary @click="handleClearCache">
          <template #icon><Icon icon="mdi:refresh" /></template>
        </NButton>
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>
