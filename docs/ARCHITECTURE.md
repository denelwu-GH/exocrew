# Architecture

ExoCrew is distributed as a repository-local Codex marketplace containing one plugin and six independently invokable skills.

## Position in the AI coding stack

ExoCrew is a **delivery-discipline layer**, not a foundation model, coding-agent runtime, MCP server, specification engine, or CI/CD platform.

```text
foundation model
  -> coding-agent runtime (Codex)
  -> ExoCrew delivery skills
  -> project tools, tests, and release evidence
  -> CI/CD and software-delivery platform
```

Agent Skills and repository instructions are the delivery mechanisms. ExoCrew supplies delivery coordination, product, engineering, modernization, test, and operations behavior through those mechanisms. Spec-driven frameworks can feed clearer intent into the same workflow; CI/CD platforms can enforce and execute the resulting release package.

The public package is installed and validated for Codex today. Other coding agents and platforms are ecosystem context, not claimed native integrations. See [the AI agent harness guide](AI_AGENT_HARNESS.md) and [the ecosystem comparison](COMPARISON.md).

```text
marketplace
└── exocrew plugin
    ├── exocrew-delivery        orchestration and approval gates
    ├── product-brief           value, scope, boundaries, acceptance
    ├── engineering-guardrails architecture and contract discipline
    ├── system-modernization   ports, upgrades, parity, readiness, extraction, cutover
    ├── test-evidence           risk-based verification and evidence quality
    └── safe-operations         data, migration, release, rollback, recovery
```

## Why multiple skills

A single large skill tends to trigger too broadly and carry irrelevant context. ExoCrew keeps one thin orchestrator and routes detailed work to role-focused skills. Each role skill keeps its core workflow in `SKILL.md` and loads references only when the task needs them.

## Delivery flow

```text
request
  -> classify risk and evidence surface
  -> clarify value, scope, non-goals, and acceptance
  -> inspect project truth
  -> lock port, refactor, modernize, replace, or extract mode when an existing system is changing
  -> propose plan, tests, constraints, alternative, rollback
  -> obtain approval for consequential writes
  -> implement the smallest coherent change
  -> run targeted verification
  -> perform controlled operations when authorized
  -> close with evidence, residual risk, and durable learning
```

Modernization readiness is intentionally separate from evidence strength. The R0-R7 ladder describes how far a port, refactor, upgrade, replacement, or extraction has progressed; E0-E4 describes what kind of evidence supports the claim. A locally functional R3 target can have strong local E2 evidence without being R6 cutover-ready.

## Starter project

The bundled starter provides a small governance spine:

- `PROJECT_DECISIONS.md`: the only durable decision source
- `.ai/TASK_STATE.md`: current objective, next step, and risks
- `.ai/CONSTRAINTS.md`: temporary hard constraints
- `.ai/HARD_GATES.md`: searchable gate index
- `.ai/INDEX_MAP.md`: navigation to durable project truth
- `docs/worklog/`: execution plans and wrap-ups
- `docs/adr/`: one decision per record
- `docs/release/`: release evidence and rollback notes
- `docs/lessons/`: reusable lessons by topic

The starter is intentionally technology-neutral. A target project must add its own domain truth, data boundaries, test commands, deployment process, and authorization model.
