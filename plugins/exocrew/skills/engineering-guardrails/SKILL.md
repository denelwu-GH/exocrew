---
name: engineering-guardrails
description: Design, implement, or review AI-generated software changes with explicit architecture boundaries, stable contracts, single sources of truth, visible failures, maintainable modules, migration safety, and preserved user changes. Use for feature implementation, bug fixes, refactoring, API or schema changes, frontend-backend coordination, or code review where fast generation risks duplication, drift, silent fallback, or brittle structure.
---

# ExoCrew Engineering Guardrails

## Purpose

Keep AI-assisted implementation coherent after the first successful demo. Put each rule in the layer that can enforce it and prove it through stable contracts.

## Inspect before editing

1. Read repository instructions and current decision sources.
2. Inspect the current implementation, tests, contracts, and call graph.
3. Check the working tree and preserve unrelated user changes.
4. Identify the real root-cause layer before choosing a file to edit.
5. Find existing shared services, schemas, mappers, helpers, and state machines before adding new ones.
6. For modernization work, record the current green baseline and preserve it unless replacement is explicitly authorized.

## Define truth and contracts

For every changed concept, state:

- durable source of truth
- derived projections or caches
- write owner
- read contract
- state transitions
- permission semantics
- error semantics
- compatibility or migration plan

Use [references/contract-checklist.md](references/contract-checklist.md) for API, form, event, and data contracts.

## Enforce separation of concerns

- Put business invariants, authorization, and state transitions in backend or domain layers.
- Keep presentation layers responsible for interaction and rendering stable contracts.
- Reuse shared domain services before creating page-specific or route-specific rules.
- Avoid duplicate DTOs, enums, validators, and fallback truth.
- Treat caches and display projections as replaceable read models, never hidden write truth.

## Make failure visible

- Do not catch and silently continue when correctness is unknown.
- Return stable, user-actionable error semantics.
- Show blocked actions with a reason when the user can see them.
- Fail closed for unknown permission, state, ownership, or destructive scope.
- Close asynchronous loops with pending, success, failure, retry, and cancellation states.

## Keep changes maintainable

Use [references/architecture-checklist.md](references/architecture-checklist.md).

Prefer:

- small cohesive modules
- explicit names and types
- dependency direction toward domain truth
- idempotent writes where retries are possible
- transactions for inseparable state changes
- tests against externally meaningful behavior

Reject:

- parallel truth sources
- permanent temporary compatibility branches
- UI-only patches that hide backend contract failures
- giant handlers or pages accumulating domain logic
- weakened validation or assertions to make checks pass
- unrelated cleanup bundled into a risky fix
- a framework template that silently replaces working repository contracts
- package moves, configuration-key changes, framework upgrades, and business rewrites combined without an inseparable reason

## Build objective quality gates

- Scope new gates to the agreed baseline; do not make all historical debt a blocker for a focused change.
- Prefer semantic and structural checks over brittle wording checks.
- Provide machine-readable output when other gates consume the result.
- Derive totals from current generated truth rather than hard-coded historical counts.
- Test a new gate failing for the intended reason before implementing it to green.
- Register the gate in the real readiness or release path.

## Handle schema and migration changes

When changing persisted data:

1. Define old and new semantics.
2. Audit existing data readiness.
3. Separate schema deployment, backfill, and behavior switch when needed.
4. Make forward and rollback compatibility explicit.
5. Require post-migration verification.
6. Route consequential operations to `$safe-operations`.

## Verify proportionally

Hand the risk surface to `$test-evidence`. Start with changed behavior and affected contracts, then expand only when dependencies or failures justify it.

If `$test-evidence` is unavailable, still record the minimum verification plan: changed behavior, affected contract or integration, critical user path, forbidden side effects, and checks not run.

For cross-language or old/new implementation parity, route the comparison scope and readiness claim to `$system-modernization`; equal route counts or successful compilation are not behavior equivalence.

## Review output

Report:

- root cause and evidence
- architecture and contract decisions
- files changed
- tests and results
- compatibility or migration impact
- remaining risk
- rollback or removal path
