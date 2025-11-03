/**
 * [Day 6](https://adventofcode.com/2024/day/6)
 */

import fs from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const ORIENTATION_SET = ["^", ">", "v", "<"];

(async function main() {
  const data = await fs.readFile(join(__dirname, "input.txt"), "utf8");
  const area = data.split("\n");
  let distinctPositions = new Set();

  let guard = {
    r: -1,
    c: -1,
    orientation: "^",
  };

  // find guard starting position
  for (let rowIndex in area) {
    let colIndex = area[rowIndex]
      .split("")
      .findIndex((value) => ORIENTATION_SET.includes(value));
    if (colIndex !== -1) {
      guard.r = rowIndex;
      guard.c = colIndex;
      guard.orientation = area[rowIndex][colIndex];
      break;
    }
  }

  distinctPositions.add(JSON.stringify({ r: guard.r, c: guard.c }));

  while (area[guard.r]?.[guard.c] !== undefined) {
    let nextPos = { r: guard.r, c: guard.c };
    switch (guard.orientation) {
      case "^":
        nextPos.r--;
        break;
      case ">":
        nextPos.c++;
        break;
      case "v":
        nextPos.r++;
        break;
      case "<":
        nextPos.c--;
        break;
    }

    if (area[nextPos.r]?.[nextPos.c] === "#") {
      guard.orientation =
        ORIENTATION_SET[ORIENTATION_SET.indexOf(guard.orientation) + 1] ??
        ORIENTATION_SET[0];
      continue;
    }

    if (area[nextPos.r]?.[nextPos.c] === ".") {
      distinctPositions.add(JSON.stringify({ r: nextPos.r, c: nextPos.c }));
    }

    guard.r = nextPos.r;
    guard.c = nextPos.c;
  }

  let areaCopy = area.map((row) => row.split(""));
  let obstructionPlacements = 0;

  for (let rowIndex in areaCopy) {
    for (let colIndex in areaCopy[rowIndex]) {
      if (areaCopy[rowIndex][colIndex] === ".") {
        areaCopy[rowIndex][colIndex] = "#";
        if (doesLoop(areaCopy)) {
          obstructionPlacements++;
        }

        areaCopy[rowIndex][colIndex] = ".";
      }
    }
  }

  console.log("Distinct Positions -->", distinctPositions.size);
  console.log("Obstruction Placements -->", obstructionPlacements);
})();

function doesLoop(area) {
  let iterations = 0;

  let guard = {
    r: -1,
    c: -1,
    orientation: "^",
  };

  // find guard starting position
  for (let rowIndex in area) {
    let colIndex = area[rowIndex].findIndex((value) =>
      ORIENTATION_SET.includes(value)
    );
    if (colIndex !== -1) {
      guard.r = rowIndex;
      guard.c = colIndex;
      guard.orientation = area[rowIndex][colIndex];
      break;
    }
  }

  while (area[guard.r]?.[guard.c] !== undefined) {
    iterations++;

    if (iterations > 100000) {
      return true;
    }

    let nextPos = { r: guard.r, c: guard.c };
    switch (guard.orientation) {
      case "^":
        nextPos.r--;
        break;
      case ">":
        nextPos.c++;
        break;
      case "v":
        nextPos.r++;
        break;
      case "<":
        nextPos.c--;
        break;
    }

    if (area[nextPos.r]?.[nextPos.c] === "#") {
      guard.orientation =
        ORIENTATION_SET[ORIENTATION_SET.indexOf(guard.orientation) + 1] ??
        ORIENTATION_SET[0];
      continue;
    }

    guard.r = nextPos.r;
    guard.c = nextPos.c;
  }
  return false;
}
