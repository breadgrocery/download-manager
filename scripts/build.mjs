import inquirer from "inquirer";
import { resolve } from "node:path";
import process from "node:process";
import { npx } from "./utils/npx.mjs";
import { questions } from "./utils/questions.mjs";

const args = {
  browser: process.argv.includes("-b")
    ? process.argv[process.argv.indexOf("-b") + 1]
    : process.argv.includes("--browser")
      ? process.argv[process.argv.indexOf("--browser") + 1]
      : undefined,
  manifest: process.argv.includes("--mv3")
    ? "mv3"
    : process.argv.includes("--mv2")
      ? "mv2"
      : undefined,
  zip: process.argv.includes("-z") || process.argv.includes("--zip")
};

// Filter out questions based on provided arguments
const questionsToPrompt = [
  !args.browser && questions.browser,
  !args.manifest && questions.manifest
].filter(Boolean);

inquirer
  .prompt(questionsToPrompt)
  .then(answers => {
    const { browser = args.browser, manifest = args.manifest, zip = args.zip } = answers;
    const child = npx("wxt", [
      args.zip ? "zip" : "build",
      ...["--mode", "production"],
      ...["--browser", browser],
      `--${manifest}`
    ]);
    child.on("exit", error => {
      if (error === 0 && zip) {
        npx("crx", [
          "pack",
          ...["--crx-version", manifest.charAt(manifest.length - 1)],
          ...["--output", `dist/${process.env.npm_package_name}-${browser}.crx`],
          resolve("dist", `${browser}-${manifest}`)
        ]);
      }
    });
  })
  .catch(console.error);
