// 老岳AI产品论坛 · 原型示例数据（全部为示例）
// 首期口径（2026-11-09 老板拍板）：个人主体；不做积分；读者不登录；只有老岳和邀请的作者登录发内容；
// 读者：看、点赞、本机收藏、免费下载附件、私下提问（留邮箱选填）、订阅更新（邮箱）；
// 每篇内容底部放作者本人的微信赞赏码（网站不经手钱）；小程序里不出现赞赏码/收款码/价格/外链。
// 站内全部自产内容（不放原文链接）：深度长文（老岳/真人作者署名）+ 卡片与工具（署编辑部栏目 IP，小标注「老岳AI编辑部」）。
window.SITE = { name: '老岳AI产品论坛', beian: '需求与原型实践笔记', slogan: 'AI 时代产品经理的交流社区' };

window.BOARDS = [
  { id: 'pm',     name: '产品技能',   icon: '◆', desc: '需求、PRD、竞品、数据、项目推进' },
  { id: 'proto',  name: '原型分享',   icon: '▣', desc: '能点的原型、交互稿、改稿过程' },
  { id: 'skill',  name: 'Skill 分享', icon: '⚙', desc: '装上就会干活的 AI 技能包' },
  { id: 'prompt', name: '提示词',     icon: '✎', desc: '复制就能用的提问模板' },
  { id: 'ai',     name: 'AI 使用技巧', icon: '✦', desc: '工具上手、工作流、踩坑记录' },
  { id: 'case',   name: '行业实战',   icon: '◎', desc: 'B 端、电商、供应链、出海的真实项目' },
  { id: 'career', name: '求职与转型', icon: '↗', desc: '简历、面试、转 AI 产品经理' },
];

// 这里只有作者（老岳 + 特邀作者）。普通用户不出现在公开页面上。
window.USERS = {
  laoyue: { name: '老岳',      av: 'img/laoyue.png', title: '十年 B 端产品', badge: '主理人', posts: 42, reward: true },
  nanf:   { name: '南风PM',    c: '#D9480F', title: 'AI 产品经理', badge: '特邀', posts: 23, reward: true },
  ajie:   { name: '阿杰做B端', c: '#2F6FEB', title: 'SaaS 产品负责人', badge: '特邀', posts: 18, reward: true },
  k:      { name: '老K',       c: '#495057', title: '供应链系统产品', badge: '特邀', posts: 15, reward: true },
  momo:   { name: 'Momo',      c: '#C2255C', title: '交互设计转产品', badge: '特邀', posts: 11, reward: false },
  // 栏目卡片的赞赏指向老岳（编辑部负责人）
  editor: { name: '老岳AI编辑部', c: '#161616', mark: '编', title: '栏目内容由编辑部出品 · 老岳维护', badge: '编辑部', posts: 0, reward: true, rewardTo: 'laoyue' },
};
window.AUTHORS = ['laoyue', 'nanf', 'ajie', 'k', 'momo'];

// type: article（深度长文）/ question（读者来信·作者答）/ card（卡片，kind 见 KINDS）
// attach.code: 资料编号（小程序里提示「电脑上搜编号下载」，不放链接）；date: 更新日期
// question = 读者私下提问、作者挑选后匿名公开作答：asker 是读者自愿留下的身份描述（可空），不展示昵称；
// featured = 作者设为「精选问答」
window.POSTS = [
  { id: 1, type: 'article', board: 'pm', author: 'laoyue', pick: true, top: true, time: '2 小时前',
    title: 'AI 写 PRD，我只做 4 步：先拆需求，再让它扮研发挑刺',
    excerpt: '直接让 AI 写 PRD，出来的东西看着全，评审一问三不知。我现在的做法是先拆需求、列 P0、过 6 类边界，最后让 AI 扮研发挑刺，一份能评审的 PRD 一下午就够。',
    cover: 'img/prd.png', tags: ['PRD', 'AI 提效'], reads: '3.4k', likes: 218, favs: 391,
    attach: { name: '一页纸 PRD 模板 + 6 类边界检查表.md', size: '28 KB', code: 'R0001', dl: 932 } },
  { id: 2, type: 'question', board: 'career', author: 'nanf', asker: '应届生 · 转行中', featured: true, time: '35 分钟前',
    title: '应届生转 AI 产品经理，作品集应该放什么？面试官最想看哪一类？',
    excerpt: '投了 20 多家 AI 产品岗，基本没回音。现在的作品集是两份竞品分析和一个课程项目原型，不知道方向对不对。',
    answers: 2, reads: '1.1k', likes: 74, favs: 166, who: ['nanf', 'laoyue'] },
  { id: 3, type: 'card', kind: 'template', board: 'proto', author: 'editor', time: '1 小时前', date: '2026-11-09',
    title: '门店订货 App 三页可点原型（含首页「再来一单」）',
    excerpt: 'HTML 源文件，首页、商品详情、购物车三页能点，配色和间距都抽成了变量，改成自己的业务半小时。',
    fit: '要给老板演示「下单流程」又不想从零画原型的 B 端 / 电商产品经理。',
    cover: 'img/proto.png', tags: ['原型', 'HTML'], reads: '980', likes: 96, favs: 240,
    files: ['index.html 首页', 'detail.html 商品详情', 'cart.html 购物车', 'tokens.css 颜色与间距变量'],
    attach: { name: '门店订货App原型.zip', size: '1.2 MB', code: 'R0002', dl: 196 } },
  { id: 4, type: 'article', board: 'ai', author: 'nanf', pick: true, time: '3 小时前',
    title: '竞品调研别再「搜一圈就写」：1 小时出一份老板能看的报告',
    excerpt: '核对产品身份、按用户任务比步数、看赚钱方式、结论分「已确认 / 待实测」。这四步让我的竞品报告第一次没被老板打回来。',
    cover: 'img/report.png', tags: ['竞品分析', '工作流'], reads: '2.1k', likes: 156, favs: 302,
    attach: { name: '竞品对比报告模板（网页版）.html', size: '64 KB', code: 'R0003', dl: 274 } },
  { id: 5, type: 'question', board: 'skill', author: 'laoyue', asker: '跨境电商产品', time: '2 小时前',
    title: '自己写的 Skill 总是不触发，触发条件到底该怎么写？',
    excerpt: '描述里写了「当用户要写 PRD 时使用」，但大部分时候 AI 还是不调用，是写法的问题还是要加关键词？',
    answers: 1, reads: '860', likes: 52, favs: 133, who: ['laoyue'] },
  { id: 6, type: 'article', board: 'pm', author: 'k', time: '5 小时前',
    title: '供应链系统做了三年，我总结的 B 端需求「6 类边界」',
    excerpt: '数据为空、重复提交、权限、库存并发、网络中断、极端数量。每个 P0 功能过一遍，评审时研发基本挑不出新问题。',
    tags: ['B 端', '需求分析'], reads: '1.6k', likes: 131, favs: 287 },
  { id: 7, type: 'card', kind: 'prompt', board: 'prompt', author: 'editor', time: '昨天', date: '2026-11-08',
    title: '会议纪要 4 块模板提示词（结论 / 待办 / 分歧 / 下次议题）',
    excerpt: '录音转文字后直接贴进去，没人认领的待办会标【待定】，不会自己编负责人。',
    fit: '每周开 3 个会以上、会后总要补纪要的产品经理和项目经理。',
    cover: 'img/minutes.png', tags: ['提示词', '会议'], reads: '2.8k', likes: 204, favs: 512,
    scenes: ['会议与沟通'], prompt: '你是会议记录员。下面是 {{会议主题}} 的录音转写，参会人有 {{参会人}}。\n请按 4 块输出：结论 / 待办（负责人 + 截止时间）/ 分歧 / 下次议题。\n没人认领的待办，负责人写【待定】，不要自己编。\n录音转写：{{粘贴转写文字}}',
    attach: { name: '会议纪要提示词.txt', size: '2 KB', code: 'R0004', dl: 1520 } },
  { id: 8, type: 'article', board: 'career', author: 'laoyue', time: '昨天',
    title: '用 AI 改简历只做 3 步：挑刺、改写、按岗位出匹配版',
    excerpt: '别让 AI「润色」简历，越改越像套话。先让它站在招聘方角度挑问题，再把「负责了什么」改成「解决了什么」。',
    cover: 'img/resume.png', tags: ['简历', '求职'], reads: '4.2k', likes: 309, favs: 688 },
  { id: 9, type: 'question', board: 'ai', author: 'laoyue', asker: '6 人产品团队负责人', time: '昨天',
    title: '团队想统一用 AI 写需求，怎么避免每个人写出来风格完全不一样？',
    excerpt: '我们 6 个产品，现在 AI 写出来的文档格式五花八门，研发吐槽看不过来。',
    answers: 2, reads: '640', likes: 38, favs: 97, who: ['laoyue', 'k'] },
  { id: 10, type: 'article', board: 'ai', author: 'momo', time: '2 天前',
    title: '述职 PPT 1 小时搭完：先写 5 句结论，再让 AI 出网页版',
    excerpt: '结论 → 证据 → 下一步。我只核三件事：数字、顺序、开场第一句。',
    cover: 'img/deck.png', tags: ['述职', 'PPT'], reads: '1.9k', likes: 140, favs: 356,
    attach: { name: '网页版述职PPT模板.html', size: '48 KB', code: 'R0005', dl: 615 } },
  { id: 11, type: 'question', board: 'pm', author: 'nanf', asker: '', featured: true, time: '2 天前',
    title: 'AI 写的竞品报告里有数字，我不敢直接给老板，怎么核才放心？',
    excerpt: '报告里的融资额、用户数、价格都是 AI 给的，有的带了出处有的没带。逐条去搜太慢，不核又怕被问住。',
    answers: 1, reads: '1.3k', likes: 91, favs: 204, who: ['nanf'] },
];


