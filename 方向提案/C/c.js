/* 方向 C · 检索台（即搜即拿）· 页面渲染 */
(function () {
  const L = window.LY, { esc, ic, $, $$ } = L, S = L.STATS;
  const top = cur => `<header class="top"><div class="wrap"><a class="logo" href="index.html"><i>岳</i>老岳AI</a>
    <nav aria-label="主导航">${[['index.html', '找东西', 'home'], ['../../forum.html#home', '长文', 'a'], ['../../forum.html#lib', '资料库', 'l'], ['../../forum.html#qa', '问答', 'q']].map(([h, n, k]) => `<a href="${h}" ${cur === k ? 'aria-current="page"' : ''}>${n}</a>`).join('')}</nav>
    <div class="me"><span>全站跳转 <kbd>⌘</kbd><kbd>K</kbd></span><a href="../../forum.html#me">${ic('bookmark-simple')}我的</a></div></div></header>`;
  const foot = `<footer class="wrap"><div class="foot"><span>老岳AI产品论坛 · 方向 C「检索台」提案稿 · 真实内容（待编辑部终审）</span><a href="../index.html">回到三个方向对比</a></div></footer>`;
  const tabbar = `<nav class="tabbar" aria-label="底部导航"><a href="index.html" aria-current="page">${ic('magnifying-glass')}找东西</a><a href="../../forum.html#home">${ic('book-open-text')}长文</a><a href="../../forum.html#skills">${ic('puzzle-piece')}Skill</a><a href="../../forum.html#lib">${ic('books')}资料库</a><a href="../../forum.html#me">${ic('user')}我的</a></nav>`;
  const stamp = (t, x, cls = '') => t === 's' ? `<span class="stamp s ${cls}" aria-hidden="true">${ic(L.SKCAT_IC[x.cat] || 'puzzle-piece')}<em>${esc(x.code)}</em></span>`
    : t === 'a' ? `<span class="stamp a ${cls}" aria-hidden="true"><b>${String(x.id).padStart(2, '0')}</b><em>长文</em></span>`
      : `<span class="stamp p ${cls}" aria-hidden="true">${ic(L.SCENE_IC[(x.scenes || [])[0]] || 'chat-centered-text')}<em>${esc(x.rid)}</em></span>`;

  function home() {
    const pool = [].concat(window.SKILLS.map(s => ({ t: 's', x: s, hay: [s.name, s.title, s.one, (s.tags || []).join(' '), s.code, L.skCat(s.cat).name].join(' '), scenes: [] })),
      L.prompts.map(p => ({ t: 'p', x: p, hay: [p.title, p.excerpt, (p.tags || []).join(' '), (p.scenes || []).join(' '), p.rid].join(' '), scenes: p.scenes || [] })));
    let saved = {}; try { saved = JSON.parse(localStorage.getItem('lyC_f') || '{}') } catch (e) { }
    const st = { q: L.qs('q') || '', type: saved.type || 'all', scene: saved.scene || '', sel: 0, n: 12, restored: !!(saved.type && saved.type !== 'all' || saved.scene) };
    document.getElementById('app').innerHTML = top('home') + `
    <main class="wrap">
      <section class="desk">
        <h1>要用 AI 干的活，<span>先搜一下</span></h1>
        <div style="display:flex;gap:12px;align-items:center">
          <label class="sbox" style="flex:1">${ic('magnifying-glass')}<input id="q" type="search" autocomplete="off" placeholder="写 PRD、竞品、会议纪要……或输入编号 P-015 / S-1000" aria-label="搜索提示词和 Skill" value="${esc(st.q)}"><button class="clr" id="clr" aria-label="清空" ${st.q ? '' : 'hidden'}>${ic('x')}</button></label>
          <div class="types" role="group" aria-label="类型">${[['all', '全部'], ['p', '提示词'], ['s', 'Skill']].map(([k, n]) => `<button data-type="${k}" aria-pressed="${st.type === k}">${n}</button>`).join('')}</div>
        </div>
        <div class="chips" role="group" aria-label="按场景">${L.SCENES.map(s => `<button data-scene="${esc(s)}" aria-pressed="${st.scene === s}">${ic(L.SCENE_IC[s] || 'circle')}${esc(s)}<small>${L.sceneCount(s)}</small></button>`).join('')}</div>
        <div class="found" aria-live="polite" id="found"></div>
      </section>
      <div class="reads" aria-label="长文精华">${L.articles.slice(0, 3).map(a => `<a class="rd" href="../../forum.html#p/${a.id}">${stamp('a', a)}<span><b>${esc(a.title.split('：')[0])}</b><small>长文精华 · 老岳 · ${L.fmtDate(a.date)}</small></span></a>`).join('')}</div>
      <section class="bench"><div class="list" id="list" role="listbox" aria-label="搜索结果"></div>
        <aside class="pv" id="pv" aria-label="预览" role="dialog"></aside></section>
    </main><div class="scrim" id="scrim"></div>` + foot + tabbar;
    document.body.classList.add('has-tab');
    const inp = $('#q'), list = $('#list'), pv = $('#pv'); let R = [], tm;
    const mobile = () => matchMedia('(max-width:860px)').matches;
    function filter() {
      const q = st.q.trim(); const nq = L.qs && window.nz ? window.nz(q) : q;
      let r = pool.filter(it => (st.type === 'all' || it.t === st.type) && (!st.scene || it.t === 's' || it.scenes.includes(st.scene)) && window.nzHas(it.hay, q));
      if (st.scene && st.type === 'all') r = r.filter(it => it.t === 'p' || window.nzHas(it.hay, st.scene.slice(0, 2)));
      const code = q && r.filter(it => window.nz(it.t === 's' ? it.x.code : it.x.rid).replace(/-0*/, '-') === nq.replace(/-0*/, '-'));
      if (code && code.length) r = code.concat(r.filter(x => !code.includes(x)));
      return r;
    }
    function draw(keepSel) {
      R = filter(); if (!keepSel) st.sel = 0; st.sel = Math.min(st.sel, Math.max(0, R.length - 1));
      const q = st.q.trim();
      $('#found').innerHTML = `找到 <b class="num">${R.length}</b> 条${q ? ` · 含「${esc(q)}」` : ''}${st.scene ? ` · 场景「${esc(st.scene)}」` : ''}${st.restored ? '<span>　已按你上次选的筛好</span>' : ''}<span class="rs">${(q || st.scene || st.type !== 'all') ? '<button id="reset">清除筛选</button>' : ''}<span><kbd>↑</kbd><kbd>↓</kbd> 选 <kbd>⌘</kbd><kbd>↵</kbd> 复制</span></span>`;
      const r = $('#reset'); if (r) r.onclick = () => { st.q = ''; inp.value = ''; st.scene = ''; st.type = 'all'; st.restored = false; sync(); draw() };
      if (!R.length) { list.innerHTML = `<div class="empty">${ic('magnifying-glass-minus')}<b>没找到「${esc(q)}」</b>换个说法，或者试试这些：<div class="sug">${['PRD', '竞品', '周报', '简历', 'S-1000'].map(w => `<button data-sug="${w}">${w}</button>`).join('')}</div></div>`; $$('[data-sug]').forEach(b => b.onclick = () => { inp.value = st.q = b.dataset.sug; st.scene = ''; sync(); draw() }); pv.innerHTML = ''; return }
      list.innerHTML = R.slice(0, st.n).map((it, i) => `<button class="it" role="option" data-i="${i}" aria-selected="${i === st.sel}">${stamp(it.t, it.x)}<span style="min-width:0"><b>${window.hlText(esc(it.t === 's' ? it.x.name : it.x.title), q)}</b><small>${esc(it.t === 's' ? it.x.one : it.x.excerpt)}</small></span><span class="k">${esc(it.t === 's' ? it.x.code : it.x.rid)}</span></button>`).join('')
        + (R.length > st.n ? `<button class="more" id="more">再看 ${Math.min(12, R.length - st.n)} 条（共 ${R.length}）</button>` : '');
      $$('.it', list).forEach(b => b.onclick = () => { st.sel = +b.dataset.i; mark(); preview(); if (mobile()) openSheet() });
      const m = $('#more'); if (m) m.onclick = () => { st.n += 12; draw(true) };
      preview();
    }
    function mark() { $$('.it', list).forEach((b, i) => b.setAttribute('aria-selected', i === st.sel)); const b = $$('.it', list)[st.sel]; b && b.scrollIntoView({ block: 'nearest' }) }
    function preview() {
      const it = R[st.sel]; if (!it) return; const x = it.x;
      if (it.t === 'p') {
        const F = L.fillable(x);
        pv.innerHTML = `<div class="pv-h"><span class="tag m">${esc(x.rid)}</span><span>${esc((x.scenes || []).join(' / '))}</span><a class="open" href="prompt.html?id=${x.id}">打开详情 ${ic('arrow-up-right')}</a><button class="x" aria-label="关闭">${ic('x')}</button></div>
        <div class="pv-b swap"><h2>${esc(x.title)}</h2><p class="fit">${esc(x.fit || x.excerpt)}</p><div class="ptx" id="ptx">${F.html}</div></div>
        <div class="pv-f"><span class="prog">已填 <b id="pg">0</b>/${F.vars.length}</span><button class="sbtn" id="eg">${ic('magic-wand')}示例</button><button class="cta" id="cp">${ic('copy')}<span class="lab">复制提示词</span></button></div>`;
        const box = $('#ptx'); F.bind(box, () => { const [a] = F.progress(box); $('#pg').textContent = a });
        $('#eg').onclick = () => F.example(box); L.bindCopy($('#cp'), () => F.text(box)); pv._copy = () => $('#cp').click();
      } else {
        pv.innerHTML = `<div class="pv-h"><span class="tag m">${esc(x.code)}</span><span>Skill · ${esc(L.skCat(x.cat).name)} · ${esc(x.ver)}</span><a class="open" href="skill.html?id=${x.id}">打开详情 ${ic('arrow-up-right')}</a><button class="x" aria-label="关闭">${ic('x')}</button></div>
        <div class="pv-b swap"><h2>${esc(x.name)}</h2><p class="fit">${esc(x.one)}</p><div style="margin-top:16px" id="pinst"></div></div>`;
        L.install($('#pinst'), x, { copyCls: 'btn' }); pv._copy = () => { const b = $('.cp-cmd', pv) || $('.cp-full', pv); b && b.click() };
      }
      const xb = $('.x', pv); if (xb) xb.onclick = closeSheet;
    }
    function openSheet() { pv.classList.add('open'); $('#scrim').classList.add('on'); const f = $('.x', pv); f && f.focus() }
    function closeSheet() { pv.classList.remove('open'); $('#scrim').classList.remove('on'); const b = $$('.it', list)[st.sel]; b && b.focus() }
    $('#scrim').onclick = closeSheet;
    function sync() {
      $$('[data-type]').forEach(b => b.setAttribute('aria-pressed', b.dataset.type === st.type)); $$('[data-scene]').forEach(b => b.setAttribute('aria-pressed', b.dataset.scene === st.scene));
      $('#clr').hidden = !inp.value; try { localStorage.setItem('lyC_f', JSON.stringify({ type: st.type, scene: st.scene })) } catch (e) { }
    }
    inp.addEventListener('input', () => { $('#clr').hidden = !inp.value; clearTimeout(tm); tm = setTimeout(() => { st.q = inp.value; st.n = 12; st.restored = false; draw() }, 220) });
    inp.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); st.sel = Math.min(Math.min(R.length, st.n) - 1, st.sel + 1); mark(); preview() }
      else if (e.key === 'ArrowUp') { e.preventDefault(); st.sel = Math.max(0, st.sel - 1); mark(); preview() }
      else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); pv._copy && pv._copy() }
      else if (e.key === 'Enter' && R[st.sel]) { e.preventDefault(); const it = R[st.sel]; if (mobile()) openSheet(); else location.href = it.t === 's' ? 'skill.html?id=' + it.x.id : 'prompt.html?id=' + it.x.id }
    });
    $('#clr').onclick = () => { inp.value = ''; st.q = ''; sync(); draw(); inp.focus() };
    $$('[data-type]').forEach(b => b.onclick = () => { st.type = b.dataset.type; st.restored = false; sync(); draw() });
    $$('[data-scene]').forEach(b => b.onclick = () => { st.scene = st.scene === b.dataset.scene ? '' : b.dataset.scene; st.restored = false; sync(); draw() });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && pv.classList.contains('open')) closeSheet(); if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); inp.focus() } });
    draw(); L.palette();
  }

  /* 吸顶取用条：标题滚出视口后出现（IntersectionObserver） */
  function stickyTake(target) { const t = $('#take'); if (!t || !('IntersectionObserver' in window)) return; new IntersectionObserver(([e]) => t.classList.toggle('on', !e.isIntersecting), { rootMargin: '-60px 0px 0px 0px' }).observe(target) }

  function prompt() {
    const p = L.byId(L.qs('id') || 1015) || L.prompts[0]; document.title = p.title + ' · 老岳AI';
    const F = L.fillable(p), secs = L.parseArr(p.sections);
    document.body.classList.add('has-dock');
    document.getElementById('app').innerHTML = top('') + `<div class="take" id="take"><div class="wrap"><b>${esc(p.title)}</b><span class="prog" style="font-size:13px;color:var(--mute)">已填 <b class="num" id="pg3" style="flex:none">0</b>/${F.vars.length}</span><button class="cta" id="cp3">${ic('copy')}<span class="lab">复制提示词</span></button></div></div>
    <main class="wrap">
      <nav class="crumb" aria-label="面包屑"><a href="index.html">找东西</a>${ic('caret-right')}<a href="index.html">提示词</a>${ic('caret-right')}<span>${esc((p.scenes || [])[0] || '')}</span></nav>
      <div class="dh" id="dh">${stamp('p', p)}<div><h1>${esc(p.title)}</h1><p>${esc(p.fit || p.excerpt)}</p>
        <div class="meta2"><span>编号 <b class="num">${esc(p.rid)}</b></span><span>场景 <b>${esc((p.scenes || []).join('、'))}</b></span><span>署名 <b>${esc(L.col(p.col).name)} ｜ 老岳AI编辑部</b></span><span>核对 <b class="num">${L.fmtDate(p.date)}</b></span></div></div></div>
      <div class="fillgrid">
        <div class="steps" aria-label="按顺序填空">${F.vars.map((v, i) => `<div class="step" data-step="${esc(v.name)}"><span class="n">${i + 1}</span><div><b>${esc(v.name)}</b><small>${esc(v.hint || '')}</small><input data-mirror="${esc(v.name)}" aria-label="${esc(v.name)}" placeholder="${esc(v.name)}">${v.example ? `<button class="eg" data-eg="${esc(v.example)}">填入示例：${esc(v.example)}</button>` : ''}</div></div>`).join('')}</div>
        <div><div class="sheet"><div class="ptx" id="sheet">${F.html}</div>
          <div class="bar"><div class="meter" aria-hidden="true"><i id="pb"></i></div><span style="font-size:13px;color:var(--mute)">已填 <b class="num" id="pg">0</b>/${F.vars.length}</span><button class="sbtn" id="clr">${ic('eraser')}清空</button><button class="cta" id="cp" style="flex:none;width:220px">${ic('copy')}<span class="lab">复制提示词</span></button></div></div>
          <div class="acc">${secs.map((s, i) => `<details ${i === 0 ? 'open' : ''}><summary>${esc(s.h)}${ic('caret-down')}</summary><div class="md">${L.md(s.md)}</div></details>`).join('')}<p style="font-size:12px;color:var(--mute);margin:8px 2px">${esc(p.aigc || '')}　出处：${esc(L.parseArr(p.srcs).join('、'))}</p></div></div>
      </div>
      <section class="rel"><h2>同场景还有</h2><div class="list">${L.related(p).map(x => `<a class="it" href="prompt.html?id=${x.id}">${stamp('p', x)}<span style="min-width:0"><b>${esc(x.title)}</b><small>${esc(x.excerpt)}</small></span></a>`).join('')}</div></section>
    </main>
    <div class="dock"><button class="sbtn" id="eg2">${ic('magic-wand')}示例</button><button class="cta" id="cp2">${ic('copy')}<span class="lab">复制提示词</span></button></div>` + foot;
    const sh = $('#sheet'), mir = n => $(`.var[data-v="${CSS.escape(n)}"] input, .var[data-v="${CSS.escape(n)}"] textarea`, sh);
    F.bind(sh, () => { const [a, b] = F.progress(sh);['#pg', '#pg3'].forEach(s => $(s).textContent = a); $('#pb').style.setProperty('--p', b ? a / b : 1);
      $$('[data-mirror]').forEach(m => { const f = mir(m.dataset.mirror); if (f && document.activeElement !== m) m.value = f.value; m.closest('.step').classList.toggle('ok', !!(f && f.value.trim())) }) });
    $$('[data-mirror]').forEach(m => m.addEventListener('input', () => { const f = mir(m.dataset.mirror); if (f) { f.value = m.value; f.dispatchEvent(new Event('input')) } }));
    $$('[data-eg]').forEach(b => b.onclick = () => { const m = b.parentNode.querySelector('input'); m.value = b.dataset.eg; m.dispatchEvent(new Event('input')) });
    $('#eg2').onclick = () => F.example(sh); $('#clr').onclick = () => F.clear(sh);
    ['#cp', '#cp2', '#cp3'].forEach(s => L.bindCopy($(s), () => F.text(sh)));
    document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); $('#cp').click() } });
    stickyTake($('#dh')); L.palette();
  }

  function skill() {
    const s = L.skill(L.qs('id') || 1) || window.SKILLS[0]; document.title = s.name + ' · Skill · 老岳AI';
    const chat = L.parseArr(s.chat), faq = L.parseArr(s.faq), files = L.parseArr(s.files);
    document.body.classList.add('has-dock');
    document.getElementById('app').innerHTML = top('') + `
    <main class="wrap">
      <nav class="crumb" aria-label="面包屑"><a href="index.html">找东西</a>${ic('caret-right')}<a href="index.html">Skill</a>${ic('caret-right')}<span>${esc(L.skCat(s.cat).name)}</span></nav>
      <div class="dh">${stamp('s', s)}<div><h1>${esc(s.name)}</h1><p>${esc(s.one)}</p>
        <div class="meta2"><span>编号 <b>${esc(s.code)}</b></span><span>版本 <b>${esc(s.ver)}</b></span><span>大小 <b>${esc(s.size)}</b></span><span>署名 <b>小齿轮 ｜ 老岳AI编辑部</b></span><span>更新 <b class="num">${L.fmtDate(s.date)}</b></span></div></div></div>
      <div class="sk2"><div>
        <div class="tabs" role="tablist" aria-label="Skill 内容">${[['install', '安装'], ['use', '用处'], ['demo', '用起来什么样'], ['faq', '常见问题']].map(([k, n]) => `<button role="tab" id="t-${k}" data-tab="${k}" aria-controls="p-${k}">${n}</button>`).join('')}<span class="tab-ink"></span></div>
        <section class="panel" id="p-install" role="tabpanel" aria-labelledby="t-install"><div class="inst3">
          <div class="stp"><span class="n">1</span><div><h3>选你用的 AI，复制命令到终端回车</h3><div id="inst"></div></div></div>
          <div class="stp"><span class="n">2</span><div><h3>新开对话，说一句这样的话</h3><div class="trg">${L.parseArr(s.triggers).map((t, i) => `<button data-trg="${i}">${ic('copy')}<span class="lab">${esc(t)}</span></button>`).join('')}</div></div></div>
        </div></section>
        <section class="panel" id="p-use" role="tabpanel" aria-labelledby="t-use" hidden><div class="ba"><div><small>用之前</small><p>${esc(s.before)}</p></div><div><small>用之后</small><p>${esc(s.after)}</p></div></div></section>
        <section class="panel" id="p-demo" role="tabpanel" aria-labelledby="t-demo" hidden><div class="chat">${chat.map(c => `<div class="msg ${c[0] === 'you' ? 'you' : ''}"><small>${esc(c[3] || '')}</small>${esc(c[1])}</div>`).join('')}</div></section>
        <section class="panel faq" id="p-faq" role="tabpanel" aria-labelledby="t-faq" hidden>${faq.map(f => `<details><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join('')}</section>
      </div>
      <aside class="side"><div class="sbox2"><h4>这些时候用</h4><ul>${L.parseArr(s.when).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="sbox2"><h4>这些时候别用</h4><ul>${L.parseArr(s.not).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="sbox2"><h4>包里有什么</h4><ul class="files">${files.map(f => `<li><code>${esc(f[0])}</code>${esc(f[1])}</li>`).join('')}</ul></div></aside></div>
    </main>
    <div class="dock"><button class="sbtn" id="cpc">${ic('hash')}<span class="lab">${esc(s.code)}</span></button><button class="cta" id="go2">${ic('terminal-window')}<span class="lab">复制安装命令</span></button></div>` + foot;
    L.install($('#inst'), s, { copyCls: 'btn' }); L.tabs($('.tabs'));
    $$('[data-trg]').forEach(b => L.bindCopy(b, () => L.parseArr(s.triggers)[b.dataset.trg], '已复制，粘到新对话里发出去'));
    $('#go2').onclick = () => { const b = $('.cp-cmd') || $('.cp-full'); if (b) b.click(); else { $('#t-install').click() } };
    L.bindCopy($('#cpc'), () => s.code, '编号已复制'); L.palette();
  }
  window.APP = { home, prompt, skill };
})();
