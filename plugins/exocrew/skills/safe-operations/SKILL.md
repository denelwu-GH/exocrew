---
name: safe-operations
description: Plan, review, and execute consequential software operations with explicit scope, read-only inventory, dry-run, expected counts, approval, rollback, post-verification, audit evidence, and stop conditions. Use for database migrations, data repairs, infrastructure or configuration changes, deployments, releases, credential-sensitive work, background jobs, production canaries, rollback, recovery, or publication to external systems.
---

# ExoCrew Safe Operations

## Purpose

Make consequential changes boring, bounded, reversible, and evidenced. This skill does not grant authority; it enforces the authority boundary supplied by the user and project.

Release approval does not automatically authorize schema changes, backfills, or data repair. Confirm each consequential write surface and its expected impact explicitly.

## Declare the operation

Before mutation, state:

- target environment and version
- objects, keys, rows, services, or repositories in scope
- expected counts or bounded impact
- excluded scope
- authorization source
- stop conditions
- rollback owner and method
- evidence required after execution

If scope or ownership is ambiguous, continue only with safe read-only inventory.

## Build the change package

Load [references/change-package.md](references/change-package.md).

Use this order:

1. Read-only inventory
2. Dry-run with before/after and manual-review buckets
3. Explicit approval for apply
4. Preflight and backup or rollback preparation
5. Apply with expected counts and fail-closed checks
6. Immediate readback
7. Post-verification across affected consumers
8. Cleanup and audit record
9. Rollback decision or closeout

Do not combine unrelated repairs or releases into one authorization window.

## Govern data and migrations

- Treat schema, backfill, and behavior switch as separate phases when compatibility requires it.
- Record the field compatibility matrix: type, nullability, default, index or constraint, historical-data readiness, old-client behavior, and mixed-version rollout behavior.
- Reconcile migration history with actual schema before applying.
- Default repair scripts to dry-run.
- Require explicit apply flags and expected counts.
- Use transactions for inseparable writes where feasible.
- Preserve original evidence and produce a rollback artifact.
- Estimate lock, load, and downtime risk for schema work; prefer an online-safe sequence when justified and define a forward-fix strategy when reversal is unsafe.
- Route ambiguous, conflicting, or unexpectedly large samples to manual review.
- Verify every affected read model, cache, job, and user-visible consumer after the write.

## Govern releases

Load [references/release-checklist.md](references/release-checklist.md).

- Release only committed, identified artifacts.
- Separate fix work from the release window.
- Run preflight before deploy and post-verification after deploy.
- Declare the acceptance slice before release.
- Do not fix unrelated runtime issues inside the release window.
- Stop and return to the fix phase when the declared path fails.
- Keep rollback executable until acceptance is complete.

## Govern external publication

Creating repositories, releases, packages, messages, or other external state requires explicit authorization. Before publication:

- scan for secrets, private paths, private data, and internal identifiers
- verify the target account and visibility
- verify license and claims
- publish from a clean, identified commit
- read back the public artifact after publication

## Stop conditions

Stop when:

- actual scope differs from expected scope
- a backup or rollback is unavailable
- a preflight gate fails
- authorization does not cover the next action
- production version identity is uncertain
- post-verification contradicts the expected state
- a destructive command would affect user-owned data outside scope

## Closeout

Record:

- actual target and scope
- command or action executed
- counts and results
- post-verification evidence
- configuration or runtime effect
- rollback status
- residual risk and follow-up

For high-risk operations, also produce a machine-readable evidence manifest containing version, environment, action, timestamp, result, counts, and artifact paths.

Never describe a plan, dry-run, or scaffold as an applied operational result.
