import inquirer from "inquirer";
import { npx } from "./utils/npx.mjs";
import { questions } from "./utils/questions.mjs";

inquirer
  .prompt(Object.values(questions))
  .then(answers => {
    const { browser, manifest } = answers;
    return npx("wxt", [
      ...["--mode", "development"],
      ...["--browser", browser],
      // See https://github.com/wxt-dev/wxt/issues/230#issuecomment-1960819227
      browser === "firefox" ? "--mv2" : `--${manifest}`
    ]);
  })
  .catch(console.error);
