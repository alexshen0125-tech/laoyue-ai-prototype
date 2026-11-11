# m-ai-workflow 预审复核

命令：`python3 _kit/precheck.py --date 20261111`。完整跨目录扫描见 reports/预审_20261111.md。

## 本模块命中项

| m-ai-workflow | 一屏主按钮 / 首个前进按钮需复核 | 存在函数生成按钮或动态布局；无法仅由源码确定视口、互斥分支及最终主色 | 低 |
| m-ai-workflow | 组件状态矩阵无法逐项确认 | 未解析到逐组件 states；需检查工厂、运行时状态映射 | 中 |
| m-ai-workflow | 每种组件/做法数据项需人工确认 | 动态组件、表单和按钮未必有列表数据；须逐项判定≥5项是否适用 | 低 |
| m-ai-workflow | 触控目标疑似小于24px | CSS .check input {appearance:none;width:16px;height:16px;margin:0;border:1.5px solid #C7C9CF;border-radius:4px;background:#FFFFFF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:p} · [('width', 16.0), ('height', 16.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-ai-workflow | 触控目标疑似小于24px | CSS .rck input {appearance:none;width:20px;height:20px;margin:0;border-radius:50%;border:1.5px solid #C7C9CF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:pointer;flex:none;ba} · [('width', 20.0), ('height', 20.0)]；需核对级联、盒模型及父label命中区 | 中 |

## 中项复核

- 组件状态矩阵无法逐项确认：静态解析器只匹配JS对象的 states: 写法；本页使用可解析JSON的 "states"。MODULE.sections逐项为四个不同业务状态，validation.json记录20个状态全部渲染且视图不同，属于误报。
- 触控目标 .check input / .rck input：来自完整标准kit.css。扫描器只使用选择器最后的input去匹配任意业务输入；DOM中这两种控件实例数均为0，属于误报。企业开通清单实际复选框24px且整行标签44px。

## 低项复核

- 数据量：列表各有至少五条不同业务记录；主体资料、审批意见、参数配置等单对象表单不适用五行列表要求。
- 主按钮：DOM逐状态检查每个业务操作区最多一个可用主按钮，首个前进按钮使用btn-primary；重置、下载样本等辅助操作使用次按钮。实际一屏呈现仍待浏览器验收。

## 外壳与验证范围

四个内联标准资源与_kit源文件逐字一致；顶部免费下载、AI提示词三条、主题色、圆角、明暗切换均通过离线DOM核验。预审规则新增后未删改任何原有规则。
本地Playwright浏览器缺失，遵守不联网不安装。500宽布局、实际渲染对比度、系统剪贴板和触控须继续浏览器验收。

状态：待浏览器验收
