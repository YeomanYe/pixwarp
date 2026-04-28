# PixWarp · 总设计文档

> 项目目录：`pixwarp/`
> 域名：`pixwarp.app`（待注册）
> 仓库可见性：public
> 文档版本：v1.0（Stage 1 锁定，已进入 Stage 2）
> 日期：2026-04-28

---

## 1. MVP & 用户

### 一句话目标
做一个**面向海外 + 国内双语市场**的工具集站点，主打**浏览器内本地处理（不上传）**，差异化竞争 TinyWow / iLoveIMG / 10015.io 等通用工具站。

### 目标用户
- **博主 / 内容创作者**：博客作者、Substack / 公众号作者、Twitter / X 创作者、小红书 / B 站 UP 主
- **设计师**：独立设计师、Figma 用户、产品设计师
- **客户端开发者顺手用**：发推、做 demo、博客插图

### 核心流（Happy path 5 步）
1. 用户搜索某个长尾关键词（如 "compress mp4 online no upload" / "mp4 转 gif 不上传"）→ 落地工具页
2. 工具页直接可用，无需登录、无需注册
3. 用户拖入文件 / 粘贴内容 → 浏览器内本地处理 → 即时输出
4. 一次任务完成后，页面底部"相关工具"导引到同 vertical 的相邻工具
5. 多次回访的用户被 Pro tier 引导（无水印 / 大文件 / 批量 / API）

### MVP Scope

**In scope（起步 5 个核心工具，覆盖不同长尾 SEO 池）**：

| 工具 | 子集 | SEO 主关键词 | 估时 |
|---|---|---|---|
| 截图美化器（device frame + 渐变背景 + 阴影） | A4 截图 | `screenshot to mockup`、`pretty screenshot` | 4-6h |
| MP4 → GIF / WebP（FFmpeg.wasm 本地） | A1 视频 | `mp4 to gif online free privacy` | 6-8h |
| HEIC → JPG（iOS 用户痛点） | A2 图片 | `heic to jpg online`、`iPhone 照片 转 JPG` | 2-3h |
| 社交媒体封面图生成器（小红书 3:4 / 抖音 9:16 / B 站 16:9） | A6 创作者 | `小红书封面生成`、`B站封面在线`、`抖音封面图` | 6-8h |
| Tweet → 图片（保留头像 / 点赞数） | A6 创作者 | `tweet to image`、`twitter screenshot tool` | 4-6h |

**总开发估时**：~25-30h（4-5 天全职）

**Out of scope（先不做）**：
- AI 生成类（生成视频 / 生成图片 / 生成文字）— 红海，留给大厂
- 用户账户系统（前期匿名免费用，等 Pro 上线再加）
- 文档 / API / SDK（先做 Web，API 等流量起来再加）
- 实时协作 / 团队套餐
- 复杂权限管理

**Non-goals**：
- 不做"什么都有"的杂烩工具站（保持 vertical 集中）
- 不做需要后端长时运行的工具（数据库 / 队列 / async job）
- 不做开发者向纯函数工具（Base64 / Cron / JSON formatter）— 红海 + 跟创作者无关

---

## 2. 主流程图

```
[Google / 百度 / 小红书搜索] ─long-tail keyword→ [Tool 落地页]
                                                      │
                                                 ⟨ 已注册? ⟩
                                                  no │
                                                     ▼
                                              [匿名直接用] ───────┐
                                                     │             │
                                          (拖入文件 / 粘贴内容)   │
                                                     │             │
                                          ⟨ 文件大小 / 频次 ⟩      │
                                          ├─在 Free 限额内─→ ┐    │
                                          └─超限─→ [Pro Gate] │   │
                                                              │   │
                                                              ▼   │
                                              [浏览器内本地处理]  │
                                              (FFmpeg.wasm /      │
                                               TF.js / Canvas)    │
                                                     │             │
                                                     ▼             │
                                              [输出 + 下载]        │
                                                     │             │
                                                     ▼             │
                                            [相关工具 cross-link]──┘
                                                     │
                                            (用户继续用 vertical 内相邻工具)
```

复杂逻辑细节：
- **状态切换**：input empty → input loaded → processing → success / error
- **Pro 触发点**：4K / 大文件（>100MB）/ 批量（>5 文件）/ 无水印
- **i18n 路由**：`/zh/tools/[slug]` 中文，`/tools/[slug]` 英文（默认）

---

## 3. 主交互设计

### 屏幕清单
- **首页 `/`**：英雄区 + 工具索引（按子集 grouped）+ 流量套利长尾标题
- **中文首页 `/zh`**：同上，中文版
- **工具页 `/tools/[slug]`**：每个工具一个独立路由（含 SEO 元数据 + FAQ）
- **Pricing `/pricing`**：Free vs Pro 对比，CTA 接 Lemon Squeezy / paypal.cn
- **Blog `/blog/[slug]`**：长尾内容文章（教程 / 评测 / 比较）
- **API Docs `/api-docs`**（Phase 2）：API 接入文档

