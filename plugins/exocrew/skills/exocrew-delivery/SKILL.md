---
name: exocrew-delivery
description: Orchestrate evidence-gated AI software delivery from an ambiguous request through product framing, implementation, verification, operational safety, and durable closeout. Use for complex features, cross-module changes, risky fixes, project setup, modernization, migration or release work, or any request that needs product, engineering, modernization, test, and operations perspectives coordinated without losing approval boundaries.
---

# ExoCrew Delivery

## Purpose

Turn a request into a controlled delivery outcome. Keep this skill thin: classify the work, establish evidence and authority, route to role skills, and own final closure.

## Start from first principles

1. Identify the user's actual outcome and why it matters now.
2. Separate facts that can be inspected from choices only the user can make.
3. Prefer read-only evidence before proposing mutation.
4. Choose the shortest safe path to the outcome, not the most elaborate process.
5. Treat user files and existing changes as owned state; preserve them unless explicitly authorized otherwise.

## Inspect project truth

Before changing a repository, look for project-local instructions and durable truth such as:

- `AGENTS.md`
- `PROJECT_DECISIONS.md`
- `.ai/CONSTRAINTS.md`
- `.ai/TASK_STATE.md`
- `.ai/HARD_GATES.md`
- `.ai/INDEX_MAP.md`
- relevant runbooks, decision records, tests, and deployment instructions

Project truth overrides generic guidance. If these files do not exist, offer the bundled starter only when governance scaffolding would materially help.

## Classify the task

Use one primary class and split mixed work into explicit phases:

| Class | Examples | Default authority |
|---|---|---|
| Read-only diagnosis | Inspect code, logs, configuration, or external state | Proceed when in scope |
| Product definition | Clarify users, value, boundaries, and acceptance | Draft and iterate |
| Code or documentation change | Modify repository files | Require the repository's approval protocol |
| Test or browser execution | Run tests, builds, or workflows with side effects | Confirm scope and data impact |
| Data or infrastructure change | Migration, repair, credentials, production configuration | Require explicit scope and approval |
| Release | Deploy, tag, publish, or send externally | Require explicit authorization and rollback evidence |

Never let a harmless phase silently authorize a consequential phase.

## Establish the intake

Capture:

1. Outcome
2. Motivation and value
3. Scope and evidence surface
4. Non-goals
5. Acceptance evidence
6. Stop conditions
7. Authorization already granted
8. Delivery or modernization mode when the work may port, refactor, modernize, replace, or extract an existing system

Do not ask the user for facts that can be discovered safely.

## Produce the execution brief

Before consequential work, provide:

```text
Current state
Gap
Recommended plan
Alternative and tradeoff
Verification
Constraints
Current authority and missing authority
Risk and rollback
```

When the project requires approval before mutation, wait for an explicit approval phrase before changing files, running side-effecting tests, writing data, publishing, or contacting third parties.

## Route role work

- Use `$product-brief` for value, users, workflows, edge cases, and acceptance criteria.
- Use `$engineering-guardrails` for architecture, contracts, state, maintainability, and implementation boundaries.
- Use `$test-evidence` for risk-based verification and evidence quality.
- Use `$safe-operations` for migrations, data changes, releases, rollback, recovery, and post-verification.
- Use `$system-modernization` for ports, rewrites, framework upgrades, behavior parity, production replacement, and public extraction.

Load [references/role-matrix.md](references/role-matrix.md) when a task crosses three or more roles. Load [references/evidence-model.md](references/evidence-model.md) when claims depend on multiple evidence surfaces.

## Execute in controlled phases

1. Diagnose read-only.
2. Define product and technical boundaries.
3. Record the plan and acceptance criteria.
4. Obtain required approval.
5. Implement the smallest coherent change.
6. Run targeted verification; expand only when failure evidence justifies it.
7. Perform operational actions only inside their authorized window.
8. Close with actual changes, evidence, deviations, residual risk, and rollback.

Use [references/delivery-protocol.md](references/delivery-protocol.md) for detailed phase gates.

## Stop conditions

Stop and ask for direction when:

- authority is missing for a destructive or external action
- project truth conflicts with the requested path
- a hard gate fails
- the evidence surface cannot support the requested claim
- production scope, expected counts, rollback, or ownership is ambiguous
- continuing would broaden impact beyond the user's request
- target files contain overlapping uncommitted work that cannot be safely preserved or isolated
- the requested modernization mode or completion target changes materially during execution
- the user explicitly stops, cancels, or abandons the objective

Do not use uncertainty as an excuse to stop when safe read-only investigation can resolve it.

An explicit cancellation overrides historical plans and automated continuation. Preserve current evidence, record the incomplete boundary, and stop new work without calling the objective complete.

## Close the work

Report:

1. Outcome
2. Files or systems changed
3. Verification and key results
4. What was not run or not changed
5. Residual risk
6. Rollback or removal path
7. Durable lesson or follow-up, if applicable

State the evidence level precisely. A template is not a successful run, an API response is not a UI acceptance, and a historical artifact is not current production health.
