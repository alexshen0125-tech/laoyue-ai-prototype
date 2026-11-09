/* 方向 B · 专业工具感 · 页面渲染 */
(function () {
  const L = window.LY, { esc, ic, $, $$ } = L, S = L.STATS;
  const theme = () => document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const island = cur => `<header class="island">
    <a class="logo" href="index.html"><i>岳</i>老岳AI</a>
    <nav aria-label="主导航">${[['index.html', '首页', 'home'], ['../../forum.html#prompts', '提示词', 'p'], ['../../forum.html#skills', 'Skill', 's'], ['../../forum.html#lib', '资料库', 'l'], ['../../forum.html#qa', '问答', 'q']].map(([h, n, k]) => `<a href="${h}" ${cur === k ? 'aria-current="page"' : ''}>${n}</a>`).join('')}</nav>
    <button class="k" data-cmdk aria-label="搜索（⌘K）">${ic('magnifying-glass')}<span>搜索或跳转</span><kbd>⌘</kbd><kbd>K</kbd></button>
    <button class="iconbtn" id="th" aria-label="切换深浅色">${ic(theme() === 'dark' ? 'sun' : 'moon')}</button></header>`;
  const foot = `<footer class="wrap"><div class="foot"><span>老岳AI产品论坛 · 方向 B「工具台」提案稿 · 真实内容（待编辑部终审）</span><a href="../index.html">回到三个方向对比</a></div></footer>`;
  const tabbar = `<nav class="tabbar" aria-label="底部导航"><a href="index.html" aria-current="page">${ic('house')}首页</a><a href="../../forum.html#prompts">${ic('chat-centered-text')}提示词</a><a href="../../forum.html#skills">${ic('puzzle-piece')}Skill</a><a href="../../forum.html#lib">${ic('books')}资料库</a><button data-cmdk>${ic('magnifying-glass')}搜索</button></nav>`;
  function bindTheme() { $('#th').onclick = () => { const t = theme() === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = t; try { localStorage.setItem('lyB_theme', t) } catch (e) { } $('#th i').className = 'ph-light ph-' + (t === 'dark' ? 'sun' : 'moon') } }

  /* 生成式封面：按 id 播种的等高线 + 点阵，只用墨/灰/黄三色 */
  function art(seed, w = 600, h = 220) {
    const r = L.seeded(seed); const cx = w * (.55 + r() * .35), cy = h * (.2 + r() * .5); let s = '';
    for (let i = 0; i < 14; i++) { const rr = 18 + i * (14 + r() * 4); s += `<ellipse cx="${cx}" cy="${cy}" rx="${rr * 1.6}" ry="${rr}" fill="none" stroke="currentColor" stroke-opacity="${(.22 - i * .012).toFixed(3)}" stroke-width="1" transform="rotate(${-12 + r() * 24} ${cx} ${cy})"/>` }
    for (let x = 12; x < w; x += 24) for (let y = 12; y < h; y += 24) { const d = Math.hypot(x - cx, y - cy); if (d < 70 && r() > .55) s += `<circle cx="${x}" cy="${y}" r="1.6" fill="#FFD84D" fill-opacity="${(1 - d / 80).toFixed(2)}"/>`; else if (r() > .9) s += `<circle cx="${x}" cy="${y}" r="1" fill="currentColor" fill-opacity=".25"/>` }
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="color:var(--text)"><defs><radialGradient id="g${seed}"><stop offset="0" stop-color="#FFD84D" stop-opacity=".28"/><stop offset="1" stop-color="#FFD84D" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#g${seed})" transform="translate(${cx - w / 2} ${cy - h / 2})"/>${s}</svg>`;
  }
  const row = (p, i) => `<div class="row" data-rv="${i % 8}"><code>${esc(p.rid)}</code><a class="t" href="prompt.html?id=${p.id}"><b>${esc(p.title)}</b><small>${esc(p.excerpt)}</small></a><span class="sc">${(p.scenes || []).slice(0, 1).map(s => `<span class="tag">${ic(L.SCENE_IC[s] || 'circle')}${esc(s)}</span>`).join('')}</span><button class="cp" data-cp="${p.id}" aria-label="复制：${esc(p.title)}">${ic('copy')}<span class="lab">复制</span></button></div>`;
  const bindRows = r => $$('[data-cp]', r).forEach(b => L.bindCopy(b, () => L.byId(b.dataset.cp).prompt, '已复制（变量保留 {{ }}）'));

  function home() {
    const sks = window.SKILLS.slice(0, 5), ps = L.prompts.slice(0, 8), cls = ['c-a', 'c-b', 'c-c', 'c-d', 'c-e'];
    document.getElementById('app').innerHTML = `<div class="aura" aria-hidden="true"></div>` + island('home') + `
    <main class="wrap">
      <section class="hero"><span class="pill" data-rv="0"><b>新</b>${S.skill} 个 Skill 一条命令装好</span>
        <h1 data-rv="1">产品经理用 AI 干活<span>要的东西，搜一下就拿走</span></h1>
        <p class="sub" data-rv="2">提示词、Skill、模板，按编号或一句话搜到就能拿走。不用登录。</p>
        <div class="bar" data-rv="3"><button class="go" data-cmdk aria-label="打开搜索">${ic('magnifying-glass')}<span class="caret"></span><span>写 PRD、做竞品、开会纪要，或输入 P-015 / S-1000</span><span class="ks"><kbd>⌘</kbd><kbd>K</kbd></span></button></div>
        <div class="quick" data-rv="4">${['PRD', '竞品', '会议纪要', '周报', '简历', '原型'].map(q => `<button data-q="${q}">${ic('arrow-elbow-down-right')}${q}</button>`).join('')}</div>
        <div class="stat" data-rv="5">${[['提示词', S.prompt], ['Skill', S.skill], ['模板', S.template], ['术语卡', S.term], ['长文', S.article]].map(([n, v]) => `<span><b>${v}</b>${n}</span>`).join('')}</div>
      </section>
      <section class="sec" style="padding-top:8px"><div class="sec-h" data-rv><div><h2>长文精华</h2><p>老岳亲手写，每篇都附可复制的提示词和模板</p></div><a href="../../forum.html#home">全部 ${S.article} 篇 ${ic('arrow-right')}</a></div>
        <div class="longs">${L.articles.slice(0, 3).map((a, i) => `<a class="long" href="../../forum.html#p/${a.id}" data-rv="${i}"><span class="lart">${art('A' + a.id, 200, 120)}<b>${String(a.id).padStart(2, '0')}</b></span><span><strong>${esc(a.title.split('：')[0])}</strong><small>${esc(a.title.split('：')[1] || '')}</small><em>老岳 · ${L.fmtDate(a.date)}</em></span></a>`).join('')}</div></section>
      <section class="sec"><div class="sec-h" data-rv><div><h2>先装这几个 Skill</h2><p>装一次，以后说一句话就按步骤干活</p></div><a href="../../forum.html#skills">全部 ${S.skill} 个 ${ic('arrow-right')}</a></div>
        <div class="bento">${sks.map((s, i) => `<a class="cell ${cls[i]}" href="skill.html?id=${s.id}" data-rv="${i}"><div class="core"><div class="art">${art(s.code, 600, i < 2 ? 220 : 150)}<span class="gly">${ic(L.SKCAT_IC[s.cat] || 'puzzle-piece')}</span></div><div class="bd"><h3>${esc(s.name)}<code>${esc(s.code)}</code></h3><p>${esc(s.one)}</p><div class="ft"><span>${esc(L.skCat(s.cat).name)}</span><span>${esc(s.ver)}</span><span>${esc(s.size)}</span></div></div></div></a>`).join('')}</div></section>
      <section class="sec"><div class="sec-h" data-rv><div><h2>新上的提示词</h2><p>悬停整行就能复制，进详情页可就地填空</p></div><a href="../../forum.html#prompts">全部 ${S.prompt} 条 ${ic('arrow-right')}</a></div>
        <div class="rows">${ps.map(row).join('')}</div></section>
      <section class="sec"><div class="sec-h" data-rv><div><h2>按场景</h2></div></div>
        <div class="scenes">${L.SCENES.map((s, i) => `<a href="../../forum.html#prompts/scene=${encodeURIComponent(s)}" data-rv="${i % 4}">${ic(L.SCENE_IC[s] || 'circle')}${esc(s)}<small>${L.sceneCount(s)}</small></a>`).join('')}</div></section>
    </main>` + foot + tabbar;
    document.body.classList.add('has-tab'); bindTheme(); bindRows(document);
    const P = L.palette(); $$('[data-q]').forEach(b => b.onclick = () => P.open(b.dataset.q)); L.reveal();
  }

  function prompt() {
    const p = L.byId(L.qs('id') || 1015) || L.prompts[0]; document.title = p.title + ' · 老岳AI';
    const F = L.fillable(p), secs = L.parseArr(p.sections), lines = p.prompt.split('\n').length;
    document.body.classList.add('has-dock');
    document.getElementById('app').innerHTML = `<div class="aura" aria-hidden="true" style="height:520px"></div>` + island('p') + `
    <main class="wrap">
      <nav class="crumb" aria-label="面包屑"><a href="index.html">首页</a>${ic('caret-right')}<a href="../../forum.html#prompts">提示词</a>${ic('caret-right')}<span>${esc((p.scenes || [])[0] || '')}</span></nav>
      <div class="dgrid"><div>
        <div class="head"><span class="gly">${art(p.rid, 64, 64)}${ic(L.SCENE_IC[(p.scenes || [])[0]] || 'chat-centered-text')}</span><div><h1>${esc(p.title)}</h1><p>${esc(p.fit || p.excerpt)}</p>
          <div class="meta"><span class="tag mono">${esc(p.rid)}</span>${(p.scenes || []).map(s => `<span class="tag">${esc(s)}</span>`).join('')}<span class="tag">${esc(L.col(p.col).name)} ｜ 老岳AI编辑部</span><span class="tag num">核对于 ${L.fmtDate(p.date)}</span></div></div></div>
        <div class="editor"><div class="core"><div class="ed-h"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span>prompt · ${F.vars.length} 个空要填</span><span class="r"><button class="sbtn" id="ex">${ic('magic-wand')}用示例填</button><button class="sbtn" id="clr">${ic('eraser')}清空</button></span></div>
          <div class="code"><div class="ln" aria-hidden="true">${Array.from({ length: lines + 2 }, (_, i) => i + 1).join('<br>')}</div><div class="tx" id="sheet">${F.html}</div></div>
          <div class="ed-f">${ic('lock-simple')}你填的内容只存在这台电脑上　·　<kbd>⌘</kbd><kbd>↵</kbd> 复制</div></div></div>
        <div class="prose">${secs.map(s => `<h3>${esc(s.h)}</h3>${L.md(s.md)}`).join('')}<p class="note">${esc(p.aigc || '')}　出处：${esc(L.parseArr(p.srcs).join('、'))}</p></div>
        <section class="rel"><div class="sec-h"><div><h2 style="font-size:20px">同场景还有</h2></div></div><div class="rows">${L.related(p).map(row).join('')}</div></section>
      </div>
      <aside class="insp">
        <div class="box"><h4>${ic('textbox')}填空<span id="pg">0/${F.vars.length}</span></h4><div class="ring"><i id="pb"></i></div>
          ${F.vars.map(v => `<label class="fld"><b>${esc(v.name)}</b><small>${esc(v.hint || '')}${v.example ? '　例：' + esc(v.example) : ''}</small><input data-mirror="${esc(v.name)}" placeholder="${esc(v.example || v.name)}"></label>`).join('')}
          <div class="cta-box"><button class="cta" id="cp">${ic('copy')}<span class="lab">复制提示词</span><kbd>⌘</kbd><kbd>↵</kbd></button></div></div>
        <div class="box"><button class="ghost" id="raw">${ic('brackets-curly')}<span class="lab">复制原文（保留空位）</span></button><div style="height:8px"></div><button class="ghost" id="fav">${ic('bookmark-simple')}<span class="lab">收藏到本机</span></button></div>
      </aside></div>
    </main>
    <div class="dock"><button class="ghost" id="ex2">${ic('magic-wand')}示例</button><button class="cta" id="cp2">${ic('copy')}<span class="lab">复制提示词</span></button></div>` + foot;
    bindTheme();
    const sh = $('#sheet');
    const sync = () => { const [a, b] = F.progress(sh); $('#pg').textContent = a + '/' + b; $('#pb').style.setProperty('--p', b ? a / b : 1); $$('[data-mirror]').forEach(m => { const f = $(`.var[data-v="${CSS.escape(m.dataset.mirror)}"] input, .var[data-v="${CSS.escape(m.dataset.mirror)}"] textarea`, sh); if (f && document.activeElement !== m) m.value = f.value }) };
    F.bind(sh, sync);
    $$('[data-mirror]').forEach(m => m.addEventListener('input', () => { const f = $(`.var[data-v="${CSS.escape(m.dataset.mirror)}"] input, .var[data-v="${CSS.escape(m.dataset.mirror)}"] textarea`, sh); if (f) { f.value = m.value; f.dispatchEvent(new Event('input')) } }));
    $('#ex').onclick = $('#ex2').onclick = () => F.example(sh); $('#clr').onclick = () => F.clear(sh);
    ['#cp', '#cp2'].forEach(s => L.bindCopy($(s), () => F.text(sh)));
    L.bindCopy($('#raw'), () => p.prompt, '已复制原文，空位保留 {{ }}');
    $('#fav').onclick = e => { e.currentTarget.querySelector('.lab').textContent = '已收藏'; L.toast('已收藏，在「我的」里能找到') };
    document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); $('#cp').click() } });
    bindRows($('.rel')); L.palette(); L.reveal();
  }

  function skill() {
    const s = L.skill(L.qs('id') || 1) || window.SKILLS[0]; document.title = s.name + ' · Skill · 老岳AI';
    const chat = L.parseArr(s.chat), faq = L.parseArr(s.faq), files = L.parseArr(s.files);
    document.body.classList.add('has-dock');
    document.getElementById('app').innerHTML = `<div class="aura" aria-hidden="true" style="height:520px"></div>` + island('s') + `
    <main class="wrap">
      <nav class="crumb" aria-label="面包屑"><a href="index.html">首页</a>${ic('caret-right')}<a href="../../forum.html#skills">Skill</a>${ic('caret-right')}<span>${esc(L.skCat(s.cat).name)}</span></nav>
      <div class="dgrid"><div>
        <div class="head"><span class="gly">${ic(L.SKCAT_IC[s.cat] || 'puzzle-piece')}</span><div><h1>${esc(s.name)}</h1><p>${esc(s.one)}</p>
          <div class="meta"><span class="tag mono">${esc(s.code)}</span><span class="tag">${esc(L.skCat(s.cat).name)}</span><span class="tag mono">${esc(s.ver)}</span><span class="tag">${esc(s.size)}</span><span class="tag">小齿轮 ｜ 老岳AI编辑部</span></div></div></div>
        <div class="seg" role="tablist" aria-label="Skill 内容">${[['use', '概览'], ['install', '安装'], ['demo', '用起来什么样'], ['faq', '常见问题']].map(([k, n]) => `<button role="tab" id="t-${k}" data-tab="${k}" aria-controls="p-${k}">${n}</button>`).join('')}<span class="tab-ink"></span></div>
        <section class="panel" id="p-use" role="tabpanel" aria-labelledby="t-use">
          <div class="two"><div class="box"><h4>${ic('check-circle')}这些时候用</h4><ul>${L.parseArr(s.when).map(x => `<li>${esc(x)}</li>`).join('')}<li>${esc(s.fit)}</li></ul></div><div class="box"><h4>${ic('prohibit')}这些时候别用</h4><ul>${L.parseArr(s.not).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></div>
          <div class="ba"><div><small>BEFORE · 用之前</small><p>${esc(s.before)}</p></div><div><small>AFTER · 用之后</small><p>${esc(s.after)}</p></div></div></section>
        <section class="panel" id="p-install" role="tabpanel" aria-labelledby="t-install" hidden><div id="inst"></div></section>
        <section class="panel" id="p-demo" role="tabpanel" aria-labelledby="t-demo" hidden><div class="chat">${chat.map(c => `<div class="msg ${c[0] === 'you' ? 'you' : ''}"><small>${esc(c[3] || '')}</small>${esc(c[1])}</div>`).join('')}</div></section>
        <section class="panel faq" id="p-faq" role="tabpanel" aria-labelledby="t-faq" hidden>${faq.map(f => `<details><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join('')}</section>
      </div>
      <aside class="insp">
        <div class="box cta-box"><h4>${ic('download-simple')}安装<span>${esc(s.code)}</span></h4><button class="cta" id="go">${ic('terminal-window')}<span class="lab">一键安装</span></button><p style="margin:10px 0 0;font-size:12px;color:var(--mute)">选 AI → 复制命令 → 终端回车。不用登录。</p></div>
        <div class="box"><h4>${ic('chat-teardrop-text')}装好后这样叫它</h4><div class="trig">${L.parseArr(s.triggers).map(t => `<span>${esc(t)}</span>`).join('')}</div></div>
        <div class="box"><h4>${ic('folder-simple')}包里有什么</h4><ul class="files">${files.map(f => `<li>${ic('file')}<span><code>${esc(f[0])}</code><br>${esc(f[1])}</span></li>`).join('')}</ul></div>
        <div class="box"><dl class="kv"><dt>实测</dt><dd>${esc(s.tested || '')}</dd><dt>更新</dt><dd class="num">${L.fmtDate(s.date)}</dd></dl></div>
      </aside></div>
    </main>
    <div class="dock"><button class="ghost" id="cpc">${ic('hash')}<span class="lab">${esc(s.code)}</span></button><button class="cta" id="go2">${ic('terminal-window')}<span class="lab">一键安装</span></button></div>` + foot;
    bindTheme(); L.install($('#inst'), s, { copyCls: 'btn' });
    const T = L.tabs($('.seg'));
    ['#go', '#go2'].forEach(x => $(x).onclick = () => { T.go('install'); $('.seg').scrollIntoView({ behavior: L.RM() ? 'auto' : 'smooth', block: 'center' }) });
    L.bindCopy($('#cpc'), () => s.code, '编号已复制'); L.palette(); L.reveal();
  }
  window.APP = { home, prompt, skill };
})();
