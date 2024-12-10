import Bowser from "bowser";

export const env = {
  browser: Bowser.getParser((navigator || window.navigator).userAgent),
  is: {
    chrome: import.meta.env.CHROME,
    firefox: import.meta.env.FIREFOX,
    safari: import.meta.env.SAFARI,
    edge: import.meta.env.EDGE,
    opera: import.meta.env.OPERA
  }
};