// ---------- 卡片样例（示例；编辑部自产，一屏讲完）----------
window.KINDS = {
  article:  { name: '深度长文', short: '长文',  act: '阅读' },
  prompt:   { name: '提示词卡', short: '提示词', act: '复制' },
  template: { name: '模板',     short: '模板',  act: '下载' },
  term:     { name: '方法 / 术语卡', short: '方法术语', act: '复制' },
  case:     { name: '案例拆解', short: '案例',  act: '复制' },
  tool:     { name: '工具卡',   short: '工具',  act: '复制' },
  skill:    { name: 'Skill',    short: 'Skill', act: '下载' },
};
// 首页规模感：分类计数（示例数，上线时取真实统计）
window.STATS = { total: 5126, article: 186, prompt: 1840, template: 760, tool: 620, term: 910, case: 430, qa: 380 };
const C = (o) => Object.assign({ type: 'card', author: 'editor' }, o);
window.POSTS.push(
  C({ id: 21, kind: 'prompt', board: 'pm', date: '2026-11-09', time: '今天', views: '1.2k', likes: 88, favs: 301, tags: ['需求分析', '访谈'],
    title: '需求访谈提纲生成：不问「你想要什么」',
    excerpt: '输入角色和场景，产出 8 个围绕真实行为的问题，自动避开引导性提问。',
    fit: '第一次独立做用户访谈、怕问歪的产品经理。',
    scenes: ['需求分析'],
    prompt: '你是资深用户研究员。我要访谈的对象是 {{访谈对象}}，场景是 {{使用场景}}。\n请给我 {{问题数量}} 个访谈问题，要求：\n1. 只问过去真实发生的行为（上一次怎么做的），不问「你想要什么功能」；\n2. 每个问题后面写一句「想验证什么」；\n3. 最后列 3 个不要问的引导性问题做反例。' }),
  C({ id: 22, kind: 'prompt', board: 'pm', date: '2026-11-08', time: '昨天', views: '2.4k', likes: 162, favs: 540, tags: ['PRD', '评审'],
    title: '评审前自查：让 AI 扮研发挑 10 个刺',
    excerpt: '把 PRD 贴进去，按 P0 / P1 / P2 输出研发最可能问的问题和你该补的内容。',
    fit: '评审总被研发问住、想提前把坑填上的人。',
    scenes: ['PRD 与评审'],
    prompt: '你是一名有 8 年经验的 {{研发角色}}，正在评审下面这份 PRD。\n请站在研发角度挑 {{问题数量}} 个问题，按 P0 / P1 / P2 排序。\n每个问题写清：哪一段、为什么是问题、建议怎么补。不要夸，只挑刺。\nPRD：{{粘贴 PRD}}' }),
  C({ id: 23, kind: 'prompt', board: 'career', date: '2026-11-06', time: '3 天前', views: '3.1k', likes: 240, favs: 812, tags: ['简历', '求职'],
    title: '简历挑刺：站在招聘方角度看 30 秒',
    excerpt: '先挑问题再改写，把「负责了什么」改成「解决了什么、结果是多少」。',
    fit: '投了很多份没回音、不知道简历哪里不行的人。',
    scenes: ['求职面试'],
    prompt: '你是一名招聘了 200 个 {{目标岗位}} 的面试官，只用 30 秒看下面这份简历。\n请告诉我：1. 你记住了什么；2. 哪 3 句话是空话；3. 每句空话该怎么改成「做了什么 + 结果数字」。\n简历：{{粘贴简历}}' }),
  C({ id: 24, kind: 'template', board: 'pm', date: '2026-11-07', time: '2 天前', views: '1.8k', likes: 133, favs: 466, tags: ['PRD', '模板'],
    title: '一页纸需求说明模板（含 6 类边界检查）',
    excerpt: '背景、目标、P0 功能、边界与异常四块，一页写完；附 6 类边界检查表。',
    fit: '小需求不想写长 PRD、但又怕漏边界的产品经理。',
    files: ['需求说明.md 一页纸模板', '边界检查表.md 6 类边界逐条勾'],
    attach: { name: '一页纸需求说明模板.zip', size: '36 KB', code: 'R0006', dl: 1204 } }),
  C({ id: 25, kind: 'template', board: 'proto', date: '2026-11-05', time: '4 天前', views: '960', likes: 71, favs: 233, tags: ['原型', '后台'],
    title: '后台列表页原型模板：筛选 + 表格 + 抽屉详情',
    excerpt: '中后台最常见的一页：筛选区、批量操作、表格、右侧抽屉看详情，HTML 可点。',
    fit: '做 B 端后台、每次都要从零搭列表页的人。',
    files: ['list.html 列表页', 'drawer.html 抽屉详情', 'tokens.css 颜色与间距变量'],
    attach: { name: '后台列表页原型.zip', size: '420 KB', code: 'R0007', dl: 388 } }),
  C({ id: 28, kind: 'term', board: 'ai', date: '2026-11-09', time: '今天', views: '860', likes: 64, favs: 210, tags: ['RAG', '术语'],
    title: 'RAG（检索增强生成）一句话讲清',
    excerpt: '先从你的资料里搜出相关段落，再让模型照着这些段落回答，减少它瞎编。',
    fit: '要做「知识库问答」类需求、和研发沟通方案的产品经理。',
    def: '先检索、再生成：用户提问 → 在知识库里找最相关的几段 → 把这几段和问题一起交给模型 → 模型照着回答并标出处。',
    example: '客服机器人回答「退货要几天」，先搜到《售后规则》第 3 条，再据此回答，而不是凭印象说。' }),
  C({ id: 29, kind: 'term', board: 'pm', date: '2026-11-03', time: '6 天前', views: '1.1k', likes: 80, favs: 260, tags: ['优先级', '方法'],
    title: 'MoSCoW 优先级：四个桶分需求',
    excerpt: 'Must / Should / Could / Won\'t，比 P0/P1 多一个「这期明确不做」。',
    fit: '需求太多排不过来、总被追问「为什么不做」的人。',
    def: 'Must 必须有（没有就不能上线）；Should 应该有（重要但可延后）；Could 可以有（有空再做）；Won\'t 这期不做（写下来，堵住反复追问）。',
    example: '会员改版：Must 开通与续费；Should 自动续费提醒；Could 会员皮肤；Won\'t 积分商城。' }),
  C({ id: 30, kind: 'term', board: 'ai', date: '2026-11-02', time: '1 周前', views: '740', likes: 52, favs: 188, tags: ['评测', '术语'],
    title: '评测集：判断 AI 功能好不好的「考卷」',
    excerpt: '一组固定的问题 + 标准答案，每次改提示词或换模型都拿它考一遍。',
    fit: '负责 AI 功能上线、要回答「效果到底好没好」的人。',
    def: '评测集 = 50~200 条真实用户问题 + 期望答案 + 打分规则。改动前后各跑一遍，比的是分数，不是感觉。',
    example: '智能客服评测集：100 条历史工单问题，人工写好标准答案，按「答对 / 部分对 / 答错」打分。' }),
  C({ id: 31, kind: 'case', board: 'case', date: '2026-11-07', time: '2 天前', views: '1.9k', likes: 141, favs: 402, tags: ['复购', '电商'],
    title: '拆解：生鲜订货 App 的「再来一单」为什么有用',
    excerpt: '把「每天重复下单」从 6 分钟压到 1 分钟，靠的不是推荐算法，是默认值。',
    fit: '做 B 端订货、复购场景的产品经理。',
    points: ['用户真实行为：80% 的商品和上周同一天一样', '设计：首页一键带出上周同日订单，改数量即可', '边界：下架商品自动跳过并提示，不让用户自己发现', '结果怎么量：下单时长、「再来一单」使用率'] }),
  C({ id: 32, kind: 'case', board: 'career', date: '2026-11-01', time: '1 周前', views: '2.6k', likes: 188, favs: 601, tags: ['面试', '作品集'],
    title: '拆解：一份拿到 3 个 offer 的 AI 产品作品集',
    excerpt: '只放 3 个东西：一个完整项目、一个能点的原型、一页改进建议。',
    fit: '准备转 AI 产品经理、作品集不知道放什么的人。',
    points: ['完整项目：问题 → 拆解 → AI 帮了哪几步 → 怎么验证', '能点的原型：面试官 30 秒能点完', '改进建议：挑一个真实 AI 产品，指出 1 个问题 + 方案', '不放：课程作业、没结论的竞品分析'] }),
  C({ id: 33, kind: 'prompt', board: 'ai', date: '2026-10-30', time: '10 天前', views: '1.4k', likes: 93, favs: 377, tags: ['竞品分析', '核实'],
    title: '竞品报告数字核查：只核钱、人、时间',
    excerpt: '把报告贴进去，自动挑出所有「钱 / 用户数 / 日期」并标出哪些没有出处。',
    fit: '要把 AI 写的竞品报告交给老板、怕数字出错的人。',
    scenes: ['竞品与调研'],
    prompt: '下面是一份关于 {{竞品名称}} 的竞品报告。请找出其中所有涉及金额、用户数、日期的句子，\n逐条列成表：原句 / 数字 / 有没有写出处。\n没有出处的，标【待核实】，不要帮我补数字。\n报告：{{粘贴报告}}' }),
  C({ id: 34, kind: 'template', board: 'pm', date: '2026-10-28', time: '12 天前', views: '1.3k', likes: 99, favs: 320, tags: ['周报', '模板'],
    title: '周报三段式模板：结论 / 风险 / 需要谁帮忙',
    excerpt: '老板 30 秒看完的周报：先结论，再风险，最后写清要谁做什么。',
    fit: '周报写很长、老板却不看的人。',
    files: ['周报.md 三段式模板', '示例.md 一份写好的示例'],
    attach: { name: '周报三段式模板.md', size: '6 KB', code: 'R0008', dl: 2210 } }),
  C({ id: 36, kind: 'case', board: 'case', date: '2026-10-24', time: '2 周前', views: '1.1k', likes: 77, favs: 245, tags: ['B 端', '收款'],
    title: '拆解：收款抹零为什么从 4 步改成 1 步',
    excerpt: '用户心里想的是「收 4300」，界面却让他填「减 2.5」——输入方向反了。',
    fit: '设计金额、数量类输入的 B 端产品经理。',
    points: ['原方案：选类型 → 算差值 → 输入 → 确认，4 步', '问题：要用户心算，输入方向和思维方向相反', '改法：直接填「实收金额」，系统算差值并给推荐值', '自检：线上步骤 ≤ 线下步骤'] }),
  C({ id: 37, kind: 'prompt', board: 'skill', date: '2026-10-22', time: '2 周前', views: '990', likes: 70, favs: 288, tags: ['Skill', '触发'],
    title: 'Skill 触发描述改写：写清什么时候用、什么时候不用',
    excerpt: '把你的 Skill 描述贴进去，改写成带用户原话例子的触发条件。',
    fit: '自己写的 Skill 总是不触发的人。',
    scenes: ['自动化与工作流'],
    prompt: '下面是我写的一个 Skill 的描述，它的用途是 {{Skill 用途}}。请改写成：\n1. 一句话说它做什么；\n2. 什么时候用：列 3 句用户可能的原话；\n3. 什么时候不用：列 2 个容易混淆的场景。\n原描述：{{粘贴描述}}' }),
  C({ id: 38, kind: 'term', board: 'pm', date: '2026-10-20', time: '3 周前', views: '1.6k', likes: 110, favs: 352, tags: ['方法', '验收'],
    title: 'Given / When / Then：一句话写清验收标准',
    excerpt: '前置条件 / 操作 / 预期结果，研发和测试照着就能写用例。',
    fit: '验收标准总写成「功能正常」的产品经理。',
    def: 'Given 在什么前提下，When 用户做了什么，Then 系统应该怎样（要可验证）。',
    example: 'Given 库存 < 下单数量，When 用户点提交，Then 拦截并提示缺货商品和差额数量。' }),
  C({ id: 39, kind: 'template', board: 'career', date: '2026-10-18', time: '3 周前', views: '2.0k', likes: 151, favs: 590, tags: ['简历', '模板'],
    title: '产品经理简历模板（结果导向版）',
    excerpt: '每段经历都按「问题 → 做法 → 结果数字」写，附 3 个改写前后对比。',
    fit: '准备跳槽、简历还是「负责了 xx」写法的人。',
    files: ['简历.docx 模板', '改写对比.md 3 组前后对比'],
    attach: { name: '产品经理简历模板.zip', size: '88 KB', code: 'R0009', dl: 1876 } }),
  C({ id: 41, kind: 'prompt', board: 'pm', date: '2026-11-09', time: '今天', views: '640', likes: 41, favs: 150, tags: ['用户反馈', '分类'], scenes: ['需求分析', '数据分析'],
    title: '用户反馈归类：一堆吐槽变成 5 类需求',
    excerpt: '把客服记录或应用商店评论贴进去，按问题类型归类、计数、挑代表原话。',
    fit: '手上有几百条反馈、不知道先改哪个的人。',
    prompt: '下面是 {{反馈来源}} 的 {{条数}} 条用户反馈。\n请归成不超过 5 类，每类写：类名 / 条数 / 2 句代表原话 / 你建议的改法。\n按条数从多到少排。分不进去的放「其他」，不要硬塞。\n反馈：{{粘贴反馈}}' }),
  C({ id: 42, kind: 'prompt', board: 'pm', date: '2026-11-07', time: '2 天前', views: '1.0k', likes: 72, favs: 240, tags: ['数据', '异动'], scenes: ['数据分析'],
    title: '数据异动排查：先问 5 个问题再下结论',
    excerpt: '指标突然涨跌时，按「口径 → 时间 → 维度 → 外部 → 版本」顺序排查。',
    fit: '老板问「昨天怎么掉了」、想快速给出靠谱回答的人。',
    prompt: '{{指标名称}} 在 {{日期}} 比前一周 {{变化幅度}}。\n请按顺序帮我列排查清单：1. 统计口径有没有变；2. 是哪个时间段变的；3. 拆渠道 / 地区 / 新老用户看是谁变的；4. 有没有外部原因；5. 有没有发版。\n每一步写「去看哪张表 / 哪个字段」。' }),
  C({ id: 43, kind: 'prompt', board: 'career', date: '2026-11-05', time: '4 天前', views: '1.7k', likes: 120, favs: 455, tags: ['述职', '汇报'], scenes: ['汇报写作', '求职面试'],
    title: '述职开场：5 句话讲清这一年',
    excerpt: '结论先行：做成了什么、数字是多少、下一步要什么支持。',
    fit: '要做年终述职、不知道怎么开口的人。',
    prompt: '我是 {{岗位}}，今年主要做了：{{三件事}}。\n请帮我写述职开场的 5 句话：第 1 句结论，第 2~4 句各讲一件事和它的结果数字，第 5 句讲明年要的支持。\n不要形容词，不要「赋能」「抓手」这类词。' }),
  C({ id: 44, kind: 'prompt', board: 'proto', date: '2026-11-03', time: '6 天前', views: '820', likes: 55, favs: 210, tags: ['原型', '交互'], scenes: ['原型设计'],
    title: '交互自检：用 7 条检查一张页面',
    excerpt: '操作步骤、输入方向、默认值、联动……逐条判断通过与否并给改法。',
    fit: '交互稿要过评审、想先自己挑一遍的人。',
    prompt: '下面是 {{页面名称}} 的交互说明。请按 7 条逐条检查并给「通过 / 不通过 + 改法」：\n1. 线上步骤 ≤ 线下步骤；2. 输入方向 = 用户想的方向；3. 能选就不让填；4. 不让用户心算；5. 高频选项有默认值；6. 改了 A，关联的 B 自动变；7. 核心操作 ≤ 3 步。\n交互说明：{{粘贴说明}}' }),
);

