import { spawn } from "node:child_process";

export const npx = (command, args, options) => {
  return spawn("npx", [command, ...args], {
    cwd: process.cwd(),
    shell: true,
    stdio: "inherit",
    ...(options || {})
  });
};
