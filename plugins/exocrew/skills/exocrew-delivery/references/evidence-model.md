# Evidence model

## Evidence levels

| Level | Evidence | Supports | Does not support |
|---|---|---|---|
| E0 | Plan, template, scaffold | Readiness to attempt | Execution success |
| E1 | Static inspection or validation | Structure and contract shape | Runtime behavior |
| E2 | Local targeted execution | Changed behavior in the local environment | Production health |
| E3 | Integrated or end-to-end execution | Cross-component behavior in the tested environment | Uninterrupted future operation |
| E4 | Production readback or canary | Time-bounded production behavior | Universal reliability |

## Evidence rules

- Name the environment, version, time boundary, and scope.
- Prefer direct evidence over historical narrative.
- Keep failed and skipped checks visible.
- Do not promote a lower evidence level with confident wording.
- When evidence is time-sensitive, state when it was captured.
- When using estimates, publish assumptions separately from verified facts.
