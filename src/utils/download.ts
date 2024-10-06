import { State, is, state } from "@/utils/state";
import { debounce } from "lodash-es";
import browser from "webextension-polyfill";

export const setDownloadManagerState = (enabled: boolean) => {
  chrome?.downloads.setUiOptions?.({ enabled });
  chrome?.downloads.setShelfEnabled?.(enabled);
};

export interface Listeners {
  onCreated?: (downloads: browser.Downloads.DownloadItem) => void;
  onErased?: (downloadId: number) => void;
  onChanged?: (downloads: browser.Downloads.OnChangedDownloadDeltaType) => void;
  onCompleted?: (downloads: browser.Downloads.OnChangedDownloadDeltaType) => void;
  onInterrupted?: (downloads: browser.Downloads.OnChangedDownloadDeltaType) => void;
  onDangerous?: (downloads: browser.Downloads.OnChangedDownloadDeltaType) => void;
  onStatistics?: (statistics: Record<State, number>) => void;
}

export const addDownloadListeners = (listeners: Listeners) => {
  // Listen for the creation of new downloads
  browser.downloads.onCreated.addListener(download => {
    listeners.onCreated && listeners.onCreated(download);
    updateStatistics(listeners.onStatistics);
  });
  browser.downloads.onErased.addListener((downloadId: number) => {
    listeners.onErased && listeners.onErased(downloadId);
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
    listeners.onChanged && listeners.onChanged(change);
    states.completed && listeners.onCompleted && listeners.onCompleted(change);
    states.interrupted && listeners.onInterrupted && listeners.onInterrupted(change);
    states.dangerous && listeners.onDangerous && listeners.onDangerous(change);

    updateStatistics(listeners.onStatistics);
  });
};

const updateStatistics = debounce(
  async (callback?: (statistics: Record<State, number>) => void) => {
    const downloads = await getDownloads();
    const statistics = Object.fromEntries(
      Object.entries(state).map(([status, predicate]) => {
        const fulfilled = downloads.filter(predicate).length;
        return [status, fulfilled];
      })
    ) as Record<State, number>;
    callback && callback(statistics);
  },
  500,
  { maxWait: 2000 }
);

export const getDownloads = () => {
  return browser.downloads.search({ orderBy: ["-startTime"] });
};

export const deleteDownload = async (
  download: browser.Downloads.DownloadItem,
  removeFile: boolean
) => {
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
