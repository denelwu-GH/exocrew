# Concurrency and race matrix

Use this reference when a durable state can be changed by concurrent requests, retries, workers, callbacks, rebuilds, backfills, or mixed application versions.

## Inventory command pairs

| Command pair | Shared durable truth | Unsafe interleaving | Durable arbiter | Expected winner and loser | Audit or recovery | Verification evidence |
|---|---|---|---|---|---|---|
| Execute / execute | State plus one-time effect | Duplicate effect before either caller observes completion | Unique constraint, idempotency key, transaction | One success; one stable duplicate result | Actor and duplicate key | Controlled concurrent test plus durable readback |
| Execute / cancel | State and compensation | Effect commits while cancellation assumes it did not | State transition guard, lock, transaction | Declared transition wins; loser receives conflict | Both attempts recorded | Barrier-controlled interleaving |
| Retry / callback | Delivery or payment record | Both paths apply the same external result | External event identity plus unique constraint | First application wins; later delivery is idempotent | Source event identity | Duplicate-delivery contract test |
| Rebuild / live write | Projection and source truth | Rebuild overwrites a newer live update | Snapshot boundary, version check, swap strategy | Newest valid version survives | Rebuild version and cutover | Write-during-rebuild test |
| Backfill / current write | Historical and current fields | Backfill replaces a fresh operator value | Conditional update, version predicate, ownership rule | Current write survives unless explicitly superseded | Changed and skipped counts | Dry-run plus collision fixture |
| Old runtime / new runtime | Mixed-version schema or contract | One version writes a shape the other misreads | Expand-contract sequence and compatibility gate | Both versions remain safe during the window | Version identity | Mixed-version integration test |

Add project-specific pairs. Do not treat the example rows as proof that a pair was tested.

## Select durable defenses

Prefer defense in this order:

1. Encode impossible duplicates or illegal states as database constraints when the data model allows it.
2. Put inseparable reads, checks, writes, and effects inside the correct transaction boundary.
3. Use locks or serialization when order matters and a constraint alone cannot express the rule.
4. Use stable idempotency identities for retries, callbacks, and at-least-once delivery.
5. Add reconciliation for failures that cross systems and cannot be atomic.

Code-level locks may improve behavior but do not replace a durable uniqueness or state invariant across processes.

## Verify adversarially

- Force the unsafe ordering with barriers, hooks, controlled delays, or deterministic fakes; a fast repeated loop is weaker evidence.
- Assert the final durable state, number of irreversible effects, loser semantics, audit trail, and retry result.
- Run the pair in both orderings when either command can legitimately win.
- Include crash, timeout, and retry after partial progress when work crosses a transaction or system boundary.
- For high-risk workflows, give an independent reviewer the contracts, diff, and raw test evidence without the intended conclusion; require them to search for missed interleavings and forbidden side effects.
