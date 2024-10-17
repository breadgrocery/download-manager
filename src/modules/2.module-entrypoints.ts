import { defineWxtModule } from "wxt/modules";

const entrypoints = {
  common: ["background", "options", "popup"],
  chrome: ["offscreen"],
  firefox: []
};

export default defineWxtModule(wxt => {
  const { browser } = wxt.config;
  const filterEntrypoints = [...entrypoints.common, ...entrypoints[browser]].filter(Boolean);
  wxt.config.filterEntrypoints = new Set(filterEntrypoints);
});
