import { registerCustomDirective } from "@/directives/index";
import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import MdiAboutCircleOutline from "~icons/mdi/about-circle-outline";
import MdiBoxVariant from "~icons/mdi/box-variant";
import MdiCloudSyncOutline from "~icons/mdi/cloud-sync-outline";
import MdiNotificationSettingsOutline from "~icons/mdi/notification-settings-outline";
import MdiPaintOutline from "~icons/mdi/paint-outline";
import MdiPuzzleOutline from "~icons/mdi/puzzle-outline";
import Options from "./App.vue";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/appearance",
      component: () => import("@/pages/options/components/settings/Appearance.vue"),
      meta: { name: i18n.t("options.appearance.menu"), icon: MdiPaintOutline }
    },
    {
      path: "/features",
      component: () => import("@/pages/options/components/settings/Features.vue"),
      meta: {
        name: i18n.t("options.features.menu"),
        icon: MdiPuzzleOutline
      }
    },
    {
      path: "/notifications",
      component: () => import("@/pages/options/components/settings/Notifications.vue"),
      meta: {
        name: i18n.t("options.notifications.menu"),
        icon: MdiNotificationSettingsOutline
      }
    },
    {
      path: "/sync",
      component: () => import("@/pages/options/components/settings/Sync.vue"),
      meta: { name: i18n.t("options.sync.menu"), icon: MdiCloudSyncOutline }
    },
    {
      path: "/misc",
      component: () => import("@/pages/options/components/settings/Misc.vue"),
      meta: { name: i18n.t("options.misc.menu"), icon: MdiBoxVariant }
    },
    {
      path: "/about",
      component: () => import("@/pages/options/components/settings/About.vue"),
      meta: { name: i18n.t("options.about.menu"), icon: MdiAboutCircleOutline }
    },
    { path: "", redirect: "/appearance" }
  ]
});

const app = createApp(Options);

// Register router
app.use(router);

// Register custom directives
registerCustomDirective(app);

app.mount("#app");
