# 第8批标准外壳预检

运行：`python3 _kit/precheck.py --date 20261111`（离线，全目录交叉比较）。

本模块高项：0。完整报告：`../reports/预审_20261111.md`。

| 目录 | 问题 | 证据 | 严重度 |
|---|---|---|---|
| m-course-player | 提示词缺少可核实的专属字段/状态 | 提示词1 · 从零生成text制作冷链培训课时页面，提供阅读断点、章节前置解锁和讲义说明，明确离线阅读不计视频学时。 · 未命中业务字段（动态拼接需复核） | 中 |
| m-course-player | 每种组件/做法数据项需人工确认 | 动态组件、表单和按钮未必有列表数据；须逐项判定≥5项是否适用 | 低 |
| m-course-player | 触控目标疑似小于24px | CSS .check input {appearance:none;width:16px;height:16px;margin:0;border:1.5px solid #C7C9CF;border-radius:4px;background:#FFFFFF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:p} · [('width', 16.0), ('height', 16.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-course-player | 触控目标疑似小于24px | CSS .rck input {appearance:none;width:20px;height:20px;margin:0;border-radius:50%;border:1.5px solid #C7C9CF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:pointer;flex:none;ba} · [('width', 20.0), ('height', 20.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-course-player | 跨目录提示词高度相似 | 提示词1 ↔ _modules8/review/m-course-player#1 · 100% · 从零生成text制作冷链培训课时页面，提供阅读断点、章节前置解锁和讲义说明，明确离线阅读不计视频学时。 ↔ 从零生成text制作冷链培训课时页面，提供阅读断点、章节前置解锁和讲义说明，明确离线阅读不计视频学时。 | 中 |
| m-course-player | 跨目录提示词高度相似 | 提示词2 ↔ _modules8/review/m-course-player#2 · 100% · 改成我的业务text为课时播放器加入五档语速、字幕可用性和节流选项，缺少英文字幕时保留原配置并解释原因。 ↔ 改成我的业务text为课时播放器加入五档语速、字幕可用性和节流选项，缺少英文字幕时保留原配置并解释原因。 | 中 |
| m-course-player | 跨目录提示词高度相似 | 提示词3 ↔ _modules8/review/m-course-player#3 · 100% · 增加业务状态text增加课时知识点笔记和结课门槛，笔记锚定时间，80分以下先补学，导出清单不得冒充正式证书。 ↔ 增加业务状态text增加课时知识点笔记和结课门槛，笔记锚定时间，80分以下先补学，导出清单不得冒充正式证书。 | 中 |

中低项保留人工复核；与 `_modules8/review` 的提示词相似项为同模块历史副本，不能作为跨业务复用的结论。公共控件尺寸需按级联与父 label 命中区复核。

离线DOM检查见 shell-validation.json；浏览器排版尚未验收。

index.html SHA-256：`f0f0d4a1dc6400437d1c3d0c0eea95cf81bf8b479a92efe7aa0aa2c0e37c2bae`
