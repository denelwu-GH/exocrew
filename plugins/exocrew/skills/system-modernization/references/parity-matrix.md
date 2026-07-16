# Parity matrix

Parity means the retained responsibility behaves as declared across old and new implementations. It is not a count of files, routes, or tests.

## Comparison dimensions

| Dimension | Questions |
|---|---|
| Entry point | Do route, method, event, job, or UI action exist where required? |
| Input | Do required, optional, null, enum, range, and cross-field rules agree? |
| Output | Do names, types, empty states, pagination, money, units, dates, and errors agree? |
| Serialization | Do timezone, precision, casing, null/omitted behavior, and consumer-dependent ordering agree? |
| Authorization | Do identity, role, ownership, unknown permission, and blocked reasons behave the same? |
| State | Are preconditions, transitions, cancellation, retries, and idempotency preserved? |
| Durable effects | Do writes, ledgers, audit events, outbox messages, and projections match expected semantics? |
| Historical shape | Do legacy nulls, old enums, partial records, and previously valid states remain readable? |
| External dependency | Do timeout, retry, duplication, auth, and fail-closed behavior remain safe? |
| User path | Can the real user complete the workflow and see failure and recovery states? |
| Operations | Can the target be configured, observed, rolled back, and cleaned up? |

Compare serialization details only when a consumer, signature, snapshot contract, or compatibility requirement depends on them. Prefer semantic equality otherwise.

## Failure attribution

Classify before editing product code:

| Bucket | Typical signal | Response |
|---|---|---|
| Product defect | New implementation violates an agreed invariant | Fix product code and add regression evidence |
| Contract decision gap | Old and new behavior differ but intended behavior is unresolved | Stop and obtain a decision |
| Fixture or seed defect | Data shape, identity, time, or permissions do not represent the claim | Repair the fixture and document the shape |
| Environment or toolchain | Dependency, port, build tool, schema, or service is unavailable | Repair or isolate the environment |
| Harness defect | Comparator, exact text, ordering, or aggregate expectation is brittle or stale | Fix the harness; do not distort correct product behavior |
| External evidence missing | Real auth, data, worker, integration, or production access is required | Keep the slice blocked and name the required evidence |

## Efficient parity loop

1. Inventory old and new entry points.
2. Select a risk-based slice instead of the whole system.
3. Define retained behavior and forbidden side effects.
4. Create aligned fixtures, identity, time, and permissions.
5. Run old and new implementations against the same scenario.
6. Compare visible output and durable effects.
7. Attribute every difference before changing code.
8. Update the per-slice readiness matrix.
9. Expand only after the slice is stable.

## False-equivalence warnings

The following do not prove parity alone:

- equal route counts
- compilation success
- the same HTTP status without body and side-effect checks
- mocks generated from the same new implementation
- a direct database assertion replacing the real user path
- a passing comparator that ignores authorization or historical data
- a local green result used as a production cutover claim

## Closeout evidence

Report:

- old and new versions
- compared slices
- fixture and environment identity
- dimensions compared and deliberately excluded
- pass, fail, skip, and blocked results
- failure attribution
- durable side-effect readback
- cleanup performed
- current and target readiness levels