window.SCENES = ['需求分析', 'PRD 与评审', '竞品与调研', '数据分析', '会议与沟通', '原型设计', '汇报写作', '求职面试', '自动化与工作流'];
window.STATS.tool = 300; // 11-09 老板：工具卡降为资料库形态，约 300

// ---------- 工具卡（示例；11-09 起不再是一级频道，作为资料库的一种形态 kind=tool）----------
// 说明：工具卡可写真实工具名（老板 11-09 定）；原型里 AI 工具先用「示例名」，上线由工具测评组按实测填写。
// 不放官网链接（站内不放外链口径），读者按名称自行搜索。free 字段只在网页版展示，小程序不展示。
window.TOOLCATS = [
  { id: 'write', n: 62, name: '写作与文档', icon: '✎' }, { id: 'meet', n: 22, name: '会议与纪要', icon: '◷' },
  { id: 'proto', n: 36, name: '原型与设计', icon: '▣' }, { id: 'data', n: 40, name: '数据分析', icon: '▤' },
  { id: 'research', n: 32, name: '调研与搜索', icon: '⌕' }, { id: 'draw', n: 20, name: '流程图与画图', icon: '◇' },
  { id: 'auto', n: 48, name: '自动化与工作流', icon: '⚙' }, { id: 'office', n: 40, name: '效率办公', icon: '◎' },
];
const T = (o) => Object.assign({ checked: '2026-11-0' + (1 + (o.id % 8)), demo: true }, o);
window.TOOLS = [
  T({ id: 1, cat: 'write', name: '文档助手 A', c: '#2F6FEB', one: '长文档起草、改写、按模板出 PRD', free: '免费额度 + 付费', count: 0,
    pm: '把会议结论、零散想法整理成一页纸需求；按你给的范文结构写 PRD 初稿。', steps: ['把团队认可的一份 PRD 贴进去当范文', '说清「照这份结构写」，再贴需求要点', '让它列出没想清楚的地方，逐条补'], fit: ['要写大量文档的产品经理', '有固定模板的团队'], unfit: ['涉及公司保密数据、不能外传的内容'], alts: [2, 3], prompts: [22, 21] }),
  T({ id: 2, cat: 'write', name: '写作助手 B', c: '#0E9F6E', one: '中文表达润色，语气可调', free: '免费', pm: '把技术味很重的说明改成老板能读懂的话。', steps: ['贴原文', '说清读者是谁', '要求不加形容词'], fit: ['给老板写汇报'], unfit: ['需要严谨数据的报告'], alts: [1], prompts: [43] }),
  T({ id: 3, cat: 'write', name: '知识库问答 C', c: '#7048E8', one: '上传文档后按资料回答并标出处', free: '免费额度 + 付费', pm: '把产品手册、规则文档丢进去，客服和新人问问题直接查。', steps: ['上传规则文档', '问一个你知道答案的问题试准确度', '答错的地方补文档'], fit: ['规则多、新人多的团队'], unfit: ['文档常变但没人维护'], alts: [1], prompts: [] }),
  T({ id: 4, cat: 'meet', name: '录音转写 D', c: '#C2255C', one: '会议录音实时转文字，区分说话人', free: '免费额度 + 付费', pm: '会后 5 分钟出纪要，不用边听边记。', steps: ['会前开录', '会后导出文字稿', '贴进「会议纪要 4 块」提示词卡'], fit: ['会多的产品经理'], unfit: ['涉密会议'], alts: [5], prompts: [7] }),
  T({ id: 5, cat: 'meet', name: '手机系统录音转写', c: '#495057', one: '手机自带录音 + 转写，零安装', free: '免费', pm: '临时会议、电话沟通也能留文字记录。', steps: ['打开系统录音并开启转写', '结束后导出文字', '配合纪要提示词整理'], fit: ['不想装新软件的人'], unfit: ['多人会议要区分说话人'], alts: [4], prompts: [7], demo: false }),
  T({ id: 6, cat: 'proto', name: '原型生成 E', c: '#D9480F', one: '一句话描述生成可点击的网页原型', free: '免费额度 + 付费', pm: '评审前快速出一个能点的原型，比画线框图快。', steps: ['写清页面、字段和一个主操作', '生成后逐个点一遍', '让它改成你的配色和间距'], fit: ['要快速验证想法'], unfit: ['已有成熟设计规范要严格还原'], alts: [7], prompts: [44] }),
  T({ id: 7, cat: 'proto', name: '设计稿助手 F', c: '#0B7285', one: '从截图或草图生成设计稿', free: '付费', pm: '把手绘草图变成规整的设计稿给设计参考。', steps: ['拍草图', '描述组件', '导出给设计'], fit: ['没有设计资源的小团队'], unfit: ['需要像素级还原'], alts: [6], prompts: [44] }),
  T({ id: 8, cat: 'data', name: '数据透视表', c: '#12805C', one: '不写公式，拖字段就能按维度汇总', free: '免费', pm: '老板要数时，按渠道、按周看订单量和金额。', steps: ['选中整张表 › 插入 › 数据透视表', '「行」放渠道，「列」放周，「值」放金额', '值字段改成求和，再加一个计数'], fit: ['不会写 SQL 的产品经理'], unfit: ['百万行以上的数据'], alts: [9], prompts: [42], demo: false }),
  T({ id: 9, cat: 'data', name: '表格分析 G', c: '#5C940D', one: '上传表格用中文提问出图表', free: '免费额度 + 付费', pm: '「按周看复购率」这类问题，直接问出图。', steps: ['上传脱敏后的表格', '用中文提问', '核对它用的口径'], fit: ['临时分析'], unfit: ['未脱敏的用户数据'], alts: [8], prompts: [42, 41] }),
  T({ id: 10, cat: 'research', name: '联网搜索 H', c: '#1971C2', one: '带出处的联网搜索和总结', free: '免费', pm: '竞品调研时先拉一遍公开信息，每条带出处方便核对。', steps: ['问具体问题，不问「介绍一下」', '要求每条带出处', '用「数字核查」提示词再过一遍'], fit: ['竞品调研、行业扫描'], unfit: ['需要内部数据的问题'], alts: [], prompts: [33] }),
  T({ id: 11, cat: 'draw', name: 'Mermaid', c: '#FF3670', one: '用几行文字画流程图、状态图', free: '免费', pm: '改需求时改文字就行，不用拖半天图。', steps: ['新建 mermaid 代码块', '写 flowchart TD，一行一个「A --> B」', '状态流转用 stateDiagram-v2'], fit: ['常画业务流程的人'], unfit: ['要精细排版的海报图'], alts: [12], prompts: [], demo: false }),
  T({ id: 12, cat: 'draw', name: '在线白板 I', c: '#E8590C', one: '多人实时画图、贴便签', free: '免费额度 + 付费', pm: '需求讨论时一起画流程、贴想法。', steps: ['建一块白板', '拉人进来', '会后导出图片放进文档'], fit: ['远程讨论'], unfit: ['要版本管理的正式文档'], alts: [11], prompts: [] }),
  T({ id: 13, cat: 'auto', name: '浏览器开发者工具', c: '#343A40', one: '30 秒看懂接口返回了什么', free: '免费', pm: '联调时不用等研发截图，自己看数据。', steps: ['右键 › 检查 › Network', '勾选 Fetch/XHR', '点请求 › Preview 看字段'], fit: ['常联调的产品经理'], unfit: [], alts: [], prompts: [], demo: false }),
  T({ id: 14, cat: 'auto', name: 'Skill 管理 J', c: '#862E9C', one: '把常用提示词做成可复用的技能包', free: '免费', pm: '团队统一 PRD 格式：所有人装同一个 Skill。', steps: ['把模板和要求写进 Skill', '写清触发条件', '团队统一安装'], fit: ['多人产品团队'], unfit: ['一次性的任务'], alts: [], prompts: [37] }),
  T({ id: 15, cat: 'office', name: '日程助手 K', c: '#2B8A3E', one: '用一句话排会、找空档', free: '免费额度 + 付费', pm: '「下周找 3 个研发都有空的 1 小时」一句话搞定。', steps: ['授权日历', '一句话说需求', '确认后发邀请'], fit: ['会议多'], unfit: ['跨公司日历'], alts: [], prompts: [] }),
  T({ id: 16, cat: 'office', name: '翻译助手 L', c: '#1098AD', one: '整篇文档翻译，保留格式', free: '免费', pm: '看海外竞品文档、给海外团队发需求。', steps: ['上传文档', '指定术语表', '人工过一遍关键句'], fit: ['出海业务'], unfit: ['合同等法律文本'], alts: [], prompts: [] }),
];



