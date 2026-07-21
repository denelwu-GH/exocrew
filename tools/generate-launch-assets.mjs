#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const font = "-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',Arial,sans-serif";

const colors = {
  bg: "#08111f",
  panel: "#101d33",
  panel2: "#13233d",
  line: "#2a3b57",
  white: "#f8fafc",
  muted: "#9aabc2",
  faint: "#64748b",
  purple: "#8b5cf6",
  cyan: "#22d3ee",
  blue: "#3b82f6",
  teal: "#2dd4bf",
  amber: "#f59e0b",
  rose: "#fb7185",
};

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function lines(items, { x, y, size, gap, fill = colors.white, weight = 500, anchor = "start" }) {
  return items
    .map(
      (item, index) =>
        `<text x="${x}" y="${y + index * gap}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${escapeXml(item)}</text>`,
    )
    .join("\n");
}

function svg({ width, height, title, desc, body, radius = 30 }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)}</title>
  <desc id="desc">${escapeXml(desc)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#07111f"/>
      <stop offset="0.58" stop-color="#0b1830"/>
      <stop offset="1" stop-color="#111b36"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#8b5cf6" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#020617" flood-opacity="0.42"/>
    </filter>
  </defs>
  <rect width="${width}" height="${height}" rx="${radius}" fill="url(#bg)"/>
  <circle cx="${Math.round(width * 0.52)}" cy="${Math.round(height * 0.48)}" r="${Math.round(Math.min(width, height) * 0.42)}" fill="url(#glow)"/>
  <g font-family="${font}">
${body}
  </g>
</svg>\n`;
}

function roleCard({ x, y, width, color, code, title, detail }) {
  return `<g filter="url(#shadow)">
    <rect x="${x}" y="${y}" width="${width}" height="92" rx="18" fill="${colors.panel}" stroke="${color}" stroke-opacity="0.58"/>
    <circle cx="${x + 42}" cy="${y + 46}" r="24" fill="${color}" fill-opacity="0.18" stroke="${color}"/>
    <text x="${x + 42}" y="${y + 53}" fill="${colors.white}" font-size="17" font-weight="700" text-anchor="middle">${escapeXml(code)}</text>
    <text x="${x + 82}" y="${y + 37}" fill="${colors.white}" font-size="18" font-weight="700">${escapeXml(title)}</text>
    <text x="${x + 82}" y="${y + 64}" fill="${colors.muted}" font-size="14">${escapeXml(detail)}</text>
  </g>`;
}

function installCrew(language) {
  const zh = language === "zh";
  const title = zh ? "装上你还没有的那支团队" : "Install the team you do not have";
  const subtitle = zh
    ? "一个目标，六个交付角色，一个经过验证的结果"
    : "One goal. Six delivery roles. One verified outcome.";
  const roles = zh
    ? [
        ["DL", "交付负责人", "拆任务 · 管风险 · 盯收尾", colors.purple],
        ["PM", "产品经理", "用户 · 价值 · 边界 · 验收", colors.cyan],
        ["EN", "研发负责人", "架构 · 契约 · 单一真值", colors.blue],
        ["QA", "测试负责人", "风险 · 强断言 · 回归证据", colors.teal],
        ["OP", "运维负责人", "预演 · 发布 · 回滚 · 验证", colors.amber],
        ["MD", "现代化负责人", "迁移 · 等价 · 提炼 · 切换", colors.rose],
      ]
    : [
        ["DL", "Delivery lead", "Scope · risk · closure", colors.purple],
        ["PM", "Product lead", "Users · value · boundaries", colors.cyan],
        ["EN", "Engineering lead", "Architecture · contracts · truth", colors.blue],
        ["QA", "Test lead", "Risk · assertions · evidence", colors.teal],
        ["OP", "Operations lead", "Dry-run · release · rollback", colors.amber],
        ["MD", "Modernization lead", "Migrate · parity · extract · cutover", colors.rose],
      ];
  const body = `    ${lines([title], { x: 64, y: 70, size: 34, gap: 0, weight: 700 })}
    ${lines([subtitle], { x: 64, y: 105, size: 17, gap: 0, fill: colors.muted, weight: 400 })}

    <path d="M425 235 C500 235 500 306 542 306" fill="none" stroke="${colors.line}" stroke-width="2"/>
    <path d="M425 345 C500 345 500 334 542 334" fill="none" stroke="${colors.line}" stroke-width="2"/>
    <path d="M425 455 C500 455 500 362 542 362" fill="none" stroke="${colors.line}" stroke-width="2"/>
    <path d="M658 334 C728 334 735 235 780 235" fill="none" stroke="${colors.line}" stroke-width="2"/>
    <path d="M658 348 C728 348 735 306 780 306" fill="none" stroke="${colors.line}" stroke-width="2"/>
    <path d="M658 362 C728 362 735 416 780 416" fill="none" stroke="${colors.line}" stroke-width="2"/>

    ${roleCard({ x: 64, y: 190, width: 361, color: roles[1][3], code: roles[1][0], title: roles[1][1], detail: roles[1][2] })}
    ${roleCard({ x: 64, y: 300, width: 361, color: roles[2][3], code: roles[2][0], title: roles[2][1], detail: roles[2][2] })}
    ${roleCard({ x: 64, y: 410, width: 361, color: roles[3][3], code: roles[3][0], title: roles[3][1], detail: roles[3][2] })}

    <g filter="url(#shadow)">
      <hexagon/>
      <path d="M600 242 L666 280 L666 356 L600 394 L534 356 L534 280 Z" fill="${colors.panel2}" stroke="${colors.purple}" stroke-width="3"/>
      <circle cx="600" cy="318" r="42" fill="${colors.purple}" fill-opacity="0.18" stroke="${colors.purple}"/>
      <text x="600" y="312" fill="${colors.white}" font-size="19" font-weight="700" text-anchor="middle">EXO</text>
      <text x="600" y="337" fill="${colors.muted}" font-size="13" text-anchor="middle">CREW</text>
      <rect x="523" y="415" width="154" height="38" rx="19" fill="${colors.purple}" fill-opacity="0.16" stroke="${colors.purple}"/>
      <text x="600" y="440" fill="${colors.white}" font-size="14" font-weight="700" text-anchor="middle">${zh ? "交付总控" : "DELIVERY CORE"}</text>
    </g>

    ${roleCard({ x: 780, y: 150, width: 356, color: roles[0][3], code: roles[0][0], title: roles[0][1], detail: roles[0][2] })}
    ${roleCard({ x: 780, y: 260, width: 356, color: roles[5][3], code: roles[5][0], title: roles[5][1], detail: roles[5][2] })}
    ${roleCard({ x: 780, y: 370, width: 356, color: roles[4][3], code: roles[4][0], title: roles[4][1], detail: roles[4][2] })}

    <path d="M958 462 L958 478" stroke="${colors.line}" stroke-width="2"/>
    <path d="M946 468 L958 482 L970 468" fill="none" stroke="${colors.teal}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="820" y="488" width="316" height="76" rx="20" fill="${colors.teal}" fill-opacity="0.13" stroke="${colors.teal}"/>
    <circle cx="858" cy="526" r="20" fill="${colors.teal}"/>
    <path d="M848 526 L856 534 L870 516" fill="none" stroke="#042f2e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="890" y="520" fill="${colors.white}" font-size="18" font-weight="700">${zh ? "可验证的真实交付" : "VERIFIED DELIVERY"}</text>
    <text x="890" y="545" fill="${colors.muted}" font-size="14">${zh ? "能验收 · 能发布 · 能回滚" : "Acceptable · releasable · reversible"}</text>

    <line x1="64" y1="610" x2="1136" y2="610" stroke="${colors.line}"/>
    <g fill="${colors.muted}" font-size="14" text-anchor="middle">
      <text x="250" y="654">${zh ? "6 个可安装 Skills" : "6 installable skills"}</text>
      <text x="600" y="654">${zh ? "行业与技术栈无关" : "Stack and industry agnostic"}</text>
      <text x="950" y="654">${zh ? "从真实生产交付提炼" : "Distilled from production"}</text>
    </g>`;
  return svg({
    width: 1200,
    height: 700,
    title,
    desc: zh
      ? "ExoCrew 将交付、产品、研发、现代化、测试和运维六个交付角色装进一个 AI 工作流。"
      : "ExoCrew installs delivery, product, engineering, modernization, test, and operations disciplines into one AI workflow.",
    body,
  }).replace("      <hexagon/>\n", "");
}

function ideaToProduction(language) {
  const zh = language === "zh";
  const stages = zh
    ? [
        ["01", "模糊想法", "先别急着写", colors.faint],
        ["02", "产品边界", "用户 · 价值 · 验收", colors.cyan],
        ["03", "工程实现", "架构 · 契约 · 真值", colors.blue],
        ["04", "测试证据", "风险 · 断言 · 回归", colors.teal],
        ["05", "发布门禁", "预演 · 回滚 · 审批", colors.amber],
        ["06", "上线后验证", "确认真实运行状态", colors.purple],
      ]
    : [
        ["01", "Vague idea", "Do not code yet", colors.faint],
        ["02", "Product boundary", "Users · value|scope · acceptance", colors.cyan],
        ["03", "Engineering", "Contracts · structure|sources of truth", colors.blue],
        ["04", "Test evidence", "Risk · assertions|regression evidence", colors.teal],
        ["05", "Release gate", "Dry-run · rollback|explicit approval", colors.amber],
        ["06", "Post-verify", "Confirm real|runtime state", colors.purple],
      ];
  const startX = 64;
  const gap = 177;
  const nodes = stages
    .map((stage, index) => {
      const x = startX + index * gap;
      const arrow =
        index < stages.length - 1
          ? `<path d="M${x + 142} 310 L${x + 170} 310" stroke="${colors.line}" stroke-width="3"/><path d="M${x + 158} 300 L${x + 170} 310 L${x + 158} 320" fill="none" stroke="${colors.line}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`
          : "";
      const detailLines = stage[2].split("|");
      const detailText = detailLines
        .map(
          (detail, detailIndex) =>
            `<text x="${x + 71}" y="${350 + detailIndex * 17}" fill="${colors.muted}" font-size="${zh ? 12 : 11}" text-anchor="middle">${escapeXml(detail)}</text>`,
        )
        .join("\n");
      return `<g filter="url(#shadow)">
        <rect x="${x}" y="218" width="142" height="184" rx="20" fill="${colors.panel}" stroke="${stage[3]}" stroke-opacity="0.65"/>
        <circle cx="${x + 71}" cy="262" r="24" fill="${stage[3]}" fill-opacity="0.18" stroke="${stage[3]}"/>
        <text x="${x + 71}" y="269" fill="${colors.white}" font-size="16" font-weight="700" text-anchor="middle">${stage[0]}</text>
        <text x="${x + 71}" y="319" fill="${colors.white}" font-size="17" font-weight="700" text-anchor="middle">${escapeXml(stage[1])}</text>
        ${detailText}
${index === 4 ? `<rect x="${x + 25}" y="374" width="92" height="22" rx="11" fill="${colors.rose}" fill-opacity="0.16"/><text x="${x + 71}" y="390" fill="${colors.rose}" font-size="11" font-weight="700" text-anchor="middle">${zh ? "证据不足就停" : "STOP IF UNSAFE"}</text>` : ""}
      </g>${arrow}`;
    })
    .join("\n");
  const body = `    ${lines([zh ? "从一句想法，到真实生产" : "From one idea to real production"], { x: 64, y: 70, size: 34, gap: 0, weight: 700 })}
    ${lines([zh ? "ExoCrew 让 AI 在每一站都留下可检查、可继续、可回滚的交付结果" : "ExoCrew leaves inspectable, resumable, and reversible evidence at every stage"], { x: 64, y: 106, size: 17, gap: 0, fill: colors.muted, weight: 400 })}
    <path d="M96 172 L1098 172" stroke="${colors.purple}" stroke-width="4" stroke-linecap="round" opacity="0.75"/>
    <text x="64" y="178" fill="${colors.white}" font-size="14" font-weight="700">EXOCREW DELIVERY</text>
    ${nodes}
    <line x1="64" y1="454" x2="1136" y2="454" stroke="${colors.line}"/>
    <text x="600" y="500" fill="${colors.white}" font-size="20" font-weight="700" text-anchor="middle">${zh ? "让 AI 不再盲目写代码，而是有纪律地完成交付" : "Make AI write less blindly—and deliver more deliberately"}</text>
    <text x="600" y="530" fill="${colors.muted}" font-size="14" text-anchor="middle">${zh ? "想清楚再开工 · 用证据证明结果 · 上线前准备回滚 · 上线后验证真实状态" : "Clarify first · prove behavior · prepare rollback · verify production"}</text>`;
  return svg({
    width: 1200,
    height: 560,
    title: zh ? "ExoCrew 从想法到真实生产的交付链" : "ExoCrew delivery path from idea to production",
    desc: zh
      ? "模糊想法依次经过产品边界、工程实现、测试证据、发布门禁和上线后验证。"
      : "A vague idea moves through product boundaries, engineering, test evidence, release gates, and production post-verification.",
    body,
  });
}

