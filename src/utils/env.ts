import Bowser from "bowser";

const browser = Bowser.getParser(window.navigator.userAgent);

export const env = {
  browser: browser,
  is: {
    chrome: import.meta.env.CHROME,
    firefox: import.meta.env.FIREFOX,
    safari: import.meta.env.SAFARI,
    edge: import.meta.env.EDGE,
    opera: import.meta.env.OPERA
  }
};
