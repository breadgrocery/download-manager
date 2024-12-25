export const isDarkMode = async () => {
  if (chrome?.offscreen) {
    return await offscreenSend({ action: "isDarkMode", data: undefined });
  } else {
    return matchMedia("(prefers-color-scheme: dark)").matches;
  }
};
