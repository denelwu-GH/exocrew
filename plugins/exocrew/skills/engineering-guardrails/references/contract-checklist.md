# Contract checklist

## Input

- Required, optional, nullable, and omitted states are distinct.
- Length, format, range, enum, and cross-field rules agree across clients and servers.
- Unknown fields and unsupported versions have defined behavior.

## Authorization

- The backend enforces access independently of UI visibility.
- Allowed, blocked, and unknown states are explicit.
- Blocked reasons are stable enough for the UI to present.

## Output

- External contracts do not expose internal identifiers without a use case.
- Dates, money, units, pagination, and empty results have one meaning.
- Error codes and messages distinguish validation, conflict, permission, missing data, and system failure.

## State change

- Preconditions and idempotency behavior are explicit.
- Transactions cover inseparable writes.
- Audit metadata identifies actor, reason, time, and source where risk requires it.
- Retry, timeout, cancellation, and duplicate delivery are considered.

## Evolution

- Compatibility is time-bounded and owned.
- Migration and backfill readiness are measured.
- Old contract removal has a verification gate.
