# Hard gates

| ID | Gate | Required response |
|---|---|---|
| G1 | User outcome or acceptance evidence is unclear | Continue read-only discovery or ask for the missing decision |
| G2 | Working tree contains unrelated changes | Preserve them and isolate the requested scope |
| G3 | Consequential mutation lacks authority | Stop before mutation |
| G4 | Durable rule would gain a second source of truth | Reuse or migrate to one owner |
| G5 | Authorization or ownership is unknown | Fail closed and expose the reason |
| G6 | Test assertion does not exercise the claimed behavior | Replace it with behavior and forbidden-side-effect evidence |
| G7 | A data operation lacks dry-run, expected scope, rollback, or post-verification | Do not apply |
| G8 | Migration history and actual schema disagree | Reconcile before deployment |
| G9 | Release candidate is uncommitted or unidentified | Do not release |
| G10 | Preflight, artifact identity, or declared acceptance fails | Stop the release window and choose fix or rollback |
| G11 | Public artifact contains secrets, private paths, private data, or internal identifiers | Block publication |
| G12 | Evidence level is lower than the claim | Lower the claim or gather stronger evidence |
