# Modernization traceability ledger

Use this reference when a modernization spans multiple batches, responsibilities, repositories, environments, or evidence surfaces.

## Classify unresolved work

| Class | Meaning | Readiness effect |
|---|---|---|
| Runtime blocker | The target cannot execute an in-scope responsibility safely | Blocks the corresponding functional readiness level |
| Parity blocker | Required old/new behavior or invariant differs without an approved break | Blocks parity and replacement readiness |
| Evidence debt | The implementation may be correct, but the required proof is missing, stale, or too weak | Blocks only claims that require that evidence |
| Deferred scope | The item is explicitly outside the current milestone with an owner and later decision point | Does not block the scoped milestone; remains visible |
| External blocker | Access, provider, environment, approval, or another dependency prevents completion | Blocks only the readiness level that requires that external surface |

Do not relabel a runtime or parity blocker as deferred scope merely to close a milestone.

## Maintain source-to-evidence traceability

| Source responsibility | Target capability | Contract or invariant | Mode decision | Status | Evidence | Evidence version, time, and environment | Owner or next action |
|---|---|---|---|---|---|---|---|
| Example responsibility | Target implementation | Observable rule | Keep / approved break | In progress | Test, log, review, or artifact | Commit, timestamp, environment | Named owner and next gate |

Use generated inventories where possible. Keep route, module, schema, or test counts as inventory evidence, not proof of behavior equivalence.

## Keep evidence fresh

Reuse evidence only when all of these remain equivalent:

- target artifact or commit;
- claim and acceptance scope;
- environment class and relevant configuration;
- fixtures, seed data, clock, timezone, and external contract;
- time window for health, canary, or other expiring observations.

If any condition changes, mark the evidence stale, lower the supported claim, and rerun the smallest sufficient gate. A documentation-only edit may use a lightweight gate when it changes no executable behavior, contract, assertion, or registered gate, but it cannot promote runtime readiness.

## Set gate cadence

- Run targeted checks after each coherent failure bucket.
- Run broad readiness gates at meaningful milestone closeout, not after every small file edit.
- Record failed, skipped, stale, and externally blocked evidence alongside passing evidence.
- Preserve the last known green baseline and state exactly what changed since it was collected.
