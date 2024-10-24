import module from "@wxt-dev/i18n/module";
import { resolve } from "node:path";
import { defineWxtModule } from "wxt/modules";

export default defineWxtModule({
  ...module,
  setup: (wxt, options) => {
    module.setup?.(wxt, {
      localesDir: resolve("locales"),
      ...options
    });
  }
});