// ---------- Skill 库（示例；11-09 老板定：Skill 单独成频道，放在原 AI 工具库位置）----------
// 署名：小齿轮 ｜ 老岳AI编辑部 · Skill 与自动化组；老岳亲自做的署老岳（by: 'laoyue'）
window.STATS.skill = 420;
window.SKILLCATS = [
  { id: 'prd', name: '写需求 / PRD', icon: '✎', n: 86 }, { id: 'proto', name: '原型', icon: '▣', n: 48 },
  { id: 'review', name: '评审挑刺', icon: '◎', n: 52 }, { id: 'research', name: '竞品调研', icon: '⌕', n: 44 },
  { id: 'data', name: '数据分析', icon: '▤', n: 46 }, { id: 'meeting', name: '会议纪要', icon: '◷', n: 38 },
  { id: 'deck', name: '汇报 PPT', icon: '▭', n: 52 }, { id: 'career', name: '求职', icon: '↗', n: 54 },
];
const SK = (o) => Object.assign({ by: 'skill', demo: true }, o);
// 安装三步：通用说明，不写具体 AI 产品名（各家目录位置不同，读者按自己用的工具设置找「技能 / Skills」）
window.SKILL_INSTALL = [
  ['下载并解压', '得到一个以 Skill 英文名命名的文件夹，里面有 SKILL.md 和若干模板、清单文件。文件夹名不要改。'],
  ['放进 AI 工具的 Skill 目录', '打开你常用 AI 工具的设置，找到「技能 / Skills」，选「导入」或把整个文件夹放进它指定的目录。'],
  ['新开对话，说一句触发', '用下面任意一句「触发说法」开口。它按 SKILL.md 里的步骤输出，就说明装好了。'],
];
window.SKILLS = [
  SK({ id: 1, size: '18 KB', cat: 'prd', by: 'laoyue', code: 'S0001', ver: 'v1.3', date: '2026-11-08', dl: 2140, name: '一页纸 PRD 生成器',
    one: '把零散的需求要点，按「背景 / 目标 / P0 / 边界」写成一页纸 PRD。', fit: '小需求不想写长文档、但要过评审的时候',
    before: '「做个再来一单，上次买的一键加购，下架的跳过」——一句话丢给研发，评审被问了 20 分钟。',
    after: '一页纸：背景 2 句、目标带数字、P0 只有 3 个、6 类边界逐条写清，评审 10 分钟过。',
    triggers: ['帮我把这个需求写成一页纸 PRD', '按我们团队的格式整理一下这个需求', '这个需求先出个 P0 清单'],
    files: [['SKILL.md', '触发条件、步骤、输出格式'], ['templates/一页纸.md', '一页纸模板'], ['checklists/六类边界.md', '边界检查表'], ['examples/再来一单.md', '一份写好的示例']],
    md: '---\nname: one-page-prd\ndescription: 当用户要把需求要点整理成 PRD、一页纸、P0 清单时使用；只是问概念时不用。\n---\n\n## 步骤\n1. 先用 4 句话复述需求（谁 / 场景 / 要完成什么 / 现在怎么做），有缺口先问用户\n2. 列功能清单，P0 不超过 3 个\n3. 每个 P0 过 6 类边界……', prompts: [22, 21], articles: [1] }),
  SK({ id: 2, size: '24 KB', cat: 'review', code: 'S0002', ver: 'v1.1', date: '2026-11-07', dl: 1630, name: '研发视角评审挑刺',
    one: '扮演后端 + 测试两个角色，按 P0/P1/P2 挑出 PRD 里会被追问的地方。', fit: '评审前一天，自己先把坑填上',
    before: 'PRD 写完直接约评审，研发一问「库存不够怎么办」「重复提交呢」就卡住。',
    after: '评审前拿到 12 条问题清单，P0 的 4 条当天补完，评审只剩 2 个讨论点。',
    triggers: ['帮我评审一下这份 PRD', '站在研发角度挑挑刺', '这份需求测试会问什么'],
    files: [['SKILL.md', '两个角色的提问规则'], ['checklists/评审问题库.md', '常见追问 60 条'], ['examples/评审输出.md', '输出示例']],
    md: '---\nname: prd-review\ndescription: 当用户要评审、挑刺、自查 PRD 或需求文档时使用。\n---\n\n## 角色\n- 后端研发：关注数据、并发、接口\n- 测试：关注边界、异常、回归……', prompts: [22, 44], articles: [6] }),
  SK({ id: 3, size: '46 KB', cat: 'proto', code: 'S0003', ver: 'v1.0', date: '2026-11-05', dl: 980, name: '后台列表页原型生成',
    one: '说清字段和操作，生成「筛选 + 表格 + 抽屉详情」的可点 HTML 原型。', fit: '做 B 端后台，要快速给老板演示',
    before: '画一个列表页线框图要半天，字段改一次重画一次。',
    after: '写 8 行字段说明，10 分钟出能点的页面，配色间距都是变量，改字段只改文字。',
    triggers: ['帮我做一个订单列表页原型', '后台列表页，字段是……', '加一个右侧抽屉看详情'],
    files: [['SKILL.md', '页面结构规则'], ['templates/list.html', '列表页骨架'], ['templates/tokens.css', '颜色与间距变量']],
    md: '---\nname: admin-list-proto\ndescription: 当用户要做后台列表页、表格页、带筛选的管理页原型时使用。\n---\n\n## 页面结构\n筛选区 → 批量操作 → 表格 → 分页；详情一律用右侧抽屉……', prompts: [44], articles: [10] }),
  SK({ id: 4, size: '38 KB', cat: 'research', code: 'S0004', ver: 'v1.2', date: '2026-11-04', dl: 1210, name: '竞品对比报告',
    one: '按用户任务比步数、比赚钱方式，结论分「已确认 / 待实测」。', fit: '老板要一份能看的竞品对比，时间只有一小时',
    before: '搜一圈拼成十页文档，数字没出处，老板一句「这个准吗」答不上来。',
    after: '一张对比表 + 三条结论，每个数字带出处，没核实的标【待实测】。',
    triggers: ['帮我做 A 和 B 的竞品对比', '按用户任务比一下这几个产品', '出一份竞品报告'],
    files: [['SKILL.md', '调研步骤与核实规则'], ['templates/对比表.md', '对比表模板'], ['templates/报告.html', '网页版报告']],
    md: '---\nname: competitor-report\ndescription: 当用户要做竞品分析、产品对比、行业扫描时使用。\n---\n\n## 规则\n- 每个数字写出处；没有出处标【待实测】\n- 按用户任务比步数，不按功能列表比……', prompts: [33], articles: [4] }),
  SK({ id: 5, size: '9 KB', cat: 'data', code: 'S0005', ver: 'v1.0', date: '2026-11-03', dl: 760, name: '数据异动排查',
    one: '指标突然涨跌时，按口径 → 时间 → 维度 → 外部 → 版本五步给出排查清单。', fit: '老板问「昨天怎么掉了」',
    before: '看到下单量掉 20%，先猜是不是活动结束了，查了半天发现是统计口径改了。',
    after: '5 分钟拿到排查清单，每步写清看哪张表、哪个字段，第 1 步就定位到口径变化。',
    triggers: ['昨天订单量掉了 20%，帮我排查', '这个指标为什么突然涨了'],
    files: [['SKILL.md', '五步排查规则'], ['checklists/排查清单.md', '可打印清单']],
    md: '---\nname: metric-anomaly\ndescription: 当用户问某个指标为什么涨跌、要排查数据异动时使用。\n---\n\n## 五步\n1. 统计口径有没有变\n2. 哪个时间段变的……', prompts: [42], articles: [] }),
  SK({ id: 6, size: '12 KB', cat: 'meeting', by: 'laoyue', code: 'S0006', ver: 'v2.0', date: '2026-11-09', dl: 3120, name: '会议纪要 4 块',
    one: '录音转写贴进来，输出结论 / 待办 / 分歧 / 下次议题，没人认领的待办标【待定】。', fit: '会后要 5 分钟内发纪要',
    before: '会开完，纪要拖到第二天，待办没人认领，下次会又从头讨论。',
    after: '会后 5 分钟发出，待办带负责人和日期，没人认领的写【待定】，不会编人名。',
    triggers: ['帮我整理这段会议录音', '出一份会议纪要', '把这次会的待办列一下'],
    files: [['SKILL.md', '4 块结构与规则'], ['templates/纪要.md', '纪要模板'], ['examples/周会.md', '示例']],
    md: '---\nname: meeting-minutes\ndescription: 当用户贴会议录音转写、要整理纪要或待办时使用。\n---\n\n## 输出\n结论 / 待办（负责人 + 截止）/ 分歧 / 下次议题\n## 禁止\n不要编造负责人……', prompts: [7], articles: [] }),
  SK({ id: 7, size: '52 KB', cat: 'deck', code: 'S0007', ver: 'v1.1', date: '2026-11-02', dl: 1450, name: '述职 PPT 网页版',
    one: '先写 5 句结论，再生成一页一句话的网页版 PPT，可直接投屏。', fit: '年终述职、季度汇报',
    before: '先找模板再填内容，做到凌晨，开场第一句还是「今年我主要做了以下工作」。',
    after: '1 小时搭完：5 句结论、每页一个数字，开场一句话讲清今年做成了什么。',
    triggers: ['帮我做述职 PPT', '把这几条结论做成汇报页', '出一个网页版 PPT'],
    files: [['SKILL.md', '结构与文案规则'], ['templates/deck.html', '网页版 PPT 模板'], ['examples/年终述职.html', '示例']],
    md: '---\nname: review-deck\ndescription: 当用户要做述职、汇报、季度总结 PPT 时使用。\n---\n\n## 结构\n结论 → 证据 → 下一步；每页只放一句话 + 一个数字……', prompts: [43], articles: [10] }),
  SK({ id: 8, size: '11 KB', cat: 'career', code: 'S0008', ver: 'v1.0', date: '2026-11-01', dl: 1880, name: '简历挑刺与改写',
    one: '站在招聘方角度 30 秒看简历，挑出空话并改成「做了什么 + 结果数字」。', fit: '投了很多份没回音',
    before: '「负责订单模块的需求分析和产品设计」——面试官看完记不住任何东西。',
    after: '「重做再来一单，补货下单从 6 分钟降到 1 分钟，使用率 42%」——一句话有动作有结果。',
    triggers: ['帮我改改简历', '这份简历哪里有问题', '按这个岗位出一版匹配的简历'],
    files: [['SKILL.md', '挑刺与改写规则'], ['templates/简历.md', '结果导向模板']],
    md: '---\nname: resume-review\ndescription: 当用户要修改、评价、按岗位定制简历时使用。\n---\n\n## 步骤\n1. 30 秒视角：记住了什么\n2. 找出 3 句空话……', prompts: [23], articles: [8] }),
  SK({ id: 9, size: '8 KB', cat: 'prd', code: 'S0009', ver: 'v1.0', date: '2026-10-30', dl: 690, name: '验收标准生成（Given/When/Then）',
    one: '按功能点生成正向 + 异常各至少一条可测试的验收标准。', fit: 'PRD 写完，验收标准还是「功能正常」',
    before: '验收标准写「下单功能正常」，测试只能自己猜怎么测。',
    after: '每个功能点 2~4 条 Given/When/Then，异常场景写清系统怎么提示。',
    triggers: ['给这个需求写验收标准', '补一下 AC', '把验收写成 Given When Then'],
    files: [['SKILL.md', '验收标准规则'], ['templates/AC表.md', '验收表模板']],
    md: '---\nname: acceptance-criteria\ndescription: 当用户要为需求补验收标准、AC、测试用例时使用。\n---\n\n## 规则\n每个功能点至少 1 条正向 + 1 条异常……', prompts: [22], articles: [1] }),
  SK({ id: 10, size: '14 KB', cat: 'research', code: 'S0010', ver: 'v1.0', date: '2026-10-28', dl: 1020, name: '用户反馈归类',
    one: '把几百条客服记录或商店评论归成不超过 5 类，计数、挑代表原话、给改法。', fit: '手上一堆吐槽，不知道先改哪个',
    before: '300 条评论逐条看了一下午，最后凭印象说「大家主要嫌慢」，老板问占多少答不上来。',
    after: '10 分钟拿到 5 类：每类条数、2 句原话、建议改法，「加载慢」占 38% 排第一。',
    triggers: ['帮我把这些用户反馈归一下类', '这些评论主要在吐槽什么', '按问题类型统计一下这批客服记录'],
    files: [['SKILL.md', '归类规则与输出格式'], ['templates/归类表.md', '归类结果表'], ['examples/商店评论.md', '示例']],
    md: '---\nname: feedback-cluster\ndescription: 当用户贴一批反馈、评论、客服记录，要归类、统计、找主要问题时使用。\n---\n\n## 规则\n- 不超过 5 类，分不进去的放「其他」\n- 每类写条数和 2 句原话……', prompts: [41], articles: [] }),
];

