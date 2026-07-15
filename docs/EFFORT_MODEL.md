# Traditional-team reconstruction effort model

This document makes the ExoCrew source-system effort comparison reproducible. It estimates what a conventional cross-functional team might need to rebuild the audited production system from zero. It does not measure how much faster ExoCrew makes another project.

## Evidence base

The model is anchored to one read-only repository baseline and identified historical execution records:

| Evidence | Audited result | Why it matters |
|---|---:|---|
| Git evidence span | 139 calendar days | Independent first-to-last repository timeline |
| Mainline commits | 1,869 | Iteration and change density |
| Runtime code | about 244,799 physical lines | Implemented application surface |
| Test-source code | about 116,871 physical lines | Verification asset surface |
| Runtime + test source | about 361,670 physical lines | Combined code-and-test footprint |
| Test/spec files | 466 | Breadth of automated verification assets |
| Assertion calls | about 9,264 | Static assertion density, not test-case count |
| Operator entry points | 25 | Visible workflow surface |
| Explicit HTTP operations | 401 | Backend contract surface |
| Data models | 125 | Persistent domain surface |
| Database migrations | 145 | Schema evolution surface |
| Hard gates | 90 | Enforced engineering and operating constraints |
| Architecture decisions | 249 | Durable design-decision density |
| Formal runbooks | 64 | Repeatable operations surface |
| Release/repair retrospectives | 573 | Release, incident, and repair learning records; not 573 releases |

Historical test evidence includes a full end-to-end run with 88 passed, 22 skipped, and 0 failed, plus later targeted and release-gate records. Production evidence includes deployment, migration, repair, rollback, post-verification, data-governance, and enterprise-notification operations. Private application code and operational identifiers are not published here.

## Method

The primary method is team composition multiplied by a reasonable delivery timeline. Code volume is used as a scale cross-check, not as the sole productivity formula.

### Scenario A: lean production team

| Role | FTE |
|---|---:|
| Product | 1.0 |
| Backend | 2.0 |
| Frontend | 1.0 |
| Test | 1.0 |
| Operations/platform | 0.5 |
| **Total** | **5.5** |

Estimated duration: 12–18 months.

```text
5.5 people × 12–18 months = 66–99 person-months
```

### Scenario B: parallel production team

| Role | FTE |
|---|---:|
| Product | 1.0 |
| Backend | 3.0 |
| Frontend | 2.0 |
| Test | 2.0 |
| Operations/platform | 1.0 |
| **Total** | **9.0** |

Estimated duration: 8–12 months.

```text
9 people × 8–12 months = 72–108 person-months
```

### Combined baseline

The two team designs independently land in a similar range. The public baseline uses their combined envelope:

```text
66–108 person-months
× 20 working days per person-month
= 1,320–2,160 person-days
```

For a four-month comparison horizon:

```text
66–108 person-months ÷ 4 months
= 16.5–27 average FTE
≈ 17–27 full-time cross-functional roles
```

## Extended reconstruction scenario

The baseline assumes reasonably known requirements. The source history also contains business discovery, requirement reversal, third-party integration learning, production incidents, data governance, and historical-data compatibility. Including that work produces an explicit extended planning scenario:

```text
100–150 person-months
× 20 working days per person-month
= 2,000–3,000 person-days

100–150 person-months ÷ 4 months
= 25–37.5 average FTE
≈ 25–38 roles
```

This extended range is a planning scenario, not a direct count of payroll records.

## Actual comparison

- Founder-reported active build period: about four months.
- Repository-verifiable first-to-last commit span: 139 calendar days.
- Human configuration: one business operator using Codex.
- The repository does not prove hours worked per day, so this model does not convert the founder's time into a claimed number of personal workdays.

## Why the estimate is not a speed-up claim

The reconstruction model answers:

> What conventional cross-functional work surface would be required to reproduce the audited source system?

It does not answer:

> By what percentage will ExoCrew accelerate a different person, team, or project?

That second question requires controlled paired adoption evidence. See [BENCHMARK.md](BENCHMARK.md).

## Public claim boundary

Supported wording:

- “One operator using Codex led the source system in about four months; the Git evidence spans 139 calendar days.”
- “Baseline traditional reconstruction is estimated at 1,320–2,160 person-days.”
- “That is comparable to 17–27 cross-functional roles over the same four-month horizon.”
- “An extended scenario including discovery and production operations is 2,000–3,000 person-days.”

Unsupported wording:

- “ExoCrew is proven to make every project 17–27 times faster.”
- “One person always replaces a 30–50 person team.”
- “The estimate is an audited quote or payroll calculation.”
- “More people would reduce calendar time linearly.”