### 关键动作
- **匿名用工具**：拖拽 / 上传 / 粘贴 → 一键处理 → 下载
- **触发 Pro Gate**：超限时弹 modal，1 秒说清"为什么需要付费 + 解锁什么"
- **Pro 购买**：跳转 Lemon Squeezy / paypal.cn → 回流后激活
- **Cross-link 跳转**：每个工具底部"相关工具"卡片 3 个

### 状态流转

每个工具内部：
```
idle → loading-input → processing → success
                    ↓
                  error → retry / fallback
```

### 决策点
- **i18n 默认语言**：基于 Accept-Language header + URL 路径（`/zh/*` 强制中文）
- **支付方式选择**：根据 IP 区域（CN → paypal.cn / 支付宝；其他 → Lemon Squeezy）
- **Pro 限额逻辑**：Free 用户每月 N 次，超限后必须等下月或升 Pro

---

## 4. 主要技术栈

| 维度 | 选择 | 理由 |
|---|---|---|
| **运行面** | Web（响应式 + 移动端友好） | 工具站标准 |
| **框架** | Next.js 15 App Router + TypeScript | SSG/ISR 兼顾、SEO 友好、用户熟悉 |
| **样式** | Tailwind CSS + shadcn/ui | 快速 ship + 现代审美 + 易主题切换 |
| **i18n** | next-intl | App Router 标准，多语言路由零配置 |
| **媒体处理** | FFmpeg.wasm + TF.js + Canvas API | 浏览器内本地处理（核心差异化） |
| **状态管理** | React useState + Zustand（必要时） | 工具站不需要复杂 state |
| **部署** | Vercel free tier 起 | 零运维、自动 HTTPS、全球 CDN |
| **域名注册** | Cloudflare Registrar | 成本价 ~$10/年 |
| **Analytics** | Vercel Analytics + PostHog | 免费 tier 够用 |
| **支付** | Lemon Squeezy（海外）+ paypal.cn（国内） | Phase 1 单 LS，Phase 2 加双轨 |
| **数据库**（Phase 2） | Supabase Postgres / Vercel KV | API key + 用量记录 |
| **包管理** | pnpm | 比 npm 快、磁盘节省 |
| **代码托管** | GitHub | 待定 public / private |

### 主语言
- TypeScript（前端 + serverless functions）
- 不需要后端独立服务（serverless 即可）

---

## 5. 预览功能设计

- **Status**：**Not needed**（命中 project-prep Hard exclusion）
- **Why**：项目本身就是 Next.js web 应用，`pnpm dev` 启动的页面**就是用户最终面**——主工程 dev server 即 preview，不存在"真实环境难触达"的子面需要 mock。
- **Surface**：主工程 Vite/Next dev server（`http://localhost:3000`）；生产 preview = 部署后的 GitHub Pages / Vercel URL
- **Layout & pagination plan**：N/A
- **Mock data richness**：N/A（工具数据来自用户输入，无数据库）
- **State controller**：N/A
- **Component reuse plan**：N/A
- **预览页地址（占位）**：N/A（不需要独立 preview 页）

---

## 6. 候选设计系统（3 套，待用户选）

### 候选 A · "Vercel-Linear Modern Minimalism" 🥇 推荐默认

- **Style**：现代极简（Vercel / Linear / Anthropic Console 风格）
- **配色**：
  - 主背景：`#FAFAFA`（light）/ `#0A0A0A`（dark）
  - 主色 accent：`#06B6D4` 青色
  - Pro 强调：`#F59E0B` 琥珀
  - 中性灰阶：Tailwind slate 系列
- **字体**：Geist Sans（UI）+ Geist Mono（代码 / 数字 / 文件名）
- **布局密度**：中低，每屏一个核心 CTA + 大量留白
- **组件库**：shadcn/ui 默认 + 自定义动效
- **Tradeoff**：
  - ✅ 看起来高级专业 + 国际化适配好（海外友好）
  - ❌ 偏冷、稍"SaaS 感"，对国内创作者亲和度中等
  - ❌ 跟其他海外工具站撞脸风险

### 候选 B · "Cyberpunk Punk"（你 ext-helper 风格延伸）

- **Style**：赛博朋克 / 暗色霓虹（你已有 ext-helper 视觉风格的延续）
- **配色**：
  - 主背景：`#0D1B2A`（深紫黑）
  - 主色 accent：`#7c3aed`（霓虹紫）
  - 次色：`#00FFFF`（霓虹青）
  - 强调：`#F472B6`（霓虹粉）
