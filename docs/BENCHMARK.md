# ExoCrew 30-task adoption benchmark

The benchmark exists to measure value rather than invent percentages.

## Research question

Compared with using the same AI coding environment without ExoCrew, does ExoCrew reduce delivery time, rework, missing acceptance steps, escaped defects, and unsafe operational attempts?

## Task set

Create 30 matched tasks, five in each category:

1. Product definition and acceptance boundaries
2. Backend business rules and API contracts
3. Frontend actions, states, and error recovery
4. Automated tests and regression diagnosis
5. Data migration or repair planning
6. Release, rollback, and post-verification

Each task must have a difficulty label, an expected evidence surface, an independent acceptance rubric, and a four-to-eight-hour maximum working window.

Across the 30 tasks, include at least three modernization scenarios without increasing the task count:

1. A cross-language or cross-runtime port that must preserve a declared API and durable side effects
2. A framework or language upgrade that must improve the engineering baseline without replacing the public contract
3. A public or reusable extraction that must preserve valuable invariants while excluding private history, paths, identifiers, and data

Score these scenarios on mode selection, retained-contract accuracy, parity attribution, readiness-claim accuracy, and handoff quality in addition to their primary category rubric.

## Study design

- Recruit participants with at least two experience bands, including first-time AI builders.
- Use paired tasks with randomized order.
- Each participant completes matched work once with the normal AI environment and once with ExoCrew.
- Swap the order for half the participants to reduce learning effects.
- Keep tools, model access, repository state, time limits, and acceptance rubrics constant.
- Use blind reviewers who do not know which workflow produced the artifact.

## Metrics

### Speed

- median time to first accepted result
- median time to first green targeted verification
- number of manual expert interventions

### Quality

- first-pass acceptance rate
- independently scored contract and architecture defects
- 7-day and 30-day escaped defects
- rollback or recovery events

### Pitfalls and rework

- missing acceptance steps
- unsafe write attempts
- repeated fix cycles
- gates that caught a real issue before execution

### Usability

- installation success rate
- time to first useful result
- completion rate without expert intervention
- participant confidence calibrated against reviewer results

## Reporting

Report sample size, task distribution, medians, paired deltas, and bootstrap 95% confidence intervals. Publish null or negative results. Do not convert gate counts into “pitfalls avoided” unless the blocked action is independently confirmed as harmful.

Recommended formulas:

```text
speed improvement = 1 - median ExoCrew time / median baseline time
escaped-defect reduction = 1 - ExoCrew escaped-defect rate / baseline rate
rework reduction = baseline median fix cycles - ExoCrew median fix cycles
```

Percentages become public claims only after the task set, rubric, raw anonymized results, and analysis method are published together.
