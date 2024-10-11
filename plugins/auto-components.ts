import { resolve } from "path";
import IconsResolver from "unplugin-icons/resolver";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { PluginOption } from "vite";

export default (): PluginOption => {
  return Components({
    resolvers: [
      NaiveUiResolver(),
      IconsResolver({
        prefix: "icon"
      })
    ],
    dts: resolve("src/auto-components.d.ts"),
    dirs: ["src/components"]
  });
};
