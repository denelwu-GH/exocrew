# Architecture checklist

## Truth

- Is there one durable source of truth for each rule and state?
- Are caches, snapshots, and projections clearly derived?
- Can a stale read model accidentally drive a write?

## Boundaries

- Is domain logic located where it can be enforced for every caller?
- Does the UI consume a stable contract instead of recreating business rules?
- Does a route or controller orchestrate rather than become the domain service?

## Coupling

- Is an existing service, helper, schema, mapper, or state machine reusable?
- Does the change create a second representation of the same concept?
- Can modules evolve independently without copying rules?

## Failure

- Are unknown and invalid states explicit?
- Are errors stable, visible, and recoverable?
- Can retries duplicate durable writes?
- Can partial success leave an inconsistent chain?

## Maintainability

- Are modules cohesive and names unambiguous?
- Are large files or complex branches growing without a split boundary?
- Is the behavior documented at the durable decision source?
- Can the change be removed or rolled back safely?
