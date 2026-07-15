# AI Agent、Skill、Harness、Spec、CI/CD 到底有什么区别？一张图讲清 AI 软件交付生态

最近，AI 编程领域出现了越来越多热门词汇：Coding Agent、Agent Skills、Harness Engineering、Spec-Driven Development、MCP、Multi-Agent、CI/CD。

它们经常被放进同一个榜单里比较，好像开发者必须从中选一个。

但真正理解以后会发现：**它们处在不同层级，解决的是不同问题。**

![AI 软件交付生态的五个层级](https://raw.githubusercontent.com/denelwu-GH/exocrew/main/docs/launch/ecosystem/01-stack.png)

## 第一层：基础模型提供智能

基础模型负责推理、生成和判断。它可以理解需求、分析代码并提出解决方案。

但模型本身只能产生输出。要让它真正读取项目、修改文件、执行命令和持续推进任务，还需要 Coding Agent。

## 第二层：AI 编程代理负责执行

Codex、Claude Code、Cursor、GitHub Copilot、OpenCode、OpenHands 等工具属于 AI Coding Agent 或其运行环境。

它们的核心价值，是把模型连接到真实仓库和工具：搜索代码、编辑文件、运行测试、调用外部系统，并在多个步骤之间持续工作。

Agent 解决的是“谁来行动”。

但它并不会天然知道，业务边界是什么、架构里哪些规则不能破坏、什么测试证据才值得相信，以及数据或生产发布前什么时候必须停下来。

## 第三层：Skills、Rules 和 MCP 提供上下文与能力

Agent Skills、`AGENTS.md`、Rules、Hooks 和 MCP 属于扩展机制。

- Instructions 和 Rules 告诉 Agent 平时如何工作；
- Skills 在相关任务出现时加载专业流程；
- Hooks 在生命周期节点自动执行动作；
- MCP 给 Agent 增加外部工具和系统连接。

它们解决的是“怎样把规则、专业知识和工具交给 Agent”。

但机制本身并不等于交付方法。就像有了操作系统和应用商店，并不代表你已经装好了适合自己的专业软件。

## 第四层：Spec 与开发方法组织意图

Spec Kit、OpenSpec 把规格、计划、任务和变更意图放在 AI 开发中心；BMAD、Superpowers 则提供更完整的角色化开发方法或可复用工作流。

它们能帮助团队回答：要做什么、为什么做、分成哪些任务、采用什么开发流程。

这些方法很有价值，但真实生产交付还会继续遇到其它问题：架构漂移、字段契约、测试假绿、历史数据、迁移、发布、回滚和上线后验证。

## 第五层：ExoCrew 补上生产交付纪律

![ExoCrew 所补的生产交付层](https://raw.githubusercontent.com/denelwu-GH/exocrew/main/docs/launch/ecosystem/02-exocrew-layer.png)

ExoCrew 不是新的基础模型，也不是另一个 Coding Agent。

它是一套安装在 Codex 里的生产交付 Harness，把传统团队中五种关键责任装进 AI 工作流：

- 产品负责人：先明确用户、价值、边界和验收；
- 研发负责人：守住架构、契约和单一真值；
- 测试负责人：根据风险设计验证，拒绝假绿；
- 运维负责人：为数据、迁移和发布准备 dry-run、回滚与 postverify；
- 交付负责人：统筹范围、风险、证据和最终收口。

Agent 负责写和执行，ExoCrew 负责让它有纪律地把事情真正交付。

## Harness Engineering 和 Harness.io 不是一回事

![Harness Engineering 与 Harness.io 的区别](https://raw.githubusercontent.com/denelwu-GH/exocrew/main/docs/launch/ecosystem/03-harness-vs-platform.png)

Harness Engineering 是一个工程类目：围绕模型和 Agent 设计上下文、工具、规则、验证循环、权限和运行环境。

Harness.io 则是一家企业软件公司及其软件交付平台，提供 CI/CD、治理、安全、可观测性和运行在流水线中的 AI Agents。

ExoCrew 属于 Harness Engineering 这个语境中的交付纪律与证据层。它可以帮助项目形成更清晰的范围、更安全的变更、更可信的测试证据和可回滚的发布包，再交给 Harness.io、GitHub Actions 或其它 CI/CD 平台执行。

所以它们并不互相替代。

## 一套实际组合可以是什么样

```text
Spec Kit / OpenSpec
  -> 规格、计划、任务、变更意图

Codex + ExoCrew
  -> 仓库执行、产品边界、工程门禁、测试证据、安全发布、收口

GitHub Actions / Harness.io
  -> 构建、扫描、审批、部署和观测
```

## 为什么这对一个人开发特别重要

大型团队可以让产品、研发、测试和运维互相检查。一个人借助 AI 开发时，这些责任很容易全部压在同一段对话里。

结果就是 AI 写得很快，但需求边界、架构约束、验证质量和发布安全不断丢失。

ExoCrew 来自一次真实实践：一个不懂代码的人，借助 Codex，在约四个月里独立推进出一套真实上线、持续运行的复杂企业业务系统。真正有价值的不是某一段代码，而是几百次踩坑后留下来的交付纪律。

## 当前支持边界

ExoCrew 当前已经完成 Codex 的原生打包、安装和验证。它采用 `SKILL.md` 结构，与 Agent Skills 的发展方向一致，但 Claude Code、Cursor、Copilot、OpenCode 等平台的原生安装器和跨平台行为验证尚未发布。

因此，本文对其它工具的介绍用于解释生态位置，不代表官方合作或已经完成原生集成。

## 最后

模型决定智能上限，Agent 决定执行能力，Spec 决定意图是否清楚，Harness 决定过程是否可靠，CI/CD 决定发布如何被执行。

ExoCrew 想解决的是其中一个具体问题：

**当你没有完整产品、研发、测试和运维团队时，怎样让 AI 仍然按照一支真实团队的方式交付。**

GitHub：https://github.com/denelwu-GH/exocrew

开源免费，MIT License。

## 参考资料

- OpenAI Harness Engineering：https://openai.com/index/harness-engineering/
- Microsoft Agent Harnesses：https://learn.microsoft.com/en-us/agent-framework/agents/harness
- GitHub Agent Skills：https://docs.github.com/en/copilot/concepts/agents/about-agent-skills
- Harness Worker Agents：https://developer.harness.io/docs/platform/harness-ai/harness-agents/
- GitHub Spec Kit：https://github.com/github/spec-kit
- OpenSpec：https://github.com/Fission-AI/OpenSpec
- BMAD Method：https://github.com/bmad-code-org/BMAD-METHOD
- Superpowers：https://github.com/obra/superpowers
