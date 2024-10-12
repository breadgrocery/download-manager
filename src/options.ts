import { registerCustomDirective } from "@/directives/index";
import Options from "@/pages/options/index.vue";
import { t } from "@/utils/i18n";
import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import MdiAboutCircleOutline from "~icons/mdi/about-circle-outline";
import MdiCloudSyncOutline from "~icons/mdi/cloud-sync-outline";
import MdiFeatureHighlight from "~icons/mdi/feature-highlight";
import MdiNotificationSettingsOutline from "~icons/mdi/notification-settings-outline";
import MdiPaintOutline from "~icons/mdi/paint-outline";
import MdiToolboxOutline from "~icons/mdi/toolbox-outline";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/appearance",
      component: () => import("@/pages/options/components/settings/Appearance.vue"),
      meta: { name: t("options_appearance_menu"), icon: MdiPaintOutline }
    },
    {
      path: "/features",
      component: () => import("@/pages/options/components/settings/Features.vue"),
      meta: { name: t("options_features_menu"), icon: MdiFeatureHighlight }
    },
    {
      path: "/notifications",
      component: () => import("@/pages/options/components/settings/Notifications.vue"),
      meta: { name: t("options_notifications_menu"), icon: MdiNotificationSettingsOutline }
    },
    {
      path: "/sync",
      component: () => import("@/pages/options/components/settings/Sync.vue"),
      meta: { name: t("options_sync_menu"), icon: MdiCloudSyncOutline }
    },
    {
      path: "/misc",
      component: () => import("@/pages/options/components/settings/Misc.vue"),
      meta: { name: t("options_misc_menu"), icon: MdiToolboxOutline }
    },
    {
      path: "/about",
      component: () => import("@/pages/options/components/settings/About.vue"),
      meta: { name: t("options_about_menu"), icon: MdiAboutCircleOutline }
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
