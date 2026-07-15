#!/usr/bin/env node

import { cp, mkdir, readdir, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(scriptDir, "../skills");

function parseArgs(argv) {
  const result = { apply: false, force: false, target: null };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--apply") result.apply = true;
    else if (arg === "--force") result.force = true;
    else if (arg === "--target") result.target = argv[++index];
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (result.force && !result.apply) {
    throw new Error("--force is only valid with --apply");
  }
  return result;
}

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

function timestamp() {
  return new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const codexHome = process.env.CODEX_HOME
    ? path.resolve(process.env.CODEX_HOME)
    : path.join(os.homedir(), ".codex");
  const targetDir = path.resolve(args.target ?? path.join(codexHome, "skills"));

  if (targetDir === sourceDir || targetDir.startsWith(`${sourceDir}${path.sep}`)) {
    throw new Error("Target cannot be inside the source skill directory");
  }

  const skills = (await readdir(sourceDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const conflicts = [];
  for (const skill of skills) {
    if (await exists(path.join(targetDir, skill))) conflicts.push(skill);
  }

  const plan = {
    mode: args.apply ? "apply" : "dry-run",
    source: sourceDir,
    target: targetDir,
    skills,
    conflicts,
    force: args.force,
  };
  process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);

  if (!args.apply) return;
  if (conflicts.length > 0 && !args.force) {
    throw new Error(`Refusing to overwrite existing skills: ${conflicts.join(", ")}`);
  }

  await mkdir(targetDir, { recursive: true });
  let backupDir = null;
  if (conflicts.length > 0) {
    backupDir = path.join(targetDir, ".exocrew-backups", timestamp());
    await mkdir(backupDir, { recursive: true });
    for (const skill of conflicts) {
      await cp(path.join(targetDir, skill), path.join(backupDir, skill), {
        recursive: true,
        force: false,
        errorOnExist: true,
      });
    }
  }

  for (const skill of skills) {
    await cp(path.join(sourceDir, skill), path.join(targetDir, skill), {
      recursive: true,
      force: args.force,
      errorOnExist: !args.force,
    });
  }

  process.stdout.write(
    `${JSON.stringify({ installed: skills, target: targetDir, backup: backupDir }, null, 2)}\n`,
  );
}

main().catch((error) => {
  process.stderr.write(`install-skills: ${error.message}\n`);
  process.exitCode = 1;
});
