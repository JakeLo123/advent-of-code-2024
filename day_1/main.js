/**
 * [Day 1](https://adventofcode.com/2024/day/1)
 */

import fs from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline";

const __dirname = dirname(fileURLToPath(import.meta.url));

(async function main() {
  try {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(join(__dirname, "input.txt"), "utf8"),
    });

    const list1 = [],
      list2 = [];
    const appearances = new Map();

    let difference = 0,
      similarityScore = 0;

    lineReader.on("line", (line) => {
      let [a, b] = line.split("   ").map((n) => Number(n));
      insertIntoList(a, list1);
      insertIntoList(b, list2);
      appearances.set(b, (appearances.get(b) ?? 0) + 1);
    });

    lineReader.on("close", () => {
      for (let i = 0; i < list1.length; i++) {
        let a = list1[i],
          b = list2[i];

        difference += Math.abs(a - b);
        similarityScore += a * (appearances.get(a) ?? 0);
      }

      console.log("Difference -->", difference);
      console.log("Similarity Score -->", similarityScore);
    });
  } catch (e) {
    throw e;
  }
})();

/**
 * Utility function that inserts a number into a list in ascending order, mutating the list.
 *
 * @param {number} n
 * @param {number[]} list
 */
function insertIntoList(n, list) {
  if (list.length === 0) {
    list.push(n);
    return;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i] >= n) {
      list.splice(i, 0, n);
      return;
    }
  }

  list.push(n);
}
