# 第8批标准外壳预检

运行：`python3 _kit/precheck.py --date 20261111`（离线，全目录交叉比较）。

本模块高项：0。完整报告：`../reports/预审_20261111.md`。

| 目录 | 问题 | 证据 | 严重度 |
|---|---|---|---|
| m-reconcile | 每种组件/做法数据项需人工确认 | 动态组件、表单和按钮未必有列表数据；须逐项判定≥5项是否适用 | 低 |
| m-reconcile | 触控目标疑似小于24px | CSS .check input {appearance:none;width:16px;height:16px;margin:0;border:1.5px solid #C7C9CF;border-radius:4px;background:#FFFFFF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:p} · [('width', 16.0), ('height', 16.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-reconcile | 触控目标疑似小于24px | CSS .rck input {appearance:none;width:20px;height:20px;margin:0;border-radius:50%;border:1.5px solid #C7C9CF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:pointer;flex:none;ba} · [('width', 20.0), ('height', 20.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-reconcile | 跨目录提示词高度相似 | 提示词1 ↔ _modules8/review/m-reconcile#1 · 100% · 从零生成text建立账单双边匹配界面，以渠道流水连接订单实收，单边项分别保留，并准确计算少到账金额。 ↔ 从零生成text建立账单双边匹配界面，以渠道流水连接订单实收，单边项分别保留，并准确计算少到账金额。 | 中 |
| m-reconcile | 跨目录提示词高度相似 | 提示词2 ↔ _modules8/review/m-reconcile#2 · 100% · 改成我的业务text为跨日账单设计未达款工作台：按承诺结算日计算逾期，展示金额、渠道责任人和追索截止时间。 ↔ 改成我的业务text为跨日账单设计未达款工作台：按承诺结算日计算逾期，展示金额、渠道责任人和追索截止时间。 | 中 |
| m-reconcile | 跨目录提示词高度相似 | 提示词3 ↔ _modules8/review/m-reconcile#3 · 100% · 增加业务状态text扩展账单关账门禁，拒绝借贷不平衡和未认领单边款，复核签认后保留凭证及结案摘要。 ↔ 增加业务状态text扩展账单关账门禁，拒绝借贷不平衡和未认领单边款，复核签认后保留凭证及结案摘要。 | 中 |

中低项保留人工复核；与 `_modules8/review` 的提示词相似项为同模块历史副本，不能作为跨业务复用的结论。公共控件尺寸需按级联与父 label 命中区复核。

离线DOM检查见 shell-validation.json；浏览器排版尚未验收。

index.html SHA-256：`75016d3a61d4f3cf4b6e49b37ac161ccafdcfc30915d233c3081a3b02da62b24`
