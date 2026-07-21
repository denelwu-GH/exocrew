#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repository = "https://github.com/denelwu-GH/exocrew";
const rawBase = "https://raw.githubusercontent.com/denelwu-GH/exocrew/main/docs/launch/wechat";
const title = "我不懂代码，却用 Codex 做出了真实上线的企业系统：现在，我把背后的“团队”开源了";
const summary =
  "一个不懂代码的人，借助 Codex，在约四个月里独立推进出一套真实上线、正在企业端运行的复杂业务系统。现在，他把 36.17 万行工程、1,869 次提交和数百次发布修复背后的方法，提炼成了一支人人都能安装的 AI 交付团队——ExoCrew。";

const sections = [
  {
    paragraphs: [
      "我不是程序员。",
      "我也没有一支产品、研发、测试和运维团队。",
      "但我有一个真实的业务问题，也有一个很朴素的想法：既然 AI 已经会写代码，一个完全不懂代码的人，能不能借助它，把一套复杂的企业系统真正做出来？",
      "不是做一个能演示的页面，不是参加比赛的原型，而是一套能够真实上线、承载日常业务、处理真实数据，并且可以持续修改、测试、发布和回滚的系统。",
    ],
    quote: "我决定试一次。",
  },
  {
    heading: "AI 写出代码，只是最容易的一步",
    paragraphs: [
      "刚开始，AI 的速度让人兴奋。描述一个页面，它很快就能写出来；提出一个功能，它也能给出看起来完整的代码。",
      "但系统一旦开始变复杂，真正的问题才刚刚出现。",
      "一个看似简单的需求，背后可能牵动数据模型、接口契约、权限边界、历史数据和多个页面。一个“测试通过”，可能只是按钮能点，并不代表关键业务链路真的正确。一次普通的数据迁移，如果没有预演、验证和回滚，可能直接影响正在运行的业务。",
    ],
    quote: "AI 会生成代码，但它不会天然替你承担交付责任。",
    paragraphsAfter: [
      "它需要有人告诉它，需求必须先问清哪些边界；架构里哪些规则不能退；测试究竟要证明什么；上线之前又在哪些情况下必须停止。",
      "传统公司用一整支团队解决这些问题，而我只有一个人。",
    ],
  },
  {
    heading: "这不是 Demo，它真的在企业里运行",
    paragraphs: [
      "约四个月后，这套系统完成了真实生产上线。",
      "它现在正在企业端运行，承载日常运营、真实数据治理和企业业务信息推送。也正因为它真的在使用，才会有持续的数据迁移、测试记录、发布日志、故障修复和治理沉淀。",
    ],
    image: `${rawBase}/images/01-proof.png`,
    imageAlt: "真实生产系统的工程规模证据",
    paragraphsAfter: [
      "从第一次提交到当前审计版本，Git 首尾留痕跨度为 139 个自然日。完整工程包含 361,670 行运行与测试源码、1,869 次主线提交、466 个测试文件、125 个数据模型、145 份数据库迁移，以及 90 条不能随意跨越的硬门禁。",
      "这些数字不是为了把项目包装得更大。它们真正说明的是：这不是一次“让 AI 写个网页”的尝试，而是一场完整的软件交付实验。",
    ],
  },
  {
    heading: "一个人背后，需要多大的工作面",
    paragraphs: [
      "如果把相同的复杂度交给传统团队完整重建，需要产品、后端、前端、测试和运维共同参与。",
      "依据两套传统团队配置和合理交付周期交叉测算，基础完整重建约需要 1,320–2,160 人天，相当于 17–27 个跨职能角色同期工作约四个月。",
      "而我的真实投入是：1 个人 + Codex，约 4 个月。",
    ],
    image: `${rawBase}/images/04-comparison.png`,
    imageAlt: "一个人借助 Codex 与传统团队工作量对比",
    paragraphsAfter: [
      "这说明，当个人执行力被 AI 放大，一个人已经有机会覆盖过去需要完整团队协作的复杂交付工作面。",
      "但真正让这种能力能够持续的，不只是模型生成代码的速度，更是一整套来自真实项目的交付约束：什么必须先问清，什么不能随意改，什么必须被测试证明，以及什么时候不能上线。",
      "这套约束，后来有了一个名字：ExoCrew。",
    ],
  },
  {
    heading: "ExoCrew：装上你还没有的那支团队",
    paragraphs: [
      "ExoCrew 的意思，是 AI 时代的交付外骨骼。它不是代码生成器，也不是一句万能提示词。",
      "它是一套可以安装到 AI 编程代理里的交付框架，把传统团队中最重要的六种检查视角，装进你的工作流。",
    ],
    image: `${rawBase}/images/02-team.png`,
    imageAlt: "ExoCrew 的六个交付角色",
    roles: [
      ["交付负责人", "先判断任务属于需求、实现、验证还是发布；拆清责任，标记风险，设置停止条件，并确保事情真正收尾。"],
      ["产品经理", "把一句模糊的“我想做个功能”，变成用户、价值、业务边界、异常场景和验收标准。"],
      ["研发负责人", "守住架构、字段契约、单一真值、异常可见性和变更影响面，阻止代码在增长中失控。"],
      ["现代化负责人", "先区分搬运、重构、升级、替换还是开源提炼，再用成熟度和等价证据阻止项目反复重写。"],
      ["测试负责人", "按风险设计验证，对“看起来通过”保持怀疑，用关键链路和强断言证明功能真的可用。"],
      ["运维负责人", "对数据变更、迁移、发布、回滚和上线后验证保持敬畏，知道哪些操作必须先停下来。"],
    ],
    quote: "这六个角色不是六个聊天人格，而是六套可以真正执行的交付动作。",
  },
  {
    heading: "从一句想法，到真实生产",
    paragraphs: [
      "ExoCrew 不会替你跳过过程。它会让每一步都产生可以检查、继续和回滚的结果：先把想法变成有边界的需求，再守住工程结构，用证据证明关键行为，准备发布和回滚，最后确认线上真实状态。",
    ],
    image: `${rawBase}/images/03-flow.png`,
    imageAlt: "ExoCrew 从想法到真实生产的交付路径",
  },
  {
    heading: "谁适合使用 ExoCrew",
    paragraphs: [
      "如果你正在一个人或用小团队借助 AI 开发企业后台、SaaS、内部工具、运营管理系统，或者项目已经从“能运行”走到了“不能再乱改”，ExoCrew 会很适合你。",
      "它不限定教育、电商或任何特定行业，也不绑定某一种技术栈。尤其适合没有完整技术团队，却正在推进一个越来越真实、越来越复杂产品的人。",
    ],
  },
  {
    heading: "30 秒，把团队装进 Codex",
    paragraphs: ["在终端执行："],
    code: [
      "codex plugin marketplace add denelwu-GH/exocrew",
      "codex plugin add exocrew@exocrew",
    ],
    paragraphsAfter: [
      "安装后，新建一个 Codex 任务，就可以让 ExoCrew 的完整交付角色进入工作流。",
      `GitHub：${repository}`,
      "项目采用 MIT License，任何人都可以免费使用、学习和改进。",
    ],
  },
  {
    heading: "超级个体，不是一个人硬扛所有角色",
    paragraphs: [
      "我依然不是程序员。ExoCrew 也不会让一个人突然拥有所有专家的知识。",
      "但 AI 时代真正重要的变化，也许从来不是“每个人都会写代码”，而是一个普通人终于可以借助 AI，获得过去只有团队才能提供的工作方式。",
      "像产品经理一样问清边界；像工程师一样守住结构；像现代化负责人一样避免反复重写；像测试人员一样怀疑结果；像运维人员一样敬畏上线；像交付负责人一样把事情真正做完。",
    ],
    quote: "一个人，不等于孤军奋战。一个人，也可以拥有一支被正确组织起来的 AI 团队。",
    paragraphsAfter: [
      "这就是我开源 ExoCrew 的原因。",
      "如果它能让下一个普通人少走一些我已经走过的弯路，让一个真实的想法更安全地变成真实产品，那么这四个月踩过的坑，就有了更大的价值。",
    ],
  },
];