function ecosystemMap(language) {
  const zh = language === "zh";
  const labels = zh
    ? {
        title: "ExoCrew 在 AI 软件交付生态中的位置",
        subtitle: "模型提供智能，编程代理执行动作，ExoCrew 约束交付，流水线执行发布",
        model: "基础模型",
        modelDetail: "推理 · 生成 · 判断",
        agent: "AI 编程代理",
        agentDetail: "Codex · Claude Code · Cursor · Copilot · OpenCode",
        exocrew: "EXOCREW · 生产交付 HARNESS",
        exocrewDetail: "产品边界 · 工程门禁 · 测试证据 · 安全运维 · 交付收口",
        pipeline: "CI/CD 与软件交付平台",
        pipelineDetail: "GitHub Actions · Harness.io · 你的发布体系",
        mechanisms: "上下文与能力机制",
        mechanismItems: ["Agent Skills", "AGENTS.md", "Rules", "MCP / Tools"],
        companions: "互补方法与工作流",
        companionItems: ["Spec Kit", "OpenSpec", "BMAD", "Superpowers"],
        footer: "Harness Engineering 是模型周围的完整系统；ExoCrew 提供其中可安装的交付纪律与证据层。",
      }
    : {
        title: "Where ExoCrew fits in the AI software delivery stack",
        subtitle: "Models provide intelligence. Coding agents act. ExoCrew governs delivery. Pipelines ship.",
        model: "FOUNDATION MODELS",
        modelDetail: "Reason · generate · judge",
        agent: "AI CODING AGENTS",
        agentDetail: "Codex · Claude Code · Cursor · Copilot · OpenCode",
        exocrew: "EXOCREW · PRODUCTION DELIVERY HARNESS",
        exocrewDetail: "Product boundaries · engineering gates · test evidence · safe operations · closure",
        pipeline: "CI/CD & SOFTWARE DELIVERY PLATFORMS",
        pipelineDetail: "GitHub Actions · Harness.io · your release stack",
        mechanisms: "CONTEXT & CAPABILITY",
        mechanismItems: ["Agent Skills", "AGENTS.md", "Rules", "MCP / Tools"],
        companions: "COMPLEMENTARY METHODS",
        companionItems: ["Spec Kit", "OpenSpec", "BMAD", "Superpowers"],
        footer: "Harness engineering is the whole system around the model. ExoCrew is the delivery-discipline and evidence layer inside it.",
      };

  const sideList = (items, x, startY, color) =>
    items
      .map(
        (item, index) => `<rect x="${x}" y="${startY + index * 48}" width="150" height="34" rx="17" fill="${color}" fill-opacity="0.12" stroke="${color}" stroke-opacity="0.5"/>
      <text x="${x + 75}" y="${startY + 22 + index * 48}" fill="${colors.white}" font-size="12" font-weight="700" text-anchor="middle">${escapeXml(item)}</text>`,
      )
      .join("\n");

  const body = `    ${lines([labels.title], { x: 54, y: 66, size: 32, gap: 0, weight: 700 })}
    ${lines([labels.subtitle], { x: 54, y: 101, size: 16, gap: 0, fill: colors.muted, weight: 400 })}

    <text x="123" y="170" fill="${colors.muted}" font-size="12" font-weight="700" text-anchor="middle">${escapeXml(labels.mechanisms)}</text>
    <rect x="42" y="190" width="162" height="290" rx="22" fill="${colors.panel}" stroke="${colors.cyan}" stroke-opacity="0.45"/>
    ${sideList(labels.mechanismItems, 48, 222, colors.cyan)}

    <text x="1077" y="170" fill="${colors.muted}" font-size="12" font-weight="700" text-anchor="middle">${escapeXml(labels.companions)}</text>
    <rect x="996" y="190" width="162" height="290" rx="22" fill="${colors.panel}" stroke="${colors.amber}" stroke-opacity="0.45"/>
    ${sideList(labels.companionItems, 1002, 222, colors.amber)}

    <rect x="238" y="142" width="724" height="68" rx="18" fill="${colors.panel}" stroke="${colors.faint}"/>
    <text x="268" y="173" fill="${colors.white}" font-size="17" font-weight="700">${escapeXml(labels.model)}</text>
    <text x="268" y="194" fill="${colors.muted}" font-size="13">${escapeXml(labels.modelDetail)}</text>

    <path d="M600 210 L600 230" stroke="${colors.line}" stroke-width="3"/><path d="M592 222 L600 231 L608 222" fill="none" stroke="${colors.cyan}" stroke-width="2"/>
    <rect x="238" y="232" width="724" height="78" rx="18" fill="${colors.panel}" stroke="${colors.cyan}" stroke-opacity="0.65"/>
    <text x="268" y="265" fill="${colors.white}" font-size="17" font-weight="700">${escapeXml(labels.agent)}</text>
    <text x="268" y="290" fill="${colors.muted}" font-size="13">${escapeXml(labels.agentDetail)}</text>

    <path d="M600 310 L600 332" stroke="${colors.line}" stroke-width="3"/><path d="M592 324 L600 333 L608 324" fill="none" stroke="${colors.purple}" stroke-width="2"/>
    <rect x="224" y="334" width="752" height="124" rx="24" fill="${colors.purple}" fill-opacity="0.17" stroke="${colors.purple}" stroke-width="3" filter="url(#shadow)"/>
    <text x="600" y="375" fill="${colors.white}" font-size="21" font-weight="700" text-anchor="middle">${escapeXml(labels.exocrew)}</text>
    <text x="600" y="405" fill="${colors.white}" font-size="13" text-anchor="middle">${escapeXml(labels.exocrewDetail)}</text>
    <rect x="457" y="420" width="286" height="24" rx="12" fill="${colors.teal}" fill-opacity="0.14" stroke="${colors.teal}" stroke-opacity="0.65"/>
    <text x="600" y="437" fill="${colors.white}" font-size="11" font-weight="700" text-anchor="middle">${zh ? "CODEX 原生安装 · 其它工具为生态对比" : "CODEX-NATIVE · OTHER TOOLS SHOWN AS ECOSYSTEM CONTEXT"}</text>

    <path d="M600 458 L600 480" stroke="${colors.line}" stroke-width="3"/><path d="M592 472 L600 481 L608 472" fill="none" stroke="${colors.teal}" stroke-width="2"/>
    <rect x="238" y="482" width="724" height="78" rx="18" fill="${colors.panel}" stroke="${colors.teal}" stroke-opacity="0.65"/>
    <text x="268" y="515" fill="${colors.white}" font-size="17" font-weight="700">${escapeXml(labels.pipeline)}</text>
    <text x="268" y="540" fill="${colors.muted}" font-size="13">${escapeXml(labels.pipelineDetail)}</text>

    <line x1="42" y1="594" x2="1158" y2="594" stroke="${colors.line}"/>
    <text x="600" y="628" fill="${colors.white}" font-size="14" font-weight="700" text-anchor="middle">${escapeXml(labels.footer)}</text>`;

  return svg({
    width: 1200,
    height: 660,
    title: labels.title,
    desc: labels.footer,
    body,
  });
}

