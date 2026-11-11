# 第8批标准外壳预检

运行：`python3 _kit/precheck.py --date 20261111`（离线，全目录交叉比较）。

本模块高项：0。完整报告：`../reports/预审_20261111.md`。

| 目录 | 问题 | 证据 | 严重度 |
|---|---|---|---|
| m-delivery-track | 每种组件/做法数据项需人工确认 | 动态组件、表单和按钮未必有列表数据；须逐项判定≥5项是否适用 | 低 |
| m-delivery-track | 触控目标疑似小于24px | CSS .check input {appearance:none;width:16px;height:16px;margin:0;border:1.5px solid #C7C9CF;border-radius:4px;background:#FFFFFF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:p} · [('width', 16.0), ('height', 16.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-delivery-track | 触控目标疑似小于24px | CSS .rck input {appearance:none;width:20px;height:20px;margin:0;border-radius:50%;border:1.5px solid #C7C9CF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:pointer;flex:none;ba} · [('width', 20.0), ('height', 20.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-delivery-track | 跨目录提示词高度相似 | 提示词1 ↔ _modules8/review/m-delivery-track#1 · 100% · 从零生成text创建运单配送轨迹，用实际扫描节点区分预计到达时间，呈现冷藏包裹的下一站和时效承诺。 ↔ 从零生成text创建运单配送轨迹，用实际扫描节点区分预计到达时间，呈现冷藏包裹的下一站和时效承诺。 | 中 |
| m-delivery-track | 跨目录提示词高度相似 | 提示词2 ↔ _modules8/review/m-delivery-track#2 · 100% · 改成我的业务text为运单延误设计站点核查和同日改约，未超承诺的包裹不按逾期处理，冷藏货不支持隔夜延期。 ↔ 改成我的业务text为运单延误设计站点核查和同日改约，未超承诺的包裹不按逾期处理，冷藏货不支持隔夜延期。 | 中 |
| m-delivery-track | 跨目录提示词高度相似 | 提示词3 ↔ _modules8/review/m-delivery-track#3 · 100% · 增加业务状态text增加运单温控读数与交付争议证据，超温先隔离复核，代收记录缺少本人确认时保持待核状态。 ↔ 增加业务状态text增加运单温控读数与交付争议证据，超温先隔离复核，代收记录缺少本人确认时保持待核状态。 | 中 |

中低项保留人工复核；与 `_modules8/review` 的提示词相似项为同模块历史副本，不能作为跨业务复用的结论。公共控件尺寸需按级联与父 label 命中区复核。

离线DOM检查见 shell-validation.json；浏览器排版尚未验收。

index.html SHA-256：`903b72ec1ce3d202a6d355bb26cb6cc952d3b908d4c5456f9142994ec7c0d0c4`
