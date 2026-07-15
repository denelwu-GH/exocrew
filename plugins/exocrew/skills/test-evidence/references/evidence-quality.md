# Evidence quality

## Questions

1. Does the evidence exercise the behavior being claimed?
2. Is the environment representative enough for that claim?
3. Are assertions independent from the implementation under test?
4. Are negative states and forbidden side effects covered?
5. Are skipped and not-run checks visible?
6. Is the version and time boundary recorded?
7. Was test data cleaned up and read back after write tests?

## Common mismatches

- API success used to claim UI success
- static analysis used to claim runtime success
- local success used to claim production health
- a mock used to claim external provider compatibility
- test existence used to claim test execution
- historical evidence used to claim current state
- high coverage used to claim correct business assertions

When a mismatch exists, lower the claim or gather the missing evidence.
