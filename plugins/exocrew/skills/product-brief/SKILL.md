---
name: product-brief
description: Turn an idea, feature request, workflow problem, or vague AI-building prompt into a concise, value-led product brief with users, current state, scope, non-goals, page or process logic, abnormal cases, measurable acceptance criteria, alternatives, and ROI. Use before implementation when the desired outcome or business rules are incomplete, contradictory, or likely to cause rework.
---

# ExoCrew Product Brief

## Purpose

Convert intent into an implementable product contract. Optimize for clarity and decision quality, not document length.

## Establish value first

Answer:

1. Who has the problem?
2. What job are they trying to complete?
3. What happens today?
4. Why is the gap costly or risky?
5. What measurable outcome should change?

If the motivation is weak or the proposed path is not the shortest route to value, say so before designing the feature.

If the object being changed, the business consequence, or the decision owner is still unknown, produce a decision brief and stop before implementation. Do not turn a convenient assumption into a durable product rule.

## Build the brief

Use this order:

```text
Outcome and value
Users and permissions
Current state
Gap
Scope
Non-goals
Workflow or page logic
Actions and state transitions
Abnormal and boundary cases
Data and field semantics
User-facing copy
Acceptance criteria
Dependencies and rollout
Alternative and tradeoff
```

Load [references/brief-template.md](references/brief-template.md) when producing a reusable artifact.

## Design the complete path

For each page, process, or action, define:

- entry condition
- information shown
- primary and secondary actions
- disabled or blocked reasons
- success feedback
- visible failure feedback
- recovery path
- state before and after
- authorization and audit needs

Do not stop at the happy path. Use [references/risk-prompts.md](references/risk-prompts.md) to expose common omissions.

## Keep rules testable

Replace vague words such as “fast,” “large,” “recent,” “complete,” or “enterprise-ready” with observable rules. Define dates, thresholds, ownership, ordering, idempotency, and conflict behavior where they matter.

Each acceptance criterion should identify:

- starting state
- user action or event
- expected visible result
- expected durable state
- forbidden side effect
- evidence required

## Separate evidence from assumption

Label important statements as:

- verified fact
- user decision
- transparent estimate
- assumption to validate
- out of scope

Do not present a repository metric, prototype, or anecdote as user-value proof without a measurement plan.

## Review before handoff

Check:

1. The user and value are explicit.
2. Scope and non-goals prevent expansion.
3. Every action has state, failure, and recovery semantics.
4. Permissions and unknown states fail closed where risk requires it.
5. Data terms have one meaning and one owner.
6. Acceptance criteria are independently testable.
7. An alternative and its tradeoff are visible.
8. The expected value justifies the implementation and operating cost.

Hand the accepted brief to `$engineering-guardrails` and `$test-evidence`.
