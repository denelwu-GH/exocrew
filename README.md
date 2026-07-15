<div align="center">

# ExoCrew

### The delivery exoskeleton for the AI era

## Install the team you do not have.

**One non-programmer used Codex to drive a complex enterprise operations system into real production in about four months.**

ExoCrew packages the hard-won product judgment, engineering guardrails, testing skepticism, and operational discipline learned along the way — and installs them into your AI workflow.

**Not another prompt pack. An AI delivery crew that knows what to ask, what to protect, what to verify, and when not to ship.**

<p>
  <a href="https://github.com/denelwu-GH/exocrew/actions/workflows/quality-gates.yml"><img alt="Quality gates" src="https://github.com/denelwu-GH/exocrew/actions/workflows/quality-gates.yml/badge.svg"></a>
  <img alt="Distilled from production" src="https://img.shields.io/badge/source-production_distilled-0F766E.svg">
  <img alt="5 installable skills" src="https://img.shields.io/badge/installable_skills-5-7C3AED.svg">
  <img alt="1,869 mainline commits" src="https://img.shields.io/badge/mainline_commits-1%2C869-2563EB.svg">
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-16A34A.svg"></a>
</p>

**[Install in 30 seconds](#install-in-30-seconds) · [Meet the crew](#five-roles-one-delivery-system) · [See the proof](#proof-behind-the-story) · [简体中文](README.zh-CN.md)**

</div>

![ExoCrew installs five delivery roles into an AI workflow](docs/assets/install-the-crew.svg)

<p align="center"><strong>One builder owns the vision. ExoCrew helps AI deliver like a complete team.</strong></p>

## AI can write code. It cannot own delivery for you.

The hard part is not getting AI to produce another page.

The hard part is keeping business boundaries intact, architecture maintainable, tests meaningful, data changes reversible, releases recoverable, and every hard-won decision available to the next task.

**You do not need more generated code. You need a team that can carry code all the way to delivery.**

## Five roles. One delivery system.

| Role | Skill | What it gives you |
|---|---|---|
| Delivery lead | `exocrew-delivery` | Carries complex work from a vague request to verified closure |
| Product lead | `product-brief` | Makes AI clarify users, value, boundaries, and acceptance before writing |
| Engineering lead | `engineering-guardrails` | Protects architecture, contracts, and sources of truth as the system grows |
| Test lead | `test-evidence` | Turns “it passed” into defensible evidence and catches false-green results |
| Operations lead | `safe-operations` | Gives data changes, migrations, and releases a dry-run, verification, and safe way back |

These are not five chat personalities. They are five executable delivery disciplines.

![ExoCrew delivery path from vague idea to reversible release](docs/assets/idea-to-production.svg)

## Install in 30 seconds

```bash
codex plugin marketplace add denelwu-GH/exocrew
codex plugin add exocrew@exocrew
```

Start a new Codex task, then say:

```text
Use $exocrew-delivery to carry this request from a vague idea to a safe,
verified release. Define the users, boundaries, and acceptance criteria first;
then implement, verify, prepare rollback, and close the work with evidence.
```

## Distilled from real production

I am not a programmer.

With Codex, I drove a complex enterprise operations system into real production in about four months. It remains in active enterprise use for day-to-day operations, real data-governance workflows, and business notifications.

The Git evidence spans 139 calendar days and includes 1,869 mainline commits, 25 operator entry points, 401 HTTP operations, 125 data models, and a documented trail of testing, migration, release, rollback, and data-governance work.

The expensive lessons were never just about writing code. They came from business boundaries, architecture drift, false-green tests, historical data, and production releases.

**ExoCrew turns those paid-for lessons into an installable delivery system.**

## Proof behind the story

| Evidence | Audited scale | Evidence | Audited scale |
|---|---:|---|---:|
| Git history span | **139 days** | Mainline commits | **1,869** |
| Runtime + test source | **361.7k lines** | Test/spec files | **466** |
| Hard gates + architecture decisions | **90 + 249** | Runbooks + release/repair retros | **64 + 573** |

![One builder with Codex compared with a traditional delivery team](docs/assets/effort-comparison.svg)

A transparent traditional-team reconstruction model estimates the same work surface at **1,320–2,160 person-days**, comparable to **17–27 cross-functional product, engineering, test, and operations roles working over the same roughly four-month horizon**.

## Built for serious software delivery

ExoCrew is industry-agnostic and technology-stack-agnostic. It is especially useful for:

- solo builders and small teams using AI to ship real products;
- enterprise back-office systems, SaaS, internal tools, and operations platforms;
- projects that have grown from “it runs” into “we cannot afford to improvise”;
- software with real data, database migrations, continuous testing, and production releases.

## More ways to use ExoCrew

<details>
<summary><strong>Install the five skills standalone</strong></summary>

Clone the repository, preview the change, then apply it explicitly:

```bash
node plugins/exocrew/scripts/install-skills.mjs
node plugins/exocrew/scripts/install-skills.mjs --apply
```

Existing skills are not overwritten by default. Explicit `--force` replacements are backed up first.

</details>

<details>
<summary><strong>Bootstrap a governed project</strong></summary>

```bash
node plugins/exocrew/scripts/bootstrap-project.mjs --target ./my-project
node plugins/exocrew/scripts/bootstrap-project.mjs --target ./my-project --apply
```

The starter creates one decision source, current task state, hard constraints, an index, and templates for worklogs, decisions, releases, and lessons.

</details>

## Evidence notes and current boundaries

ExoCrew was distilled from real production delivery. The repository, test, commit, and governance figures above come from a version-bound read-only audit. The traditional-team comparison is a transparent reconstruction model, not audited labor data or a promise of adoption speed-up. ExoCrew does not currently claim a fixed acceleration multiplier, defect-reduction percentage, or headcount replacement; adoption impact will be measured through the public 30-task paired benchmark.

**[Full evidence](docs/EVIDENCE.md) · [Effort model](docs/EFFORT_MODEL.md) · [Benchmark](docs/BENCHMARK.md) · [Architecture](docs/ARCHITECTURE.md)**

---

<div align="center">

### Stop asking one AI to improvise as product, engineering, test, and operations.

## Install a delivery crew that knows how to work together.

**[Install in 30 seconds](#install-in-30-seconds) · [Meet the crew](#five-roles-one-delivery-system) · [Star ExoCrew](https://github.com/denelwu-GH/exocrew)**

MIT License

</div>
