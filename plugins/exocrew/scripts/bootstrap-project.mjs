#!/usr/bin/env node

import { cp, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(scriptDir, "../assets/starter-project");

function parseArgs(argv) {
  const result = { apply: false, force: false, target: null };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--apply") result.apply = true;
    else if (arg === "--force") result.force = true;
    else if (arg === "--target") result.target = argv[++index];
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!result.target) throw new Error("--target is required");
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

async function listFiles(root, prefix = "") {
  const entries = await readdir(path.join(root, prefix), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(root, relative)));
    else if (entry.isFile()) files.push(relative);
  }
  return files.sort();
}

function timestamp() {
  return new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const targetDir = path.resolve(args.target);
  if (targetDir === sourceDir || targetDir.startsWith(`${sourceDir}${path.sep}`)) {
    throw new Error("Target cannot be inside the starter source directory");
  }

  const files = await listFiles(sourceDir);
  const conflicts = [];
  for (const relative of files) {
    if (await exists(path.join(targetDir, relative))) conflicts.push(relative);
  }

  process.stdout.write(
    `${JSON.stringify(
      {
        mode: args.apply ? "apply" : "dry-run",
        source: sourceDir,
        target: targetDir,
        files,
        conflicts,
        force: args.force,
      },
      null,
      2,
    )}\n`,
  );

  if (!args.apply) return;
  if (conflicts.length > 0 && !args.force) {
    throw new Error(`Refusing to overwrite existing files: ${conflicts.join(", ")}`);
  }

  await mkdir(targetDir, { recursive: true });
  let backupDir = null;
  if (conflicts.length > 0) {
    backupDir = path.join(targetDir, ".exocrew-backups", timestamp());
    for (const relative of conflicts) {
      const backupTarget = path.join(backupDir, relative);
      await mkdir(path.dirname(backupTarget), { recursive: true });
      await cp(path.join(targetDir, relative), backupTarget, {
        force: false,
        errorOnExist: true,
      });
    }
  }

  for (const relative of files) {
    const destination = path.join(targetDir, relative);
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(path.join(sourceDir, relative), destination, {
      force: args.force,
      errorOnExist: !args.force,
    });
  }

  process.stdout.write(
    `${JSON.stringify({ created: files, target: targetDir, backup: backupDir }, null, 2)}\n`,
  );
}

main().catch((error) => {
  process.stderr.write(`bootstrap-project: ${error.message}\n`);
  process.exitCode = 1;
});
