import { isDarkMode } from "@/utils/theme";

const colors = {
  idle: { light: "#5B5B66", dark: "#C7C7C7" },
  downloading: { light: "#4DAF55", dark: "#2F8833" },
  paused: { light: "#F6C432", dark: "#D1A42E" },
  dangerous: { light: "#E14034", dark: "#B72C1C" }
};

const getColor = async (colorName: keyof typeof colors) => {
  const darkMode = await isDarkMode();
  const scheme = darkMode ? "dark" : "light";
  const color = colors[colorName][scheme];
  return color;
};

export type AnimatedIconInfo = {
  progress: number;
  colorName: keyof typeof colors;
  style: IconStyle;
};

export const createImageData = async (info: AnimatedIconInfo) => {
  const canvas = new OffscreenCanvas(128, 128);
  const ctx = canvas.getContext("2d");

  if (ctx === null) return null;

  if (info.progress === 0) {
    await drawProgressImage(ctx, info);
  } else {
    switch (info.style) {
      case "animated":
        {
          await drawProgressImage(ctx, info);
        }
        break;
      case "animated_stroke":
        {
          await drawProgressText(ctx, info);
          await drawProgressCircle(ctx, info);
        }
        break;
      case "animated_pie":
        {
          await drawProgressPie(ctx, info);
        }
        break;
      default: {
        await drawProgressText(ctx, info);
      }
    }
  }

  return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawProgressImage = async (
  ctx: OffscreenCanvasRenderingContext2D,
  info: AnimatedIconInfo
) => {
  const canvas = ctx.canvas;
  ctx.globalCompositeOperation = "destination-atop";

  let fillHight = canvas.height * (info.progress / 100);
  if (info.colorName === "idle") fillHight = canvas.height;
  ctx.fillStyle = await getColor(info.colorName);
  ctx.fillRect(0, 0, canvas.width, fillHight);

  const blob = await fetch(new URL(`images/icon-animated.png`, import.meta.url)).then(res =>
    res.blob()
  );
  const image = await createImageBitmap(blob, {
    resizeWidth: canvas.width,
    resizeHeight: canvas.height
  });
  const dx = (canvas.width - image.width) / 2;
  const dy = (canvas.height - image.height) / 2;

  ctx.drawImage(image, dx, dy);
};

const drawProgressText = async (ctx: OffscreenCanvasRenderingContext2D, info: AnimatedIconInfo) => {
  const canvas = ctx.canvas;

  const fontSize = canvas.width - 16 * (info.progress.toString().length + 1);
  ctx.fillStyle = await getColor("idle");
  ctx.font = `bold ${fontSize}px sanserif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(info.progress.toString(), canvas.width / 2, canvas.height / 2, canvas.width);
};

const drawProgressCircle = async (
  ctx: OffscreenCanvasRenderingContext2D,
  info: AnimatedIconInfo,
  radius?: number
) => {
  const canvas = ctx.canvas;

  // Calculate the ending angle of the arc based on the progress
  const startAngle = -0.5 * Math.PI;
  const endAngle = startAngle + info.progress * 0.02 * Math.PI;

  // Draw the arc
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.fillStyle = await getColor(info.colorName);
  ctx.strokeStyle = await getColor(info.colorName);
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    ((radius ?? canvas.width) - ctx.lineWidth) / 2,
    startAngle,
    endAngle
  );
  ctx.stroke();
};

const drawProgressPie = async (ctx: OffscreenCanvasRenderingContext2D, info: AnimatedIconInfo) => {
  const canvas = ctx.canvas;

  // Draw the background
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fillStyle = "transparent";
  ctx.strokeStyle = await getColor("idle");
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    (canvas.width - ctx.lineWidth) / 2,
    -0.5 * Math.PI,
    2.5 * Math.PI
  );
  ctx.fill();
  ctx.stroke();

  // Draw the pie chart
  await drawProgressCircle(ctx, info, canvas.width - 20);
  ctx.strokeStyle = await getColor("idle");
  ctx.lineTo(canvas.width / 2, canvas.height / 2);
  ctx.fill();
};
