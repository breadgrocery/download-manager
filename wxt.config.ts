import "@wxt-dev/auto-icons";
import { resolve } from "node:path";
import process from "node:process";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "wxt";

const env = {
  development: process.env.NODE_ENV === "development",
  production: process.env.NODE_ENV === "production"
};

// See https://wxt.dev/api/config.html
export default defineConfig({
  root: resolve("src"),
  publicDir: resolve("public"),
  entrypointsDir: resolve("src/pages"),
  outDir: resolve("dist"),
  runner: {
    openDevtools: true,
    chromiumArgs: ["--unsafely-disable-devtools-self-xss-warnings"]
  },
  imports: {
    presets: ["vue", "vue-router"],
    dirs: ["hooks"]
  },
  zip: {
    artifactTemplate: `${process.env.npm_package_name}-{{browser}}.zip`,
    sourcesTemplate: `${process.env.npm_package_name}-sources.zip`
  },
  vite: () => ({
    plugins: [
      Components({
        resolvers: [NaiveUiResolver(), IconsResolver({ prefix: "icon" })],
        dirs: ["components"]
      }),
      Icons()
    ],
    css: { preprocessorOptions: { scss: { api: "modern-compiler" } } },
    build: {
      sourcemap: env.development,
      minify: env.production
    },
    esbuild: {
      drop: env.production ? ["console", "debugger"] : undefined
    }
  })
});
