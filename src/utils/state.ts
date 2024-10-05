import browser from "webextension-polyfill";

export type State =
  | "completed"
  | "downloading"
  | "paused"
  | "interrupted"
  | "deleted"
  | "dangerous"
  | "ongoing"
  | "expired";

export const is = {
  completed: (state?: string) => {
    return state === "complete";
  },
  downloading: (state?: string, paused?: boolean) => {
    return state === "in_progress" && (paused === undefined || paused === false);
  },
  paused: (paused?: boolean, canResume?: boolean) => {
    return paused === true && canResume === true;
  },
  interrupted: (state?: string) => {
    return state === "interrupted";
  },
  deleted: (state?: string, exists?: boolean) => {
    return is.completed(state) && (exists === undefined || exists === false);
  },
  dangerous: (danger?: string) => {
    return danger !== undefined && !["safe", "accepted"].includes(danger);
  },
  ongoing: (state?: string, paused?: boolean, canResume?: boolean) => {
    return is.downloading(state, paused) || is.paused(paused, canResume);
  },
  expired: (paused?: boolean, canResume?: boolean) => {
    return paused === true && (canResume === undefined || canResume === false);
  }
};

export const state: {
  [key in State]: (item: browser.Downloads.DownloadItem) => boolean;
} = {
  completed: item => is.completed(item.state),
  downloading: item => is.downloading(item.state, item.paused),
  paused: item => is.paused(item.paused, item.canResume),
  interrupted: item => is.interrupted(item.state),
  deleted: item => is.deleted(item.state, item.exists),
  dangerous: item => is.dangerous(item.danger),
  ongoing: item => is.ongoing(item.state, item.paused, item.canResume),
  expired: item => is.expired(item.paused, item.canResume)
};
