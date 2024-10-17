import { extensions, getAllExtensions } from "@/utils/mime";
import { getFileExtension } from "@/utils/path";
import { intersection } from "lodash-es";
import MdiEllipsisHorizontal from "~icons/mdi/ellipsis-horizontal";
import MdiFileDocument from "~icons/mdi/file-document";
import MdiFolderZip from "~icons/mdi/folder-zip";
import MdiFormatListBulleted from "~icons/mdi/format-list-bulleted";
import MdiImage from "~icons/mdi/image";
import MdiMovie from "~icons/mdi/movie";
import MdiMusic from "~icons/mdi/music";
import MdiPuzzle from "~icons/mdi/puzzle";

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
  icon: Component;
  tooltip: string | undefined;
  match: (filename: string, mime?: string) => boolean;
}

export const categoryDetails = (categories?: Category[]): CategoryDetails[] => {
  return [
    {
      id: "all",
      icon: MdiFormatListBulleted,
      tooltip: i18n.t("categories.all"),
      match: () => true
    },
    {
      id: "documents",
      icon: MdiFileDocument,
      tooltip: i18n.t("categories.documents"),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.documents, exts).length > 0;
      }
    },
    {
      id: "music",
      icon: MdiMusic,
      tooltip: i18n.t("categories.music"),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.music, exts).length > 0;
      }
    },
    {
      id: "pictures",
      icon: MdiImage,
      tooltip: i18n.t("categories.pictures"),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.pictures, exts).length > 0;
      }
    },
    {
      id: "videos",
      icon: MdiMovie,
      tooltip: i18n.t("categories.videos"),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.videos, exts).length > 0;
      }
    },
    {
      id: "archives",
      icon: MdiFolderZip,
      tooltip: i18n.t("categories.archives"),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.archives, exts).length > 0;
      }
    },
    {
      id: "executables",
      icon: MdiPuzzle,
      tooltip: i18n.t("categories.executables"),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.executables, exts).length > 0;
      }
    },
    {
      id: "others",
      icon: MdiEllipsisHorizontal,
      tooltip: i18n.t("categories.others"),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return !Object.keys(extensions)
          .filter(category => !(categories && !categories.includes(category as Category)))
          .some(category => intersection(extensions[category], exts).length > 0);
      }
    }
  ];
};
