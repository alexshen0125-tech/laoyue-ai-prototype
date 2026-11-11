# 第8批标准外壳预检

运行：`python3 _kit/precheck.py --date 20261111`（离线，全目录交叉比较）。

本模块高项：0。完整报告：`../reports/预审_20261111.md`。

| 目录 | 问题 | 证据 | 严重度 |
|---|---|---|---|
| m-bug-report | 每种组件/做法数据项需人工确认 | 动态组件、表单和按钮未必有列表数据；须逐项判定≥5项是否适用 | 低 |
| m-bug-report | 触控目标疑似小于24px | CSS .check input {appearance:none;width:16px;height:16px;margin:0;border:1.5px solid #C7C9CF;border-radius:4px;background:#FFFFFF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:p} · [('width', 16.0), ('height', 16.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-bug-report | 触控目标疑似小于24px | CSS .rck input {appearance:none;width:20px;height:20px;margin:0;border-radius:50%;border:1.5px solid #C7C9CF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:pointer;flex:none;ba} · [('width', 20.0), ('height', 20.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-bug-report | 跨目录提示词高度相似 | 提示词1 ↔ _modules8/review/m-bug-report#1 · 100% · 从零生成text构建优惠丢失缺陷复现表，拆开步骤、预期和实际金额，标题与结果不足时阻止提报。 ↔ 从零生成text构建优惠丢失缺陷复现表，拆开步骤、预期和实际金额，标题与结果不足时阻止提报。 | 中 |
| m-bug-report | 跨目录提示词高度相似 | 提示词2 ↔ _modules8/review/m-bug-report#2 · 100% · 改成我的业务text在复现工作台展示五个客户端环境的构建号与命中次数，根据真实测试范围指派交易前端负责人。 ↔ 改成我的业务text在复现工作台展示五个客户端环境的构建号与命中次数，根据真实测试范围指派交易前端负责人。 | 中 |
| m-bug-report | 跨目录提示词高度相似 | 提示词3 ↔ _modules8/review/m-bug-report#3 · 100% · 增加业务状态text加入复现日志脱敏副本与五项回归门禁，遮盖手机号和token，任一回归未完成都不能关闭缺陷。 ↔ 增加业务状态text加入复现日志脱敏副本与五项回归门禁，遮盖手机号和token，任一回归未完成都不能关闭缺陷。 | 中 |

中低项保留人工复核；与 `_modules8/review` 的提示词相似项为同模块历史副本，不能作为跨业务复用的结论。公共控件尺寸需按级联与父 label 命中区复核。

离线DOM检查见 shell-validation.json；浏览器排版尚未验收。

index.html SHA-256：`d71a611267b9c8db3bd679712536c2749ae4d072ab8f5235e78e547149dd5360`
