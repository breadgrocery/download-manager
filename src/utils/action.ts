export const browserAction = browser.action || browser.browserAction;

export const openPopup = async () => {
  try {
    return await browserAction.openPopup();
  } catch (error) {
    return console.debug(error);
  }
};