function markdownBody() {
  const parts = [];
  for (const section of sections) {
    if (section.heading) parts.push(`## ${section.heading}`);
    for (const paragraph of section.paragraphs ?? []) parts.push(paragraph);
    if (section.image) parts.push(`![${section.imageAlt}](${section.image})`);
    for (const [role, detail] of section.roles ?? []) parts.push(`### ${role}\n\n${detail}`);
    if (section.quote) parts.push(`> **${section.quote}**`);
    if (section.code) parts.push(`\`\`\`bash\n${section.code.join("\n")}\n\`\`\``);
    for (const paragraph of section.paragraphsAfter ?? []) parts.push(paragraph);
  }
  parts.push(
    "---",
    "**Install the team you don’t have.**",
    "**装上你还没有的那支团队。**",
    "",
    "**数据口径说明：**文中的 1,320–2,160 人天 / 17–27 个跨职能角色为对源系统传统团队完整重建工作面的透明估算，用于描述 ExoCrew 的经验来源，不代表安装后必然获得相同比例的提速；详细测算与证据见项目仓库 `docs/EFFORT_MODEL.md` 和 `docs/EVIDENCE.md`。",
  );
  return parts.join("\n\n");
}

function articleHtml() {
  const block = [];
  for (const section of sections) {
    if (section.heading) {
      block.push(`<h2 style="margin:42px 0 18px;color:#111827;font-size:24px;line-height:1.45;font-weight:700;">${section.heading}</h2>`);
    }
    for (const paragraph of section.paragraphs ?? []) {
      block.push(`<p style="margin:0 0 18px;color:#374151;font-size:17px;line-height:1.95;letter-spacing:.02em;">${paragraph}</p>`);
    }
    if (section.image) {
      block.push(`<p style="margin:28px 0;text-align:center;"><img src="${section.image}" alt="${section.imageAlt}" style="display:block;width:100%;height:auto;border:0;border-radius:10px;"></p>`);
    }
    for (const [role, detail] of section.roles ?? []) {
      block.push(`<section style="margin:16px 0;padding:18px 20px;border-left:4px solid #8b5cf6;background:#f5f3ff;border-radius:0 10px 10px 0;"><h3 style="margin:0 0 8px;color:#111827;font-size:19px;line-height:1.5;font-weight:700;">${role}</h3><p style="margin:0;color:#4b5563;font-size:16px;line-height:1.85;">${detail}</p></section>`);
    }
    if (section.quote) {
      block.push(`<blockquote style="margin:26px 0;padding:20px 24px;background:#111827;color:#f9fafb;border-radius:12px;font-size:19px;line-height:1.75;font-weight:700;">${section.quote}</blockquote>`);
    }
    if (section.code) {
      block.push(`<pre style="margin:22px 0;padding:20px;overflow-wrap:anywhere;white-space:pre-wrap;background:#08111f;color:#e5e7eb;border-radius:12px;font-size:14px;line-height:1.8;"><code>${section.code.join("\n")}</code></pre>`);
    }
    for (const paragraph of section.paragraphsAfter ?? []) {
      block.push(`<p style="margin:0 0 18px;color:#374151;font-size:17px;line-height:1.95;letter-spacing:.02em;">${paragraph}</p>`);
    }
  }
  block.push(`<section style="margin:44px 0 0;padding:26px;background:#f3f4f6;border-radius:12px;"><p style="margin:0 0 8px;color:#111827;font-size:19px;line-height:1.75;font-weight:700;">Install the team you don’t have.<br>装上你还没有的那支团队。</p><p style="margin:0;color:#6b7280;font-size:13px;line-height:1.75;">数据口径说明：文中的 1,320–2,160 人天 / 17–27 个跨职能角色为对源系统传统团队完整重建工作面的透明估算，用于描述 ExoCrew 的经验来源，不代表安装后必然获得相同比例的提速。完整依据见 GitHub 项目中的 EFFORT_MODEL.md 和 EVIDENCE.md。</p></section>`);
  return `<article id="wechat-article" style="box-sizing:border-box;max-width:760px;margin:0 auto;padding:34px 22px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',Arial,sans-serif;">
  <p style="margin:0 0 26px;color:#7c3aed;font-size:15px;line-height:1.7;font-weight:700;letter-spacing:.08em;">EXOCREW · AI 时代的交付外骨骼</p>
  ${block.join("\n  ")}
</article>`;
}

