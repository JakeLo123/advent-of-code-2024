/**
 * [Day 3](https://adventofcode.com/2024/day/3)
 */

import fs from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const digits = new Set(Array.from({ length: 10 }, (_, i) => `${i}`));

(async function main() {
  const data = await fs.readFile(join(__dirname, "input.txt"), "utf8");

  let i = 0;
  let isFunction = false;
  let isEnabled = true;
  let product = 0;

  while (i < data.length) {
    if (isFunction && !isEnabled) {
      i++;
      isFunction = false;
      continue;
    }

    if (isFunction) {
      let a = "",
        b = "";

      while (digits.has(data[i]) && i < data.length) {
        a += data[i];
        i++;
      }

      if (data[i] !== ",") {
        isFunction = false;
        continue;
      }

      i++;

      while (digits.has(data[i]) && i < data.length) {
        b += data[i];
        i++;
      }

      if (data[i] !== ")") {
        i++;
        isFunction = false;
        continue;
      }

      product += Number(a) * Number(b);
      isFunction = false;
      i++;
      continue;
    }

    if (data.substring(i, i + 4) === "do()") {
      isEnabled = true;
      i += 4;
      continue;
    }

    if (data.substring(i, i + 7) === "don't()") {
      isEnabled = false;
      i += 7;
      continue;
    }

    if (data.substring(i, i + 4) === "mul(") {
      isFunction = true;
      i += 4;
      continue;
    }

    i++;
  }

  console.log("Product -->", product);
})();
