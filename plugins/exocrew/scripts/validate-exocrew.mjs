#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const blockedTokenHashes = new Set([
  "3c96e910d58e96217007f0f3eaf9ea53de8f3845ab66e1fedace99592ffc3688",
  "e2df8db538eac37ba0f8e2f8d88491d1e6973f89c5983b274dc07d1f28271304",
  "fbed3ba4d325187e55a0cab46d7bf3dc155fbb824c05a68e6decca81476b09b4",
  "2bbcf55486abd6b13482fe5028e0d49b436ca63981458cb788134d760181f3e8",
]);

const ignoredDirectories = new Set([".git", "node_modules", ".tmp", "tmp", "dist", "coverage"]);
const textExtensions = new Set([
  ".md",
  ".json",
  ".yaml",
  ".yml",
  ".mjs",
  ".js",
  ".ts",
  ".txt",
  ".svg",
  ".html",
]);

function tokenHash(value) {
  return createHash("sha256").update(value.toLowerCase()).digest("hex");
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
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(root, relative)));
    else if (entry.isFile() && textExtensions.has(path.extname(entry.name))) files.push(relative);
  }
  return files;
}

export async function scanTree(root) {
  const violations = [];
  const files = await listFiles(root);
  for (const relative of files) {
    const content = await readFile(path.join(root, relative), "utf8");
    const tokens = content.match(/[A-Za-z][A-Za-z0-9_-]{2,}/g) ?? [];
    if (tokens.some((token) => blockedTokenHashes.has(tokenHash(token)))) {
      violations.push({ file: relative, rule: "retired-token" });
    }
    if (/(?:^|[^$])\/(?:Users|home)\/[A-Za-z0-9._-]+\//m.test(content)) {
      violations.push({ file: relative, rule: "private-home-path" });
    }
    if (/\/(?:opt|data)\/[A-Za-z0-9._-]+\//m.test(content)) {
      violations.push({ file: relative, rule: "private-runtime-path" });
    }
    if (/\b(?:10\.|127\.0\.0\.1|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.)\d{1,3}\.\d{1,3}/.test(content)) {
      violations.push({ file: relative, rule: "private-network-address" });
    }
    if (/\b(?:gh[opsu]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,}|AKIA[A-Z0-9]{16})\b/.test(content)) {
      violations.push({ file: relative, rule: "credential-shape" });
    }
    if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(content)) {
      violations.push({ file: relative, rule: "private-key" });
    }
    const unfinishedWord = String.fromCharCode(84, 79, 68, 79);
    if (content.includes(unfinishedWord) || content.includes(`[${unfinishedWord}:`)) {
      violations.push({ file: relative, rule: "unfinished-placeholder" });
    }
  }
  return violations;
}

function frontmatterKeys(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return [];
  return match[1]
    .split("\n")
    .map((line) => line.match(/^([a-z_]+):/i)?.[1])
    .filter(Boolean);
}