function fullHtml({ copyPage }) {
  const toolbar = copyPage
    ? `<div class="toolbar"><button id="copy-title" type="button">复制标题</button><button id="copy-body" type="button" disabled>复制正文（含图片）</button><span id="status">正在检查图片…</span></div>`
    : "";
  const script = copyPage
    ? `<script>
const titleText = ${JSON.stringify(title)};
const article = document.getElementById("wechat-article");
const status = document.getElementById("status");
const bodyButton = document.getElementById("copy-body");
const images = Array.from(article.querySelectorAll("img"));
Promise.all(images.map((img) => img.complete ? Promise.resolve(img.naturalWidth > 0) : new Promise((resolve) => { img.addEventListener("load", () => resolve(true), { once: true }); img.addEventListener("error", () => resolve(false), { once: true }); }))).then((results) => {
  if (results.every(Boolean)) {
    bodyButton.disabled = false;
    status.textContent = "图片已加载，可以复制";
  } else {
    status.textContent = "图片未完全加载，请联网后刷新";
  }
});
async function copyPlainText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = value;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    return copied;
  }
}
document.getElementById("copy-title").addEventListener("click", async () => {
  const copied = await copyPlainText(titleText);
  status.textContent = copied ? "标题已复制" : "浏览器未允许复制，请手动复制标题";
});
document.getElementById("copy-body").addEventListener("click", async () => {
  const range = document.createRange();
  range.selectNode(article);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  const copied = document.execCommand("copy");
  selection.removeAllRanges();
  status.textContent = copied ? "正文和图片已复制" : "浏览器未允许复制，请手动全选正文";
});
</script>`
    : "";
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
  <style>
    *{box-sizing:border-box}body{margin:0;background:#eef2f7;color:#111827}.toolbar{position:sticky;top:0;z-index:10;display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding:14px 18px;background:#08111f;color:#e5e7eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',Arial,sans-serif}.toolbar button{border:0;border-radius:999px;padding:10px 18px;background:#8b5cf6;color:white;font-size:15px;font-weight:700;cursor:pointer}.toolbar button:nth-child(2){background:#0f766e}.toolbar button:disabled{opacity:.45;cursor:not-allowed}.toolbar span{font-size:13px;color:#cbd5e1}
  </style>
</head>
<body>
${toolbar}
${articleHtml()}
${script}
</body>
</html>\n`;
}

const xhsCaption = `# 小红书发布信息

## 标题

0基础小白，做出超过99%外包的软件

## 正文

现在，0 代码基础的小白，也可以轻松搭建自己的高质量软件工程。

用这个 Skill，项目质量也能做到超过市面上 99% 的外包软件。

这套方法已经用于推进一套真正上线、持续运行的复杂企业业务系统，不是停留在 Demo 层面的概念。

很多人一开始都会以为：把功能描述清楚，AI 把代码写出来，项目就算完成了。

真正做下去才发现，最难的不是“写出代码”，而是让需求、架构、数据、测试、发布和回滚全部有人负责。

这套从需求到上线的 9 步检查表，建议先收藏：

1. 软件任务合同：先写清目标、非目标、不可退化项和验收标准
2. 只读勘察：先看架构、依赖、数据流和影响面
3. 安全边界：锁住 Secret、数据库、生产操作和外部写入
4. 最小实现：守住真相源，再分阶段修改
5. 完整测试：覆盖正常、异常、边界和回归
6. 浏览器验收：检查控制台、网络、空态、错误态和移动端
7. 子代理交叉审核：架构、实现、测试、安全四条审查线
8. Git 与发布：小提交、回滚点和发布候选
9. 线上闭环：部署、冒烟、监控、告警、回滚和复盘

不会看代码也没关系。先盯住 4 个答案：

- 到底要改什么？
- 哪些绝对不能动？
- 完成证据在哪里？
- 出问题怎么回来？

为了让这套方法可以复用，它已经被整理成 ExoCrew：一支可以安装进 Codex 的开源 AI 交付团队，由 6 个 Skills 分别约束交付、产品、研发、现代化、测试和运维责任。

这不是 Demo 规模的推演。真实生产依据包括带日期的发布、迁移、修复、回滚和上线后验证记录。

审计基线摘录：
1,869 次主线提交｜145 份数据库迁移
466 个自动化测试/规格文件｜64 份正式操作手册

它不是“一句话全自动上线”的承诺，也不会替代你的判断。它做的是把 AI 编程中常被遗漏的交付责任，变成一套可以执行、检查和回滚的工作流。

项目已免费开源，可手动访问 GitHub：
https://github.com/denelwu-GH/exocrew

Codex 安装命令：
codex plugin marketplace add denelwu-GH/exocrew
codex plugin add exocrew@exocrew

你现在最卡在哪一步？评论区回 1–9，我想看看大家最常遇到的真实问题。

## 话题

#ExoCrew #AI编程 #Codex #VibeCoding #零代码开发 #独立开发 #开源项目

## 图片顺序

1. 01-cover.png
2. 02-story.png
3. 03-problem.png
4. 04-team.png
5. 05-comparison.png
6. 06-cta.png
`;

const xhsAssetProvenance = `# 小红书素材来源与发布前检查

## 权属与来源

- 6 张成品图均由本仓库的 \`tools/generate-launch-assets.mjs\` 生成 SVG，再渲染为 1200 × 1600 PNG。
- 画面只使用仓库内定义的文字、基础几何图形、渐变和线条；没有引用外部照片、插画、图标、纹理或第三方品牌素材。
- 字体使用系统字体回退栈（Apple / Windows / Android 常见中文系统字体），仓库不分发字体文件。
- 文案与数字依据来自本仓库的 \`docs/EVIDENCE.md\`、\`docs/EFFORT_MODEL.md\` 和 \`README.zh-CN.md\`。
- 素材随 ExoCrew 项目按 MIT License 提供；发布者仍应在最终发布前确认平台规则和账号信息。

## 2026-07-21 视觉检查

- [x] 6 张 PNG 均为 1200 × 1600，顺序与 \`caption.md\` 一致
- [x] 标题、数字、安装命令和免责声明无裁切、溢出或遮挡
- [x] 未出现个人手机号、邮箱、服务器地址、令牌或业务数据
- [x] 未使用外部图片、未经授权的人物肖像或第三方商标图形
- [x] 生产数字均来自仓库审计基线，不作为提速或自动上线承诺

## 发布者最后确认

- [ ] 在实际发布设备上预览 6 张图片，确认小字号仍可读
- [ ] 确认 GitHub 地址和安装命令仍然有效
- [ ] 确认正文、话题和评论引导符合发布当天的平台规则
- [ ] 发布后登记链接，并按日回收曝光、点赞、收藏、评论和关注转化数据
`;

const launchReadme = `# ExoCrew 发布素材包

这是一套可以直接用于小红书和微信公众号的完整发布材料。

## 小红书

- \`xiaohongshu/01-cover.png\` 至 \`06-cta.png\`：按编号顺序上传的 6 张 3:4 成品图
- \`xiaohongshu/caption.md\`：短标题、完整正文、话题和图片顺序
- \`xiaohongshu/source/\`：可继续修改的 SVG 源文件
- \`xiaohongshu/ASSET-PROVENANCE.md\`：图片来源、权属和发布前检查记录
- \`xiaohongshu/writing-archetypes.json\`：成稿的写作流派、多标签权重和证据范围

## 微信公众号

- \`wechat/cover-900x383.png\`：单独上传的公众号封面
- \`wechat/images/\`：4 张正文配图
- \`wechat/article.md\`：使用公开 HTTPS 图片的完整 Markdown
- \`wechat/article.html\`：已经排版的文章预览
- \`wechat/wechat-copy.html\`：复制标题和正文富文本的一键复制页
- \`wechat/source/\`：公众号专用视觉的 SVG 源文件

推荐先打开 \`wechat-copy.html\`，等待页面提示“图片已加载，可以复制”，再分别复制标题和正文。公众号封面仍需单独上传。最终发布按钮由账号所有者自行确认。
`;

async function write(relative, content) {
  const target = path.join(root, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

await write("docs/launch/README.md", launchReadme);
await write("docs/launch/xiaohongshu/caption.md", xhsCaption);
await write("docs/launch/xiaohongshu/ASSET-PROVENANCE.md", xhsAssetProvenance);
await write(
  "docs/launch/wechat/article.md",
  `# ${title}\n\n> 摘要：${summary}\n\n---\n\n${markdownBody()}\n`,
);
await write("docs/launch/wechat/article.html", fullHtml({ copyPage: false }));
await write("docs/launch/wechat/wechat-copy.html", fullHtml({ copyPage: true }));

process.stdout.write("Generated ExoCrew launch copy and WeChat pages.\n");
