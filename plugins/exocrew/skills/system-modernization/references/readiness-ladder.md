# Modernization readiness ladder

Readiness is a state of the modernization effort. Evidence level is the strength and environment of proof supporting that state. Track both.

| Level | State | Minimum claim | Typical proof |
|---|---|---|---|
| R0 | Intent defined | The outcome and mode are explicit | Approved decision brief |
| R1 | Architecture and contracts defined | The target shape and preserved truths are reviewable | Decision records, contract matrix, migration plan |
| R2 | Scaffolded | The target structure can be built or inspected | Static validation, compile, generated skeleton |
| R3 | Locally functional | Declared local workflows pass in the target environment | Targeted tests, local integration, local smoke |
| R4 | Contract or behavior parity verified | Selected old/new slices match their declared contract | Paired fixtures, side-effect readback, UI/API parity |
| R5 | Real-environment dependencies ready | Real schema, auth, data shape, workers, and integrations have evidence | Read-only preflight, staging or controlled canary |
| R6 | Cutover ready | Artifact, rollout, rollback, monitoring, and acceptance are prepared | Release candidate, rollback drill, cutover checklist |
| R7 | Production verified | The target is live and time-bounded production readback passed | Artifact identity, health, user path, data readback |

## Promotion rules

- Promote only the declared scope; one R4 module does not make the whole system R4.
- Keep failed, skipped, excluded, and externally blocked slices visible.
- Do not promote from R3 directly to R6 because route coverage or tests are green.
- R5 and above require evidence from the target-like or real environment, not repository narrative.
- R7 is time-bounded. State version, environment, time, scope, and observed result.

## Evidence mapping

Evidence and readiness are orthogonal:

| Evidence | What it can usually support |
|---|---|
| E0 plan or template | R0-R1 readiness to attempt |
| E1 static inspection | R1-R2 structure and contract shape |
| E2 local execution | R3 and limited R4 slices |
| E3 integrated or end-to-end execution | R4 and target-like R5 slices |
| E4 production readback or canary | R5-R7 within the observed scope |

A higher evidence level does not repair a missing contract. A production health endpoint can be E4 while still proving only a narrow R7 health slice, not full business parity.

## Status format

Use a per-slice matrix:

```text
Slice:
Current readiness:
Target readiness:
Evidence level:
Passed evidence:
Failed or skipped evidence:
External blocker:
Next promotion condition:
Owner:
```

## Safe claim language

- R2: “The target scaffold builds and passes static validation.”
- R3: “The declared local workflow passed in environment X.”
- R4: “The listed contract slices matched across old and new implementations.”
- R5: “The named real-environment dependencies passed the stated preflight.”
- R6: “The candidate is prepared for the authorized cutover window.”
- R7: “Version X passed the listed production readback at time Y.”

Avoid “done,” “fully migrated,” “production-ready,” or “equivalent” without scope and promotion evidence.
