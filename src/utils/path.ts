export const getFileName = (path: string): string => {
  const filename = path.replace(/\\/g, "/");
  const index = filename.lastIndexOf("/");
  return index >= 0 ? filename.substring(index + 1) : filename;
};

export const getFileExtension = (filename: string): string => {
  const index = filename.lastIndexOf(".");
  return index >= 0 ? filename.slice(index + 1).toLowerCase() : "";
};
