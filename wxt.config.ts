import { resolve } from "node:path";
import process from "node:process";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: resolve("src"),
  publicDir: resolve("public"),
  entrypointsDir: resolve("src/pages"),
  modulesDir: resolve("plugins"),
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
  }
});
