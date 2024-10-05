import { offscreenSendListen } from "@/utils/message";

offscreenSendListen((action: string, data: unknown) => {
  switch (action) {
    case "audio":
      data && new Audio(data as string).play();
      break;
  }
});
