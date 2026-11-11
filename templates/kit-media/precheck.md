# kit-media 预检与交互核验

已实际运行原始 _kit/precheck.py；通过 --root 使用本批新增审计目录，避免覆盖已有 reports。目标页面为逐字副本，全部101个m-*参与跨目录业务比较。
高项：0。

- 低：一屏主按钮 / 首个前进按钮需复核；存在函数生成按钮或动态布局；无法仅由源码确定视口、互斥分支及最终主色
- 中：组件状态矩阵无法逐项确认；未解析到逐组件 states；需检查工厂、运行时状态映射
- 低：每种组件/做法数据项需人工确认；动态组件、表单和按钮未必有列表数据；须逐项判定≥5项是否适用
- 中：触控目标疑似小于24px；CSS .check input {appearance:none;width:16px;height:16px;margin:0;border:1.5px solid #C7C9CF;border-radius:4px;background:#FFFFFF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:p} · [('width', 16.0), ('height', 16.0)]；需核对级联、盒模型及父label命中区
- 中：触控目标疑似小于24px；CSS .rck input {appearance:none;width:20px;height:20px;margin:0;border-radius:50%;border:1.5px solid #C7C9CF;display:grid;place-items:center;transition:all 220ms cubic-bezier(.22,.8,.24,1);cursor:pointer;flex:none;ba} · [('width', 20.0), ('height', 20.0)]；需核对级联、盒模型及父label命中区

中项复核：
- 状态矩阵无法逐项确认：静态正则无法识别JSON键名；MODULE.sections与运行时states逐项可读，validation.json验证每个状态的独立渲染。组件额外包含四种真实控件交互矩阵、三档尺寸，实例互相独立。
- .check input和.rck input：标准样式的16/20px规则未用于本页控件，实际DOM实例为0；业务输入至少24，按钮至少44。CSS证据见_batch11/layout-contracts.json。

低项复核：
- 每种做法只有一个可用主按钮。矩阵和尺寸样例保留首例主色，其余使用次色避免主操作竞争。500宽、一屏布局仍需真实浏览器。
- 所有业务表格至少五条不同记录。单客户合并、测温、裁剪、音频选段等单对象界面不凑表格行。

验证边界：
validation.json为离线JSDOM验证，Canvas和AudioContext使用桩确认控件契约，不能证明真实音画输出。复制验证检查写入内容，不能证明系统剪贴板权限。
三套组件共15组件、150状态；六模块共30做法、120状态。每个页面标准外壳四段内联资源与当前_kit源文件逐字一致。
数学对比度见_batch11/contrast-tokens.json；本机浏览器启动失败，见_batch11/browser-launch.json，尚未验证500/1440真实布局、像素对比度或命中区。

状态：待浏览器验收
