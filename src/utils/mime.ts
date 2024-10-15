import { getCacheSync } from "@/utils/cache";
import mime from "mime-db";

// Retrieve all extensions based on specified types
export const getAllExtensions = (types: string[]): string[] => {
  const cacheKey = `mime-extensions:${types.join(",")}`;
  return getCacheSync(cacheKey, () => {
    const extensions = new Set<string>(
      Object.keys(mime)
        .filter(key => types.some(type => key.startsWith(type)))
        .flatMap(key => mime[key].extensions || [])
    );
    return Array.from(extensions).sort();
  });
};

export const extensions: { [key: string]: string[] } = {
  // Document files
  documents: getAllExtensions([
    "text/",
    "application/vnd.ms-word",
    "application/vnd.ms-excel",
    "application/vnd.ms-powerpoint"
  ]),
  // Audio files
  music: getAllExtensions(["audio/"]),
  // Image files
  pictures: getAllExtensions(["image/"]),
  // Video files
  videos: getAllExtensions(["video/"]),
  // Zip files
  archives: getAllExtensions([
    "application/zip",
    "application/x-rar-compressed",
    "application/vnd.rar",
    "application/x-7z-compressed",
    "application/x-tar",
    "application/x-gtar",
    "application/gzip",
    "application/x-compress",
    "application/x-iso9660-image",
    "application/x-apple-diskimage"
  ]),
  // Executable files
  executables: getAllExtensions(["application/x-msdownload"])
};
