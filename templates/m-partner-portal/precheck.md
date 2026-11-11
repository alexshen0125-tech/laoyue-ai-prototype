# 质量预审 20261111

离线静态扫描；相似度阈值 82%（去标点字符序列）。不执行 JS，不联网，不修改模板。

README 命中 0 个目录；实际扫描 1 个模板。无 index.html 的工具目录：无。

范围补充：按任务点名批次，从第5、6批进度表纳入 README 未打标的功能模块。

| 目录 | 入选依据 |
|---|---|
| m-partner-portal | 全部m-*交互结构审计 |

判定：高严重度为明确占位、复制数据或直接文案复用，建议直接打回；中为静态疑点；低为证据不足或浏览器检查项。有中/低项即需人工看；基本可过仅代表本脚本未发现问题。

限制：不推断真实一屏布局；按钮按操作区检查；动态分支可能互斥。CSS仅检查可匹配可点节点的明确px宽高（含简单变量），不完整计算级联、媒体查询、继承、padding、min/max、父label或运行时尺寸。动态JS数据、状态和拼接提示词无法确认时列人工复核；单字姓名头像可能合理。共享框架注释和README历史打回内容不作为当前页面缺陷证据。

| 目录 | 命中问题 | 证据片段 | 严重度 |
|---|---|---|---|

## 各功能模块主交互结构分布

静态提取实际渲染代码；未识别/共享工厂项需人工复核，不能视为已验收。

| 模块 | 结构分布 | 逐做法证据 |
|---|---|---|
| m-partner-portal | 表单×2、看板/泳道×1、表格×2 | partnerProfile：表单；partnerDeal：表单；partnerPipeline：看板/泳道；partnerCommission：表格；partnerResources：表格 |

## 问题明细

| 目录 | 命中问题 | 证据片段 | 严重度 |
|---|---|---|---|
| m-partner-portal | 一屏主按钮 / 首个前进按钮需复核 | 存在函数生成按钮或动态布局；无法仅由源码确定视口、互斥分支及最终主色 | 低 |
| m-partner-portal | 组件状态矩阵无法逐项确认 | 未解析到逐组件 states；需检查工厂、运行时状态映射 | 中 |
| m-partner-portal | 每种组件/做法数据项需人工确认 | 动态组件、表单和按钮未必有列表数据；须逐项判定≥5项是否适用 | 低 |
| m-partner-portal | 触控目标疑似小于24px | CSS .check input {appearance:none;width:16px;height:16px;margin:0;border:1.5px solid #C7C9CF;border-radius:4px;background:#FFFFFF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:p} · [('width', 16.0), ('height', 16.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-partner-portal | 触控目标疑似小于24px | CSS .rck input {appearance:none;width:20px;height:20px;margin:0;border-radius:50%;border:1.5px solid #C7C9CF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:pointer;flex:none;ba} · [('width', 20.0), ('height', 20.0)]；需核对级联、盒模型及父label命中区 | 中 |

## 建议直接打回（0）

无

## 需人工看（1）

m-partner-portal

## 基本可过（0）

无

只读核对：扫描前后 8 个模板文件 SHA-256 一致。

本次新增规则：高项0，重复骨架中项0。结构分布：表单×2、看板/泳道×1、表格×2。其余静态中低项保留人工复核。
