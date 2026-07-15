# Verification matrix

| Change surface | Primary risk | Focused evidence | Expanded evidence when needed |
|---|---|---|---|
| Pure logic | Wrong branch or boundary | Unit tests around invariant and edges | Property or fuzz test for broad input space |
| API contract | Input/output drift, auth, error semantics | Contract tests with valid and invalid states | Client-server integration |
| UI action | Wrong actionability, silent failure | Component or page action test | Real browser path with visible recovery |
| State machine | Illegal transition, duplicate action | Transition matrix and idempotency | Integrated workflow with durable readback |
| Database change | Drift, loss, incompatible reads | Migration status and schema assertions | Backfill dry-run, rollback, sampled readback |
| External integration | Auth, retries, duplication, partial failure | Adapter contract and recorded fixtures | Sandbox or controlled live canary |
| Release | Wrong artifact, health regression | Build, artifact identity, health checks | Declared acceptance slice and rollback drill |

For every row, test at least one forbidden side effect when risk is medium or higher.
