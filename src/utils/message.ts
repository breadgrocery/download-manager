import { browser } from "wxt/browser";

export type Message<T> = {
  channel: string;
  data?: T;
};

export const send = async <T>(message: Message<T>) => {
  try {
    return await browser.runtime.sendMessage(browser.runtime.id, message);
  } catch (error) {
    return console.debug(error);
  }
};

export const listen = <T>(channel: string, callback: (data?: T) => void) => {
  browser.runtime.onMessage.addListener((message): undefined => {
    if (message && typeof message === "object") {
      const msg = message as Message<T>;
      if (msg.channel && msg.channel === channel) {
        callback(msg.data);
      }
    }
  });
};

export type OffscreenMessage<T> = {
  action: string;
  data: T;
};

const createOffscreen: () => Promise<void> = async () => {
  const hasDocument = await chrome?.offscreen?.hasDocument?.();
  if (!hasDocument) {
    await chrome?.offscreen?.createDocument?.({
      url: "/offscreen.html",
      reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
      justification: "AUDIO_PLAYBACK"
    });
  }
};

export const offscreenSend = async <T>(message: OffscreenMessage<T>) => {
  await createOffscreen();
  send({ channel: "offscreen", data: message });
};

export const offscreenListen = <T>(callback: (action: string, data: T) => void) => {
  listen("offscreen", message => {
    if (message && typeof message === "object") {
      const msg = message as OffscreenMessage<T>;
      if (msg.action) {
        callback(msg.action, msg.data);
      }
    }
  });
};
