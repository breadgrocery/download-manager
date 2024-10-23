import process from "node:process";
import { defineWxtModule } from "wxt/modules";

const permissions = {
  common: ["downloads", "downloads.open", "storage"],
  chrome: ["background", "downloads.shelf", "downloads.ui", "offscreen"],
  firefox: []
};

export default defineWxtModule(wxt => {
  const {
    config: { browser },
    reloadConfig
  } = wxt;
  const configure = () => {
    wxt.reloadConfig = () => reloadConfig().then(configure);
    wxt.config.manifest = {
      "name": "__MSG_extension_name__",
      "description": "__MSG_extension_description__",
      "default_locale": "en",
      "version": process.env.npm_package_version,
      "permissions": [
        ...permissions.common,
        ...permissions[browser as keyof typeof permissions]
      ].filter(Boolean),
      ...(browser === "chrome" && {
        "minimum_chrome_version": "88"
      }),
      ...(browser === "firefox" && {
        "browser_specific_settings": {
          "gecko": {
            "id": "download-manager@breadgrocery.github.com",
            "strict_min_version": "112.0"
          }
        }
      }),
      ...wxt.config.manifest
    };
  };
  configure();
});
