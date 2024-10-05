import { resolve } from "path";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { PluginOption } from "vite";

export default (): PluginOption => {
  return Components({
    resolvers: [
      NaiveUiResolver(),
      name => (name === "Icon" ? { name, from: "@iconify/vue" } : undefined)
    ],
    dts: resolve("src/auto-components.d.ts"),
    dirs: ["src/components"]
  });
};
