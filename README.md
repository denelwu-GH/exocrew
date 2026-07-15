# ExoCrew

[![quality-gates](https://github.com/denelwu-GH/exocrew/actions/workflows/quality-gates.yml/badge.svg)](https://github.com/denelwu-GH/exocrew/actions/workflows/quality-gates.yml)

## The AI delivery exoskeleton

**Install the team you do not have.**

ExoCrew turns an AI coding agent into a more disciplined delivery partner. It adds four perspectives that solo builders usually have to hold alone: product thinking, engineering structure, test evidence, and safe operations.

It is not a code generator, a no-code platform, or a promise that one person replaces an entire company. It is a reusable system of questions, gates, templates, and stop conditions that helps people move from idea to production without treating speed as permission to skip safety.

ExoCrew is industry-agnostic and technology-stack-agnostic. It is not tied to education, e-commerce, or any other specific domain. It can support enterprise back-office systems, SaaS products, internal tools, operational management systems, and other software that must remain maintainable, testable, and safe to release.

[中文说明](README.zh-CN.md)

## The story behind it

The founder reports having no traditional programming background. With Codex, one business operator drove a real, complex business administration system in about four months; the first-to-last Git evidence spans 139 calendar days.

**This was not a demo, hackathon prototype, or speculative reference architecture.** The source system completed real production deployment and is actively used for day-to-day enterprise operations, including operational data workflows and enterprise business notifications. ExoCrew was distilled from the work of keeping that running system correct, testable, recoverable, and safe to change.

A read-only repository audit tied to one committed baseline found:

- 139 calendar days of Git history and 1,869 mainline commits
- 25 operator-facing entry points and 401 explicit HTTP operations
- 125 data models and 145 database migrations
- about 244,799 physical lines of runtime code
- 466 tracked test/spec files, about 116,871 test-source lines, and 9,264 assertion calls
- a documented full end-to-end run of 88 passed, 22 skipped, and 0 failed, followed by a successful release preflight
- 90 hard gates, 249 architecture decisions, 64 formal runbooks, 17 domain skills, and 573 release or repair retrospectives

Those numbers and historical execution records describe the production experience from which ExoCrew was distilled. They do **not** mean this repository contains that application, that every test passes forever, or that every retrospective represents a production release. See [Evidence and claim boundaries](docs/EVIDENCE.md).

![One builder with Codex compared with a traditional delivery team](docs/assets/effort-comparison.svg)

The transparent reconstruction model combines two independent team configurations with reasonable delivery timelines. It estimates **1,320–2,160 person-days**, or **17–27 full-time cross-functional roles over the same four-month horizon**, for a baseline full rebuild. An extended scenario including discovery, third-party integration learning, production incidents, data governance, and historical compatibility is **2,000–3,000 person-days**, or **25–38 roles**. See the [calculation and assumptions](docs/EFFORT_MODEL.md).

## What you install

| Skill | Role | What it protects |
|---|---|---|
| `exocrew-delivery` | Delivery lead | Scope, approval gates, routing, evidence, closure |
| `product-brief` | Product | Value, users, boundaries, alternatives, acceptance criteria |
| `engineering-guardrails` | Engineering | Contracts, architecture, single sources of truth, maintainability |
| `test-evidence` | Test | Risk-based verification, strong assertions, false-green prevention |
| `safe-operations` | Operations | Dry-run, migration, release, rollback, post-verification |

## Install as a Codex plugin

```bash
codex plugin marketplace add denelwu-GH/exocrew
codex plugin add exocrew@exocrew
```

Start a new Codex task after installation so the skills are discovered.

Example prompts:

```text
Use $exocrew-delivery to turn this request into a safe, testable delivery plan.
Use $product-brief to define the users, boundaries, and acceptance criteria.
Use $engineering-guardrails to review this implementation before it grows.
Use $test-evidence to design the smallest sufficient verification plan.
Use $safe-operations to prepare a dry-run, rollback, and post-verification package.
```

## Install standalone skills

Clone the repository, then preview the installation:

```bash
node plugins/exocrew/scripts/install-skills.mjs
```

Apply it only after reviewing the plan:

```bash
node plugins/exocrew/scripts/install-skills.mjs --apply
```

The default target is `${CODEX_HOME}/skills`, or `${HOME}/.codex/skills` when `CODEX_HOME` is unset. Existing skills are never overwritten unless `--force` is explicit; forced replacements are backed up first.

## Bootstrap a governed project

Preview the starter files:

```bash
node plugins/exocrew/scripts/bootstrap-project.mjs --target ./my-project
```

Apply after reviewing:

```bash
node plugins/exocrew/scripts/bootstrap-project.mjs --target ./my-project --apply
```

The starter creates one decision source, current task state, hard constraints, an index, and templates for worklogs, decisions, releases, and lessons. It is a governance scaffold, not a substitute for your project's business truth.

## What ExoCrew can honestly promise

ExoCrew is designed to reduce repeated discovery, missing boundaries, weak testing, unsafe data changes, and release improvisation. Exact speed, quality, and pitfall-reduction percentages are not yet claimed. The project includes a [30-task paired benchmark](docs/BENCHMARK.md) so future claims can be measured instead of invented.

The reconstruction estimate describes the source project's work surface. It does not prove that ExoCrew gives another user a specific speed-up. Measured ExoCrew adoption claims still require the paired benchmark.

## Design principles

1. Evidence before confidence.
2. Read-only diagnosis before mutation.
3. Explicit approval before consequential writes.
4. One source of truth for every durable rule.
5. Targeted verification before broad test expansion.
6. Dry-run, rollback, and post-verification for operational change.
7. A scaffold is not production proof.

## Project map

- [Architecture](docs/ARCHITECTURE.md)
- [Evidence and claim boundaries](docs/EVIDENCE.md)
- [Effort model and assumptions](docs/EFFORT_MODEL.md)
- [30-task benchmark](docs/BENCHMARK.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)

## License

MIT
