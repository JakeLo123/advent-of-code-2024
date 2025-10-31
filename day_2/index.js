/**
 * [Day 2](https://adventofcode.com/2024/day/2)
 */

import fs from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
  - The levels are either all increasing or all decreasing.
  - Any two adjacent levels differ by at least one and at most three.
 */

(function main() {
  try {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(join(__dirname, "input.txt"), "utf8"),
    });

    let safeCount = 0;

    lineReader.on("line", (line) => {
      const levels = line.split(" ").map((n) => Number(n));

      for (let i = 0; i < levels.length; i++) {
        if (checkIsSafe(levels.filter((_, index) => index !== i))) {
          safeCount++;
          break;
        }
      }
    });

    lineReader.on("close", () => {
      console.log({ safeCount });
    });
  } catch (e) {
    throw e;
  }
})();

function checkIsSafe(levels) {
  if (levels.length < 3) {
    return true;
  }

  let direction = levels[1] > levels[0] ? "increasing" : "decreasing";

  for (let i = 1; i < levels.length; i++) {
    let prev = levels[i - 1],
      cur = levels[i];

    let dif = direction === "increasing" ? cur - prev : prev - cur;

    if (dif < 1 || dif > 3) {
      return false;
    }
  }

  return true;
}
