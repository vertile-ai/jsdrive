# nodriver 完整复刻任务契约

## Goal

在本仓库交付一套 clean-room、raw-CDP-first 的 Node.js/TypeScript 浏览器自动化 runtime。它直接连接 Chrome DevTools Protocol，不依赖 Playwright、Puppeteer、Selenium、ChromeDriver、chrome-remote-interface 或 Node driver subprocess；公开 Browser、Tab、Element、Input、Cookie、Expectation、Interception 等 Zendriver 等价能力，同时提供完整 TypeScript 类型、纯 JS backend 和 Rust/N-API backend。

## Non-goals

- 不提供 Playwright API 兼容层、test runner、fixture 系统、trace viewer 或跨浏览器抽象。
- 不自动下载 Chrome，不默认注入 utility world，不默认修改浏览器指纹。
- 不建设队列、持久化任务、重连/恢复平台、插件系统或分布式基础设施。
- 不复制、翻译或 vendor Zendriver 的 AGPL 源码、测试与注释；Zendriver 仅作为公开行为的黑盒参考。
- 不承诺绕过网站反自动化或 CAPTCHA；Cloudflare helper 只能提供显式、可观察的页面交互策略。

## V1 boundary

V1 不是玩具层，而是一个真实可运行的完整纵向路径：启动或连接本机 Chrome，建立 browser 与 page CDP connection，导航本地测试站点，查找并操作元素，观察/拦截网络，读写 Cookie 与 storage，完成截图/PDF/upload/download，最后干净关闭浏览器。所有高层操作都可降解为 typed/raw CDP。

以下机制因为本次用户明确要求“完全实现计划”而属于当前范围，不是未来扩展：固定官方协议并生成 TS/Rust bindings、direct 与 flattened 两种 connection mode、trace recorder、JS 与 Rust/N-API 双 backend、Zendriver/JS/Rust 差分 harness、列出的 provider compatibility primitives。

## Assertions and evidence

- `VAL-001 Protocol`: 固定同一份官方 `browser_protocol.json` 与 `js_protocol.json`，生成全部 domain 的 TS 类型、command result inference、event mapping、runtime command descriptors，以及可编译的 Rust 协议模块。Evidence: `npm run generate && npm run typecheck && cargo check --workspace`。
- `VAL-002 Dependency ceiling`: Node production dependency 数不超过 Zendriver 的 6 个；目标为 0。Evidence: `npm ls --omit=dev --all` 与 package manifest 检查。
- `VAL-003 CDP runtime`: typed/raw command、response/error、event、timeout、AbortSignal、sessionId、domain policy、trace、连接关闭错误均可观察；用户 event handler 抛错不会关闭 reader。Evidence: runtime focused tests。
- `VAL-004 Browser lifecycle`: 可以启动新 Chrome，也可以连接既有 debugging endpoint；支持 direct 和 flattened target routing；可观察 executable、arguments、profile、host、port，并能关闭进程和临时 profile。Evidence: 两种模式的真实 Chromium smoke run。
- `VAL-005 Browser API`: `start/connect/get/createTab/tabs/targets/mainTab/cookies/grantPermissions/close` 可用且完整类型化。Evidence: local conformance run。
- `VAL-006 Tab API`: 导航、CSS/XPath/text 查询与等待、evaluate、content、history、ready/idle、window、screenshot/PDF/snapshot、storage、download、network expectation/interception 可用。Evidence: local conformance run。
- `VAL-007 Element API`: 以 `backendNodeId` 为身份，支持 refresh、DOM 属性/文本/HTML、子查询、DOM click、mouse click/move/drag、focus、scroll、input、file、select、screenshot 和移除；真实 rerender 后仍能 refresh。Evidence: dynamic DOM conformance run。
- `VAL-008 Input`: 键盘、修饰键、鼠标和 Unicode grapheme 输入可用，不需要 emoji/grapheme 依赖。Evidence: controlled-input 与 emoji fixtures。
- `VAL-009 Network/download`: request/response/body expectation、Fetch continue/fail/fulfill、upload/download 能从真实页面完成。Evidence: local HTTP fixture run。
- `VAL-010 Native backend`: Rust core 实现 process、discovery、WebSocket transaction/event routing，并通过 N-API 实现同一 `RuntimeBackend` 的 command/event/close 路径。Evidence: native build + real Chromium smoke run。
- `VAL-011 Compatibility`: 提供 Qwen token extraction、LMArena runtime capture、OpenAI/Gemini/Grok network/session bootstrap 所需的通用、站点参数化 primitives；不固化站点私有逻辑。Evidence: local provider-shaped fixtures。
- `VAL-012 Full typing`: 项目 `strict`，公开 API 不泄漏隐式 `any`，生成 command 返回值和 event payload 可推导。Evidence: `npm run typecheck` 与 compile-time type fixture。
- `VAL-013 Differential`: 相同本地场景可由 Zendriver Python、JS backend、native backend 执行，并输出归一化结果与 CDP trace；差异明确报告。Evidence: differential command/artifact。

