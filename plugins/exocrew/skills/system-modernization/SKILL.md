---
name: system-modernization
description: Govern system ports, rewrites, framework or language upgrades, architecture refactors, production replacements, and open-source extractions without losing contracts, business truth, or completion criteria. Use when migrating between stacks, modernizing legacy software, preserving old behavior in a new implementation, deciding whether a replacement is cutover-ready, separating a private source from a writable target, or packaging a reviewable handoff.
---

# ExoCrew System Modernization

## Purpose

Move a system toward a new technical or distribution target without confusing “new code exists” with “the old responsibility has been safely replaced.” Lock the modernization mode, inherit proven truth, expose readiness, and require evidence for every promotion.

## Inspect before choosing a path

1. Identify the source of business and contract truth.
2. Identify the writable target and every read-only or excluded workspace.
3. Inspect current architecture, tests, runtime assumptions, deployment shape, and historical compatibility constraints.
4. Run the cheapest safe toolchain and readiness checks before promising implementation.
5. Record existing green baselines and known external blockers separately.

If Git history is unavailable, use manifests, file hashes, scripts, logs, artifacts, and runtime readback instead of inventing branch evidence.

## Lock the modernization mode

Choose one primary mode before implementation:

| Mode | Primary outcome | Default compatibility |
|---|---|---|
| Port | Reproduce existing behavior in another language or runtime | Preserve observable behavior |
| Refactor | Improve internal structure without changing the public contract | Preserve contract and data semantics |
| Modernize | Upgrade framework, language, dependencies, and engineering standards | Preserve declared product behavior; allow approved technical breaks |
| Replace | Retire the old runtime with production evidence, cutover, and rollback | Require parity and operational readiness |
| Extract | Publish or reuse a clean general-purpose core without private history or data | Preserve valuable invariants, not private implementation shape |

Load [references/mode-decision.md](references/mode-decision.md) when the user mixes goals, changes the maintenance horizon, or asks for a rewrite without defining what must remain compatible.

For Extract mode, load [references/extraction-scope-matrix.md](references/extraction-scope-matrix.md) before implementation. Classify each source capability as Keep, Simplify, Pluginize, or Exclude. Preserve reusable invariants while removing private identity, data, infrastructure, and implementation history; extraction is not production replacement.

Do not silently change mode. If the work moves from porting to modernization, local implementation to production replacement, or private migration to public extraction, stop consequential work, show the changed cost and acceptance criteria, and obtain the required decision or approval.

## Establish the modernization brief

Record:

- selected mode and rejected modes
- source and target boundaries
- business truths and contracts that must survive
- approved breaks and compatibility horizon
- target readiness level
- evidence surfaces required for acceptance
- batch size and tolerated intermediate breakage
- external dependencies and blockers
- cutover, publication, rollback, and cancellation conditions

Treat a convenient short-term choice as decision debt when it is not the intended long-term architecture. Give it an owner, removal condition, and latest acceptable removal point.

Load [references/traceability-ledger.md](references/traceability-ledger.md) when work spans multiple batches, source responsibilities, or evidence surfaces. Classify unresolved items as runtime blockers, parity blockers, evidence debt, deferred scope, or external blockers instead of treating one undifferentiated backlog as readiness.

## Preserve the baseline

- Extend an existing green baseline unless the user explicitly authorizes replacement.
- Do not force a fashionable external template over working repository contracts.
- Keep package moves, configuration-key changes, framework upgrades, and business rewrites in separate batches unless inseparable.
- Preserve route, schema, error, auth, and state semantics that remain contractual.
- Keep historical debt visible, but do not make all of it a blocker for a scoped new gate.

## Inventory and batch by failure type

Scan first, then group findings into buckets such as:

- missing implementation
- structure or dependency direction
- API, DTO, event, or schema drift
- authorization or state semantics
- fixture or seed mismatch
- time-window or timezone drift
- toolchain or environment readiness
- harness or assertion defect
- external evidence still required

Fix one coherent bucket at a time. Use failing-first tests for changed behavior or new gates, run targeted verification for the bucket, and run broad readiness gates once at meaningful closeout points. Derive aggregate expectations from generated truth where possible; avoid hard-coded historical counts.

## Prove parity deliberately

Route counts and successful compilation are inventory evidence, not equivalence. Compare input, output, errors, authorization, time and numeric semantics, durable side effects, idempotency, user paths, and operational dependencies.

Load [references/parity-matrix.md](references/parity-matrix.md) when old and new implementations coexist or when a replacement claim is being made. Attribute failures to product, contract, fixture, environment, or harness before changing code.

## Track readiness separately from evidence

Use the R0-R7 ladder in [references/readiness-ladder.md](references/readiness-ladder.md). Readiness describes the state of the modernization; evidence levels describe what supports the claim. They are related but not interchangeable.

Never translate local tests, route coverage, or a green migration workspace directly into cutover-ready or production-verified language.

## Build objective gates

- Make gates executable and deterministic when possible.
- Provide machine-readable output for composition and concise human-readable output for review.
- Test the gate red before implementing it green.
- Enforce the agreed new baseline without sweeping unrelated historical debt into scope.
- Prefer semantic and structural checks over brittle wording checks.
- Register the gate in the actual readiness or release path; an orphan script is documentation, not governance.
- Reuse evidence only when the artifact, claim, environment, inputs, and time boundary still match; otherwise mark it stale and lower the supported claim.
- Use lightweight gates for documentation-only changes only when executable behavior, contracts, and registered gates are unchanged; lightweight evidence cannot promote runtime readiness.

## Handle time-sensitive verification

- Use a controlled clock or relative dates for sliding-window rules.
- Keep fixed historical dates only when historical compatibility is the subject under test.
- Name timezone and precision requirements explicitly.
- When a previously green test fails, check fixture age and environment drift before rewriting product logic.

## Close or hand off

Load [references/handoff-package.md](references/handoff-package.md) when another person or agent must review or continue the work. Include the selected mode, baseline, changed scope, current readiness, failed and skipped checks, external blockers, latest evidence, rollback, and a copy-ready continuation prompt.

If the user explicitly stops, cancels, or abandons the objective, that instruction overrides historical momentum and automated continuation. Stop new work, preserve the current artifacts, record the incomplete boundary, and do not call the objective complete.

## Route supporting work

- Use `$product-brief` when value, users, retained workflows, or extraction scope is unclear.
- Use `$engineering-guardrails` for architecture, contracts, state, implementation quality, and concurrency or race control.
- Use `$test-evidence` for parity design, regression depth, and evidence claims.
- Use `$safe-operations` for real data, cutover, deployment, rollback, or publication.
- Use `$exocrew-delivery` when the modernization crosses three or more roles or requires staged approval.

## Report

Return:

1. Mode and target readiness
2. Source, target, and excluded boundaries
3. Preserved truths and approved breaks
4. Completed batches and current buckets
5. Parity and verification evidence
6. External blockers and evidence not obtained
7. Cutover, publication, rollback, or handoff status
8. Explicit cancellation state, if applicable
