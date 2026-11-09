/* 方向 A · 编辑部杂志感 · 页面渲染 */
(function () {
  const L = window.LY, { esc, ic, $, $$ } = L;
  const S = L.STATS;
  const split = t => { const i = t.indexOf('：'); return i > 0 ? [t.slice(0, i), t.slice(i + 1)] : [t, ''] };
  const mast = cur => `<header class="mast"><div class="wrap">
    <a class="logo" href="index.html" aria-label="老岳AI 首页"><i>岳</i>老岳AI<small>产品经理用 AI 干活</small></a>
    <nav class="nav" aria-label="主导航">${[['index.html', '本期', 'home'], ['../../forum.html#prompts', '提示词', 'p'], ['../../forum.html#skills', 'Skill', 's'], ['../../forum.html#lib', '资料库', 'l']].map(([h, n, k]) => `<a href="${h}" ${cur === k ? 'aria-current="page"' : ''}>${n}</a>`).join('')}</nav>
    <button class="find" data-cmdk aria-label="搜索（⌘K）">${ic('magnifying-glass')}<span>搜提示词、Skill，或输入编号</span><kbd>⌘K</kbd></button></div></header>`;
  const colo = `<footer class="wrap"><div class="colo"><span>老岳AI产品论坛 · 方向 A「编辑部」提案稿 · 内容为真实数据（待编辑部终审）</span><span><a href="../index.html">← 回到三个方向对比</a></span></div></footer>`;
  const promptRow = (p, i) => `<article class="pi" data-rv="${i % 6}"><span class="code">${esc(p.rid)}</span><h3><a href="prompt.html?id=${p.id}">${esc(p.title)}</a></h3><p>${esc(p.excerpt)}</p>
    <div class="meta"><span>${esc((p.scenes || []).join(' / '))}</span><span class="num">${L.fmtDate(p.date)}</span><button class="qc" data-cp="${p.id}" aria-label="复制提示词：${esc(p.title)}">${ic('copy')}<span class="lab">复制</span></button></div></article>`;
  const bindRows = root => $$('[data-cp]', root).forEach(b => L.bindCopy(b, () => L.byId(b.dataset.cp).prompt, '已复制（变量保留 {{ }}，粘贴后替换）'));
  const cover = (a, n) => `<div class="cover" aria-hidden="true"><div class="tag"><span>${esc((a.tags || [])[0] || '长文')}</span><span>老岳 · 主理人</span></div><div class="big">${esc(split(a.title)[0]).replace(/(PRD|AI|Skill|PPT)/, '<em>$1</em>')}</div><div class="no">${String(n).padStart(2, '0')}</div><div class="foot">${L.fmtDate(a.date)} · 附提示词与模板</div></div>`;

  const tabbar = `<nav class="tabbar" aria-label="底部导航"><a href="index.html" aria-current="page">${ic('house')}本期</a><a href="../../forum.html#prompts">${ic('chat-centered-text')}提示词</a><a href="../../forum.html#skills">${ic('puzzle-piece')}Skill</a><a href="../../forum.html#lib">${ic('books')}资料库</a><button data-cmdk>${ic('magnifying-glass')}搜索</button></nav>`;
  function home() {
    const arts = L.articles, lead = arts[0];
    const [h, d] = split(lead.title);
    const ps = L.prompts.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);
    const sks = window.SKILLS.slice(0, 8);
    document.getElementById('app').innerHTML = mast('home') + `
    <main class="wrap">
      <div class="issue"><span><b>2026 年 11 月</b>　本期 ${S.article} 篇长文 · ${S.prompt} 条提示词 · ${S.skill} 个 Skill · ${S.template} 份模板</span><span>全部免费，不登录也能复制</span></div>
      <section class="lead">
        <div data-rv="0"><span class="kicker">本期头条</span><h1>${esc(h)}</h1>${d ? `<p class="deck">${esc(d)}</p>` : ''}<p class="ex">${esc(lead.excerpt)}</p>
          <div class="byline"><img src="../../img/laoyue.png" alt=""><span><b>老岳</b>　主理人 · 十年 B 端产品</span><span class="num">${L.fmtDate(lead.date)}</span></div>
          <a class="read" href="../../forum.html#p/${lead.id}">读全文<span class="o">${ic('arrow-right')}</span></a></div>
        <div data-rv="1">${cover(lead, 1)}</div>
      </section>
      <section class="lead l2">
        <div class="toc" data-rv="0"><h2>本期目录</h2>${arts.slice(1).map((a, i) => `<a href="../../forum.html#p/${a.id}"><em>${String(i + 2).padStart(2, '0')}</em><span><b>${esc(split(a.title)[0])}</b><small>${esc(split(a.title)[1] || (a.tags || []).join(' · '))}</small></span></a>`).join('')}</div>
        <div class="stick" data-rv="1">
          <div class="sec-h" style="margin-top:0"><h2>按场景找</h2><p>${L.SCENES.length} 个场景，${S.prompt} 条提示词</p></div>
          <div class="index">${L.SCENES.map(s => `<a href="../../forum.html#prompts/scene=${encodeURIComponent(s)}">${ic(L.SCENE_IC[s] || 'circle')}<span>${esc(s)}</span><small class="num">${L.sceneCount(s)}</small></a>`).join('')}</div>
          <div class="pull"><cite>编辑部的话</cite><blockquote>宁少勿滥。每一条都标了适用场景和核对日期，复制就能出结果；核不到的不上线。</blockquote></div>
        </div>
      </section>
      <section class="sec"><div class="sec-h" data-rv><h2>今天就能用的提示词</h2><p>挑一条，填两个空，复制走</p><a class="more" href="../../forum.html#prompts">全部 ${S.prompt} 条</a></div>
        <div class="plist">${ps.map(promptRow).join('')}</div></section>
      <section class="sec"><div class="sec-h" data-rv><h2>装上就会干活的 Skill</h2><p>一条命令装好，说一句话就触发</p><a class="more" href="../../forum.html#skills">全部 ${S.skill} 个</a></div>
        <div class="shelf">${sks.map((s, i) => `<a class="book" href="skill.html?id=${s.id}" data-rv="${i % 4}"><div class="top"><span>${esc(s.code)}</span><span>${esc(L.skCat(s.cat).name)}</span></div><div class="gl">${ic(L.SKCAT_IC[s.cat] || 'puzzle-piece')}</div><h3>${esc(s.name)}</h3><p>${esc(s.one)}</p><div class="ft"><span>${esc(s.ver)}</span><span class="num">${L.fmtDate(s.date)}</span></div></a>`).join('')}</div></section>
    </main>` + colo;
    document.body.insertAdjacentHTML('beforeend', tabbar); document.body.classList.add('has-tab');
    bindRows(document); L.palette(); L.reveal();
  }

  function prompt() {
    const p = L.byId(L.qs('id') || 1015) || L.prompts[0]; document.title = p.title + ' · 老岳AI';
    const F = L.fillable(p); const secs = L.parseArr(p.sections);
    document.body.classList.add('has-dock');
    document.getElementById('app').innerHTML = mast('p') + `
    <main class="wrap">
      <nav class="crumb" aria-label="面包屑"><a href="index.html">本期</a>/<a href="../../forum.html#prompts">提示词</a>/<span>${esc((p.scenes || [])[0] || '')}</span></nav>
      <div class="art">
        <aside class="side"><dl><dt>编号</dt><dd class="mono">${esc(p.rid)}</dd><dt>场景</dt><dd class="chips">${(p.scenes || []).map(s => `<a href="../../forum.html#prompts/scene=${encodeURIComponent(s)}">${esc(s)}</a>`).join('')}</dd>
          <dt>署名</dt><dd>${esc(L.col(p.col).name)} ｜ 老岳AI编辑部</dd><dt>核对日期</dt><dd class="num">${L.fmtDate(p.date)}</dd><dt>出处</dt><dd>${esc(L.parseArr(p.srcs).join('、') || '编辑部原创')}</dd></dl></aside>
        <article>
          <h1>${esc(p.title)}</h1>
          <p class="lede">${esc(p.fit || p.excerpt)}</p>
          <div class="sheet-h"><b>提示词</b><span>点下划线处直接填写，填完复制</span><span style="margin-left:auto;display:flex;gap:16px"><button id="ex">用示例填</button><button id="clr">清空</button></span></div>
          <div class="sheet" id="sheet">${F.html}</div>
          <div class="prose">${secs.map(s => `<h3>${esc(s.h)}</h3>${L.md(s.md)}`).join('')}</div>
          <p class="note">${esc(p.aigc || '')}</p>
          <section class="rel"><div class="sec-h"><h2 style="font-size:28px">同场景还有</h2></div><div class="plist">${L.related(p).map(promptRow).join('')}</div></section>
        </article>
        <aside class="take" aria-label="取用"><div class="prog">已填 <b class="num" id="pg">0</b> / ${F.vars.length}</div><div class="bar"><i id="pb"></i></div>
          <button class="cta" id="cp">${ic('copy')}<span class="lab">复制提示词</span></button>
          <button class="ghost" id="fav">${ic('bookmark-simple')}<span>收藏到本机</span></button>
          <small>没填的空会保留成 {{ }}，粘到 AI 里再补也行。你填的内容只存在这台电脑上。</small></aside>
      </div>
    </main>
    <div class="dock"><span class="prog">已填 <b class="num" id="pg2">0</b>/${F.vars.length}</span><button class="cta" id="cp2">${ic('copy')}<span class="lab">复制提示词</span></button></div>` + colo;
    const sh = $('#sheet');
    const upd = () => { const [a, b] = F.progress(sh); $('#pg').textContent = a; $('#pg2').textContent = a; $('#pb').style.setProperty('--p', b ? a / b : 1) };
    F.bind(sh, upd);
    $('#ex').onclick = () => F.example(sh); $('#clr').onclick = () => F.clear(sh);
    ['#cp', '#cp2'].forEach(s => L.bindCopy($(s), () => F.text(sh)));
    $('#fav').onclick = e => { const b = e.currentTarget; b.querySelector('span').textContent = '已收藏'; b.querySelector('i').className = 'ph-light ph-bookmark-simple'; L.toast('已收藏，在「我的」里能找到') };
    bindRows($('.rel')); L.palette(); L.reveal();
  }

  function skill() {
    const s = L.skill(L.qs('id') || 1) || window.SKILLS[0]; document.title = s.name + ' · Skill · 老岳AI';
    const chat = L.parseArr(s.chat), faq = L.parseArr(s.faq), files = L.parseArr(s.files);
    const [h, d] = split(s.title);
    document.getElementById('app').innerHTML = mast('s') + `
    <main class="wrap">
      <nav class="crumb" aria-label="面包屑"><a href="index.html">本期</a>/<a href="../../forum.html#skills">Skill</a>/<span>${esc(L.skCat(s.cat).name)}</span></nav>
      <div class="art">
        <aside class="side"><dl><dt>编号</dt><dd class="mono">${esc(s.code)}</dd><dt>版本</dt><dd class="num">${esc(s.ver)} · ${L.fmtDate(s.date)}</dd><dt>大小</dt><dd>${esc(s.size)}</dd><dt>署名</dt><dd>小齿轮 ｜ 老岳AI编辑部 · Skill 与自动化组</dd><dt>实测</dt><dd>${esc(s.tested || '')}</dd></dl></aside>
        <article>
          <h1>${esc(h)}</h1>${d ? `<p class="lede">${esc(d)}</p>` : `<p class="lede">${esc(s.one)}</p>`}
          <div class="tabs" role="tablist" aria-label="Skill 内容">${[['use', '用处'], ['install', '安装'], ['demo', '用起来什么样'], ['faq', '常见问题']].map(([k, n]) => `<button role="tab" id="t-${k}" data-tab="${k}" aria-controls="p-${k}">${n}</button>`).join('')}<span class="tab-ink"></span></div>
          <section class="panel" id="p-use" role="tabpanel" aria-labelledby="t-use"><p style="font:400 18px/1.8 var(--serif);margin:0">${esc(s.one)}</p>
            <div class="two" style="margin-top:28px"><div><h4>这些时候用</h4><ul>${L.parseArr(s.when).map(x => `<li>${esc(x)}</li>`).join('')}<li>${esc(s.fit)}</li></ul></div><div><h4>这些时候别用</h4><ul>${L.parseArr(s.not).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></div>
            <div class="ba"><div><em>用之前</em><p>${esc(s.before)}</p></div><div><em>用之后</em><p>${esc(s.after)}</p></div></div>
            <h3 style="font-size:20px;margin:36px 0 10px">包里有什么</h3><ul class="files">${files.map(f => `<li><code>${esc(f[0])}</code><span>${esc(f[1])}</span></li>`).join('')}</ul></section>
          <section class="panel" id="p-install" role="tabpanel" aria-labelledby="t-install" hidden><p style="margin:0 0 16px;color:var(--mute)">选你用的 AI，复制一条命令到终端，回车就装好。</p><div id="inst"></div>
            <h3 style="font-size:20px;margin:32px 0 10px">装好后，这样叫它</h3><div class="prose" style="margin:0">${L.parseArr(s.triggers).map(t => `<blockquote>${esc(t)}</blockquote>`).join('')}</div></section>
          <section class="panel" id="p-demo" role="tabpanel" aria-labelledby="t-demo" hidden><div class="chat">${chat.map(c => `<div class="${c[0] === 'you' ? 'q' : 'a'}"><em>${c[0] === 'you' ? '问' : '答'}</em><div><small>${esc(c[3] || '')}</small><p>${esc(c[1])}</p></div></div>`).join('')}</div></section>
          <section class="panel faq" id="p-faq" role="tabpanel" aria-labelledby="t-faq" hidden>${faq.map(f => `<details><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join('')}</section>
        </article>
        <aside class="take" aria-label="取用"><div class="prog">编号 <b class="mono" style="font:500 15px var(--mono)">${esc(s.code)}</b></div>
          <button class="cta" id="go">${ic('download-simple')}<span class="lab">一键安装</span></button>
          <button class="ghost" id="cpc">${ic('hash')}<span class="lab">复制编号</span></button>
          <small>不用登录。命令只建目录、下载、解压三件事，可以先读一遍再执行。</small></aside>
      </div>
    </main>
    <div class="dock"><button class="ghost" id="cpc2" style="flex:none;padding:0 16px">${ic('hash')}<span class="lab">${esc(s.code)}</span></button><button class="cta" id="go2">${ic('download-simple')}<span class="lab">一键安装</span></button></div>` + colo;
    document.body.classList.add('has-dock');
    L.install($('#inst'), s, { copyCls: 'btn' });
    const T = L.tabs($('.tabs'));
    ['#go', '#go2'].forEach(x => $(x).onclick = () => { T.go('install'); $('.tabs').scrollIntoView({ behavior: L.RM() ? 'auto' : 'smooth', block: 'start' }) });
    ['#cpc', '#cpc2'].forEach(x => L.bindCopy($(x), () => s.code, '编号已复制，搜索框里粘贴可直达'));
    L.palette(); L.reveal();
  }
  window.APP = { home, prompt, skill };
})();
