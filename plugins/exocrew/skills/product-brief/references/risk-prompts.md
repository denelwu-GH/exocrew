# Product risk prompts

## Identity and ownership

- Which actor owns the record or action?
- Can one person have multiple roles, accounts, or related entities?
- What happens when ownership is missing or conflicting?

## State and time

- Which state is durable and which is derived?
- Are planned time, effective time, and recorded time different?
- What happens for future, historical, duplicate, or out-of-order events?

## Permissions

- Can the UI show an action the backend will reject?
- Is the reason for a blocked action visible?
- What happens when permission information is unknown?
- Is tenant, organization, or regional data scope enforced for every read and write?

## Approval and separation of duties

- Who proposes, approves, audits, and may reverse the decision?
- Is self-approval forbidden, conditional, or explicitly allowed?
- Are quorum, delegation, conflict of interest, and timeout escalation relevant?

## Data quality

- Which fields are required for save versus finalization?
- How are missing, stale, duplicated, or contradictory records handled?
- Is manual review explicit instead of silently guessed?
- Which fields contain personal or sensitive data, who may see them, and how long must they be retained?
- Must audit evidence be append-only or tamper-evident?

## Failure and recovery

- Can a partial success leave durable state inconsistent?
- Can the user retry safely?
- Is the error visible and actionable?
- What must be audited?

## Operations

- Does this change require backfill, migration, configuration, or deployment?
- What proves the change is active after release?
- How is it disabled or rolled back?
