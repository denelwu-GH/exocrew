# Active constraints

## Approval boundary

Before repository writes, side-effecting tests, data changes, infrastructure changes, release, or external publication:

1. describe current state, gap, plan, verification, constraints, risk, and rollback
2. follow the user's or repository's explicit approval protocol
3. confirm that the granted authority covers the next phase

Read-only inspection within the user's stated scope may proceed without expanding authority.

## Data and production

- Default to read-only inventory.
- Never infer production write authority.
- Use dry-run, explicit apply, expected counts, rollback evidence, and post-verification for risky writes.
- Stop when actual scope differs from expected scope.
- Do not expose secrets, private data, or infrastructure identifiers in prompts or public artifacts.

## Engineering

- Preserve unrelated user changes.
- Do not create parallel sources of truth.
- Do not weaken validation or tests to obtain a passing result.
- Make unknown, blocked, and failed states visible.
- Keep compatibility paths time-bounded and owned.

## Release

- Release only an identified committed artifact.
- Keep fix work outside the release window.
- Run preflight, deploy, declared acceptance, and post-verification in order.
- Stop or roll back on identity mismatch, gate failure, or contradicted readback.
