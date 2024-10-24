import { type Category } from "@/pages/popup/components/header/Category";
import { cloneDeep, isArray, mergeWith, toArray } from "lodash-es";
import { browser } from "wxt/browser";

export const defaults = {
  appearance: {
    theme: {
      scheme: "auto" as "auto" | "light" | "dark"
    },
    width: 665,
    height: 400,
    icon: "badge" as "general" | "badge" | "animated"
  },
  features: {
    search: true,
    categories: ["documents", "pictures", "archives", "executables", "others"] as Category[],
    download: {
      timeout: 30,
      retries: 1,
      conflict: "uniquify" as "uniquify" | "overwrite" | "prompt"
    },
    cleanup: {
      enabled: false,
      retention: 30,
      revmove: false
    }
  },
  notifications: {
    download: {
      created: {
        sound: false,
        popup: false
      },
      completed: {
        sound: true,
        popup: false
      },
      interrupted: {
        sound: true,
        popup: true
      },
      dangerous: {
        sound: true,
        popup: true
      }
    },
    messages: {
      lag: true
    }
  },
  sync: {
    enabled: false
  },
  misc: {
    performance: {
      pulse: 5 * 1000
    }
  }
};

export type Settings = typeof defaults;

export const mergedSettings = async () => {
  const sync = (await browser.storage.sync.get()) as Settings;
  const local = (await browser.storage.local.get()) as Settings;

  return mergeWith(cloneDeep(defaults), sync, local, (objValue, srcValue) => {
    // Prevent merging of array values, replace with source array
    if (isArray(objValue)) {
      return toArray(srcValue);
    }
  });
};

export const proxiedSettings = async (): Promise<Settings> => {
  const settings = await mergedSettings();

  const createProxy = (target: Settings) => {
    return new Proxy(target, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === "object" && value !== null) {
          return createProxy(value);
        }
        return value;
      },
      set(target, prop, newValue, receiver) {
        const prevSyncEnabled = settings.sync.enabled;
        const flag = Reflect.set(target, prop, newValue, receiver);
        const currSyncEnabled = settings.sync.enabled;

        // Save the updated settings to local storage
        browser.storage.local.set(settings);
        // Save to sync storage
        if (prevSyncEnabled || currSyncEnabled) {
          browser.storage.sync.set(settings);
        }

        return flag;
      }
    });
  };

  // Return proxied settings object
  return createProxy(settings);
};

export const reset = () => {
  const _settings = cloneDeep(defaults);
  browser.storage.local.set(_settings);
  if (_settings.sync.enabled) {
    browser.storage.sync.set(_settings);
  } else {
    browser.storage.sync.clear();
  }
};