export async function validateFramework(root) {
  const required = [
    ".agents/plugins/marketplace.json",
    "plugins/exocrew/.codex-plugin/plugin.json",
    "plugins/exocrew/skills/exocrew-delivery/SKILL.md",
    "plugins/exocrew/skills/product-brief/SKILL.md",
    "plugins/exocrew/skills/engineering-guardrails/SKILL.md",
    "plugins/exocrew/skills/test-evidence/SKILL.md",
    "plugins/exocrew/skills/safe-operations/SKILL.md",
    "plugins/exocrew/assets/starter-project/AGENTS.md",
    "plugins/exocrew/assets/starter-project/PROJECT_DECISIONS.md",
    "README.md",
    "README.zh-CN.md",
    "docs/EVIDENCE.md",
    "docs/EFFORT_MODEL.md",
    "docs/BENCHMARK.md",
    "docs/assets/effort-comparison.svg",
    "docs/assets/effort-comparison.zh-CN.svg",
    "docs/assets/install-the-crew.svg",
    "docs/assets/install-the-crew.zh-CN.svg",
    "docs/assets/idea-to-production.svg",
    "docs/assets/idea-to-production.zh-CN.svg",
    "docs/assets/ai-delivery-ecosystem.svg",
    "docs/assets/ai-delivery-ecosystem.zh-CN.svg",
    "docs/README.md",
    "docs/AI_AGENT_HARNESS.md",
    "docs/AI_AGENT_HARNESS.zh-CN.md",
    "docs/COMPARISON.md",
    "docs/COMPARISON.zh-CN.md",
    "docs/launch/README.md",
    "docs/launch/xiaohongshu/01-cover.png",
    "docs/launch/xiaohongshu/02-story.png",
    "docs/launch/xiaohongshu/03-problem.png",
    "docs/launch/xiaohongshu/04-team.png",
    "docs/launch/xiaohongshu/05-comparison.png",
    "docs/launch/xiaohongshu/06-cta.png",
    "docs/launch/xiaohongshu/caption.md",
    "docs/launch/wechat/cover-900x383.png",
    "docs/launch/wechat/images/01-proof.png",
    "docs/launch/wechat/images/02-team.png",
    "docs/launch/wechat/images/03-flow.png",
    "docs/launch/wechat/images/04-comparison.png",
    "docs/launch/wechat/article.md",
    "docs/launch/wechat/article.html",
    "docs/launch/wechat/wechat-copy.html",
    "docs/launch/ecosystem/01-stack.png",
    "docs/launch/ecosystem/02-exocrew-layer.png",
    "docs/launch/ecosystem/03-harness-vs-platform.png",
    "docs/launch/ecosystem/source/01.svg",
    "docs/launch/ecosystem/source/02.svg",
    "docs/launch/ecosystem/source/03.svg",
    "docs/launch/ecosystem/xiaohongshu-caption.md",
    "docs/launch/ecosystem/wechat-article.md",
    "tools/generate-launch-assets.mjs",
    "tools/generate-launch-copy.mjs",
    "LICENSE",
  ];
  const errors = [];
  for (const relative of required) {
    if (!(await exists(path.join(root, relative)))) {
      errors.push({ file: relative, rule: "missing-required-file" });
    }
  }

  if (errors.length === 0) {
    const plugin = JSON.parse(
      await readFile(path.join(root, "plugins/exocrew/.codex-plugin/plugin.json"), "utf8"),
    );
    const packageManifest = JSON.parse(
      await readFile(path.join(root, "package.json"), "utf8"),
    );
    const marketplace = JSON.parse(
      await readFile(path.join(root, ".agents/plugins/marketplace.json"), "utf8"),
    );
    if (
      plugin.name !== "exocrew" ||
      plugin.version !== packageManifest.version ||
      !/^\d+\.\d+\.\d+$/.test(plugin.version)
    ) {
      errors.push({ file: "plugins/exocrew/.codex-plugin/plugin.json", rule: "plugin-identity" });
    }
    const entry = marketplace.plugins?.find((candidate) => candidate.name === "exocrew");
    if (marketplace.name !== "exocrew" || entry?.source?.path !== "./plugins/exocrew") {
      errors.push({ file: ".agents/plugins/marketplace.json", rule: "marketplace-identity" });
    }

    const skillNames = [
      "exocrew-delivery",
      "product-brief",
      "engineering-guardrails",
      "test-evidence",
      "safe-operations",
    ];
    for (const skill of skillNames) {
      const skillPath = path.join(root, `plugins/exocrew/skills/${skill}/SKILL.md`);
      const content = await readFile(skillPath, "utf8");
      const keys = frontmatterKeys(content);
      if (keys.length !== 2 || keys[0] !== "name" || keys[1] !== "description") {
        errors.push({ file: path.relative(root, skillPath), rule: "skill-frontmatter" });
      }
      const openaiPath = path.join(root, `plugins/exocrew/skills/${skill}/agents/openai.yaml`);
      const openai = await readFile(openaiPath, "utf8");
      if (!openai.includes(`$${skill}`)) {
        errors.push({ file: path.relative(root, openaiPath), rule: "default-prompt-skill-name" });
      }
    }
  }

  errors.push(...(await scanTree(root)));
  return errors;
}

async function main() {
  const root = path.resolve(process.argv[2] ?? ".");
  const errors = await validateFramework(root);
  if (errors.length > 0) {
    process.stderr.write(`${JSON.stringify({ valid: false, errors }, null, 2)}\n`);
    process.exitCode = 1;
    return;
  }
  process.stdout.write(`${JSON.stringify({ valid: true, root }, null, 2)}\n`);
}

const invokedAsScript =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (invokedAsScript) {
  await main();
}
