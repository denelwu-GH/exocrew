# Project decisions

This is the single index of durable project decisions. Add one independent record under `docs/adr/` for every material architecture or operating decision, then link it here.

## Active decisions

1. Each business rule, state, and durable field has one authoritative owner. Caches and projections are derived.
2. Authorization, invariants, and state transitions are enforced outside presentation-only layers.
3. Consequential writes require explicit authority, bounded scope, and recovery evidence.
4. Verification claims name the version, environment, scope, and evidence level.
5. Release artifacts come from an identified committed version and retain an executable rollback path until acceptance closes.

## Decision index

| Record | Status | Decision |
|---|---|---|
| `docs/adr/_template.md` | template | Copy this file when recording the first project-specific decision |

## Change rule

Do not silently rewrite history. Supersede a material decision with a new record and update this index.