// ---------- 编辑部栏目 IP（内容部《栏目IP设定》v1.0；头像 img/columns/<id>.png，右下角「编」字角标）----------
// 署名写法：栏目名 ｜ 老岳AI编辑部 · XX组；页面明写「编辑部栏目，不是个人账号」
window.COLUMNS = [
  { id: 'doc',    name: '铅笔头', group: '需求文档组',        c: '#B7791F', n: 720, desc: '把需求写清楚：PRD、验收标准、需求澄清、用户研究。' },
  { id: 'proto',  name: '积木盒', group: '原型组',            c: '#C2255C', n: 550, desc: '让评审有东西可点：一句话出原型、后台原型规矩、自己做小工具。' },
  { id: 'prompt', name: '气泡灯', group: '提示词组',          c: '#E8A400', n: 800, desc: '问得准才答得好：提问公式、场景提示词、防编造、模板库。' },
  { id: 'skill',  name: '小齿轮', group: 'Skill 与自动化组',  c: '#495057', n: 800, desc: '把重复的活装进 AI：Skill 清单实测、写 Skill、工作流自动化。' },
  { id: 'data',   name: '放大镜', group: '数据与调研组',      c: '#2F6FEB', n: 580, desc: '先看清再下结论：取数、竞品、做 AI 产品的评测与设计。' },
  { id: 'office', name: '便利贴', group: '办公提效组',        c: '#0E9F6E', n: 650, desc: '每天那些杂活：PPT、安全红线、官方文档导读、省钱与长对话。' },
  { id: 'case',   name: '拆箱',   group: '案例拆解组',        c: '#D9480F', n: 500, desc: '把别人做成（和做砸）的项目拆开看。' },
  { id: 'career', name: '信封',   group: '求职组',            c: '#5B3CC4', n: 400, desc: '下一份工作：转 AI 产品经理、改简历、模拟面试。' },
];
(function () {
  const m = { 3: 'proto', 7: 'prompt', 21: 'doc', 22: 'doc', 23: 'career', 24: 'doc', 25: 'proto', 28: 'data', 29: 'doc', 30: 'data', 31: 'case', 32: 'career', 33: 'data', 34: 'office', 36: 'case', 37: 'skill', 38: 'doc', 39: 'career', 41: 'data', 42: 'data', 43: 'career', 44: 'proto' };
  const tc = { write: 'office', meet: 'office', proto: 'proto', data: 'data', research: 'data', draw: 'office', auto: 'skill', office: 'office' };
  window.POSTS.forEach(p => { if (p.type === 'card') p.col = m[p.id] || 'prompt'; });
  window.TOOLS.forEach(t => { t.col = tc[t.cat]; });
})();