## Constraints

- 项目代码、注释、README、API 与错误消息使用英文；本 roadmap 按仓库上层要求使用中文。
- Node runtime 以 Node.js 22+ 内建 `WebSocket`、`fetch`、`AbortController` 和其他 built-ins 为基础，生产 npm dependencies 目标为 0。
- 公开 API full typing，TypeScript 使用 `strict`、`noUncheckedIndexedAccess` 和 `exactOptionalPropertyTypes`。
- 官方 CDP schema 必须固定版本并保留来源/许可证信息；运行期保留 `sendRaw` 和 `/json/protocol` capability 查询。
- 所有 Chrome 参数公开可见；默认参数保持最小且记录在 README。
- 不添加与上述 assertion 无关的恢复、兼容、扩展或重复测试机制。

## Complexity admission

- 协议 codegen：`VAL-001` 和 `VAL-012` 无法在手写少量 bindings 下通过。
- direct + flattened routing：附件计划明确要求两种 connection mode，属于 `VAL-004`。
- JS + Rust backend/N-API：附件计划明确要求完整双 backend，属于 `VAL-010`。
- trace/differential：行为复刻要求比较 CDP sequence，属于 `VAL-013`。
- 本地 conformance server：网络、upload/download、rerender 的真实用户边界证据需要它，属于 `VAL-006` 至 `VAL-009`。

## Milestones

1. 官方 schema、TS/Rust codegen、strict workspace 与协议类型证据。
2. Pure Node CDP runtime + Browser lifecycle，完成首次真实 Chrome 导航。
3. Browser/Tab/Element/Input/Cookie/Expectation/Interception 完整对象层和本地 conformance。
4. Rust core + N-API backend 真实运行。
5. provider-shaped compatibility、Zendriver/JS/Rust differential、最终文档和审查。

每个 milestone 必须保持可运行、接受独立只读 review，并单独提交；不为凑行数拆层，也不保留不能改变当前 assertion 结果的机制。

## Stop condition

所有 assertion 有真实证据、reviewer verdict 为 `approved`、协调者独立复验且工作树干净时完成。若同一 blocker 连续三轮仍无法解除，停止扩展实现并报告精确 blocker 与已保留的可运行结果。

## 完成记录（2026-08-13）

本计划的 `VAL-001` 至 `VAL-013` 已全部完成，并经独立只读 reviewer 最终批准。最终实现包含固定官方 CDP schema、完整 TS/Rust 生成类型、JS 与 Rust/N-API transport、direct/flattened routing、Browser/Tab/Element/Input/Cookie/Expectation/Fetch/download 对象层、provider-shaped primitives、归一化 trace 和 Zendriver 0.15.5 黑盒差分。

最终证据：

- `npm run generate`：58 domains、607 named types、663 commands、233 events；Rust 共生成 239 个受约束 protocol enums。
- `npm run typecheck`：strict TypeScript workspace 通过。
- `npm test`：protocol 1/1、runtime-js 8/8、API 15/15、runtime-native 5/5；完整进程自然退出。
- `cargo clippy --workspace --all-targets -- -D warnings`：无问题；`cargo test --workspace`：4 passed。
- JS 与 native 的 direct/flattened Chrome smoke 均通过；native 高层真实覆盖 DOM、input、upload、capture、cookies、expectation、Fetch interception 和 download。
- differential：JS/native/Zendriver 0.15.5 的七项可观察结果完全一致；JS/native 十条 outbound trace 一致，`traceDifferences: []`。Zendriver 不公开 backend-neutral raw trace，因此其 trace 明确记为 `unavailable`。
- 四个 `0.15.5` 公共 tarball 均包含 types、exports 和 MIT `LICENSE`；临时外部消费者 strict TS compile 与 ESM runtime import 通过。
- Node 生产依赖只有 `ws` 一个，低于 Zendriver 0.15.5 的六个；`npm audit --omit=dev` 为 0 vulnerabilities。

保留的精确语言/产品形态差异：不复制 Python 的 dunder/thenable/snake_case 语法，不转换 requests-cookie 专用格式，不承诺 CAPTCHA 绕过；inspector helper 返回 DevTools URL，screencast session 输出有序 JPEG frames 而不捆绑编码器，window tiling 使用显式 CDP bounds 而不枚举原生显示器。上述差异均在 README 中公开，不影响本计划的可观察能力断言。
