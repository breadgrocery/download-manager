import { resolve } from "path";
import { PluginOption } from "vite";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";

export default (): PluginOption => {
  return webExtension({
    manifest: resolve("manifest.json"),
    // Update the manifest version to match the version defined in package.json
    transformManifest: manifest => {
      return { ...manifest, version: readJsonFile("package.json").version };
    },
    browser: process.env.TARGET || "chrome", // Options: "chrome", "firefox"
    skipManifestValidation: true,
    htmlViteConfig: {
      build: {
        rollupOptions: {
          input: {
            offscreen: "src/offscreen.html"
          }
        }
      }
    },
    webExtConfig: {
      // Allow pasting into the DevTools console in development
      args: ["--unsafely-disable-devtools-self-xss-warnings"]
    }
  });
};
