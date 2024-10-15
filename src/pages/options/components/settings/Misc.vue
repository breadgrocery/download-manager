<script setup lang="ts">
  import { clearCache } from "@/utils/cache";
  import { env } from "@/utils/env";
  import { useMessage } from "naive-ui";
  import { browser } from "wxt/browser";
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

  const preferences = (path: string) => {
    const protocol = (() => {
      const browserName = env.browser.getBrowserName(true);
      switch (browserName) {
        case "microsoft edge":
          return "edge://";
        case "firefox":
          throw new Error("Not supported");
        default:
          return `${browserName}://`;
      }
    })();
    browser.tabs.create({ url: `${protocol}${path}` });
  };

  const handleClearCache = () => {
    clearCache();
    message.success(i18n.t("options.misc.storage.cache.completed"));
  };
</script>

<template>
  <SettingWrapper>
    <SettingItem
      v-if="env.is.chrome || env.is.edge"
      :title="i18n.t(`options.misc.browser.title`)"
      :icon="MdiWebAsset"
    >
      <SettingDetail
        v-if="env.browser.satisfies({ chrome: `>=77`, edge: `>=79` })"
        :title="i18n.t(`options.misc.browser.download.title`)"
        :icon="MdiSettingsOutline"
        :description="i18n.t(`options.misc.browser.download.description`)"
      >
        <NButton
          secondary
          @click="preferences(`settings/downloads`)"
        >
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="env.browser.satisfies({ chrome: `>=64`, edge: `>=80` })"
        :title="i18n.t(`options.misc.browser.parallel.title`)"
        :icon="MdiParallel"
        :description="i18n.t(`options.misc.browser.parallel.description`)"
      >
        <NButton
          secondary
          @click="preferences(`flags/#enable-parallel-downloading`)"
        >
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="env.browser.satisfies({ edge: `>=113` })"
        :title="i18n.t(`options.misc.browser.toolbar.title`)"
        :icon="MdiHide"
        :description="i18n.t(`options.misc.browser.toolbar.description`)"
      >
        <NButton
          secondary
          @click="preferences(`settings/appearance`)"
        >
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
      <SettingDetail
        v-if="env.browser.satisfies({ edge: `>=79` })"
        :title="i18n.t(`options.misc.browser.smartscreen.title`)"
        :icon="MdiShieldHalfFull"
        :description="i18n.t(`options.misc.browser.smartscreen.description`)"
      >
        <NButton
          secondary
          @click="preferences(`settings/?search=Smartscreen`)"
        >
          <template #icon>
            <NIcon> <IconMdiExternalLink /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
    </SettingItem>

    <SettingItem
      :title="i18n.t(`options.misc.storage.title`)"
      :icon="MdiStorage"
    >
      <SettingDetail
        :title="i18n.t(`options.misc.storage.cache.title`)"
        :icon="MdiDatabaseRefreshOutline"
        :description="i18n.t(`options.misc.storage.cache.description`)"
      >
        <NButton
          secondary
          @click="handleClearCache"
        >
          <template #icon>
            <NIcon> <IconMdiRefresh /> </NIcon>
          </template>
        </NButton>
      </SettingDetail>
    </SettingItem>
  </SettingWrapper>
</template>
