import { offscreenListen } from "@/utils/message";

offscreenListen<string, void>("playAudio", message => {
  if (message) new Audio(message).play();
});

offscreenListen<void, boolean>("isDarkMode", (message, sender, sendResponse) => {
  const isDarkMode = matchMedia("(prefers-color-scheme: dark)").matches;
  sendResponse(isDarkMode);
});
