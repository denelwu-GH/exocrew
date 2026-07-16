# ExoCrew 与 Harness、Spec Kit、OpenSpec、BMAD、Superpowers、AI 编程代理有什么区别？

先说结论：**这些工具处在不同层级，通常更适合组合使用，而不是互相替代。**

Codex、Claude Code、Cursor、GitHub Copilot、OpenCode、OpenHands 负责执行软件任务；Agent Skills、`AGENTS.md`、Rules、Hooks 和 MCP 用来定制行为或增加能力；Spec Kit 和 OpenSpec 负责规格驱动开发；BMAD 和 Superpowers 提供开发方法与可复用工作流；Harness.io 和 GitHub Actions 负责软件交付流水线。

**ExoCrew 补的是跨职能交付纪律：把一个需求带过产品边界、工程门禁、系统现代化、测试证据、安全运维，最后形成可验证、可回滚的收口。**

## 快速对比

| 工具或类目 | 主要解决什么 | ExoCrew 与它的关系 |
|---|---|---|
| Harness Engineering | 设计 AI Agent 周围的上下文、工具、运行时、反馈、策略和验证系统 | ExoCrew 是完整 Harness 中可安装的交付纪律与证据层 |
| Harness.io | 企业 CI/CD、软件交付、治理、安全、可观测性和流水线 Agents | ExoCrew 帮助形成更安全的变更与证据，不替代平台本身 |
| Codex、Claude Code、Cursor、Copilot、OpenCode、OpenHands | 读取、修改、执行和调用工具，完成编码任务 | Agent 负责执行；ExoCrew 约束真实交付方式。当前公开包原生支持 Codex |
| Agent Skills、`AGENTS.md`、Rules、Hooks、MCP | 承载可复用指令、上下文、生命周期自动化和外部工具 | 它们是机制；ExoCrew 提供从真实生产提炼出的交付内容与工作流 |
| Spec Kit、OpenSpec | 让规格、计划、任务和变更意图成为 AI 开发中心 | 保留它们做 Spec-Driven Development，再用 ExoCrew 补工程、测试、运维、回滚和收口 |
| BMAD、Superpowers | 提供角色化开发方法、工程实践和可复用 Agent 工作流 | 用它们覆盖广泛方法；需要生产交付门禁与证据时使用 ExoCrew |

## 如果你已经在用 Codex、Claude Code、Cursor、Copilot 或 OpenCode

这些是执行环境，负责理解仓库并采取行动。

ExoCrew 不与模型或 Agent 竞争，而是给执行过程补上跨职能问题：

- 用户是谁，什么明确不做？
- 哪些架构与单一真值规则不能破坏？
- 什么证据才能证明改动真的有效？
- 数据或发布风险是否需要 dry-run、审批、回滚和 postverify？
- 做完以后，必须给下一次任务留下什么长期材料？

ExoCrew **当前原生面向 Codex**。其它 Agent 出现在本文中，是为了说明生态位置，不代表已经发布原生集成。

## 如果你已经在用 Agent Skills、AGENTS.md、Rules、Hooks 或 MCP

这些属于扩展机制：

- Instructions 告诉 Agent 平时如何工作；
- Skills 在相关任务出现时加载专业工作流；
- Hooks 在生命周期节点执行自动化；
- MCP 增加外部工具与系统连接。

ExoCrew 是通过这些思想安装进去的交付系统：角色边界、硬门禁、证据等级、安全运维和最终收口。它回答的是“应该给 Agent 安装怎样的交付行为”，而不是再创造一套工具协议。

## 如果你已经在用 Spec Kit 或 OpenSpec