// 作者补充：替代公开评论区。读者私下来信里的好问题/建议，作者挑出来，在文末用自己的话补充。
window.ADDENDA = {
  1: [
    { time: '11-09', from: '一位读者来信问', q: 'P0 最多 3 个是硬规定吗？需求比较大的时候怎么拆？',
      a: '不是硬规定，是逼自己排优先级。需求大就拆成两期，每期 P0 还是 3 个以内。' },
    { time: '11-08', from: '一位读者建议', q: '让 AI 扮研发挑刺之后，再加一个测试角色。',
      a: '试了一周，确实能多挑出一批异常场景。第 4 步的提示词已经按这个更新，附件里的检查表同步加了「测试视角」一栏。' },
  ],
  4: [
    { time: '11-07', from: '一位读者来信问', q: '「已确认 / 待实测」分不清的时候怎么标？',
      a: '只要不是你亲手点过、亲眼看到的，都标「待实测」。宁可多标，别让老板替你背锅。' },
  ],
};

// 问答里的回答：只来自作者
window.ANSWERS = {
  2: [
    { u: 'nanf', likes: 41, time: '20 分钟前',
      t: '我面过不少应届，最想看的是「你怎么用 AI 把一件事做完」，而不是又一份竞品分析。建议放一个完整的小项目：问题是什么、你怎么拆、AI 帮了哪几步、结果怎么验证。' },
    { u: 'laoyue', likes: 33, time: '15 分钟前',
      t: '作品集别超过 3 个。一个完整项目 + 一个能点的原型 + 一页你对某个 AI 产品的改进建议，就够了。「原型分享」版块里有能直接改的原型源文件。' },
  ],
  5: [
    { u: 'laoyue', likes: 18, time: '1 小时前',
      t: '描述里要写清「什么时候用」和「什么时候不用」，再给 2–3 个用户原话的例子。只写「写 PRD 时使用」太宽，AI 判断不出来。' },
  ],
  9: [
    { u: 'laoyue', likes: 22, time: '昨天',
      t: '先统一模板，再统一提示词。把团队认可的一份 PRD 当范文，让 AI 每次都「照这份的结构写」，比写十条格式要求管用。' },
    { u: 'k', likes: 9, time: '昨天',
      t: '我们是把模板做成一个 Skill，所有人装同一个，格式问题基本就没了。' },
  ],
  11: [
    { u: 'nanf', likes: 27, time: '2 天前',
      t: '只核会被老板追问的三类数字：钱（价格、融资）、人（用户数）、时间（上线日期）。没出处的直接标「待核实」，不要删也不要猜。' },
  ],
};

// 读者来信：只有作者能看到（作者工作台）。示例。
window.LETTERS = [
  { id: 101, to: 'laoyue', board: 'pm', time: '10 分钟前', asker: 'B 端产品 · 3 年',
    title: '需求评审时研发总说「这个做不了」，怎么用 AI 提前把技术风险过一遍？',
    body: '我们是做 ERP 的，每次评审都被打回来改。想在评审前自己先过一遍，但不懂技术。', status: 'new' },
  { id: 102, to: 'any', board: 'skill', time: '1 小时前', asker: '',
    title: '团队里有人不愿意用 AI 写文档，怎么推？',
    body: '组里 5 个人，2 个人坚持手写，说 AI 写的不靠谱。', status: 'new' },
  { id: 103, to: 'nanf', board: 'career', time: '昨天', asker: '运营转产品',
    title: '运营转 AI 产品，第一份作品做什么最有说服力？',
    body: '做了 4 年用户运营，想转岗。', status: 'picked' },
];

// 读者不登录：「我的」= 本机记录（localStorage，只存在这台设备）
window.store = {
  def: { role: 'reader', rewardOn: false, liked: [], faved: [], seen: [], got: [], asks: [], sub: '' },
  get() { try { return Object.assign({}, this.def, JSON.parse(localStorage.getItem('lyforum2') || '{}')); } catch (e) { return Object.assign({}, this.def); } },
  set(s) { try { localStorage.setItem('lyforum2', JSON.stringify(s)); } catch (e) {} },
};
window.today = () => new Date().toISOString().slice(0, 10);
// 演示用：URL 带 ?demo=reader|author|empty 时，直接设定身份和示例本机记录（截图/评审用）
window.applyDemo = function (S) {
  const m = (location.search.match(/demo=(\w+)/) || [])[1];
  if (!m) return S;
  if (m === 'empty') return Object.assign({}, store.def, { rewardOn: /reward=on/.test(location.search) });
  return Object.assign({}, store.def, { rewardOn: /reward=on/.test(location.search), role: m === 'author' ? 'author' : 'reader', liked: [4], faved: [1, 22, 4], seen: [1, 21, 2, 7, 28], got: [24],
    asks: [{ id: 1, title: 'AI 写的竞品报告里有数字，我不敢直接给老板，怎么核才放心？', to: 'any', time: '11/07', email: true, status: 'answered', post: 11 },
           { id: 2, title: '用 AI 做需求访谈提纲，怎么避免问出引导性问题？', to: 'laoyue', time: '11/09', email: false, status: 'pending' }] });
};

