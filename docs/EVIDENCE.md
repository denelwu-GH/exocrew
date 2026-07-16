# Evidence and claim boundaries

ExoCrew separates evidence and claim types so marketing cannot silently outrun what the records support.

## 1. Founder-reported context

- The founder reports having no traditional programming background.
- One business operator reports using Codex to lead the source system over about four months.

These statements describe personal background and active working time. Git history cannot independently prove prior programming experience, human identity, or hours worked per day. The repository independently shows a 139-calendar-day first-to-last commit span.

## 2. Repository-verified facts

A read-only audit tied to one committed baseline found:

| Measure | Result | Boundary |
|---|---:|---|
| Git history span | 139 calendar days | First to last reachable commit in the audited period |
| Mainline commits | 1,869 | Current branch ancestry |
| Operator entry points | 25 | Deduplicated visible navigation entries |
| Explicit HTTP operations | 401 | Static declarations, including internal and public operations |
| Data models | 125 | Static schema declarations, not product modules |
| Database migrations | 145 | Independent migration files |
| Runtime code | about 244,799 physical lines | Includes comments and blank lines; excludes tests and operational scripts |
| Automated test/spec files | 466 | Tracked files only |
| Test-source lines | about 116,871 physical lines | Static asset count; historical execution evidence is listed separately below |
| Assertion calls | about 9,264 | Static calls, not independent test cases |
| Hard gates | 90 | Searchable risk rules |
| Architecture decisions | 249 | Durable decision records |
| Formal runbooks | 64 | Templates and index files excluded |
| Domain skills | 17 | Source-system skills, not all copied into ExoCrew |
| Release or repair retrospectives | 573 | Does not equal 573 successful production releases |

These facts establish the scale and density of the experience from which ExoCrew was distilled. They do not prove that every source feature is active, that every test passes today, or that the public framework reproduces the source application.

## 3. Historical test and release evidence

The private source repository contains identified, dated execution records rather than test files alone. Examples verified during the extraction audit include:

- a full browser end-to-end run with **88 passed, 22 skipped, and 0 failed**, followed by a successful release preflight that also passed contract, architecture, hard-assertion, script-governance, and documentation gates
- a later release candidate with **97 passed and 37 skipped** in its full end-to-end summary, followed by a successful deploy and post-verification
- a focused high-risk browser suite with **17 passed, 0 skipped, and 0 failed** across class, order, write-failure, and refund paths
- post-verification records confirming the deployed artifact identity, application health, 145 applied migrations with the schema up to date, and both application and worker processes online at that verification time

These are historical execution records tied to their respective versions and environments. They prove that the source project had complete and targeted test runs integrated into real release work. They do not claim that every test passes on every later commit, or that the private application is part of this public repository.

## 4. Production-operation evidence

The source system is not a demo. It completed real production deployment and supports ongoing enterprise operations, operational data governance, and enterprise business notifications.

This statement is backed by dated release, migration, repair, rollback, and post-verification artifacts in the private source repository. A time-bounded read-only runtime check on the publication date also received live application and health responses. Infrastructure identifiers and private operational evidence are intentionally not copied into this public repository.

This evidence proves that the extraction came from operating and changing a live system. It does not prove uninterrupted availability, suitability for every industry, or that installing ExoCrew automatically gives another project the same maturity.

## 5. Transparent estimates

A reconstruction model uses two independent cross-functional team configurations:

| Scenario | Team | Delivery time | Person-months |
|---|---|---:|---:|
| Lean production team | 1 product, 2 backend, 1 frontend, 1 test, 0.5 operations | 12–18 months | 66–99 |
| Parallel production team | 1 product, 3 backend, 2 frontend, 2 test, 1 operations | 8–12 months | 72–108 |

Taking the combined envelope and using a conservative 20 working days per person-month gives:

- **baseline full reconstruction:** 66–108 person-months, or **1,320–2,160 person-days**
- **same four-month horizon:** an average of **17–27 full-time cross-functional roles**
- **extended reconstruction scenario:** 100–150 person-months, or **2,000–3,000 person-days**, when business discovery, requirement rework, third-party integration learning, production incidents, data governance, and historical compatibility are included
- **extended four-month horizon:** an average of **25–38 roles**

The model is triangulated against the repository footprint, test assets, migration history, release evidence, and governance density. It is not an external audit, payroll record, fixed-price quote, or claim that staff scale linearly. See [EFFORT_MODEL.md](EFFORT_MODEL.md) for the complete arithmetic and boundaries.

## 6. Not yet verified

ExoCrew does not currently claim a measured percentage for:

- delivery speed improvement
- first-pass quality improvement
- escaped-defect reduction
- rework reduction
- pitfalls avoided
- expert headcount replaced

Those outcomes require a paired adoption benchmark. See [BENCHMARK.md](BENCHMARK.md).

## Public wording rules

Use:

- “distilled from a real complex system with 1,800+ mainline commits”
- “distilled from a production-deployed system used in real enterprise operations”
- “backed by documented full end-to-end and release-gate execution records”
- “designed to reduce repeated discovery and unsafe improvisation”
- “covers delivery, product, engineering, modernization, test, and operations perspectives”
- “baseline reconstruction estimate of 1,320–2,160 person-days”
- “work surface comparable to 17–27 cross-functional roles over a four-month horizon”
- “reconstruction estimate, not audited labor data”

Do not use:

- “replaces a 30–50 person team”
- “10x faster” before benchmark evidence exists
- “zero defects” or “all tests pass”
- “573 production releases”
- “enterprise-grade for every project”
- “no technical judgment required”