function xhsFrame({ index, total = 6, kicker, headline, subhead, body, footer }) {
  return svg({
    width: 900,
    height: 1200,
    radius: 0,
    title: `ExoCrew 小红书发布图 ${index}`,
    desc: `${headline.join("，")}。${subhead ?? ""}`,
    body: `    <rect x="54" y="54" width="118" height="38" rx="19" fill="${colors.purple}" fill-opacity="0.18" stroke="${colors.purple}"/>
    <text x="113" y="80" fill="${colors.white}" font-size="16" font-weight="700" text-anchor="middle">${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}</text>
    <text x="846" y="80" fill="${colors.muted}" font-size="16" text-anchor="end">${escapeXml(kicker)}</text>
    ${lines(headline, { x: 54, y: 182, size: 54, gap: 70, weight: 700 })}
    ${subhead ? lines([subhead], { x: 54, y: 182 + headline.length * 70 + 12, size: 22, gap: 0, fill: colors.muted, weight: 400 }) : ""}
    ${body}
    <line x1="54" y1="1094" x2="846" y2="1094" stroke="${colors.line}"/>
    <text x="54" y="1144" fill="${colors.white}" font-size="20" font-weight="700">EXOCREW</text>
    <text x="846" y="1144" fill="${colors.muted}" font-size="16" text-anchor="end">${escapeXml(footer)}</text>`,
  });
}

