import { t } from "@/utils/i18n";
import { extensions, getAllExtensions } from "@/utils/mime";
import { getFileExtension } from "@/utils/path";
import { intersection } from "lodash-es";
import MdiEllipsisHorizontal from "~icons/mdi/ellipsis-horizontal";
import MdiFileDocument from "~icons/mdi/file-document";
import MdiFolderZip from "~icons/mdi/folder-zip";
import MdiFormatListBulleted from "~icons/mdi/format-list-bulleted";
import MdiImage from "~icons/mdi/image";
import MdiJigsaw from "~icons/mdi/jigsaw";
import MdiMovie from "~icons/mdi/movie";
import MdiMusic from "~icons/mdi/music";

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
      tooltip: t(`categories_all`),
      match: () => true
    },
    {
      id: "documents",
      icon: MdiFileDocument,
      tooltip: t(`categories_documents`),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.documents, exts).length > 0;
      }
    },
    {
      id: "music",
      icon: MdiMusic,
      tooltip: t(`categories_music`),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.music, exts).length > 0;
      }
    },
    {
      id: "pictures",
      icon: MdiImage,
      tooltip: t(`categories_pictures`),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.pictures, exts).length > 0;
      }
    },
    {
      id: "videos",
      icon: MdiMovie,
      tooltip: t(`categories_videos`),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.videos, exts).length > 0;
      }
    },
    {
      id: "archives",
      icon: MdiFolderZip,
      tooltip: t(`categories_archives`),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.archives, exts).length > 0;
      }
    },
    {
      id: "executables",
      icon: MdiJigsaw,
      tooltip: t(`categories_executables`),
      match: (filename, mime) => {
        const exts = [getFileExtension(filename), ...(mime ? getAllExtensions([mime]) : [])];
        return intersection(extensions.executables, exts).length > 0;
      }
    },
    {
      id: "others",
      icon: MdiEllipsisHorizontal,
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
