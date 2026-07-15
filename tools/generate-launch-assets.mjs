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
    ? "一个目标，五个交付角色，一个经过验证的结果"
    : "One goal. Five delivery roles. One verified outcome.";
  const roles = zh
    ? [
        ["DL", "交付负责人", "拆任务 · 管风险 · 盯收尾", colors.purple],
        ["PM", "产品经理", "用户 · 价值 · 边界 · 验收", colors.cyan],
        ["EN", "研发负责人", "架构 · 契约 · 单一真值", colors.blue],
        ["QA", "测试负责人", "风险 · 强断言 · 回归证据", colors.teal],
        ["OP", "运维负责人", "预演 · 发布 · 回滚 · 验证", colors.amber],
      ]
    : [
        ["DL", "Delivery lead", "Scope · risk · closure", colors.purple],
        ["PM", "Product lead", "Users · value · boundaries", colors.cyan],
        ["EN", "Engineering lead", "Architecture · contracts · truth", colors.blue],
        ["QA", "Test lead", "Risk · assertions · evidence", colors.teal],
        ["OP", "Operations lead", "Dry-run · release · rollback", colors.amber],
      ];
  const body = `    ${lines([title], { x: 64, y: 70, size: 34, gap: 0, weight: 700 })}
    ${lines([subtitle], { x: 64, y: 105, size: 17, gap: 0, fill: colors.muted, weight: 400 })}

    <path d="M425 235 C500 235 500 306 542 306" fill="none" stroke="${colors.line}" stroke-width="2"/>
    <path d="M425 345 C500 345 500 334 542 334" fill="none" stroke="${colors.line}" stroke-width="2"/>
    <path d="M425 455 C500 455 500 362 542 362" fill="none" stroke="${colors.line}" stroke-width="2"/>
    <path d="M658 334 C728 334 735 235 780 235" fill="none" stroke="${colors.line}" stroke-width="2"/>
    <path d="M658 362 C728 362 735 400 780 400" fill="none" stroke="${colors.line}" stroke-width="2"/>

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

    ${roleCard({ x: 780, y: 190, width: 356, color: roles[0][3], code: roles[0][0], title: roles[0][1], detail: roles[0][2] })}
    ${roleCard({ x: 780, y: 355, width: 356, color: roles[4][3], code: roles[4][0], title: roles[4][1], detail: roles[4][2] })}

    <path d="M958 282 L958 330" stroke="${colors.line}" stroke-width="2"/>
    <path d="M946 318 L958 332 L970 318" fill="none" stroke="${colors.teal}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="820" y="488" width="316" height="76" rx="20" fill="${colors.teal}" fill-opacity="0.13" stroke="${colors.teal}"/>
    <circle cx="858" cy="526" r="20" fill="${colors.teal}"/>
    <path d="M848 526 L856 534 L870 516" fill="none" stroke="#042f2e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="890" y="520" fill="${colors.white}" font-size="18" font-weight="700">${zh ? "可验证的真实交付" : "VERIFIED DELIVERY"}</text>
    <text x="890" y="545" fill="${colors.muted}" font-size="14">${zh ? "能验收 · 能发布 · 能回滚" : "Acceptable · releasable · reversible"}</text>

    <line x1="64" y1="610" x2="1136" y2="610" stroke="${colors.line}"/>
    <g fill="${colors.muted}" font-size="14" text-anchor="middle">
      <text x="250" y="654">${zh ? "5 个可安装 Skills" : "5 installable skills"}</text>
      <text x="600" y="654">${zh ? "行业与技术栈无关" : "Stack and industry agnostic"}</text>
      <text x="950" y="654">${zh ? "从真实生产交付提炼" : "Distilled from production"}</text>
    </g>`;
  return svg({
    width: 1200,
    height: 700,
    title,
    desc: zh
      ? "ExoCrew 将交付负责人、产品、研发、测试和运维五个交付角色装进一个 AI 工作流。"
      : "ExoCrew installs delivery, product, engineering, test, and operations disciplines into one AI workflow.",
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

function xhsFrame({ index, kicker, headline, subhead, body, footer }) {
  return svg({
    width: 900,
    height: 1200,
    radius: 0,
    title: `ExoCrew 小红书发布图 ${index}`,
    desc: `${headline.join("，")}。${subhead ?? ""}`,
    body: `    <rect x="54" y="54" width="118" height="38" rx="19" fill="${colors.purple}" fill-opacity="0.18" stroke="${colors.purple}"/>
    <text x="113" y="80" fill="${colors.white}" font-size="16" font-weight="700" text-anchor="middle">${String(index).padStart(2, "0")} / 06</text>
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
  const roleColors = [colors.purple, colors.cyan, colors.blue, colors.teal, colors.amber];
  const card1Roles = ["交付", "产品", "研发", "测试", "运维"]
    .map((role, index) => {
      const angle = (-110 + index * 55) * (Math.PI / 180);
      const cx = 450 + Math.cos(angle) * 250;
      const cy = 710 + Math.sin(angle) * 165;
      return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="48" fill="${roleColors[index]}" fill-opacity="0.16" stroke="${roleColors[index]}" stroke-width="2"/><text x="${cx.toFixed(1)}" y="${(cy + 7).toFixed(1)}" fill="${colors.white}" font-size="20" font-weight="700" text-anchor="middle">${role}</text><line x1="${cx.toFixed(1)}" y1="${(cy + 48).toFixed(1)}" x2="450" y2="760" stroke="${colors.line}" stroke-width="2"/>`;
    })
    .join("\n");
  const card1 = xhsFrame({
    index: 1,
    kicker: "开源 AI 交付外骨骼",
    headline: ["不懂代码，", "我把一支 AI 团队", "开源了"],
    subhead: "1 个人 + Codex · 约 4 个月 · 真实生产系统",
    body: `    ${card1Roles}
    <circle cx="450" cy="760" r="90" fill="${colors.panel2}" stroke="${colors.purple}" stroke-width="4" filter="url(#shadow)"/>
    <text x="450" y="750" fill="${colors.white}" font-size="28" font-weight="700" text-anchor="middle">EXO</text>
    <text x="450" y="786" fill="${colors.muted}" font-size="20" text-anchor="middle">CREW</text>
    <rect x="188" y="924" width="524" height="72" rx="36" fill="${colors.purple}"/>
    <text x="450" y="969" fill="${colors.white}" font-size="24" font-weight="700" text-anchor="middle">装上你还没有的那支团队</text>`,
    footer: "github.com/denelwu-GH/exocrew",
  });

  const metricData = [
    ["361,670", "行运行与测试源码", colors.purple],
    ["1,869", "次主线提交", colors.blue],
    ["466", "个测试文件", colors.teal],
    ["125 + 145", "数据模型 + 数据库迁移", colors.amber],
  ];
  const card2Metrics = metricData
    .map((item, index) => {
      const x = 54 + (index % 2) * 405;
      const y = 520 + Math.floor(index / 2) * 184;
      return `<rect x="${x}" y="${y}" width="378" height="154" rx="22" fill="${colors.panel}" stroke="${item[2]}" stroke-opacity="0.62"/>
      <text x="${x + 28}" y="${y + 66}" fill="${colors.white}" font-size="42" font-weight="700">${item[0]}</text>
      <text x="${x + 28}" y="${y + 108}" fill="${colors.muted}" font-size="19">${item[1]}</text>`;
    })
    .join("\n");
  const card2 = xhsFrame({
    index: 2,
    kicker: "真实生产来源",
    headline: ["这不是 Demo", "它真的在企业端运行"],
    subhead: "真实运营 · 数据治理 · 企业业务信息推送",
    body: `    <rect x="54" y="414" width="792" height="64" rx="20" fill="${colors.teal}" fill-opacity="0.12" stroke="${colors.teal}"/>
    <circle cx="92" cy="446" r="12" fill="${colors.teal}"/>
    <text x="121" y="454" fill="${colors.white}" font-size="22" font-weight="700">PRODUCTION · ACTIVE OPERATIONS</text>
    ${card2Metrics}
    <text x="54" y="951" fill="${colors.white}" font-size="23" font-weight="700">每一个数字，都是系统真正运行过的痕迹。</text>`,
    footer: "Git 首尾留痕 139 个自然日",
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
    headline: ["AI 会写代码", "但不会自动替你负责"],
    subhead: "生成代码只需要一句话，交付真实产品需要一支团队的纪律。",
    body: `    ${problemRows}
    <rect x="54" y="1000" width="792" height="58" rx="29" fill="${colors.purple}" fill-opacity="0.18" stroke="${colors.purple}"/>
    <text x="450" y="1037" fill="${colors.white}" font-size="20" font-weight="700" text-anchor="middle">真正缺的，不是代码生成器，是完整交付团队。</text>`,
    footer: "让 AI 知道什么时候必须停下来",
  });

  const roleRows = [
    ["交付负责人", "拆任务 · 控风险 · 盯收尾", colors.purple, "DL"],
    ["产品经理", "问清用户 · 价值 · 边界 · 验收", colors.cyan, "PM"],
    ["研发负责人", "守住架构 · 契约 · 单一真值", colors.blue, "EN"],
    ["测试负责人", "识别假绿 · 证明关键链路", colors.teal, "QA"],
    ["运维负责人", "预演 · 发布 · 回滚 · 验证", colors.amber, "OP"],
  ];
  const roleRowsSvg = roleRows
    .map((item, index) => {
      const y = 450 + index * 112;
      return `<rect x="54" y="${y}" width="792" height="88" rx="20" fill="${colors.panel}" stroke="${item[2]}" stroke-opacity="0.45"/>
      <circle cx="100" cy="${y + 44}" r="25" fill="${item[2]}" fill-opacity="0.18" stroke="${item[2]}"/>
      <text x="100" y="${y + 51}" fill="${colors.white}" font-size="15" font-weight="700" text-anchor="middle">${item[3]}</text>
      <text x="145" y="${y + 37}" fill="${colors.white}" font-size="21" font-weight="700">${item[0]}</text>
      <text x="145" y="${y + 65}" fill="${colors.muted}" font-size="17">${item[1]}</text>`;
    })
    .join("\n");
  const card4 = xhsFrame({
    index: 4,
    kicker: "五个可安装 Skills",
    headline: ["你缺的不是更多提示词", "是五个交付角色"],
    subhead: "不是五个聊天人格，是五套真正能执行的交付动作。",
    body: roleRowsSvg,
    footer: "一个目标 · 五种视角 · 一个交付闭环",
  });

  const card5 = xhsFrame({
    index: 5,
    kicker: "透明重建模型",
    headline: ["1 个人 + Codex", "约 4 个月"],
    subhead: "传统团队完整重建同等工作面，需要多大投入？",
    body: `    <text x="54" y="510" fill="${colors.muted}" font-size="18">实际推进</text>
    <rect x="54" y="540" width="72" height="70" rx="18" fill="${colors.purple}"/>
    <text x="90" y="585" fill="${colors.white}" font-size="28" font-weight="700" text-anchor="middle">1</text>
    <text x="151" y="582" fill="${colors.white}" font-size="24" font-weight="700">个人 + Codex</text>
    <text x="54" y="678" fill="${colors.muted}" font-size="18">基础完整重建估算</text>
    <rect x="54" y="710" width="650" height="86" rx="22" fill="${colors.blue}"/>
    <text x="379" y="763" fill="${colors.white}" font-size="30" font-weight="700" text-anchor="middle">17–27 个跨职能角色</text>
    <text x="729" y="746" fill="${colors.white}" font-size="22" font-weight="700">1,320–</text>
    <text x="729" y="775" fill="${colors.white}" font-size="22" font-weight="700">2,160 人天</text>
    <g text-anchor="middle">
      <text x="176" y="895" fill="${colors.white}" font-size="32" font-weight="700">36.17 万</text><text x="176" y="928" fill="${colors.muted}" font-size="16">行运行与测试源码</text>
      <text x="450" y="895" fill="${colors.white}" font-size="32" font-weight="700">466</text><text x="450" y="928" fill="${colors.muted}" font-size="16">个测试文件</text>
      <text x="724" y="895" fill="${colors.white}" font-size="32" font-weight="700">1,869</text><text x="724" y="928" fill="${colors.muted}" font-size="16">次主线提交</text>
    </g>
    <text x="54" y="1017" fill="${colors.muted}" font-size="15">传统团队重建估算，不是 ExoCrew 安装后的实测提速。</text>`,
    footer: "完整公式已公开",
  });

  const card6 = xhsFrame({
    index: 6,
    kicker: "MIT 开源",
    headline: ["把四个月踩过的坑", "变成你的第一天"],
    subhead: "装上 ExoCrew，让 AI 会问、会验、会停、会回滚。",
    body: `    <rect x="54" y="470" width="792" height="238" rx="24" fill="#050b14" stroke="${colors.line}" filter="url(#shadow)"/>
    <circle cx="88" cy="516" r="7" fill="${colors.rose}"/><circle cx="112" cy="516" r="7" fill="${colors.amber}"/><circle cx="136" cy="516" r="7" fill="${colors.teal}"/>
    <text x="82" y="576" fill="${colors.muted}" font-size="16">$ codex plugin marketplace add</text>
    <text x="82" y="608" fill="${colors.white}" font-size="19" font-weight="700">denelwu-GH/exocrew</text>
    <text x="82" y="656" fill="${colors.muted}" font-size="16">$ codex plugin add</text>
    <text x="82" y="688" fill="${colors.white}" font-size="19" font-weight="700">exocrew@exocrew</text>
    <g>
      <rect x="54" y="764" width="238" height="72" rx="36" fill="${colors.purple}" fill-opacity="0.16" stroke="${colors.purple}"/><text x="173" y="808" fill="${colors.white}" font-size="21" font-weight="700" text-anchor="middle">免费开源</text>
      <rect x="331" y="764" width="238" height="72" rx="36" fill="${colors.teal}" fill-opacity="0.16" stroke="${colors.teal}"/><text x="450" y="808" fill="${colors.white}" font-size="21" font-weight="700" text-anchor="middle">5 个 Skills</text>
      <rect x="608" y="764" width="238" height="72" rx="36" fill="${colors.amber}" fill-opacity="0.16" stroke="${colors.amber}"/><text x="727" y="808" fill="${colors.white}" font-size="21" font-weight="700" text-anchor="middle">MIT License</text>
    </g>
    <text x="450" y="922" fill="${colors.white}" font-size="29" font-weight="700" text-anchor="middle">github.com/denelwu-GH/exocrew</text>
    <text x="450" y="976" fill="${colors.muted}" font-size="18" text-anchor="middle">收藏 · Star · 从一个真实需求开始</text>`,
    footer: "Install the team you don’t have.",
  });

  return [card1, card2, card3, card4, card5, card6];
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
    <text x="48" y="251" fill="${colors.muted}" font-size="17">真实生产系统 · 五个交付角色 · 一套可安装的方法</text>
    <rect x="48" y="292" width="258" height="44" rx="22" fill="${colors.purple}"/>
    <text x="177" y="321" fill="${colors.white}" font-size="17" font-weight="700" text-anchor="middle">装上你还没有的那支团队</text>
    <circle cx="715" cy="186" r="92" fill="${colors.panel2}" stroke="${colors.purple}" stroke-width="3"/>
    <text x="715" y="179" fill="${colors.white}" font-size="30" font-weight="700" text-anchor="middle">EXO</text>
    <text x="715" y="213" fill="${colors.muted}" font-size="18" text-anchor="middle">CREW</text>
    ${[
      ["交付", 627, 75, colors.purple],
      ["产品", 795, 75, colors.cyan],
      ["研发", 841, 194, colors.blue],
      ["测试", 765, 306, colors.teal],
      ["运维", 619, 300, colors.amber],
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

const cards = xhsCards();
for (let index = 0; index < cards.length; index += 1) {
  await write(
    `docs/launch/xiaohongshu/source/${String(index + 1).padStart(2, "0")}.svg`,
    cards[index],
  );
}

await write("docs/launch/wechat/source/cover-900x383.svg", wechatCover());
await write("docs/launch/wechat/source/01-proof.svg", wechatProof());

process.stdout.write("Generated ExoCrew README and launch SVG assets.\n");
