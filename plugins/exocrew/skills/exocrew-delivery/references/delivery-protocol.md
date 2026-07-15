# Delivery protocol

## Phase 1: Diagnose

- Establish the repository, environment, runtime, data, browser, or external-system evidence surface.
- Inspect project instructions and existing user changes.
- If target files already contain unrelated uncommitted work, isolate the task in a safe worktree or stop for an ownership decision; never mix or overwrite silently.
- Reproduce or verify the current state without mutation when possible.
- Record what the evidence proves and what it cannot prove.

Exit when the problem, target outcome, and likely risk class are clear.

## Phase 2: Define

- State value, users, scope, non-goals, dependencies, and acceptance evidence.
- Identify the durable source of truth for each rule and state transition.
- Separate the recommended path from alternatives and rejected shortcuts.
- Declare operational, data, security, and rollback constraints.

Exit when another competent operator could execute the plan without guessing the goal.

## Phase 3: Approve

- Follow repository-specific approval rules.
- Record authority already granted and authority still missing as separate fields.
- Make destructive, production, publishing, and external-message actions explicit.
- Do not infer approval for materially broader work.

Exit only when authority covers the next consequential phase.

## Phase 4: Implement

- Preserve unrelated user changes.
- Change the smallest coherent set of files or systems.
- Keep business rules out of presentation-only layers.
- Make failure visible and recovery actionable.
- Update durable documentation when the change alters future execution.

Exit when the requested behavior exists and no known implementation step remains.

## Phase 5: Verify

- Test the changed behavior first.
- Add contract, integration, or end-to-end coverage in proportion to risk.
- Attribute failures before broadening the test surface.
- Distinguish static validation, local execution, staging, and production evidence.

Exit when acceptance criteria are supported by the required evidence level.

## Phase 6: Operate

- Use dry-run, expected scope, explicit apply, rollback, and post-verification for risky writes.
- Keep release windows limited to release actions and declared acceptance.
- Leave follow-up debt visible instead of fixing unrelated issues inside the release window.

Exit when the system is verified or the rollback decision is made.

## Phase 7: Close

- Record actual changes, deviations, evidence links, residual risk, and rollback.
- Convert reusable failures into a lesson, test, gate, or runbook.
- Do not call unfinished evidence complete.
