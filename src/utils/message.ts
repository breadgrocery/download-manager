import browser from "webextension-polyfill";

export type Message<T> = {
  channel: string;
  data?: T;
};

export const send = <T>(message: Message<T>) => {
  return browser.runtime.sendMessage(browser.runtime.id, message);
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
  const hasDocument = await chrome.offscreen.hasDocument();
  if (!hasDocument) {
    await chrome.offscreen.createDocument({
      url: "/src/offscreen.html",
      reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
      justification: "AUDIO_PLAYBACK"
    });
  }
};

export const offscreenSend = async <T>(message: OffscreenMessage<T>) => {
  await createOffscreen();
  browser.runtime.sendMessage(browser.runtime.id, {
    channel: "offscreen",
    data: message
  });
};

export const offscreenSendListen = <T>(callback: (action: string, data: T) => void) => {
  listen("offscreen", message => {
    if (message && typeof message === "object") {
      const msg = message as OffscreenMessage<T>;
      if (msg.action) {
        callback(msg.action, msg.data);
      }
    }
  });
};
