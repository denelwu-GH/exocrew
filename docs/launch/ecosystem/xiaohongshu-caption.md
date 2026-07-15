# 小红书发布信息：AI Agent、Skill、Harness、Spec、CI/CD 有什么区别？

## 标题

AI编程最火的几个词，终于有人讲清楚了

## 正文

最近 AI 编程里几个词特别火：

AI Agent、Agent Skills、Harness Engineering、Spec-Driven Development、MCP、CI/CD。

但很多介绍把它们放在一起比较，好像你只能选一个。

其实它们根本不在同一层。

**基础模型**负责推理和生成。

**Codex、Claude Code、Cursor、Copilot、OpenCode 这类 AI 编程代理**负责读取仓库、修改文件、执行命令和调用工具。

**Agent Skills、AGENTS.md、Rules 和 MCP**负责给 Agent 提供可复用的规则、上下文和外部能力。

**Spec Kit、OpenSpec**帮助你先把需求、规格、计划和任务讲清楚；**BMAD、Superpowers**提供更完整的角色化方法和开发工作流。

**GitHub Actions、Harness.io**等平台负责构建、审批、部署和观测。

那 ExoCrew 在哪里？

ExoCrew 补的是中间最容易缺失的“生产交付纪律层”：产品边界、工程门禁、测试证据、安全运维和最终收口。

Agent 负责写和执行，ExoCrew 负责让它不要只顾着写，而是把事情真正交付。

还有一个容易混淆的地方：

**Harness Engineering 是一个工程类目，Harness.io 是一家企业软件公司和软件交付平台。两者不是同一个概念。**

ExoCrew 属于 Harness Engineering 这个语境，但它不是 Harness.io 的替代品。它帮助你形成更安全、更容易进入 CI/CD 流水线的变更与证据。

ExoCrew 当前已经完成 Codex 的原生打包、安装和验证。其它工具出现在对比里，是为了讲清生态位置，不代表已经宣布原生集成。

GitHub 搜索：**denelwu-GH/exocrew**

开源免费，MIT License。

## 话题

#ExoCrew #HarnessEngineering #AIAgent #AgentSkills #Codex #ClaudeCode #Cursor #SpecDrivenDevelopment #SpecKit #OpenSpec #BMAD #Superpowers #MCP #AI编程 #VibeCoding #独立开发

## 图片顺序

1. `01-stack.png`
2. `02-exocrew-layer.png`
3. `03-harness-vs-platform.png`
