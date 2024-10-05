import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import { PluginOption } from "vite";

export default (): PluginOption => {
  return AutoImport({
    imports: ["vue", "vue-router"],
    dts: resolve("src/auto-imports.d.ts"),
    dirs: ["src/hooks"]
  });
};
