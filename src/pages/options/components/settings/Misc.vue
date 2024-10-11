<script setup lang="ts">
  import { clearCache } from "@/utils/cache";
  import { t } from "@/utils/i18n";
  import Bowser from "bowser";
  import { useMessage } from "naive-ui";
  import browser from "webextension-polyfill";
  import MdiDatabaseRefreshOutline from "~icons/mdi/database-refresh-outline";
  import MdiHide from "~icons/mdi/hide";
  import MdiParallel from "~icons/mdi/parallel";
  import MdiSettingsOutline from "~icons/mdi/settings-outline";
  import MdiShieldHalfFull from "~icons/mdi/shield-half-full";
  import MdiStorage from "~icons/mdi/storage";
  import MdiWebAsset from "~icons/mdi/web-asset";
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
    <SettingItem :title="t(`options_misc_browser_title`)" :icon="MdiWebAsset">
      <SettingDetail
        :title="t(`options_misc_browser_download_title`)"
        :icon="MdiSettingsOutline"
        :description="t(`options_misc_browser_download_description`)"
      >
        <NButton secondary @click="localResource(`settings/downloads`)">
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="agent.satisfies({ chrome: `>=64`, edge: `>=80` })"
        :title="t(`options_misc_browser_parallel_title`)"
        :icon="MdiParallel"
        :description="t(`options_misc_browser_parallel_description`)"
      >
        <NButton secondary @click="localResource(`flags/#enable-parallel-downloading`)">
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="agent.satisfies({ edge: `>=113` })"
        :title="t(`options_misc_browser_toolbar_title`)"
        :icon="MdiHide"
        :description="t(`options_misc_browser_toolbar_description`)"
      >
        <NButton secondary @click="localResource(`settings/appearance`)">
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="agent.satisfies({ edge: `>=79` })"
        :title="t(`options_misc_browser_smartscreen_title`)"
        :icon="MdiShieldHalfFull"
        :description="t(`options_misc_browser_smartscreen_description`)"
      >
        <NButton secondary @click="localResource(`settings/?search=Smartscreen`)">
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
    </SettingItem>

    <SettingItem :title="t(`options_misc_storage_title`)" :icon="MdiStorage">
      <SettingDetail
        :title="t(`options_misc_storage_cache_title`)"
        :icon="MdiDatabaseRefreshOutline"
        :description="t(`options_misc_storage_cache_description`)"
      >
        <NButton secondary @click="handleClearCache">
          <template #icon>
            <NIcon> <IconMdiRefresh /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>
