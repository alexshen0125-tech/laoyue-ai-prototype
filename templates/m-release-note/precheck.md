# 第8批标准外壳预检

运行：`python3 _kit/precheck.py --date 20261111`（离线，全目录交叉比较）。

本模块高项：0。完整报告：`../reports/预审_20261111.md`。

| 目录 | 问题 | 证据 | 严重度 |
|---|---|---|---|
| m-release-note | 每种组件/做法数据项需人工确认 | 动态组件、表单和按钮未必有列表数据；须逐项判定≥5项是否适用 | 低 |
| m-release-note | 触控目标疑似小于24px | CSS .check input {appearance:none;width:16px;height:16px;margin:0;border:1.5px solid #C7C9CF;border-radius:4px;background:#FFFFFF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:p} · [('width', 16.0), ('height', 16.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-release-note | 触控目标疑似小于24px | CSS .rck input {appearance:none;width:20px;height:20px;margin:0;border-radius:50%;border:1.5px solid #C7C9CF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:pointer;flex:none;ba} · [('width', 20.0), ('height', 20.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-release-note | 跨目录提示词高度相似 | 提示词1 ↔ _modules8/review/m-release-note#1 · 100% · 从零生成text设计版本2.18.0的用户公告编辑器，把新增、优化和修复转为用户可感知条目，保留安全与兼容说明。 ↔ 从零生成text设计版本2.18.0的用户公告编辑器，把新增、优化和修复转为用户可感知条目，保留安全与兼容说明。 | 中 |
| m-release-note | 跨目录提示词高度相似 | 提示词2 ↔ _modules8/review/m-release-note#2 · 100% · 改成我的业务text为版本维护安排UTC+8窗口，避开财务日结、仓库波次和营业高峰，停机公告必须有主动触达渠道。 ↔ 改成我的业务text为版本维护安排UTC+8窗口，避开财务日结、仓库波次和营业高峰，停机公告必须有主动触达渠道。 | 中 |
| m-release-note | 跨目录提示词高度相似 | 提示词3 ↔ _modules8/review/m-release-note#3 · 100% · 增加业务状态text给版本上线加备份、回滚包和值班签认门禁，公告更正保留旧文及原因，草稿不走更正流程。 ↔ 增加业务状态text给版本上线加备份、回滚包和值班签认门禁，公告更正保留旧文及原因，草稿不走更正流程。 | 中 |

中低项保留人工复核；与 `_modules8/review` 的提示词相似项为同模块历史副本，不能作为跨业务复用的结论。公共控件尺寸需按级联与父 label 命中区复核。

离线DOM检查见 shell-validation.json；浏览器排版尚未验收。

index.html SHA-256：`4ee7a1e73af7551e5e4a82be4755602901a08c9e546fe2a4add35f302cba0b29`