function xhsCards() {
  const card1 = xhsFrame({
    index: 1,
    kicker: "0 代码真实交付",
    headline: ["0 基础代码小白", "也能把项目做成", "专业级软件"],
    subhead: "用 ExoCrew 把专业交付标准装进 AI 工作流",
    body: `    <rect x="54" y="512" width="792" height="286" rx="28" fill="${colors.panel}" stroke="${colors.purple}" stroke-width="3" filter="url(#shadow)"/>
    <text x="450" y="592" fill="${colors.muted}" font-size="20" font-weight="700" text-anchor="middle">这才是重点</text>
    <text x="450" y="704" fill="${colors.white}" font-size="104" font-weight="700" text-anchor="middle">超过 99%</text>
    <text x="450" y="756" fill="${colors.muted}" font-size="20" font-weight="700" text-anchor="middle">市面外包软件</text>
    <rect x="148" y="866" width="604" height="78" rx="39" fill="${colors.teal}" fill-opacity="0.15" stroke="${colors.teal}"/>
    <text x="450" y="915" fill="${colors.white}" font-size="24" font-weight="700" text-anchor="middle">完整交付方法已开源</text>`,
    footer: "真实生产项目验证 · 可安装 · 可复用",
  });

  const metricData = [
    ["1,869", "次主线提交", colors.purple],
    ["145", "份数据库迁移", colors.blue],
    ["466", "个自动化测试/规格文件", colors.amber],
    ["64", "份正式操作手册", colors.teal],
  ];
  const card2Metrics = metricData
    .map((item, index) => {
      const x = 54 + (index % 2) * 405;
      const y = 540 + Math.floor(index / 2) * 184;
      return `<rect x="${x}" y="${y}" width="378" height="154" rx="22" fill="${colors.panel}" stroke="${item[2]}" stroke-opacity="0.62"/>
      <text x="${x + 28}" y="${y + 66}" fill="${colors.white}" font-size="42" font-weight="700">${item[0]}</text>
      <text x="${x + 28}" y="${y + 108}" fill="${colors.muted}" font-size="19">${item[1]}</text>`;
    })
    .join("\n");
  const card2 = xhsFrame({
    index: 2,
    kicker: "真实生产来源",
    headline: ["不会写代码", "不等于只能", "做 Demo"],
    subhead: "发布 · 迁移 · 修复 · 回滚 · 上线后验证",
    body: `    <rect x="54" y="452" width="792" height="64" rx="20" fill="${colors.teal}" fill-opacity="0.12" stroke="${colors.teal}"/>
    <circle cx="92" cy="484" r="12" fill="${colors.teal}"/>
    <text x="121" y="492" fill="${colors.white}" font-size="22" font-weight="700">PRODUCTION · ACTIVE OPERATIONS</text>
    ${card2Metrics}
    <text x="54" y="971" fill="${colors.white}" font-size="22" font-weight="700">每一个数字，都能回到仓库审计基线。</text>`,
    footer: "真实证据 · 不靠口号",
  });

  const problems = [
    ["需求边界", "没想清就开工", colors.cyan],
    ["工程结构", "功能越多越混乱", colors.blue],
    ["测试结果", "看起来通过的假绿", colors.teal],
    ["生产发布", "没有预演和回滚", colors.rose],
  ];
  const problemRows = problems
    .map((item, index) => {
      const y = 490 + index * 122;
      return `<rect x="54" y="${y}" width="792" height="96" rx="20" fill="${colors.panel}"/>
      <circle cx="102" cy="${y + 48}" r="24" fill="${item[2]}" fill-opacity="0.18" stroke="${item[2]}"/>
      <path d="M94 ${y + 40} L110 ${y + 56} M110 ${y + 40} L94 ${y + 56}" stroke="${item[2]}" stroke-width="3" stroke-linecap="round"/>
      <text x="148" y="${y + 41}" fill="${colors.white}" font-size="22" font-weight="700">${item[0]}</text>
      <text x="148" y="${y + 70}" fill="${colors.muted}" font-size="18">${item[1]}</text>`;
    })
    .join("\n");
  const card3 = xhsFrame({
    index: 3,
    kicker: "代码生成 ≠ 真实交付",
    headline: ["AI 项目最危险的", "不是写不出来", "是看起来能跑"],
    subhead: "功能能点开，不代表需求、数据和上线已经安全。",
    body: `    ${problemRows}
    <rect x="54" y="1000" width="792" height="58" rx="29" fill="${colors.purple}" fill-opacity="0.18" stroke="${colors.purple}"/>
    <text x="450" y="1037" fill="${colors.white}" font-size="20" font-weight="700" text-anchor="middle">真正的难点，是把项目安全交出去。</text>`,
    footer: "从“能跑”走到“敢上线”",
  });

  const deliverySteps = [
    ["01", "任务合同", "目标与验收", colors.purple],
    ["02", "只读勘察", "架构与影响面", colors.cyan],
    ["03", "安全边界", "数据与外部写入", colors.rose],
    ["04", "最小实现", "先守住真相源", colors.blue],
    ["05", "完整测试", "正常异常边界", colors.teal],
    ["06", "浏览器验收", "控制台与移动端", colors.amber],
    ["07", "交叉审核", "架构测试安全", colors.purple],
    ["08", "Git 发布", "小提交与回滚点", colors.cyan],
    ["09", "线上闭环", "监控回滚复盘", colors.teal],
  ];
  const deliveryStepsSvg = deliverySteps
    .map((item, index) => {
      const column = index % 3;
      const row = Math.floor(index / 3);
      const x = 54 + column * 270;
      const y = 458 + row * 164;
      return `<rect x="${x}" y="${y}" width="252" height="142" rx="20" fill="${colors.panel}" stroke="${item[3]}" stroke-opacity="0.52"/>
      <rect x="${x + 18}" y="${y + 18}" width="46" height="28" rx="14" fill="${item[3]}" fill-opacity="0.18" stroke="${item[3]}"/>
      <text x="${x + 41}" y="${y + 38}" fill="${colors.white}" font-size="13" font-weight="700" text-anchor="middle">${item[0]}</text>
      <text x="${x + 18}" y="${y + 82}" fill="${colors.white}" font-size="20" font-weight="700">${item[1]}</text>
      <text x="${x + 18}" y="${y + 113}" fill="${colors.muted}" font-size="14">${item[2]}</text>`;
    })
    .join("\n");
  const card4 = xhsFrame({
    index: 4,
    kicker: "建议直接收藏",
    headline: ["从需求到上线", "按这 9 步检查"],
    subhead: "下一次让 AI 改项目时，按顺序走一遍。",
    body: `    ${deliveryStepsSvg}
    <rect x="170" y="974" width="560" height="66" rx="33" fill="${colors.purple}" fill-opacity="0.18" stroke="${colors.purple}"/>
    <text x="450" y="1016" fill="${colors.white}" font-size="20" font-weight="700" text-anchor="middle">少一步，都可能把风险留到上线后</text>`,
    footer: "每一步都有验收与回滚",
  });

  const beginnerAnswers = [
    ["01", "到底要改什么？", "先把目标说清楚", colors.purple],
    ["02", "哪些绝对不能动？", "锁住不可退化项", colors.rose],
    ["03", "完成证据在哪里？", "测试与浏览器验收", colors.teal],
    ["04", "出问题怎么回来？", "保留提交与回滚点", colors.amber],
  ];
  const beginnerAnswersSvg = beginnerAnswers
    .map((item, index) => {
      const column = index % 2;
      const row = Math.floor(index / 2);
      const x = 54 + column * 405;
      const y = 476 + row * 208;
      return `<rect x="${x}" y="${y}" width="378" height="178" rx="22" fill="${colors.panel}" stroke="${item[3]}" stroke-opacity="0.56"/>
      <text x="${x + 26}" y="${y + 42}" fill="${item[3]}" font-size="15" font-weight="700">${item[0]}</text>
      <text x="${x + 26}" y="${y + 91}" fill="${colors.white}" font-size="22" font-weight="700">${item[1]}</text>
      <text x="${x + 26}" y="${y + 132}" fill="${colors.muted}" font-size="16">${item[2]}</text>`;
    })
    .join("\n");
  const card5 = xhsFrame({
    index: 5,
    kicker: "小白也能判断进度",
    headline: ["不必看懂", "每一行代码"],
    subhead: "先盯住这 4 个答案，AI 就不容易带偏项目。",
    body: `    ${beginnerAnswersSvg}
    <rect x="112" y="930" width="676" height="80" rx="40" fill="${colors.teal}" fill-opacity="0.14" stroke="${colors.teal}"/>
    <text x="450" y="980" fill="${colors.white}" font-size="22" font-weight="700" text-anchor="middle">你负责判断 · AI 负责执行</text>`,
    footer: "把技术过程变成可验收结果",
  });

  const card6 = xhsFrame({
    index: 6,
    kicker: "立即安装",
    headline: ["把 AI 写代码", "升级成专业交付"],
    subhead: "ExoCrew = 安装进 Codex 的开源交付团队",
    body: `    <rect x="54" y="470" width="792" height="238" rx="24" fill="#050b14" stroke="${colors.line}" filter="url(#shadow)"/>
    <circle cx="88" cy="516" r="7" fill="${colors.rose}"/><circle cx="112" cy="516" r="7" fill="${colors.amber}"/><circle cx="136" cy="516" r="7" fill="${colors.teal}"/>
    <text x="82" y="576" fill="${colors.muted}" font-size="16">$ codex plugin marketplace add</text>
    <text x="82" y="608" fill="${colors.white}" font-size="19" font-weight="700">denelwu-GH/exocrew</text>
    <text x="82" y="656" fill="${colors.muted}" font-size="16">$ codex plugin add</text>
    <text x="82" y="688" fill="${colors.white}" font-size="19" font-weight="700">exocrew@exocrew</text>
    <g>
      <rect x="54" y="764" width="238" height="72" rx="36" fill="${colors.purple}" fill-opacity="0.16" stroke="${colors.purple}"/><text x="173" y="808" fill="${colors.white}" font-size="21" font-weight="700" text-anchor="middle">免费开源</text>
      <rect x="331" y="764" width="238" height="72" rx="36" fill="${colors.teal}" fill-opacity="0.16" stroke="${colors.teal}"/><text x="450" y="808" fill="${colors.white}" font-size="21" font-weight="700" text-anchor="middle">6 个 Skills</text>
      <rect x="608" y="764" width="238" height="72" rx="36" fill="${colors.amber}" fill-opacity="0.16" stroke="${colors.amber}"/><text x="727" y="808" fill="${colors.white}" font-size="21" font-weight="700" text-anchor="middle">MIT License</text>
    </g>
    <text x="450" y="922" fill="${colors.white}" font-size="29" font-weight="700" text-anchor="middle">github.com/denelwu-GH/exocrew</text>
    <text x="450" y="976" fill="${colors.muted}" font-size="18" text-anchor="middle">从一个真实需求开始 · 最终发布仍由你确认</text>`,
    footer: "0 代码起步 · 有证据地交付",
  });

  return [card1, card2, card3, card4, card5, card6];
}

