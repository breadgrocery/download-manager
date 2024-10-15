export const clearCache = (storageKey?: string): void => {
  if (typeof storageKey === "string" && storageKey) {
    localStorage.removeItem(storageKey);
  } else {
    localStorage.clear();
  }
};

export const getCacheSync = <T>(storageKey: string, fetcher: (key: string) => T): T => {
  const cachedData = getCachedData<T>(storageKey);
  if (cachedData !== null) {
    return cachedData;
  }
  const freshData = fetcher(storageKey);
  setCachedData(storageKey, freshData);
  return freshData;
};

export const getCacheAsync = async <T>(
  storageKey: string,
  fetcher: (key: string) => Promise<T>
): Promise<T> => {
  const cachedData = getCachedData<T>(storageKey);
  if (cachedData !== null) {
    return cachedData;
  }
  const freshData = await fetcher(storageKey);
  setCachedData(storageKey, freshData);
  return freshData;
};

const getCachedData = <T>(storageKey: string): T | null => {
  const cachedData = localStorage.getItem(storageKey);
  if (cachedData) {
    try {
      const parsedData = JSON.parse(cachedData);
      if (
        (typeof parsedData === "object" && parsedData !== null) ||
        Array.isArray(parsedData) ||
        typeof parsedData === "string"
      ) {
        return parsedData as T;
      }
    } catch {
      return null;
    }
  }
  return null;
};

const setCachedData = <T>(storageKey: string, data: T): void => {
  const cacheData = typeof data === "string" ? data : JSON.stringify(data);
  localStorage.setItem(storageKey, cacheData);
};
