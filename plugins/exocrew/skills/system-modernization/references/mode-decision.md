# Modernization mode decision

## Decide from the outcome

Use the smallest mode that actually satisfies the user's outcome.

| Question | Port | Refactor | Modernize | Replace | Extract |
|---|---:|---:|---:|---:|---:|
| Must observable behavior remain equivalent? | Yes | Yes | Usually | Yes until cutover | Only retained invariants |
| Is internal structure the main change? | Sometimes | Yes | Yes | Optional | Usually |
| Are language, framework, or dependencies changing? | Usually | Not required | Yes | Often | Optional |
| Must the old runtime be retired? | No | No | No | Yes | No |
| Is public reuse or clean distribution the goal? | No | No | No | No | Yes |

## Intake questions

Answer before consequential implementation:

1. What must users be able to do when this is finished?
2. Is the goal short-term execution parity or long-term maintainability?
3. Which contracts, data semantics, workflows, and external integrations must remain compatible?
4. Which breaks are allowed, and who owns their rollout?
5. Is the old system expected to remain, coexist, or be retired?
6. Is production cutover part of this task or a later separately authorized phase?
7. Is the target private, internal, transferable, or public?
8. How much intermediate breakage is acceptable within a batch?
9. What readiness level is the actual stopping point?

## Decision output

Record:

```text
Selected mode:
Outcome:
Maintenance horizon:
Source of truth:
Writable target:
Read-only and excluded surfaces:
Contracts to preserve:
Approved breaks:
Target readiness:
Allowed intermediate breakage:
Rejected modes and tradeoffs:
Mode-change trigger:
```

## Mode-change gate

Reopen the decision when any of these changes:

- the user moves from “make it run” to “make it the long-term standard”;
- a refactor begins changing public behavior or data meaning;
- local completion becomes a production replacement request;
- a private workspace becomes a public distribution target;
- a new framework template would replace existing repository contracts;
- the cost, compatibility surface, or rollback path materially changes.

Do not treat a mode change as ordinary implementation detail. State what prior work remains valuable, what must be redone, and which new evidence becomes mandatory.

## Extraction boundary

For public or reusable extraction:

- start from a clean target rather than publishing private migration history;
- preserve general invariants and useful workflow, not private names or accidental complexity;
- remove real data, credentials, internal paths, customer identifiers, production scripts, and proprietary history;
- publish sample or synthetic data only when explicitly intended;
- run a public-boundary scan and inspect the generated package as an unauthenticated recipient.