function ecosystemSocialCards() {
  const stack = [
    ["01", "基础模型", "提供推理与生成", colors.faint],
    ["02", "AI 编程代理", "Codex · Claude Code · Cursor", colors.cyan],
    ["03", "Skills / Rules / MCP", "提供上下文、规则与工具", colors.blue],
    ["04", "ExoCrew", "约束产品、工程、现代化、测试与运维交付", colors.purple],
    ["05", "CI/CD 平台", "执行构建、审批、部署与观测", colors.teal],
  ];
  const stackBody = stack
    .map((item, index) => {
      const y = 430 + index * 126;
      return `<rect x="72" y="${y}" width="756" height="98" rx="22" fill="${item[3]}" fill-opacity="${index === 3 ? "0.22" : "0.11"}" stroke="${item[3]}" stroke-width="${index === 3 ? 3 : 1.5}"/>
      <circle cx="122" cy="${y + 49}" r="25" fill="${item[3]}" fill-opacity="0.22" stroke="${item[3]}"/>
      <text x="122" y="${y + 56}" fill="${colors.white}" font-size="16" font-weight="700" text-anchor="middle">${item[0]}</text>
      <text x="168" y="${y + 42}" fill="${colors.white}" font-size="22" font-weight="700">${escapeXml(item[1])}</text>
      <text x="168" y="${y + 72}" fill="${colors.muted}" font-size="16">${escapeXml(item[2])}</text>`;
    })
    .join("\n");
  const card1 = xhsFrame({
    index: 1,
    total: 3,
    kicker: "AI 开发生态说明书",
    headline: ["AI Agent、Skill、", "Harness、Spec、CI/CD", "到底有什么区别？"],
    subhead: "别再把不同层级的工具放进同一个排行榜",
    body: stackBody,
    footer: "ExoCrew · Production Delivery Harness",
  });

  const card2 = xhsFrame({
    index: 2,
    total: 3,
    kicker: "ExoCrew 在哪里起作用",
    headline: ["Agent 负责写和执行", "ExoCrew 负责", "把事情真正交付"],
    subhead: "不是替代 Codex，而是给它装上完整交付纪律",
    body: `    <rect x="74" y="448" width="752" height="106" rx="24" fill="${colors.cyan}" fill-opacity="0.12" stroke="${colors.cyan}"/>
    <text x="450" y="490" fill="${colors.white}" font-size="24" font-weight="700" text-anchor="middle">CODING AGENT</text>
    <text x="450" y="526" fill="${colors.muted}" font-size="17" text-anchor="middle">读取仓库 · 修改文件 · 运行命令 · 调用工具</text>
    <path d="M450 554 L450 615" stroke="${colors.line}" stroke-width="4"/><path d="M438 602 L450 616 L462 602" fill="none" stroke="${colors.purple}" stroke-width="3"/>
    <rect x="54" y="618" width="792" height="240" rx="28" fill="${colors.purple}" fill-opacity="0.20" stroke="${colors.purple}" stroke-width="3" filter="url(#shadow)"/>
    <text x="450" y="674" fill="${colors.white}" font-size="29" font-weight="700" text-anchor="middle">EXOCREW · 生产交付 HARNESS</text>
    ${[
      ["产品边界", 120, 748, colors.cyan],
      ["工程门禁", 252, 748, colors.blue],
      ["现代化", 384, 748, colors.rose],
      ["测试证据", 516, 748, colors.teal],
      ["安全运维", 648, 748, colors.amber],
      ["交付收口", 780, 748, colors.purple],
    ]
      .map(([label, x, y, color]) => `<circle cx="${x}" cy="${y}" r="42" fill="${color}" fill-opacity="0.16" stroke="${color}"/><text x="${x}" y="${y + 6}" fill="${colors.white}" font-size="14" font-weight="700" text-anchor="middle">${label}</text>`)
      .join("\n")}
    <text x="450" y="826" fill="${colors.muted}" font-size="16" text-anchor="middle">Codex 原生安装 · 六个可执行 Skills · 从真实生产交付提炼</text>
    <path d="M450 858 L450 917" stroke="${colors.line}" stroke-width="4"/><path d="M438 904 L450 918 L462 904" fill="none" stroke="${colors.teal}" stroke-width="3"/>
    <rect x="150" y="920" width="600" height="86" rx="43" fill="${colors.teal}" fill-opacity="0.14" stroke="${colors.teal}"/>
    <text x="450" y="974" fill="${colors.white}" font-size="24" font-weight="700" text-anchor="middle">有边界 · 有证据 · 能发布 · 能回滚</text>`,
    footer: "github.com/denelwu-GH/exocrew",
  });

  const card3 = xhsFrame({
    index: 3,
    total: 3,
    kicker: "Harness 不是只有一个意思",
    headline: ["Harness Engineering", "不等于", "Harness.io"],
    subhead: "一个是工程类目，一个是企业软件交付平台",
    body: `    <rect x="54" y="448" width="792" height="220" rx="28" fill="${colors.purple}" fill-opacity="0.16" stroke="${colors.purple}"/>
    <text x="92" y="500" fill="${colors.white}" font-size="25" font-weight="700">HARNESS ENGINEERING</text>
    <text x="92" y="542" fill="${colors.muted}" font-size="17">模型周围的上下文、工具、规则、验证循环与运行环境</text>
    <text x="92" y="596" fill="${colors.white}" font-size="18" font-weight="700">ExoCrew 属于这里：</text>
    <text x="92" y="628" fill="${colors.muted}" font-size="17">提供可安装的交付纪律与证据层</text>
    <rect x="54" y="700" width="792" height="220" rx="28" fill="${colors.teal}" fill-opacity="0.13" stroke="${colors.teal}"/>
    <text x="92" y="752" fill="${colors.white}" font-size="25" font-weight="700">HARNESS.IO</text>
    <text x="92" y="794" fill="${colors.muted}" font-size="17">企业 CI/CD、软件交付、治理、安全、可观测性与流水线 Agents</text>
    <text x="92" y="848" fill="${colors.white}" font-size="18" font-weight="700">ExoCrew 不替代它：</text>
    <text x="92" y="880" fill="${colors.muted}" font-size="17">帮助形成更安全、更容易进入流水线的变更包</text>
    <rect x="170" y="970" width="560" height="62" rx="31" fill="${colors.amber}" fill-opacity="0.15" stroke="${colors.amber}"/>
    <text x="450" y="1009" fill="${colors.white}" font-size="20" font-weight="700" text-anchor="middle">不同层级，可以组合，不是互相替代</text>`,
    footer: "公平比较 · 无官方隶属 · 不做通用排名",
  });

  return [card1, card2, card3];
}

