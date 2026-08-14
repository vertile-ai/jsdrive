# Zendriver parity 审计修复 mission

## Goal

逐项修复 2026-08-14 测试深度审计暴露的证据缺口，使 Zendriver 0.15.5 parity 结论由可执行、可回归、不可由静态 overlay 伪造的证据支撑。

## Non-goals

- 不读取、翻译或派生 Zendriver 实现源码；只使用公开文档、公开 runtime metadata、已固定的 test inventory 与黑盒行为。
- 不新增生产 npm dependency，不引入新的测试平台、队列、重试或通用插件机制。
- 不违反仓库单一 managed Chromium、默认 headless、不得抢焦点的浏览器 policy。
- 不把多个审计点合并为一个实现、review 或 commit。

## V1 boundary

本 mission 只修复七个已复现的 parity 证据问题。每个 milestone 使用一个只负责该点的 worker，完成后由另一个未参与实现的 reviewer 只读审查；协调者复验并单独提交后，才开始下一点。

## Milestones and assertions

### M1 CI parity gates

- `AUD-001`: CI 必须执行 checked-in parity inventory validation 和完整 headless parity gate；实现回归不能仅因 root `npm test` 通过而漏检。
- Evidence: workflow/config 静态检查、inventory validation、对应 package script 的一次本地 headless 运行；外部依赖若需要安装，必须固定 Zendriver `0.15.5`。
- Write scope: `.github/workflows/ci.yml`、root/API package scripts，以及该点必须的最小 CI helper。

### M2 ZDTEST registration binding

- `AUD-002`: 101 个 `ZDTEST-*` mapping 必须分别绑定到唯一、真实注册的 Node test title；删除测试但保留注释或任意文本必须使 validation 失败。
- Evidence: validator focused tests/mutation probes、`parity/generate.py --validate-only`，以及 101/101 registration report。
- Write scope: parity test-title inspector、mapping validator、其 focused tests/fixtures；不得修改行为测试语义。

### M3 API semantic evidence integrity

- `AUD-003`: 533 个 API mapping 必须明确声明验证维度；缺少、伪造或指向未执行 evidence 的 mapping 必须验证失败。报告不得把结构存在自动表述为完整行为等价。
- Evidence: semantic coverage mutation probes、533/533 evidence report、API/runtime focused tests。
- Write scope: `parity/api-semantic-mappings.json`、generator/inspector、专用 `ZDAPI-*` tests；不得顺带改业务实现。

### M4 transport quadrant parity

- `AUD-004`: 每个 transport-applicable `ZDTEST-*` case 必须在 JS/native × direct/flattened 四象限运行；不适用项必须有逐项、可执行的理由，不能依赖默认 backend/mode。
- Evidence: machine-readable case/matrix report、完整 headless parity run；headful 证据只在取得该次明确授权后运行。
- Write scope: parity behavior tests、最小矩阵 helper/report；不得改变行为断言。

### M5 React black-box alignment

- `AUD-005`: `clear_input`、`clear_input_by_deleting`、controlled fill 的六个参数化 case 必须使用真实 React fixture，并与 Zendriver 0.15.5 黑盒可观察结果一致；mapping note、test title 和断言不得相互矛盾。
- Evidence: 同一 fixture 上 Zendriver/Node 的结构化结果、JS/native × direct/flattened headless run；不得查看 Zendriver 源码。
- Write scope: React parity fixture/test、专用 black-box reference runner、相应 mapping records；只修改为对齐行为所必需的输入实现。

### M6 differential harness compliance

- `AUD-006`: differential 必须显式 headless、持有同一 repository-wide browser lock、串行执行 Zendriver/JS/native，并成为可重复的测试入口；运行结束无进程/profile 残留。
- Evidence: deterministic lock test、真实 headless differential、cleanup check。
- Write scope: differential runner、package script、已有 harness 的最小复用接口与 focused tests。

### M7 multi-browser single-instance equivalence

- `AUD-007`: `ZDTEST-0020` 必须明确区分上游 multi-browser assertion 与仓库单 managed Chromium policy，证明三个独立 port/profile/navigation 结果且任意时刻最多一个 managed process；报告不得暗示并发已验证。
- Evidence: lifecycle trace/max-concurrency assertion、serial three-profile real headless run、mapping/report wording validation。
- Write scope: browser-core parity case、mapping/report/roadmap wording；不得启动并发 Chromium。

## Constraints

- 所有 shell command 使用 `rtk`；手写文件修改使用 `apply_patch`。
- 每个 browser run 前检查无 managed Chromium，结束后验证 PID、lock 和本轮 profile 已清理。
- 每个 milestone 独立 worker、独立只读 reviewer、最多三轮 review；reviewer 不编辑。
- 每个 milestone reviewer `approved`、协调者复验后创建且仅创建一个独立 commit。
- headful run 必须针对具体运行再次取得用户明确授权；实现阶段不能沿用之前授权。

## Stop condition

七个 milestone 均各自 `approved`、复验和提交；完整 headless/root/typecheck/inventory 通过；取得授权后完整 headful 通过；最终全套只读 reviewer verdict 为 `approved`；工作树干净且无 managed Chromium/profile 遗留。
