/**
 * [Day 7](https://adventofcode.com/2024/day/7)
 */

import fs from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const OPERATORS = ["+", "*", "|"];

(async function main() {
  const data = await fs.readFile(join(__dirname, "example.txt"), "utf8");
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

    (function generateOperationChains(cur) {
      if (cur.length === values.length - 1) {
        operationChains.push(cur);
        return;
      }

      for (let operator of OPERATORS) {
        cur += operator;
        generateOperationChains(cur);
        cur = cur.slice(0, -1);
      }
    })("");

    for (let operationChain of operationChains) {
      let valuesWithConcatenation = [];

      for (let i = 1; i < values.length; i++) {
        let operation = operationChain[i - 1];
        let a = values[i - 1],
          b = values[i];

        if (operation === "|") {
          valuesWithConcatenation.push(Number(`${a}${b}`));
        } else {
          valuesWithConcatenation.push(a);
          if (i === values.length - 1) {
            valuesWithConcatenation.push(b);
          }
        }
      }

      let operationResult = valuesWithConcatenation[0];
      operationChain = operationChain
        .split("")
        .filter((o) => o !== "|")
        .join("");

      console.log(valuesWithConcatenation);

      if (!operationChain || values.length < 2) continue;

      for (let i = 1; i < valuesWithConcatenation.length; i++) {
        let operation = operationChain[i - 1];

        if (operation === "+") {
          operationResult += valuesWithConcatenation[i];
        } else {
          operationResult *= valuesWithConcatenation[i];
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
