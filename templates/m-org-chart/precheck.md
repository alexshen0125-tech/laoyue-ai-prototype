# 第8批标准外壳预检

运行：`python3 _kit/precheck.py --date 20261111`（离线，全目录交叉比较）。

本模块高项：0。完整报告：`../reports/预审_20261111.md`。

| 目录 | 问题 | 证据 | 严重度 |
|---|---|---|---|
| m-org-chart | 每种组件/做法数据项需人工确认 | 动态组件、表单和按钮未必有列表数据；须逐项判定≥5项是否适用 | 低 |
| m-org-chart | 触控目标疑似小于24px | CSS .check input {appearance:none;width:16px;height:16px;margin:0;border:1.5px solid #C7C9CF;border-radius:4px;background:#FFFFFF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:p} · [('width', 16.0), ('height', 16.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-org-chart | 触控目标疑似小于24px | CSS .rck input {appearance:none;width:20px;height:20px;margin:0;border-radius:50%;border:1.5px solid #C7C9CF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:pointer;flex:none;ba} · [('width', 20.0), ('height', 20.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-org-chart | 跨目录提示词高度相似 | 提示词1 ↔ _modules8/review/m-org-chart#1 · 100% · 从零生成text设计编制受限的组织树，展示总部到区域支持的层级、空缺席位和部门负责人，调动不能占用已冻结岗位。 ↔ 从零生成text设计编制受限的组织树，展示总部到区域支持的层级、空缺席位和部门负责人，调动不能占用已冻结岗位。 | 中 |
| m-org-chart | 跨目录提示词高度相似 | 提示词2 ↔ _modules8/review/m-org-chart#2 · 100% · 改成我的业务text将编制管理改为连锁门店业务：区分正式岗与借调岗，记录成本中心和生效日，阻止经理指向自己的下属。 ↔ 改成我的业务text将编制管理改为连锁门店业务：区分正式岗与借调岗，记录成本中心和生效日，阻止经理指向自己的下属。 | 中 |
| m-org-chart | 跨目录提示词高度相似 | 提示词3 ↔ _modules8/review/m-org-chart#3 · 100% · 增加业务状态text给编制变更增加历史快照，拟定和撤销调令不得覆盖实际归属，导出选定日期的成本中心清单。 ↔ 增加业务状态text给编制变更增加历史快照，拟定和撤销调令不得覆盖实际归属，导出选定日期的成本中心清单。 | 中 |

中低项保留人工复核；与 `_modules8/review` 的提示词相似项为同模块历史副本，不能作为跨业务复用的结论。公共控件尺寸需按级联与父 label 命中区复核。

离线DOM检查见 shell-validation.json；浏览器排版尚未验收。

index.html SHA-256：`12140485869a4f62c5a226991770a8bd7a802a7321c762b64e369a0cb3e3f8b9`
