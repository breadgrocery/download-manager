import { offscreenSend } from "@/utils/message";

const playAudio = (source: string) => {
  if (chrome?.offscreen) {
    offscreenSend({ action: "audio", data: source });
  } else {
    new Audio(source).play();
  }
};

export const audio = {
  created: () => playAudio("/audio/created.wav"),
  completed: () => playAudio("/audio/completed.wav"),
  interrupted: () => playAudio("/audio/interrupted.wav"),
  dangerous: () => playAudio("/audio/dangerous.wav")
};
