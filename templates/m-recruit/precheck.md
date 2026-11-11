# m-recruit 预检复核

运行：`python3 _kit/precheck.py --date 20261111`。包含全部95个顶层m-*模块的跨目录说明与状态比较。

## 命中项

| m-recruit | 一屏主按钮 / 首个前进按钮需复核 | 存在函数生成按钮或动态布局；无法仅由源码确定视口、互斥分支及最终主色 | 低 |
| m-recruit | 组件状态矩阵无法逐项确认 | 未解析到逐组件 states；需检查工厂、运行时状态映射 | 中 |
| m-recruit | 每种组件/做法数据项需人工确认 | 动态组件、表单和按钮未必有列表数据；须逐项判定≥5项是否适用 | 低 |
| m-recruit | 触控目标疑似小于24px | CSS .check input {appearance:none;width:16px;height:16px;margin:0;border:1.5px solid #C7C9CF;border-radius:4px;background:#FFFFFF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:p} · [('width', 16.0), ('height', 16.0)]；需核对级联、盒模型及父label命中区 | 中 |
| m-recruit | 触控目标疑似小于24px | CSS .rck input {appearance:none;width:20px;height:20px;margin:0;border-radius:50%;border:1.5px solid #C7C9CF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:pointer;flex:none;ba} · [('width', 20.0), ('height', 20.0)]；需核对级联、盒模型及父label命中区 | 中 |

## 中项人工复核

- 状态矩阵：静态正则不解析JSON键名。本页MODULE.sections逐项定义四个业务状态；validation.json记录20个状态渲染不同且关键流转正确，属于解析误报。
- .check input / .rck input：完整标准库中的16/20px样式。本页两种控件DOM实例均为0；静态扫描器仅用选择器末尾input匹配业务输入，属于误报。业务输入最小44高，见layout-contracts.json。

## 低项人工复核

- 主操作：逐状态检查每种做法至多一个可用主按钮；前进按钮均为btn-primary。业务按钮CSS最小44高，重置为次按钮。一屏布局仍待真实浏览器检查。
- 列表数据：每张业务表格至少五条不同记录，DOM脚本逐状态核对行数。单对象表单、双人复盘、费用分摊和转接卡按实际对象呈现，不凑五行。

## 外壳与离线证据

四段资源与当前_kit逐字一致；顶部免费下载、AI提示词三条、目录、主题色、圆角、深浅切换和HTML复制均经DOM检查。
validation.json为关键业务与120状态矩阵的本模块收据；本批layout-contracts.json和contrast-tokens.json分别核对CSS声明、数据行数和46组文字对比度（最低4.778）。
系统Chrome退出134；Playwright Chromium启动报MachPortRendezvousServer Permission denied，见_modules10/browser-launch.json。未联网、未安装依赖。1440/500真实排版、实际触控尺寸与系统剪贴板尚待验收。

状态：待浏览器验收
