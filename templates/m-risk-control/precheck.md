# m-risk-control 预审

实际运行原始 _kit/precheck.py；--root 指向新增审计目录，模板是逐字副本，既有模块以只读链接参与跨目录比对。
高项：0。

- 低：一屏主按钮 / 首个前进按钮需复核；存在函数生成按钮或动态布局；无法仅由源码确定视口、互斥分支及最终主色
- 中：组件状态矩阵无法逐项确认；未解析到逐组件 states；需检查工厂、运行时状态映射
- 低：每种组件/做法数据项需人工确认；动态组件、表单和按钮未必有列表数据；须逐项判定≥5项是否适用
- 中：触控目标疑似小于24px；CSS .check input {appearance:none;width:16px;height:16px;margin:0;border:1.5px solid #C7C9CF;border-radius:4px;background:#FFFFFF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:p} · [('width', 16.0), ('height', 16.0)]；需核对级联、盒模型及父label命中区
- 中：触控目标疑似小于24px；CSS .rck input {appearance:none;width:20px;height:20px;margin:0;border-radius:50%;border:1.5px solid #C7C9CF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:pointer;flex:none;ba} · [('width', 20.0), ('height', 20.0)]；需核对级联、盒模型及父label命中区

人工复核说明：
- JSON状态键名不被静态正则识别；MODULE.sections逐项声明业务状态，validation.json遍历全部入口和关键正反路径。
- 共享样式内.check/.rck小复选框未用于业务界面，业务勾选框24×24且父label至少44高。
- 表格列表保持五条独立记录；收起的树节点、条件过滤、单条凭证或单对象表单不凑五行。
- 主操作按业务区域仅一个；矩阵其余实例降为次色。500宽真实尺寸仍以浏览器验收为准。

文字token对比度：52组，最小4.778；来源为_batch12/contrast-tokens.json，未视为渲染实测。
复制HTML提供静态片段，交互需要完整页面脚本。移动端visualViewport处理尚需真机验收。

状态：待浏览器验收
