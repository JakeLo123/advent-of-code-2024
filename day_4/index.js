/**
 * [Day 4](https://adventofcode.com/2024/day/4)
 */

import fs from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

(async function main() {
  const data = await fs.readFile(join(__dirname, "input.txt"), "utf8");
  const lines = data.split("\n");

  let count = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      let a = "",
        b = "";

      for (let k = 0; k < 3; k++) {
        a += lines[i + k]?.[j + k] ?? "";
        b += lines[i + k]?.[j + 2 - k] ?? "";
      }

      if (
        (a === "MAS" && b === "MAS") ||
        (a === "SAM" && b === "SAM") ||
        (a === "SAM" && b === "MAS") ||
        (a === "MAS" && b === "SAM")
      ) {
        count += 1;
      }
      // [horizontal, vertical, diagonalA, diagonalB].forEach((word) => {
      //   if (word === "XMAS" || word === "SAMX") count += 1;
      // });
    }
  }

  console.log("Count -->", count);
})();
