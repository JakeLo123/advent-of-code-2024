/**
 * [Day 5](https://adventofcode.com/2024/day/5)
 */

import fs from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline";

const __dirname = dirname(fileURLToPath(import.meta.url));

const lineReader = readline.createInterface({
  input: fs.createReadStream(join(__dirname, "input.txt"), "utf8"),
});

let result = 0;

let rules = new Map();
let rulesAreRead = false;

lineReader.on("line", (line) => {
  if (line === "") {
    rulesAreRead = true;
  } else if (rulesAreRead) {
    let pages = line.split(",");
    let update = [];
    let updateIsValid = true;

    for (let i = 0; i < pages.length; i++) {
      let curPage = pages[i];
      let insertIndex = pages.length - 1;

      for (const forbidPage of rules.get(curPage) ?? new Set()) {
        let spliceIndex = update.indexOf(forbidPage);

        if (spliceIndex === -1) {
          continue;
        }

        updateIsValid = false;
        insertIndex = Math.min(insertIndex, spliceIndex);
      }

      update.splice(insertIndex, 0, curPage);
    }

    if (!updateIsValid) {
      result += Number(update[Math.floor(update.length / 2)]);
    }
  } else {
    let [a, b] = line.split("|");
    let rule = rules.get(a) ?? new Set();
    rule.add(b);
    rules.set(a, rule);
  }
});

lineReader.on("close", () => {
  console.log("Result --> ", result);
});
