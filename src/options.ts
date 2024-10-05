import { registerCustomDirective } from "@/directives/index";
import Options from "@/pages/options/index.vue";
import { t } from "@/utils/i18n";
import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/appearance",
      component: () => import("@/pages/options/components/settings/Appearance.vue"),
      meta: { name: t("options_appearance_menu"), icon: "mdi:paint-outline" }
    },
    {
      path: "/interactions",
      component: () => import("@/pages/options/components/settings/Interactions.vue"),
      meta: { name: t("options_interactions_menu"), icon: "mdi:interaction-tap" }
    },
    {
      path: "/notifications",
      component: () => import("@/pages/options/components/settings/Notifications.vue"),
      meta: { name: t("options_notifications_menu"), icon: "mdi:notification-settings-outline" }
    },
    {
      path: "/sync",
      component: () => import("@/pages/options/components/settings/Sync.vue"),
      meta: { name: t("options_sync_menu"), icon: "mdi:cloud-sync-outline" }
    },
    {
      path: "/misc",
      component: () => import("@/pages/options/components/settings/Misc.vue"),
      meta: { name: t("options_misc_menu"), icon: "mdi:toolbox-outline" }
    },
    {
      path: "/about",
      component: () => import("@/pages/options/components/settings/About.vue"),
      meta: { name: t("options_about_menu"), icon: "mdi:about-circle-outline" }
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
