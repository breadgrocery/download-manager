import autoprefixer from "autoprefixer";
import { resolve } from "node:path";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { addViteConfig, defineWxtModule } from "wxt/modules";

export default defineWxtModule(wxt => {
  const {
    reloadConfig,
    config: { typesDir, mode }
  } = wxt;
  const configure = () => {
    wxt.reloadConfig = () => reloadConfig().then(configure);
    addViteConfig(wxt, () => ({
      plugins: [
        Components({
          resolvers: [NaiveUiResolver(), IconsResolver({ prefix: "icon" })],
          dirs: ["src/components"],
          dts: resolve(typesDir, "components.d.ts")
        }),
        Icons()
      ],
      css: {
        postcss: { plugins: [autoprefixer()] }
      },
      build: {
        sourcemap: mode === "development",
        minify: mode === "production"
      },
      esbuild: {
        drop: mode === "production" ? ["console", "debugger"] : undefined
      }
    }));
  };
  configure();

  wxt.hooks.hook("prepare:types", async (_, entries) => {
    entries.push({ module: "./types/components.d.ts" });
  });
});
