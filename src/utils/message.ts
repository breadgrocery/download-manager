import { type Runtime, browser } from "wxt/browser";

export type Payload<T> = {
  channel: string;
  data: T;
};

export const send = <T, R>(payload: Payload<T>): Promise<R> => {
  try {
    return browser.runtime.sendMessage(browser.runtime.id, payload);
  } catch (error) {
    console.debug(error);
    return Promise.reject(error);
  }
};

export const listen = <T, R>(
  channel: string,
  callback: (message: T, sender: Runtime.MessageSender, sendResponse: (message: R) => void) => void
) => {
  browser.runtime.onMessage.addListener((message, sender, sendResponse): undefined => {
    if (message && typeof message === "object") {
      const payload = message as Payload<T>;
      if (payload.channel && payload.channel === channel) {
        callback(payload.data, sender, sendResponse);
      }
    }
  });
};

export type OffscreenPayload<T> = {
  action: string;
  data: T;
};

const createOffscreen: () => Promise<void> = async () => {
  const hasDocument = await chrome?.offscreen?.hasDocument?.();
  if (!hasDocument) {
    await chrome?.offscreen?.createDocument?.({
      url: "/offscreen.html",
      reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK, chrome.offscreen.Reason.MATCH_MEDIA],
      justification: "AUDIO_PLAYBACK, MATCH_MEDIA"
    });
  }
};

export const offscreenSend = async <P, R>(payload: OffscreenPayload<P>): Promise<R> => {
  await createOffscreen();
  return await send({ channel: "offscreen", data: payload });
};

export const offscreenListen = <T, R>(
  action: string,
  callback: (message: T, sender: Runtime.MessageSender, sendResponse: (message: R) => void) => void
) => {
  listen("offscreen", (message, sender, sendResponse) => {
    if (message && typeof message === "object") {
      const payload = message as OffscreenPayload<T>;
      if (payload.action && payload.action === action) {
        callback(payload.data, sender, sendResponse);
      }
    }
  });
};
