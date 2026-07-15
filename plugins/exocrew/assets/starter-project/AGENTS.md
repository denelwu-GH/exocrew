# Project collaboration contract

The delivery standard is correct, testable, reversible, and traceable work.

## Working principles

1. Start from the user's outcome and the evidence, not from an assumed solution.
2. Inspect project truth and existing changes before editing.
3. Prefer the shortest safe path and preserve unrelated user work.
4. Separate read-only diagnosis, implementation, testing, data change, release, and publication authority.
5. Never let approval for a low-risk phase silently authorize a higher-risk phase.

## Default brief

Before consequential work, report:

- Current state
- Gap
- Recommended plan
- Alternative and tradeoff
- Verification
- Constraints
- Risk and rollback

Follow the approval rule in `.ai/CONSTRAINTS.md` before mutation.

## Execution order

1. Read `PROJECT_DECISIONS.md`.
2. Read `.ai/CONSTRAINTS.md` and `.ai/TASK_STATE.md`.
3. Find relevant gates in `.ai/HARD_GATES.md`.
4. Use `.ai/INDEX_MAP.md` to locate the governing record or runbook.
5. Record planned work in `docs/worklog/` when the repository requires durable traceability.
6. Implement the smallest coherent change.
7. Verify in proportion to risk.
8. Close with actual changes, results, deviations, remaining risk, and rollback.

## Evidence language

- A plan or scaffold is readiness evidence, not execution evidence.
- Static validation does not prove runtime behavior.
- Local tests do not prove production health.
- API success does not prove a user-interface path.
- Historical evidence does not prove the current version.

## Operational safety

Production data, infrastructure, deployment, credentials, external publication, and destructive actions require explicit scope and approval. Use read-only inventory, dry-run, expected impact, rollback, and post-verification where applicable.
