import { env } from "@/utils/env";
import { type State, is, state } from "@/utils/state";
import { debounce } from "lodash-es";
import { type Downloads, browser } from "wxt/browser";

export const setDownloadManagerState = (enabled: boolean) => {
  if (env.is.chrome || env.is.edge) {
    chrome?.downloads?.setUiOptions?.({ enabled });
    chrome?.downloads?.setShelfEnabled?.(enabled);
  }
};

export interface Listeners {
  onCreated?: (download: Downloads.DownloadItem) => void;
  onErased?: (downloadId: number) => void;
  onChanged?: (download: Downloads.OnChangedDownloadDeltaType) => void;
  onCompleted?: (download: Downloads.OnChangedDownloadDeltaType) => void;
  onInterrupted?: (download: Downloads.OnChangedDownloadDeltaType) => void;
  onDangerous?: (download: Downloads.OnChangedDownloadDeltaType) => void;
  onStatistics?: (statistics: Record<State, number>, downloads: Downloads.DownloadItem[]) => void;
}

export const addDownloadListeners = (listeners: Listeners, pulse: number = 5 * 1000) => {
  // Listen for the creation of new downloads
  browser.downloads.onCreated.addListener(download => {
    listeners.onCreated?.(download);
    updateStatistics(listeners.onStatistics);
  });
  browser.downloads.onErased.addListener((downloadId: number) => {
    listeners.onErased?.(downloadId);
    updateStatistics(listeners.onStatistics);
  });
  // Listen for changes in download states
  browser.downloads.onChanged.addListener(async change => {
    // Determine previous and current states
    const prevState = change?.state?.previous;
    const currState = change?.state?.current;
    const states = {
      completed: prevState !== "complete" && currState === "complete",
      interrupted: prevState !== "interrupted" && currState === "interrupted",
      dangerous: is.dangerous(change.danger?.current) && !is.dangerous(change.danger?.previous)
    };
    // Notify listeners based on state changes
    listeners.onChanged?.(change);
    if (states.completed) listeners.onCompleted?.(change);
    if (states.interrupted) listeners.onInterrupted?.(change);
    if (states.dangerous) listeners.onDangerous?.(change);

    updateStatistics(listeners.onStatistics);
  });
  // Avoid missing events due to reduced sensitivity of background scripts by the browser
  const deamon = () => {
    updateStatistics(listeners.onStatistics);
    setTimeout(deamon, pulse);
  };
  deamon();
};

const updateStatistics = debounce(
  async (
    callback?: (statistics: Record<State, number>, downloads: Downloads.DownloadItem[]) => void
  ) => {
    if (callback) {
      const downloads = await getDownloads();
      const statistics = Object.fromEntries(
        Object.entries(state).map(([status, predicate]) => {
          const fulfilled = downloads.filter(predicate).length;
          return [status, fulfilled];
        })
      ) as Record<State, number>;
      callback(statistics, downloads);
    }
  },
  500,
  { maxWait: 1000 }
);

export const getDownloads = () => {
  return browser.downloads.search({ orderBy: ["-startTime"] });
};

export const deleteDownload = async (download: Downloads.DownloadItem, removeFile: boolean) => {
  if (state.ongoing(download) || state.expired(download)) {
    await browser.downloads.cancel(download.id);
  }
  if (removeFile && download.exists) {
    await browser.downloads.removeFile(download.id).finally(() => {
      browser.downloads.erase({ id: download.id });
    });
  } else {
    await browser.downloads.erase({ id: download.id });
  }
};
