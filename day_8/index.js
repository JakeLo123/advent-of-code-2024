/**
 * [Day 8](https://adventofcode.com/2024/day/8)
 */

import fs from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const data = await fs.readFile(join(__dirname, "input.txt"), "utf8");
  let bounds = data.split("\n");
  /** key is frequency, value is list of coordinates */
  const antennae = {};
  let nodesInBounds = new Set();

  for (let r = 0; r < bounds.length; r++) {
    for (let c = 0; c < bounds[r].length; c++) {
      if (bounds[r][c] === ".") {
        continue;
      }

      let frequency = bounds[r][c],
        coords = { row: r, col: c };

      antennae[frequency] = [...(antennae[frequency] ?? []), coords];
    }
  }

  for (let frequency of Object.keys(antennae)) {
    let coords = antennae[frequency];

    for (let i = 0; i < coords.length; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        let a = coords[i],
          b = coords[j];

        nodesInBounds.add(JSON.stringify(a));
        nodesInBounds.add(JSON.stringify(b));

        let delta = {
          row: Math.abs(a.row - b.row),
          col: Math.abs(a.col - b.col),
        };

        let antinodeA = {
          row: a.row - delta.row,
          col: a.col <= b.col ? a.col - delta.col : a.col + delta.col,
        };
        let antinodeB = {
          row: b.row + delta.row,
          col: a.col <= b.col ? b.col + delta.col : b.col - delta.col,
        };

        while (bounds[antinodeA.row]?.[antinodeA.col]) {
          nodesInBounds.add(JSON.stringify(antinodeA));
          antinodeA.row -= delta.row;
          if (a.col <= b.col) {
            antinodeA.col -= delta.col;
          } else {
            antinodeA.col += delta.col;
          }
        }
        while (bounds[antinodeB.row]?.[antinodeB.col]) {
          nodesInBounds.add(JSON.stringify(antinodeB));
          antinodeB.row += delta.row;
          if (a.col <= b.col) {
            antinodeB.col += delta.col;
          } else {
            antinodeB.col -= delta.col;
          }
        }
      }
    }
  }

  console.log("Nodes in bounds -->", nodesInBounds.size);
}

main();
