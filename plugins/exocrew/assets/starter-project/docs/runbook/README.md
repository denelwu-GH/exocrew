# Runbooks

Store repeatable, operationally useful procedures here.

A runbook should define:

- purpose and triggering condition
- target environment and required authority
- prerequisites and read-only inventory
- exact scope and stop conditions
- dry-run or preflight
- execution
- expected results and post-verification
- rollback or recovery
- artifacts and audit record

Do not use a runbook to hide a product or architecture decision. Put durable rules in `PROJECT_DECISIONS.md` and link them from the procedure.