- **字体**：JetBrains Mono（标题）+ Inter（body）
- **布局密度**：中高，强视觉冲击
- **组件库**：shadcn/ui + 自定义 punk-themed token
- **Tradeoff**：
  - ✅ 品牌识别度极强、记忆点高
  - ✅ 跟 ext-helper 视觉延续，便于品牌联动
  - ✅ 程序员 / 设计师群体认可度高
  - ❌ 普通创作者（运营 / 老师 / 文科生）可能觉得太"程序员审美"

### 候选 C · "Warm Indie Workshop"（暖色独立风）

- **Style**：温暖独立（Tony Dinh / RemoteOK / Marc Lou 风格）
- **配色**：
  - 主背景：`#FFF8EC`（暖米白）
  - 主色 accent：`#E07A2C`（琥珀橙）
  - 次色：`#2F8F6F`（鼠尾草绿）
  - 文字：`#1F2421`（墨绿黑）
- **字体**：Geist Sans + serif accents（标题用 EB Garamond）
- **布局密度**：中低，有 indie 手作感
- **组件库**：shadcn/ui + 自定义暖色 token
- **Tradeoff**：
  - ✅ 对**创作者群体特别友好**（视觉温暖 / 不冷）
  - ✅ 跟主流海外工具站差异化大（容易记住）
  - ✅ 印刷友好、博客嵌入友好
  - ❌ 科技感弱，可能让用户觉得"不够专业"
  - ❌ 跟你 ext-helper 已有视觉风格不连续

---

## 7. 部署方案

- **Repo visibility**：**待用户在 user gate 确认**（推断 public）
- **部署目标**：
  - 如果 public → **GitHub Pages** 或 **Vercel free**（推荐 Vercel，因为 Next.js 原生）
  - 如果 private → **Cloudflare Pages**（保护内容）
- **推荐**：**Vercel free tier**
  - 原因：Next.js 原生支持、SSG/ISR、自动 CDN、preview deployments、零配置
  - GitHub Pages 不支持 Next.js SSR/ISR，只能 export 成静态站（限制大）
- **CI/CD**：GitHub Actions 自动触发 Vercel deploy（push to main = production）
- **域名**：注册 1 个 `.com` 单域，多语言走路径（`/zh/*`）+ hreflang 标签
- **偏离默认的理由（如有）**：用 Vercel 而不是 GitHub Pages 是因为 Next.js 需要 SSR / ISR 支持

---

## 8. 后续规划（post-MVP roadmap）

### 暂缓事项（Phase 2，6-12 月）
- **API 化**：把 5 个核心工具的 logic 包成 REST API + API key 鉴权 + 用量计费
- **Pro tier 实施**：Lemon Squeezy 接入 + Free 限额逻辑 + 无水印解锁
- **paypal.cn 国内支付**：等 ext-helper 申请通过后接入
- **博客 / 内容**：每周 1-2 篇 SEO 长尾文章
- **更多工具**：从 96 个 idea 池里按 SEO 数据补到 15-20 个

### 扩展点
- **pSEO 模板矩阵**：`X to Y` 格式转换批量生成（mp4-to-webm、png-to-jpg 等 6×6 = 36 个独立内页）
- **明星工具独立 landing**：跑出来的 1-2 个工具做独立 marketing page
- **AI 集成**：可选给某些工具加 AI 增强（如 AI 抠图、视频字幕生成）

### 规模预期
- **3 月**：5 个工具 + 100+ 个内页（含 pSEO） + 10 篇博客
- **6 月**：MUV 1-5 万 + 月收入 $200-1000
- **12 月**：MUV 10-30 万 + 月收入 $1K-5K
- **24 月**：MUV 50 万+ + 月收入 $5K-15K

---

## 9. Stage 1 已锁定的决策

- [x] **MVP 切片**：接受 5 个起步工具（截图美化 / MP4→GIF / HEIC→JPG / 社交封面 / Tweet→图）。Stage 2 先 ship 第一个（HEIC→JPG）验证链路
- [x] **Preview 策略**：Not needed（纯 web 项目）
- [x] **设计系统**：A 极简变体（Modern Minimal + 橙色 accent #F97316）
- [x] **部署目标**：Vercel + GitHub repo public
- [x] **后续规划方向**：Phase 2 API 化 + Pro tier

### 已锁定补充信息

- [x] **项目名**：PixWarp（pix + warp = 图像变形/处理）
- [x] **域名**：pixwarp.app（待用户去 Porkbun 注册，约 $14/年）
- [x] **GitHub 仓库 visibility**：public

### Logo 决策

- 当前阶段：使用占位 logo（PW monogram + 橙色 #F97316）
- 后续：等品牌运营起来后调 huashu-design 出 ≥ 2 个正式 logo 方向

---

**文档结束**。Stage 2 已启动。
