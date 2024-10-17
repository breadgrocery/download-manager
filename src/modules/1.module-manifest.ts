import process from "node:process";
import { defineWxtModule } from "wxt/modules";

const permissions = {
  common: ["downloads", "downloads.open", "storage"],
  chrome: ["background", "downloads.shelf", "downloads.ui", "offscreen"],
  firefox: []
};

export default defineWxtModule(wxt => {
  const { browser } = wxt.config;
  wxt.config.manifest = {
    name: "__MSG_extension_name__",
    description: "__MSG_extension_description__",
    default_locale: "en",
    version: process.env.npm_package_version,
    permissions: [...permissions.common, ...permissions[browser]].filter(Boolean),
    ...(browser === "firefox" && {
      browser_specific_settings: {
        gecko: { id: "download-manager@breadgrocery.github.com" }
      }
    }),
    ...wxt.config.manifest
  };
});
