import module from "@wxt-dev/auto-icons";
import { resolve } from "node:path";
import { defineWxtModule } from "wxt/modules";

export default defineWxtModule({
  ...module,
  setup: (wxt, options) => {
    module.setup?.(wxt, {
      baseIconPath: resolve(wxt.config.publicDir, "images/icon.svg"),
      grayscaleOnDevelopment: false,
      sizes: [256, 128, 96, 48, 32, 16],
      ...options
    });
  }
});
