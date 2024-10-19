import { type Downloads } from "wxt/browser";

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
  [key in State]: (item: Downloads.DownloadItem) => boolean;
} = {
  completed: download => is.completed(download.state),
  downloading: download => is.downloading(download.state, download.paused),
  paused: download => is.paused(download.paused, download.canResume),
  interrupted: download => is.interrupted(download.state),
  deleted: download => is.deleted(download.state, download.exists),
  dangerous: download => is.dangerous(download.danger),
  ongoing: download => is.ongoing(download.state, download.paused, download.canResume),
  expired: download => is.expired(download.paused, download.canResume)
};
