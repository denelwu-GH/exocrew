# ExoCrew vs Harness, Spec Kit, OpenSpec, BMAD, Superpowers, and AI Coding Agents

The short answer: **these tools live at different layers and usually work better together than as replacements.**

Codex, Claude Code, Cursor, GitHub Copilot, OpenCode, and OpenHands execute software tasks. Agent Skills, `AGENTS.md`, rules, hooks, and MCP customize their behavior and capabilities. Spec Kit and OpenSpec structure specifications. BMAD and Superpowers provide development methods and reusable workflows. Harness.io and GitHub Actions operate software-delivery pipelines.

**ExoCrew supplies the cross-functional delivery discipline that moves a request through product boundaries, engineering guardrails, test evidence, safe operations, and verified closure.**

## Quick comparison

| Tool or category | Primary job | Where ExoCrew fits |
|---|---|---|
| Harness Engineering | Engineer the full system around an AI agent: context, tools, runtime, feedback, policies, and validation | ExoCrew is an installable delivery-discipline and evidence layer inside that larger harness |
| Harness.io | Enterprise CI/CD, software delivery, governance, security, observability, and pipeline agents | ExoCrew prepares safer changes and evidence before a pipeline; it does not replace the platform |
| Codex, Claude Code, Cursor, Copilot, OpenCode, OpenHands | Execute coding work by reading, editing, running, and calling tools | The agent executes; ExoCrew tells it how to approach real delivery. ExoCrew is packaged for Codex today |
| Agent Skills, `AGENTS.md`, rules, hooks, MCP | Carry reusable instructions, context, lifecycle automation, and external tools | These are mechanisms; ExoCrew supplies production-distilled delivery content and workflows |
| Spec Kit and OpenSpec | Put specifications, plans, tasks, and change intent at the center of AI development | Keep them for spec-driven work; add ExoCrew for engineering, test, operations, rollback, and closure |
| BMAD and Superpowers | Provide role-based methods, development practices, and reusable agent workflows | Use them for their broader methods; use ExoCrew when you need production-derived delivery gates and evidence |

## Coming from Codex, Claude Code, Cursor, Copilot, or OpenCode?

These are execution environments. Their job is to understand a repository and take action.

ExoCrew does not compete with the model or agent. It installs the missing cross-functional questions around execution:

- Who is the user, and what is outside scope?
- Which architecture and source-of-truth rules cannot be broken?
- What evidence would prove this change works?
- Does data or release risk require dry-run, approval, rollback, and post-verification?
- What durable artifact must remain for the next task?

ExoCrew is **Codex-native today**. Other agents are listed to explain the category, not to claim a published integration.

## Coming from Agent Skills, AGENTS.md, rules, hooks, or MCP?

Those are extension mechanisms:

- instructions tell the agent how to behave;
- skills load specialized workflows when relevant;
- hooks run lifecycle automation;
- MCP adds tools and external systems.

ExoCrew is the delivery system installed through those ideas: role boundaries, hard gates, evidence expectations, safe operations, and closure. It answers “what delivery behavior should we install?” rather than inventing a new tool protocol.

## Coming from Spec Kit or OpenSpec?

[Spec Kit](https://github.com/github/spec-kit) and [OpenSpec](https://github.com/Fission-AI/OpenSpec) make intent and specifications central to AI-assisted development. That is valuable because a clear spec reduces implementation ambiguity.

ExoCrew addresses a wider delivery question: after intent is clear, how do we protect architecture, verify behavior, manage data and release risk, prepare rollback, and prove the result in the target environment?

A practical combination is:

```text
Spec Kit or OpenSpec
  -> specification, plan, tasks, change intent
ExoCrew
  -> delivery scope, engineering gates, test evidence, safe release, closure
Coding agent
  -> repository execution
CI/CD platform
  -> automated build, policy, deployment, and observation
```

## Coming from BMAD or Superpowers?

[BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) provides a broad, role-oriented method for AI-driven agile development. [Superpowers](https://github.com/obra/superpowers) provides an agentic skills framework and software-development methodology.

ExoCrew is deliberately narrower. It is built around six delivery responsibilities and the failure modes encountered while one non-programmer used Codex to drive a real enterprise operations system into production: lost business boundaries, architecture drift, endless rewrite loops, false-green tests, historical-data risk, unsafe releases, and missing closure evidence.

Choose based on the missing layer:

- need a broad development methodology or skill ecosystem: evaluate BMAD or Superpowers;
- need spec-centered requirements and task generation: evaluate Spec Kit or OpenSpec;
- need production-derived product, engineering, modernization, test, and operations discipline inside Codex: install ExoCrew;
- need governed enterprise pipelines and organizational controls: evaluate Harness.io or your existing delivery platform.

## Coming from Harness.io or GitHub Actions?

Harness.io and GitHub Actions operate automation and software-delivery pipelines. ExoCrew operates earlier and inside the repository workflow.

ExoCrew helps produce a change package with defined scope, evidence, release conditions, rollback, and post-verification expectations. CI/CD then builds, scans, approves, deploys, and observes it. The two layers are complementary.

## What ExoCrew uniquely packages

- one delivery lead that coordinates the full task rather than leaving six disconnected checklists;
- product boundaries before implementation;
- engineering rules that protect contracts and sources of truth;
- modernization discipline that separates porting, refactoring, upgrading, replacing, and extracting while tracking parity and R0-R7 readiness;
- risk-based testing that distinguishes execution from evidence;
- dry-run, explicit apply, rollback, and post-verification for risky operations;
- durable worklogs, decisions, release records, and lessons;
- methods distilled from a production system with audited code, tests, migrations, commits, and governance records.

## FAQ

### Is ExoCrew a Harness.io alternative?

No. Harness.io is a software-delivery platform. ExoCrew is a Codex-native delivery-discipline framework that can improve the work entering a delivery platform.

### Is ExoCrew an AI coding agent?

No. It runs as skills inside Codex. Codex remains the agent that reads, edits, runs, and uses tools.

### Does ExoCrew replace Spec Kit or OpenSpec?

No. They can structure specifications and tasks; ExoCrew can govern the wider path from clarified intent through engineering, verification, release, rollback, and closure.

### Does ExoCrew work with Claude Code, Cursor, Copilot, or OpenCode?

The public package is validated for Codex today. The skill content is structurally portable, but native installers and cross-agent behavior tests have not been released.

### Is this a universal ranking?

No. The comparison explains layers and use cases. Product names belong to their respective owners, and ExoCrew is not affiliated with them.

## Official and project references

- [OpenAI: Harness engineering](https://openai.com/index/harness-engineering/)
- [Microsoft: Agent harnesses](https://learn.microsoft.com/en-us/agent-framework/agents/harness)
- [Harness: Worker Agents](https://developer.harness.io/docs/platform/harness-ai/harness-agents/)
- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [OpenSpec](https://github.com/Fission-AI/OpenSpec)
- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
- [Superpowers](https://github.com/obra/superpowers)
- [OpenCode](https://github.com/anomalyco/opencode)
- [OpenHands](https://github.com/OpenHands/OpenHands)
- [GitHub: About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
