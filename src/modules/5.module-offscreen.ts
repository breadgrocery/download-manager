import { resolve } from "node:path";
import { addEntrypoint, defineWxtModule } from "wxt/modules";

export default defineWxtModule(wxt => {
  addEntrypoint(wxt, {
    type: "unlisted-page",
    name: "offscreen",
    inputPath: resolve(wxt.config.entrypointsDir, "offscreen/index.html"),
    outputDir: wxt.config.outDir,
    skipped: false,
    options: {}
  });
});
