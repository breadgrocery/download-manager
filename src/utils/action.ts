import { type Action } from "wxt/browser";

const browserAction = browser.action || browser.browserAction;

export const openPopup = async () => {
  try {
    return await browserAction.openPopup();
  } catch (error) {
    return console.debug(error);
  }
};

export const setIcon = (details: Action.SetIconDetailsType) => {
  return browserAction.setIcon(details);
};

export const setBadgeText = (details: Action.SetBadgeTextDetailsType) => {
  return browserAction.setBadgeText(details);
};

export const setBadgeTextColor = (details: Action.SetBadgeTextColorDetailsType) => {
  return browserAction.setBadgeTextColor(details);
};

export const setBadgeBackgroundColor = (details: Action.SetBadgeBackgroundColorDetailsType) => {
  return browserAction.setBadgeBackgroundColor(details);
};
