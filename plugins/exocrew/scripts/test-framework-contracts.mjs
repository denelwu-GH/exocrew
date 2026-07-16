#!/usr/bin/env node

import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { validateFramework } from "./validate-exocrew.mjs";

const root = process.cwd();

async function expectRule({ name, relative, from, to, rule }) {
  const temporary = await mkdtemp(path.join(os.tmpdir(), `exocrew-${name}-`));
  try {
    await cp(root, temporary, {
      recursive: true,
      filter(source) {
        const segments = path.relative(root, source).split(path.sep);
        return !segments.includes(".git") && !segments.includes("node_modules");
      },
    });

    const target = path.join(temporary, relative);
    const content = await readFile(target, "utf8");
    if (!content.includes(from)) {
      throw new Error(`${name}: fixture fragment not found in ${relative}`);
    }
    await writeFile(target, content.split(from).join(to), "utf8");

    const errors = await validateFramework(temporary);
    if (!errors.some((error) => error.rule === rule)) {
      throw new Error(`${name}: expected validation rule ${rule}`);
    }
    return { name, rule, result: "passed" };
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

const cases = [
  {
    name: "six-role-matrix",
    relative: "plugins/exocrew/skills/exocrew-delivery/references/role-matrix.md",
    from: "| Modernization |",
    to: "| Migration helper |",
    rule: "role-modernization",
  },
  {
    name: "mode-neutral-default-prompt",
    relative: "plugins/exocrew/skills/system-modernization/agents/openai.yaml",
    from: "preserve or simplify",
    to: "preserve",
    rule: "modernization-default-prompt-scope",
  },
  {
    name: "extraction-classification",
    relative:
      "plugins/exocrew/skills/system-modernization/references/extraction-scope-matrix.md",
    from: "| Pluginize |",
    to: "| Optional extension |",
    rule: "extraction-pluginize",
  },
  {
    name: "evidence-debt-classification",
    relative: "plugins/exocrew/skills/system-modernization/references/traceability-ledger.md",
    from: "| Evidence debt |",
    to: "| Missing proof |",
    rule: "traceability-evidence-debt",
  },
  {
    name: "concurrency-routing",
    relative: "plugins/exocrew/skills/engineering-guardrails/SKILL.md",
    from: "references/concurrency-race-matrix.md",
    to: "references/architecture-checklist.md",
    rule: "engineering-concurrency-link",
  },
];

const results = [];
for (const testCase of cases) {
  results.push(await expectRule(testCase));
}

process.stdout.write(`${JSON.stringify({ negativeContracts: "passed", results }, null, 2)}\n`);
