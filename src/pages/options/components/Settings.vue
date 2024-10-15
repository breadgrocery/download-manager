<script setup lang="ts">
  import { RouterLink, RouterView } from "vue-router";
  import MdiMenu from "~icons/mdi/menu";

  const routes = useRouter().getRoutes();

  const collapsed = ref(false);
  const titleClass = computed(() => ({
    title: true,
    collapsed: collapsed.value
  }));

  const menuOptions = routes
    .filter(route => route.path)
    .map(route => ({
      label: () => h(RouterLink, { to: route.path }, { default: () => route.meta.name }),
      key: route.path,
      icon: () => h(route.meta.icon || MdiMenu)
    }));
</script>

<template>
  <NFlex class="options-settings-wrapper">
    <NLayout has-sider>
      <NLayoutSider
        v-model:collapsed="collapsed"
        collapse-mode="width"
        :collapsed-width="49"
        :width="300"
        bordered
        show-trigger
      >
        <NFlex
          class="header"
          justify="center"
        >
          <NAvatar
            class="logo"
            src="/images/icon.svg"
            color="transparent"
          />
          <NH3 :class="titleClass">
            {{ i18n.t(`extension.name`) }}
          </NH3>
        </NFlex>
        <NMenu
          :options="menuOptions"
          :default-value="menuOptions[0].key"
        />
      </NLayoutSider>
      <NLayout>
        <RouterView />
      </NLayout>
    </NLayout>
  </NFlex>
</template>

<style scoped lang="scss">
  .options-settings-wrapper {
    height: 100%;
    .header {
      .logo {
        width: 32px;
        height: 32px;
        align-self: center;
        position: relative;
        top: 4px;
        margin-bottom: 4px;
      }
      .title {
        display: flex;
        align-self: center;
        &.collapsed {
          display: none;
        }
      }
    }
  }
</style>