function wechatCover() {
  return svg({
    width: 900,
    height: 383,
    radius: 0,
    title: "ExoCrew 微信公众号封面",
    desc: "一个人加 Codex，四个月做出真实生产系统，现在把背后的 AI 交付团队开源了。",
    body: `    <text x="48" y="58" fill="${colors.purple}" font-size="16" font-weight="700">EXOCREW · AI 时代的交付外骨骼</text>
    ${lines(["一个人 + Codex，4 个月", "我把背后的 AI 交付团队开源了"], { x: 48, y: 125, size: 34, gap: 52, weight: 700 })}
    <text x="48" y="251" fill="${colors.muted}" font-size="17">真实生产系统 · 六个交付角色 · 一套可安装的方法</text>
    <rect x="48" y="292" width="258" height="44" rx="22" fill="${colors.purple}"/>
    <text x="177" y="321" fill="${colors.white}" font-size="17" font-weight="700" text-anchor="middle">装上你还没有的那支团队</text>
    <circle cx="715" cy="186" r="92" fill="${colors.panel2}" stroke="${colors.purple}" stroke-width="3"/>
    <text x="715" y="179" fill="${colors.white}" font-size="30" font-weight="700" text-anchor="middle">EXO</text>
    <text x="715" y="213" fill="${colors.muted}" font-size="18" text-anchor="middle">CREW</text>
    ${[
      ["交付", 622, 78, colors.purple],
      ["产品", 790, 75, colors.cyan],
      ["研发", 846, 174, colors.blue],
      ["现代化", 812, 292, colors.rose],
      ["测试", 686, 326, colors.teal],
      ["运维", 590, 250, colors.amber],
    ]
      .map(([label, x, y, color]) => `<circle cx="${x}" cy="${y}" r="31" fill="${color}" fill-opacity="0.17" stroke="${color}"/><text x="${x}" y="${y + 6}" fill="${colors.white}" font-size="14" font-weight="700" text-anchor="middle">${label}</text><line x1="${x}" y1="${y}" x2="715" y2="186" stroke="${colors.line}"/>`)
      .join("\n")}`,
  });
}

