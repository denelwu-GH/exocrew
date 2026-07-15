#!/usr/bin/env node

import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { scanTree } from "./validate-exocrew.mjs";

const temporary = await mkdtemp(path.join(os.tmpdir(), "exocrew-scan-"));
try {
  const retiredToken = String.fromCharCode(100, 97, 103, 114, 111, 110);
  await writeFile(path.join(temporary, "leak.txt"), `retired=${retiredToken}\n`, "utf8");
  const violations = await scanTree(temporary);
  if (!violations.some((violation) => violation.rule === "retired-token")) {
    throw new Error("Expected retired-token scan to fail");
  }
  process.stdout.write(`${JSON.stringify({ negativeScan: "passed", violations }, null, 2)}\n`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
