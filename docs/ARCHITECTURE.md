# Architecture

ExoCrew is distributed as a repository-local Codex marketplace containing one plugin and five independently invokable skills.

```text
marketplace
└── exocrew plugin
    ├── exocrew-delivery        orchestration and approval gates
    ├── product-brief           value, scope, boundaries, acceptance
    ├── engineering-guardrails architecture and contract discipline
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
  -> propose plan, tests, constraints, alternative, rollback
  -> obtain approval for consequential writes
  -> implement the smallest coherent change
  -> run targeted verification
  -> perform controlled operations when authorized
  -> close with evidence, residual risk, and durable learning
```

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
