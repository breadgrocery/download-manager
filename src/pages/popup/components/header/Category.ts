import { t } from "@/utils/i18n";
import { extensions, getAllExtensions } from "@/utils/mime";
import { getFileExtension } from "@/utils/path";
import { intersection } from "lodash-es";

export const categoryEnums = [
  "all",
  "documents",
  "music",
  "pictures",
  "videos",
  "archives",
  "executables",
  "others"
] as const;

export type Category = (typeof categoryEnums)[number];

export interface CategoryDetails {
  id: Category;
  icon: string;
  tooltip: string | undefined;
  match: (filename: string, mime?: string) => boolean;
}

export const categoryDetails = (categories?: Category[]): CategoryDetails[] => {
  return [
    {
      id: "all",
      icon: "mdi:format-list-bulleted",
      tooltip: t(`categories_all`),
      match: () => true
    },
    {
      id: "documents",
      icon: "mdi:file-document",
      tooltip: t(`categories_documents`),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.documents, exts).length > 0;
      }
    },
    {
      id: "music",
      icon: "mdi:music",
      tooltip: t(`categories_music`),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.music, exts).length > 0;
      }
    },
    {
      id: "pictures",
      icon: "mdi:image",
      tooltip: t(`categories_pictures`),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.pictures, exts).length > 0;
      }
    },
    {
      id: "videos",
      icon: "mdi:movie",
      tooltip: t(`categories_videos`),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.videos, exts).length > 0;
      }
    },
    {
      id: "archives",
      icon: "mdi:folder-zip",
      tooltip: t(`categories_archives`),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.archives, exts).length > 0;
      }
    },
    {
      id: "executables",
      icon: "mdi:jigsaw",
      tooltip: t(`categories_executables`),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.executables, exts).length > 0;
      }
    },
    {
      id: "others",
      icon: "mdi:ellipsis-horizontal",
      tooltip: t(`categories_others`),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return !Object.keys(extensions)
          .filter(category => !(categories && !categories.includes(category as Category)))
          .some(category => intersection(extensions[category], exts).length > 0);
      }
    }
  ];
};