// ---------- Skill 用处 / 用法（11-09 老板：Skill 要写清「用处」和「用法」）----------
// pain=一句话痛点；when/not=什么时候用/别用；chat=一次完整使用示例（你说 → 它问 → 你答 → 它交付）
window.SKILL_MORE = {
  1: { pain: '需求在脑子里很清楚，写成文档就漏边界，评审被研发追问到卡壳。',
    when: ['小需求、一页能写完的需求', '评审前一天要出能看的文档'], not: ['大版本、要写十几章完整 PRD 的需求', '只是想问「PRD 怎么写」这类概念'],
    chat: [['you', '帮我把这个需求写成一页纸 PRD：门店订货首页加「再来一单」，上次买的一键加购，下架的跳过。'],
      ['ai', '先确认 2 点：①「上次」指上一单，还是上周同一天的订单？②加购后数量能改吗？'],
      ['you', '上周同一天；数量可以改。'],
      ['ai', '一页纸 PRD：背景 2 句｜目标：补货下单时长 6 分钟 → 1 分钟｜P0 三个：带出上周同日订单 / 下架商品跳过并提示 / 加购后可改数量｜6 类边界逐条写清（上周无订单、库存不足……）', 1]] },
  2: { pain: 'PRD 自己看不出毛病，一到评审就被问「库存不够怎么办」「重复提交呢」。',
    when: ['约评审前一天自查', '交给研发前想先把明显的坑填上'], not: ['还没写完、只有几句话的需求', '想让 AI 帮你写 PRD（用「一页纸 PRD 生成器」）'],
    chat: [['you', '站在研发角度帮我挑挑刺。（贴上 PRD）'],
      ['ai', '这份 PRD 主要给后端还是前端看？要不要加测试视角？'],
      ['you', '后端，加上测试。'],
      ['ai', '问题清单 12 条：P0 4 条（库存并发扣减没写、重复提交没防、……），P1 5 条，P2 3 条；每条标出在哪一段、建议怎么补。', 1]] },
  3: { pain: '画一个后台列表页线框要半天，字段一改就得重画。',
    when: ['后台列表、订单管理这类「筛选 + 表格」页面', '要给老板演示能点的页面'], not: ['C 端营销页、要设计感的页面', '已有设计稿、要像素级还原'],
    chat: [['you', '帮我做一个订单列表页原型，字段：订单号、客户、金额、状态、下单时间。'],
      ['ai', '状态有哪几种？列表上要哪些批量操作？'],
      ['you', '待支付、待发货、已完成；批量导出。'],
      ['ai', '交付 list.html：顶部按状态和时间筛选，表格 5 列，勾选后可批量导出，点一行从右侧抽屉看详情；颜色间距都在 tokens.css 里。', 1]] },
  4: { pain: '竞品报告搜一圈拼起来，数字没出处，老板一句「这个准吗」就答不上来。',
    when: ['老板要一份能看的竞品对比', '评估要不要跟进某个竞品功能'], not: ['要内部数据才能回答的问题', '只想了解一个产品是干什么的'],
    chat: [['you', '帮我做 A 和 B 的竞品对比，看「下单」这件事谁更快。'],
      ['ai', '对比对象是商家端还是买家端？有没有你亲手试过的部分？'],
      ['you', '买家端；A 我亲手试过，B 没有。'],
      ['ai', '对比表：下单步数 A 4 步 / B 5 步【待实测】｜三条结论，每条带出处；B 的数据全部标【待实测】。', 1]] },
  5: { pain: '指标突然掉了，先凭感觉猜原因，查半天才发现是统计口径改了。',
    when: ['老板问「昨天怎么掉了 / 涨了」', '周报里要解释指标异动'], not: ['还没有数据、只是想定指标', '要写 SQL 取数（它只给排查顺序）'],
    chat: [['you', '昨天订单量比上周同期掉了 20%，帮我排查。'],
      ['ai', '是全天都掉，还是某个时段？最近有没有发版或活动结束？'],
      ['you', '晚上 8 点后掉得多，前天发过版。'],
      ['ai', '排查清单 5 步，每步写清看哪张表、哪个字段；建议先查第 1 步「口径」和第 5 步「发版」——晚高峰集中下跌，优先怀疑新版本下单页。', 1]] },
  6: { pain: '会开完纪要拖到第二天，待办没人认领，下次会又从头讨论。',
    when: ['每次开完会要发纪要', '有录音转写文字，想 5 分钟整理完'], not: ['没有录音、只有零散笔记（先手动补全）', '涉密会议，录音不能给 AI'],
    chat: [['you', '帮我整理这段会议录音。（贴上转写文字）'],
      ['ai', '参会人有哪些？待办的截止日期按会上说的，还是默认本周五？'],
      ['you', '我、阿杰、老K；默认本周五。'],
      ['ai', '纪要 4 块：结论 3 条｜待办 5 条（负责人 + 截止），其中 1 条没人认领，标【待定】｜分歧 1 条｜下次议题 2 个。', 1]] },
  7: { pain: '做述职 PPT 先找模板再填内容，做到凌晨，开场还是「今年我主要做了以下工作」。',
    when: ['年终述职、季度汇报', '要把几条结论快速做成能投屏的页面'], not: ['要精美动画、品牌定制的发布会 PPT', '还没想清楚今年做成了什么'],
    chat: [['you', '帮我做述职 PPT，今年做了：再来一单、评审提效、新人带教。'],
      ['ai', '每件事有结果数字吗？听众是直属领导还是更高一层？'],
      ['you', '下单时长 6 → 1 分钟；评审轮次 3 → 1；带了 2 个新人。听众是总监。'],
      ['ai', '交付 deck.html：开场 1 句结论 + 3 页各一个数字 + 明年要的 2 项支持，共 6 页，可直接投屏。', 1]] },
  8: { pain: '简历投了几十份没回音，自己看不出哪句是空话。',
    when: ['投了很多份没回音', '要针对某个岗位改一版'], not: ['还没有任何经历可写', '想让 AI 编造经历（它不会编）'],
    chat: [['you', '帮我改改简历，投 AI 产品经理。（贴上简历）'],
      ['ai', '你最想让面试官记住的是哪一段？有没有能写出来的结果数字？'],
      ['you', '订单模块那段；下单时长从 6 分钟降到 1 分钟。'],
      ['ai', '30 秒视角：面试官只记住了公司名｜3 句空话已标出｜改写：「重做再来一单，补货下单从 6 分钟降到 1 分钟，使用率 42%」。', 1]] },
  9: { pain: '验收标准写成「功能正常」，测试只能自己猜怎么测。',
    when: ['PRD 写完、要补验收标准', '测试说「这个没法测」'], not: ['需求本身还没定', '要写自动化测试代码'],
    chat: [['you', '给这个需求写验收标准：订单金额满 5000 要主管审批。'],
      ['ai', '审批超时怎么处理？金额正好 5000 算不算？'],
      ['you', '超时 24 小时自动退回；正好 5000 要审批。'],
      ['ai', '验收标准 4 条（Given/When/Then）：正向 2 条、边界 1 条（正好 5000）、异常 1 条（超时 24 小时自动退回并通知下单人）。', 1]] },
  10: { pain: '手上几百条用户吐槽，逐条看完也说不清大家主要在嫌什么。',
    when: ['版本规划前想看用户最在意什么', '客服记录、商店评论攒了一大批'], not: ['只有十来条反馈（自己看更快）', '要做严谨的问卷统计分析'],
    chat: [['you', '帮我把这些用户反馈归一下类。（贴上 300 条评论）'],
      ['ai', '反馈来自哪个版本？要不要把「好评」单独拿出来？'],
      ['you', '最近两个版本；好评单独放。'],
      ['ai', '归成 5 类，按条数排序：加载慢 38% / 找不到入口 21% / ……每类附 2 句原话和改法；好评 46 条单独列出。', 1]] },
};
window.SKILLS.forEach(s => Object.assign(s, window.SKILL_MORE[s.id] || {}));
window.SKILL_FAQ = [
  ['说了触发的话，AI 没反应？', '先确认整个文件夹放进了 Skill 目录，并且新开了一个对话；还不行就把话说直白一点，带上 Skill 名字，比如「用一页纸 PRD 生成器帮我……」。'],
  ['怎么改成我们团队自己的版本？', '打开 SKILL.md，改「步骤」和「输出格式」两段；模板文件直接换成你们自己的，文件名和文件夹名别改。改完新开对话试一句。'],
  ['会不会把我的资料传出去？', 'Skill 包本身只是说明和模板文件，不联网、不上传。你贴给 AI 的内容按你所用 AI 工具的规则处理，涉密内容先脱敏。'],
];
// 新手说明：Skill 是什么、和提示词的区别、三步用法、什么时候用哪个
window.SKILL_GUIDE = {
  what: '装进 AI 助手里的技能包。装上以后，你说一句话，AI 就按固定套路把一件活干完。',
  vs: [['怎么用', '每次复制、粘贴进对话框', '装一次，反复用'], ['怎么启动', '你手动贴进去', '说一句话自动触发'], ['能带什么', '只有一段文字', '可以带模板、检查清单、示例文件'], ['适合', '偶尔干一次的活', '每周都要干、要固定格式的活']],
  useSkill: ['同一件活每周都要干（纪要、周报、评审自查）', '团队要统一格式（大家装同一个 Skill）', '需要带模板或检查清单才干得好'],
  usePrompt: ['偶尔干一次，不值得装', '换了电脑或用别人的账号，不方便装', '想先试试效果，再决定要不要装'],
};

