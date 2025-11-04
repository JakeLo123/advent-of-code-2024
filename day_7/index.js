/**
 * [Day 7](https://adventofcode.com/2024/day/7)
 */

import fs from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const OPERATORS = ["+", "*"];

(async function main() {
  const data = await fs.readFile(join(__dirname, "input.txt"), "utf8");
  let totalCalibrationResult = 0;

  for (const line of data.split("\n")) {
    let indexOfColon = line.indexOf(":");
    let result = Number(line.slice(0, indexOfColon));
    let values = line
      .slice(indexOfColon + 1)
      .trim()
      .split(" ")
      .map((n) => Number(n));

    let operationChains = [];

    (function generateOperations(cur) {
      if (cur.length === values.length - 1) {
        operationChains.push(cur);
        return;
      }

      for (let operator of OPERATORS) {
        cur += operator;
        generateOperations(cur);
        cur = cur.slice(0, -1);
      }
    })("");

    for (let operationChain of operationChains) {
      let operationResult = 0;

      for (let i in values) {
        i = Number(i);
        if (i === 0) {
          operationResult = values[i];
          continue;
        }

        let value = values[i],
          operator = operationChain[i - 1];

        if (operator === "+") {
          operationResult += value;
        } else {
          operationResult *= value;
        }
      }

      if (operationResult === result) {
        totalCalibrationResult += result;
        break;
      }
    }
  }

  console.log("Total Calibration Result --> ", totalCalibrationResult);
})();
