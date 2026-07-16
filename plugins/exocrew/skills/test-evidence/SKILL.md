---
name: test-evidence
description: Design and execute risk-based software verification that produces trustworthy evidence rather than false-green checks. Use for test planning, regression selection, bug-fix verification, contract tests, integration tests, end-to-end tests, release acceptance, flaky-test diagnosis, assertion review, or any claim that a change is complete, safe, or production-ready.
---

# ExoCrew Test Evidence

## Purpose

Disprove the risks introduced by a change with the smallest sufficient evidence set. Do not confuse test volume with confidence.

## Start from the claim

Write the exact claim to prove, then identify:

- behavior changed
- users and data affected
- invariants at risk
- integrations crossed
- failure states that matter
- required environment and evidence level

Load [references/evidence-quality.md](references/evidence-quality.md) when the claim crosses local, integrated, and production surfaces.

## Set risk depth

| Risk | Typical scope | Minimum verification |
|---|---|---|
| Low | Isolated copy, docs, or pure function | Static check plus focused unit test if behavior changed |
| Medium | User workflow, API contract, shared component | Changed behavior, affected contract/integration, smoke path |
| High | Authorization, money, durable state, migration, external integration | Invariant tests, integration, targeted end-to-end, rollback/readback |
| Critical | Production data, security, irreversible action | Independent review, dry-run, expected scope, controlled execution, post-verification |

Use [references/verification-matrix.md](references/verification-matrix.md) to map risks to tests.

## Prefer strong assertions

Assert business outcomes and forbidden side effects, not merely:

- status is truthy
- page contains some text
- no exception was thrown
- request returned any success code
- a fixture or mock repeated the implementation

For state changes, verify before, action, after, audit, and idempotent retry behavior when relevant.

For high-risk state machines, durable concurrent writes, money, entitlements, authorization, or irreversible multi-system effects, use two passes: an implementation-focused verification pass and an independent adversarial pass. Give the independent pass the contract, change artifact, and raw evidence—not the intended conclusion—and require it to search for missed interleavings and forbidden side effects. Route concurrency protection to `$engineering-guardrails` before declaring the tests sufficient.

## Prevent false green

- Do not skip, weaken, or widen assertions to make a test pass.
- Do not replace a failing user path with a direct database or API assertion and call the UI complete.
- Do not call a committed spec, fixture, or cleanup script an executed acceptance.
- Keep skipped, flaky, timed-out, and not-run checks visible.
- Attribute a failure before expanding tests or changing product code.
- Distinguish harness failure from product failure.
- For old/new parity, also distinguish contract-decision gaps, fixture defects, environment/toolchain failures, and missing external evidence.

## Control time-sensitive evidence

- Use a controlled clock or relative dates for sliding-window rules.
- Keep fixed historical dates only when historical compatibility is the subject under test.
- Name timezone and precision requirements explicitly.
- Check fixture age and environment drift before rewriting product logic after a previously green test fails.
- Derive changing aggregate expectations from current generated truth rather than hard-coded historical counts.

## Execute efficiently

1. Run the narrow changed-behavior check.
2. Run affected contract or integration checks.
3. Run the critical user path when the change crosses components.
4. Run broad suites only when risk, policy, or failure evidence requires them.

Do not spend time on unrelated failures without recording them as follow-up.

For system ports, framework upgrades, replacements, or public extractions, use `$system-modernization` to define the parity or extraction matrix and readiness target before selecting tests.

## Report evidence

Include:

- version or commit tested
- environment
- commands or actions
- pass, fail, skip, and not-run results
- failure attribution
- evidence level
- residual risk
- cleanup and post-verification for write tests

Use precise wording: “static validation passed,” “local targeted test passed,” or “production canary passed at time X,” not simply “all good.”