// ---------- 按 AI 分 Tab 的一键安装（11-09 老板：此处可写具体 AI 产品名；目录以官方文档为准，见 网站/2026-11-09_各AI的Skill安装方式核实.md）----------
// 下载地址占位：https://laoyueai.top/s/<skill-id>.zip（skill-id = Skill 英文名）
window.SKILL_AI = [
  { id: 'claude', name: 'Claude Code', dir: '~/.claude/skills', win: '$HOME\\.claude\\skills', verify: '新开会话输入 /{slug}，或说一句下面的触发说法，它按步骤输出就是装好了' },
  { id: 'codex', name: 'Codex CLI', dir: '~/.agents/skills', win: '$HOME\\.agents\\skills', verify: '新开会话输入 /skills 能看到 {slug}；也可以输入 ${slug} 直接点名调用' },
  { id: 'cursor', name: 'Cursor', dir: '~/.cursor/skills', win: '$HOME\\.cursor\\skills', verify: '在 Agent 对话框输入 / 搜「{slug}」，搜得到就是装好了' },
  { id: 'gemini', name: 'Gemini CLI', dir: '~/.gemini/skills', win: '$HOME\\.gemini\\skills', verify: '新开会话说一句触发说法，弹出「启用 Skill」确认，点同意即生效' },
  { id: 'web', name: '网页版 AI', sub: 'DeepSeek / Kimi / 豆包 / 通义', web: true, verify: '粘贴后说一句触发说法，它按步骤输出就能用' },
];
window.skillSlug = s => (s.md.match(/name: ([\w-]+)/) || [])[1] || ('skill-' + s.id);
window.skillCmd = function (s, ai, os) {
  const slug = window.skillSlug(s), url = 'https://laoyueai.top/s/' + slug + '.zip';
  if (os === 'win') return 'New-Item -ItemType Directory -Force "' + ai.win + '" | Out-Null\nInvoke-WebRequest "' + url + '" -OutFile "$env:TEMP\\' + slug + '.zip"\nExpand-Archive "$env:TEMP\\' + slug + '.zip" -DestinationPath "' + ai.win + '" -Force';
  return 'mkdir -p ' + ai.dir + ' && \\\ncurl -fL -o /tmp/' + slug + '.zip ' + url + ' && \\\nunzip -o /tmp/' + slug + '.zip -d ' + ai.dir;
};
window.skillFull = s => s.md.replace(/……$/, '') + '\n\n（完整版以下载包为准）';
// 记住上次选的 AI 和系统（本机，独立于演示身份）
window.instPref = {
  get() { let o = {}; try { o = JSON.parse(localStorage.getItem('lyinst') || '{}'); } catch (e) {} return { ai: o.ai || 'claude', os: o.os || (/Windows/i.test(navigator.userAgent) ? 'win' : 'mac') }; },
  set(k, v) { try { const o = JSON.parse(localStorage.getItem('lyinst') || '{}'); o[k] = v; localStorage.setItem('lyinst', JSON.stringify(o)); } catch (e) {} },
};

// ---------- 搜索（两端共用）：最近搜索（本机）、常搜热词、编号直达 ----------
window.HOTWORDS = ['PRD', '会议纪要', '竞品', '简历', '周报', '访谈', '评审', 'R0006', 'S0006'];
window.recent = {
  get() { try { return JSON.parse(localStorage.getItem('lyrecent') || '[]'); } catch (e) { return []; } },
  push(q) { q = (q || '').trim(); if (q.length < 2) return; try { const L = [q].concat(this.get().filter(x => x !== q)).slice(0, 8); localStorage.setItem('lyrecent', JSON.stringify(L)); } catch (e) {} },
  clear() { try { localStorage.removeItem('lyrecent'); } catch (e) {} },
};
// 输入 R0006 / r6 / S-1003 / S0006 这类编号 → 返回详情路由；找不到返回 null
window.codeTo = function (q) {
  const m = (q || '').trim().match(/^([RS])\s*-?\s*0*(\d{1,4})$/i); if (!m) return null;
  const c = m[1].toUpperCase() + m[2].padStart(4, '0');
  const s = window.SKILLS.find(x => x.code === c); if (s) return { to: 's/' + s.id, code: c };
  const p = window.POSTS.find(x => x.attach && x.attach.code === c); if (p) return { to: (p.type === 'article' ? 'p/' : 'c/') + p.id, code: c };
  return null;
};
// 搜索归一（两端共用，11-09 产品评审 P0-02）：英文不区分大小写、全角转半角、忽略空格。所有搜索（全站 + 频道）都用 nzHas 匹配
window.nz = s => String(s == null ? '' : s).replace(/[\uFF01-\uFF5E]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)).replace(/[\s\u3000]+/g, '').toLowerCase();
window.nzHas = (hay, q) => !q || window.nz(hay).includes(window.nz(q));
// 命中高亮：不区分大小写（保留原文大小写）
window.hlText = (s, q) => { s = String(s); q = String(q || '').trim(); if (!q) return s; const e = q.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); try { return s.replace(new RegExp(e, 'gi'), m => '<mark>' + m + '</mark>'); } catch (x) { return s; } };

// ---------- 真实数据支持（11-09 老板：原型改用真实内容；real-data.js 由 build_real_data.py 生成，?demo=1 切回示例） ----------
window.REAL = false;
// 编号直达兼容真实编号：P-001 / TP-001 / M-001 / W-001 / C-001 / S-1000 / T-001（工具卡）
(function () {
  const old = window.codeTo;
  window.codeTo = function (q) {
    q = (q || '').trim(); const m = q.match(/^(TP|P|M|W|C|L|S|T)\s*-\s*(\d{1,4})$/i);
    if (m && window.REAL) {
      const code = m[1].toUpperCase() + '-' + m[2]; const norm = x => (x || '').toUpperCase().replace(/-0*/, '-');
      const s = window.SKILLS.find(x => norm(x.code) === norm(code)); if (s) return { to: 's/' + s.id, code: s.code };
      const p = window.POSTS.find(x => norm(x.rid) === norm(code)); if (p) return { to: 'c/' + p.id, code: p.rid };
      const t = window.TOOLS.find(x => norm(x.rid) === norm(code)); if (t) return { to: 't/' + t.id, code: t.rid };
      return null;
    }
    return old(q);
  };
})();
window.skillSlug = s => s.slug || (s.md.match(/name: ([\w-]+)/) || [])[1] || ('skill-' + s.id);
// 运营指标：真实数据里没有就显示「新」，不编数字
window.metric = v => (v == null ? '<span class="newtag">新</span>' : v);
// 轻量 Markdown → HTML（标题、段落、列表、表格、代码块、引用、粗体、行内代码）
window.mdHTML = function (src, opt) {
  opt = opt || {}; const e = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const inl = s => e(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/&lt;br&gt;/g, '<br>').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  const L = String(src || '').replace(/\r/g, '').split('\n'); const o = []; let i = 0, hid = 0;
  const isList = l => /^\s*([-*]|\d+[.、)])\s+/.test(l);
  while (i < L.length) {
    const l = L[i];
    if (/^```/.test(l)) { const b = []; i++; while (i < L.length && !/^```/.test(L[i])) b.push(L[i++]); i++; o.push(`<div class="mdcode"><button type="button" class="mdcp" onclick="copyTxt(this.nextElementSibling.textContent,'已复制')">复制</button><pre>${e(b.join('\n'))}</pre></div>`); continue; }
    const m = l.match(/^(#{1,4})\s+(.*)/);
    if (m) { const lv = Math.max(2, m[1].length) + (opt.shift || 0); const id = opt.toc && m[1].length === 2 ? ` id="h${hid++}"` : ''; o.push(`<h${Math.min(lv, 5)}${id}>${inl(m[2])}</h${Math.min(lv, 5)}>`); i++; continue; }
    if (/^\|/.test(l)) { let rows = []; while (i < L.length && /^\|/.test(L[i])) rows.push(L[i++]); rows = rows.filter(r => !/^\|\s*:?-{2,}/.test(r)); const cells = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()); o.push(`<div class="mdtbl"><table>${rows.map((r, j) => `<tr>${cells(r).map(c => j ? `<td>${inl(c)}</td>` : `<th>${inl(c)}</th>`).join('')}</tr>`).join('')}</table></div>`); continue; }
    if (isList(l)) { const ord = /^\s*\d/.test(l); const it = []; while (i < L.length && (isList(L[i]) || (/^\s{2,}\S/.test(L[i]) && it.length))) { if (isList(L[i])) it.push(L[i].replace(/^\s*([-*]|\d+[.、)])\s+/, '')); else it[it.length - 1] += ' ' + L[i].trim(); i++; } o.push(`<${ord ? 'ol' : 'ul'}>${it.map(x => `<li>${inl(x)}</li>`).join('')}</${ord ? 'ol' : 'ul'}>`); continue; }
    if (/^>\s?/.test(l)) { const q = []; while (i < L.length && /^>\s?/.test(L[i])) q.push(L[i++].replace(/^>\s?/, '')); o.push(`<blockquote>${inl(q.join(' '))}</blockquote>`); continue; }
    if (/^-{3,}\s*$/.test(l) || !l.trim()) { i++; continue; }
    const p = []; while (i < L.length && L[i].trim() && !/^(#{1,4}\s|```|\||>)/.test(L[i]) && !isList(L[i])) p.push(L[i++]);
    o.push(`<p>${inl(p.join('\n')).replace(/\n/g, '<br>')}</p>`);
  }
  return o.join('');
};
window.mdToc = src => (String(src || '').match(/^##\s+.+$/gm) || []).map((h, i) => ['h' + i, h.replace(/^##\s+/, '').replace(/[*`]/g, '')]);
