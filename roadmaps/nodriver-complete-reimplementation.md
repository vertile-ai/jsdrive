# nodriver 完整复刻任务契约

> 状态：2026-08-14 Node/headless parity 已实现并复验；headful 与真实窗口聚焦行为仍受逐次授权和仓库 policy 限制。

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

## 已撤回的 V1 完成记录（2026-08-13）

以下证据只证明原 roadmap V1，不再被视为“完整复刻”完成证据。原实现包含固定官方 CDP schema、完整 TS/Rust 生成类型、JS 与 Rust/N-API transport、direct/flattened routing、Browser/Tab/Element/Input/Cookie/Expectation/Fetch/download 对象层、provider-shaped primitives、归一化 trace 和少量 Zendriver 0.15.5 黑盒差分。

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

## 完整 parity 重开契约

### 基准

- 唯一上游基准为 Zendriver `v0.15.5` tag，commit `f0bd943853a35b9394289ba80027ca26c8bd4d16`。
- 上游公开 API、文档示例和 `tests/` 全量清单共同组成能力合同；不再以本项目自建 happy-path tests 替代上游合同。
- 可以读取和执行上游 AGPL 测试及公开 API 作为行为规范，但项目不得复制、翻译或派生上游实现源码；Node parity tests 使用独立 fixture 与独立表达。

### Assertions

- `PAR-001 API inventory`：Zendriver 0.15.5 的所有公开 export、类、方法、属性、参数默认值和异常语义均有 Node.js 等价入口，或者只有经用户明确批准的语言级等价映射。Evidence：固定版本 API inventory 与逐项 executable type/runtime checks，缺口数必须为 0。
- `PAR-002 Test inventory`：上游 `tests/` 中每个 test case 都有一项稳定 ID、同一行为断言、Node parity case 和运行结果。Evidence：自动生成/校验的映射报告；unmapped、not-run、failed 均必须为 0。
- `PAR-003 Core parity`：browser lifecycle、connection、targets、tabs、elements、key/input、controlled input、多浏览器、domain handlers、downloads、expectations 和 interception 的全部上游 core assertions 通过。Evidence：本地 Chrome 运行完整 core parity suite。
- `PAR-004 Tutorial parity`：上游 docs tutorial tests 的可观察结果全部通过；外部站点依赖通过受控等价 fixture 复现同一能力，不得仅标记 skip。Evidence：tutorial parity suite。
- `PAR-005 Bot-detection parity`：上游 browserscan assertion 在同等本机 Chrome 条件下执行并达到 Zendriver 基准结果；不得用 mock 或静态值代替。Evidence：Zendriver 与 nodriver 同机对照结果。
- `PAR-006 Backend parity`：完整 parity suite 中适用于 transport 的 case 同时通过 JS/native 与 direct/flattened；若上游语义只允许某一 routing，必须有可复现证据而非自行排除。Evidence：四象限报告。
- `PAR-007 Typing and packaging`：所有等价 API full typing，四个发布 tarball 的外部 strict TS consumer 可以调用完整表面。Evidence：strict compile、pack/install/runtime checks。
- `PAR-008 Dependency ceiling`：Node production dependency 不超过 Zendriver 0.15.5 的六个。Evidence：manifest 与 `npm ls --omit=dev --all`。

### Non-goals

- 不要求 Python 与 JavaScript 具有相同语法；但任何语法差异必须保持相同能力、状态变化和错误结果，且不能被当作缺失能力的借口。
- 不复制上游实现源码或把 AGPL test code 原文放入 MIT package；行为合同和独立测试可以覆盖相同行为。
- 不添加上游没有且完整 parity 不需要的平台、恢复、队列或插件机制。

### Stop condition

只有 `PAR-001` 至 `PAR-008` 全部有可重复证据、完整映射报告为零缺口、独立 reviewer verdict 为 `approved`、协调者复验且工作树干净时，才允许再次使用“完成”一词。任何外部条件造成的未运行项必须明确报告为 blocker，不能改写成 non-goal 或 residual difference。

## 当前完整 parity 状态（2026-08-14）

- `PAR-001` 的 checked-in inventory 已清零：16/16 root exports、45/45 core symbols、472/472 core members，共 533/533 项均有 executable semantic evidence；`MISSING`、`UNKNOWN`、`CANDIDATE` 均为 0。
- `PAR-002` inventory 固定收集 101 个 Zendriver 0.15.5 parametrized cases，报告 0 `UNMAPPED`、0 `NOT_RUN`，generator validation 与 mutation probes 全部通过。
- Connection、Future、exception、keys、Position、Element、expectation/interception、Browser、Tab 与 utility public surface 已补齐；strict TS、JS/native、direct/flattened 和真实 headless Chromium 路径通过。
- `test_multiple_browsers_diff_userdata` 使用仓库批准的串行等价执行：同一 `Config` 依次启动三个 Chromium，验证三个不同 port/profile 和相同页面结果，任意时刻只存在一个 managed Chromium；`ZDTEST-0020` 已实际通过，不再 skip。
- Python 语言层继承被显式映射到 JavaScript：`IntEnum`/`str Enum` 使用 number/string primitives，`list` 使用 `Array`，async context 使用 `aenter/aexit` 与 `Symbol.asyncDispose`，call/await/repr dunder 使用命名方法、PromiseLike 或 `toString`。这些映射由 dedicated `ZDAPI-*` cases 覆盖，不引入 Python interpreter compatibility layer。
- 保留一个 ECMAScript 规范边界：当 `EventTransaction.event` 本身是 thenable 时，同步 `event`/`result()` 保持 object identity，但 JavaScript `await` 必须递归 assimilate thenable 并返回其 fulfillment value；`ZDAPI-EVENT-TRANSACTION-THENABLE-001` 固定记录该差异。
- `Tab.activate` / `Tab.bring_to_front` 的 CDP command routing 只用 fake backend 验证；真实调用会违反“不得激活窗口或抢占桌面焦点”的仓库 policy，因此未在 Chromium 上执行。
- 本轮实际证据：`npm run build`、`npm run typecheck`、`python3 parity/generate.py --validate-only`、root `npm test`、`npm run test:parity:headless --workspace=guanine` 和经明确授权的 `NODRIVER_ALLOW_HEADFUL=1 npm run test:parity:headful --workspace=guanine` 全部通过；headless parity 包括 BrowserScan 四象限和串行 multi-browser case，49 个 headful cases 全部通过，headful BrowserScan 在 JS/native × direct/flattened 四象限均为 `Normal` 且 `webdriver: false`。
- 两个 browser phase 结束后均无 managed Chromium、harness lock 或本轮临时 profile 遗留。完整 stop condition 仅剩整套最终变更的独立 reviewer verdict。
