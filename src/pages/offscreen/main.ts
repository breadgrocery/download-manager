import { offscreenListen } from "@/utils/message";

offscreenListen((action: string, data: unknown) => {
  switch (action) {
    case "audio":
      if (data) new Audio(data as string).play();
      break;
  }
});