function wechatProof() {
  const metrics = [
    ["25", "个运营入口", colors.cyan],
    ["401", "个 HTTP 操作", colors.blue],
    ["125", "个数据模型", colors.teal],
    ["145", "份数据库迁移", colors.amber],
  ];
  const cards = metrics
    .map((item, index) => {
      const x = 64 + index * 265;
      return `<rect x="${x}" y="245" width="236" height="154" rx="22" fill="${colors.panel}" stroke="${item[2]}" stroke-opacity="0.6"/>
      <text x="${x + 28}" y="${326}" fill="${colors.white}" font-size="46" font-weight="700">${item[0]}</text>
      <text x="${x + 28}" y="${365}" fill="${colors.muted}" font-size="18">${item[1]}</text>`;
    })
    .join("\n");
  return svg({
    width: 1200,
    height: 675,
    title: "ExoCrew 的真实生产来源",
    desc: "真实系统包含二十五个运营入口、四百零一个 HTTP 操作、一百二十五个数据模型和一百四十五份数据库迁移。",
    body: `    ${lines(["不是原型：一套正在真实运行的企业业务系统"], { x: 64, y: 78, size: 34, gap: 0, weight: 700 })}
    ${lines(["真实运营 · 数据治理 · 企业业务信息推送 · 持续测试与发布"], { x: 64, y: 116, size: 17, gap: 0, fill: colors.muted, weight: 400 })}
    <rect x="64" y="158" width="1072" height="58" rx="20" fill="${colors.teal}" fill-opacity="0.12" stroke="${colors.teal}"/>
    <circle cx="96" cy="187" r="10" fill="${colors.teal}"/><text x="120" y="194" fill="${colors.white}" font-size="18" font-weight="700">PRODUCTION · ACTIVE ENTERPRISE OPERATIONS</text>
    ${cards}
    <line x1="64" y1="458" x2="1136" y2="458" stroke="${colors.line}"/>
    <g text-anchor="middle">
      <text x="276" y="526" fill="${colors.white}" font-size="30" font-weight="700">约 24.5 万行</text><text x="276" y="558" fill="${colors.muted}" font-size="16">运行时代码</text>
      <text x="600" y="526" fill="${colors.white}" font-size="30" font-weight="700">约 11.6 万行</text><text x="600" y="558" fill="${colors.muted}" font-size="16">测试源码</text>
      <text x="924" y="526" fill="${colors.white}" font-size="30" font-weight="700">1,869 次</text><text x="924" y="558" fill="${colors.muted}" font-size="16">主线提交</text>
    </g>
    <text x="600" y="626" fill="${colors.white}" font-size="20" font-weight="700" text-anchor="middle">每一个数字，都是系统真正运行、修改、验证和治理过的痕迹。</text>`,
  });
}

