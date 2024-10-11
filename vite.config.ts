import Vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";
import AutoComponents from "./plugins/auto-components";
import AutoImport from "./plugins/auto-import";
import Icons from "./plugins/icons";
import WebExtension from "./plugins/web-extension";
import YamlLocale from "./plugins/yaml-locale";

export default defineConfig({
  plugins: [
    Vue(),
    Icons(), // Iconify icons
    WebExtension(), // Construct web extension
    YamlLocale(), // // Convert locale messages from YAML format to JSON format
    AutoImport(), // Automatically import APIs on-demand
    AutoComponents() // Automatically import components on-demand
  ],
  resolve: {
    alias: {
      "@": resolve("src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: { api: "modern-compiler" }
    }
  },
  // Build options in production
  ...(process.env.NODE_ENV === "production" && {
    build: {
      minify: true,
      chunkSizeWarningLimit: 4096
    },
    esbuild: {
      drop: ["console", "debugger"]
    }
  })
});
