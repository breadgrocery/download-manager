import { memoize } from "lodash-es";

export const createImageData = memoize(
  (progress: number, color: keyof typeof colors) => {
    const colorized = Math.floor((54 / 100) * progress);
    const arr = new Array(64 * 64).fill(colors.transparent);
    for (let i = 64 * 5; i < 64 * (5 + colorized); i++) {
      arr[i] = colors[color];
    }
    for (let i = 64 * (5 + colorized); i < 64 * (5 + 54); i++) {
      arr[i] = colors.idle;
    }
    for (let i = 0; i < mask.length; i++) {
      if (mask[i] !== colors.ignore) arr[i] = mask[i];
    }
    const data = new Uint8ClampedArray(arr.flatMap(hexToRGBA));
    return new ImageData(data, 64, 64);
  },
  (n, color) => `${n}-${color}`
);

const colors = {
  transparent: "#00000000",
  ignore: "#FFFFFF00",
  idle: "#474747FF",
  downloading: "#4DAF55FF",
  paused: "#F6C432FF",
  dangerous: "#E14034FF"
};

const mask = (() => {
  const mask = new Array(64 * 5).fill(colors.transparent);
  for (let i = 0; i < 25; i++) {
    mask.push(
      ...new Array(19).fill(colors.transparent),
      ...new Array(26).fill(colors.ignore),
      ...new Array(19).fill(colors.transparent)
    );
  }
  for (let i = 0; i <= 28; i++) {
    mask.push(
      ...new Array(i + 3).fill(colors.transparent),
      ...new Array(64 - 2 * (i + 3)).fill(colors.ignore),
      ...new Array(i + 3).fill(colors.transparent)
    );
  }
  mask.push(...new Array(64 * 5).fill(colors.transparent));
  return mask;
})();

const hexToRGBA = memoize(
  (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) : 255;
    return [r, g, b, a];
  },
  hex => hex
);