async function write(relative, content) {
  const target = path.join(root, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

await write("docs/assets/install-the-crew.svg", installCrew("en"));
await write("docs/assets/install-the-crew.zh-CN.svg", installCrew("zh"));
await write("docs/assets/idea-to-production.svg", ideaToProduction("en"));
await write("docs/assets/idea-to-production.zh-CN.svg", ideaToProduction("zh"));
await write("docs/assets/ai-delivery-ecosystem.svg", ecosystemMap("en"));
await write("docs/assets/ai-delivery-ecosystem.zh-CN.svg", ecosystemMap("zh"));

const cards = xhsCards();
for (let index = 0; index < cards.length; index += 1) {
  await write(
    `docs/launch/xiaohongshu/source/${String(index + 1).padStart(2, "0")}.svg`,
    cards[index],
  );
}

const ecosystemCards = ecosystemSocialCards();
for (let index = 0; index < ecosystemCards.length; index += 1) {
  await write(
    `docs/launch/ecosystem/source/${String(index + 1).padStart(2, "0")}.svg`,
    ecosystemCards[index],
  );
}

await write("docs/launch/wechat/source/cover-900x383.svg", wechatCover());
await write("docs/launch/wechat/source/01-proof.svg", wechatProof());

process.stdout.write("Generated ExoCrew README and launch SVG assets.\n");
