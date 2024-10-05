import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { glob } from "glob";
import { load } from "js-yaml";
import { basename, dirname, extname, normalize, resolve } from "path";
import prettier from "prettier";
import { HmrContext, PluginOption, ResolvedConfig } from "vite";

export interface Locale {
  language: string;
  path: string;
}

interface FlattenedMessage {
  [key: string]: { message: string };
}

let viteConfig: ResolvedConfig;
const cwd = resolve("src/locales");
const minify = process.env.NODE_ENV === "production";

// Detect locale .yaml files in the base directory
const locales: Locale[] = glob.sync("**/*.{yaml,yml}", { cwd, absolute: true }).map(path => ({
  language: basename(path, extname(path)),
  path
}));

const buildMessages = () => {
  locales.forEach(locale => {
    transform(locale)
      .then(data => emit(locale.language, data))
      .catch(console.error);
  });
};

// Transforms a locale from YAML format to a flattened JSON format
const transform = async (locale: Locale): Promise<string> => {
  const yaml = readFileSync(locale.path, "utf8");
  const json = flatten(load(yaml, { json: true }) as Record<string, unknown>);
  let transformed = JSON.stringify(json);
  if (minify === false) {
    transformed = await prettier.format(transformed, { parser: "json" });
  }
  return transformed;
};

const flatten = (obj: Record<string, unknown>, parentKey = ""): FlattenedMessage => {
  return Object.entries(obj).reduce<FlattenedMessage>((acc, [key, value]) => {
    const messageKey = parentKey ? `${parentKey}_${key}` : key;
    if (typeof value === "object" && value !== null) {
      Object.assign(acc, flatten(value as Record<string, unknown>, messageKey));
    } else {
      acc[messageKey] = { message: String(value) };
    }
    return acc;
  }, {});
};

// Emits the transformed locale data to the output directory
const emit = (language: string, data: string) => {
  const dist = resolve(viteConfig.build.outDir, `_locales/${language}/messages.json`);
  mkdirSync(dirname(dist), { recursive: true });
  writeFileSync(dist, data);
};

export default (): PluginOption => {
  return {
    name: "vite-plugin-yaml-locale",
    configResolved: (config: ResolvedConfig) => {
      viteConfig = config;
    },
    buildStart: () => buildMessages(),
    handleHotUpdate: (ctx: HmrContext) => {
      if (locales.some(({ path }) => normalize(path) === normalize(ctx.file))) {
        buildMessages();
      }
    }
  };
};