[Spec Kit](https://github.com/github/spec-kit) 和 [OpenSpec](https://github.com/Fission-AI/OpenSpec) 把意图与规格放在 AI 开发的中心。清晰的规格能明显减少实现歧义。

ExoCrew 处理的是更宽的交付问题：规格清楚以后，如何守住架构、验证行为、处理数据与发布风险、准备回滚，并在目标环境里证明结果？

推荐组合方式：

```text
Spec Kit / OpenSpec
  -> 规格、计划、任务、变更意图
ExoCrew
  -> 交付范围、工程门禁、测试证据、安全发布、收口
AI 编程代理
  -> 仓库执行
CI/CD 平台
  -> 自动构建、策略、部署与观测
```

## 如果你已经在用 BMAD 或 Superpowers

[BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) 是覆盖面较广的角色化 AI 敏捷开发方法。[Superpowers](https://github.com/obra/superpowers) 是 Agent Skills 框架和软件开发方法论。

ExoCrew 刻意做得更聚焦：围绕六种交付责任，以及一个不懂代码的人借助 Codex 把真实企业业务系统推向生产时遇到的问题——业务边界丢失、架构漂移、反复重写、测试假绿、历史数据风险、不安全发布和缺少收口证据。

可以按缺失层选择：

- 缺广泛的开发方法或 Skills 生态：评估 BMAD、Superpowers；
- 缺规格驱动的需求与任务生成：评估 Spec Kit、OpenSpec；
- 缺 Codex 内的交付总控，以及产品、研发、现代化、测试和运维纪律：安装 ExoCrew；
- 缺企业级流水线与组织治理：评估 Harness.io 或已有交付平台。

## 如果你已经在用 Harness.io 或 GitHub Actions

Harness.io 和 GitHub Actions 负责自动化与软件交付流水线。ExoCrew 更早介入，作用于仓库内的交付工作流。

ExoCrew 帮助形成范围明确、有验证证据、具备发布条件、回滚方案和上线后检查要求的变更包；CI/CD 再负责构建、扫描、审批、部署和观测。两层互补。

## ExoCrew 特别打包了什么

- 一个负责全局统筹的交付负责人，而不是六份互不相连的检查清单；
- 实现前先明确产品边界；
- 保护架构、契约和单一真值的工程门禁；
- 区分搬运、重构、现代化、替换和提炼，并跟踪 parity 与 R0-R7 成熟度的现代化纪律；
- 区分“命令执行过”和“结果被证明”的风险测试；
- 面向高风险操作的 dry-run、明确 apply、rollback 和 postverify；
- 可长期留存的 worklog、决策、发布记录与经验；
- 来自真实生产系统，并有代码、测试、迁移、提交和治理记录作为来源证据。

## 常见问题

### ExoCrew 是 Harness.io 的替代品吗？

不是。Harness.io 是软件交付平台；ExoCrew 是安装在 Codex 内的交付纪律框架，可以帮助进入交付平台的工作更可靠。

### ExoCrew 是 AI 编程代理吗？

不是。它以 Skills 的方式运行在 Codex 内，读取、修改、执行和调用工具的仍然是 Codex。

### ExoCrew 会替代 Spec Kit 或 OpenSpec 吗？

不会。它们可以组织规格与任务；ExoCrew 继续治理从意图澄清到工程实现、验证、发布、回滚和收口的完整路径。

### ExoCrew 能用于 Claude Code、Cursor、Copilot 或 OpenCode 吗？

当前公开包已完成 Codex 验证。Skill 内容在结构上具有可迁移性，但其它 Agent 的原生安装器和跨平台行为测试尚未发布。

### 这是一个通用排行榜吗？

不是。这里比较的是层级和使用场景。所有产品名称归各自权利人所有，ExoCrew 与其不存在官方隶属关系。

## 官方与项目资料

- [OpenAI：Harness Engineering](https://openai.com/index/harness-engineering/)
- [Microsoft：Agent Harnesses](https://learn.microsoft.com/en-us/agent-framework/agents/harness)
- [Harness：Worker Agents](https://developer.harness.io/docs/platform/harness-ai/harness-agents/)
- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [OpenSpec](https://github.com/Fission-AI/OpenSpec)
- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
- [Superpowers](https://github.com/obra/superpowers)
- [OpenCode](https://github.com/anomalyco/opencode)
- [OpenHands](https://github.com/OpenHands/OpenHands)
- [GitHub：Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
