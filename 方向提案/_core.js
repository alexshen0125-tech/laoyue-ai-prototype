/* 方向提案 · 三个方向共用的数据与交互内核（只管数据和行为，样式由各方向自己定）
   数据：../../forum-data.js + ../../real-data.js（真实内容），与 forum.html 同源 */
(function () {
  const W = window;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const qs = k => new URLSearchParams(location.search).get(k);
  const RM = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  const POSTS = W.POSTS || [], SKILLS = W.SKILLS || [];
  const prompts = POSTS.filter(p => p.kind === 'prompt');
  const articles = POSTS.filter(p => p.type === 'article');
  const byId = id => POSTS.find(p => String(p.id) === String(id));
  const skill = id => SKILLS.find(s => String(s.id) === String(id));
  const skCat = id => (W.SKILLCATS || []).find(c => c.id === id) || { name: '' };
  const col = id => (W.COLUMNS || []).find(c => c.id === id) || { name: '编辑部', group: '' };

  /* 场景 → 图形符号（替代 Unicode 符号，用 Phosphor Light 字体图标） */
  const SCENE_IC = { '需求分析': 'magnifying-glass', 'PRD 与评审': 'file-text', '原型设计': 'squares-four', '竞品与调研': 'binoculars', '数据分析': 'chart-line', '会议与沟通': 'chats-circle', '汇报写作': 'presentation-chart', '求职面试': 'briefcase', 'AI 产品设计': 'sparkle', '提问技巧': 'chat-centered-text', '自动化与工作流': 'flow-arrow' };
  const SKCAT_IC = { prd: 'file-text', proto: 'squares-four', review: 'seal-check', research: 'binoculars', data: 'chart-line', meeting: 'chats-circle', deck: 'presentation-chart', career: 'briefcase' };
  const ic = (n, cls = '') => `<i class="ph-light ph-${n} ${cls}" aria-hidden="true"></i>`;

  /* 迷你 Markdown：标题 / 粗体 / 列表 / 引用 / 代码 / 表格 */
  function md(src) {
    const lines = String(src || '').split('\n'); let out = '', list = null, tbl = null, code = null;
    const inl = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>');
    const close = () => { if (list) { out += `</${list}>`; list = null } if (tbl) { out += '</tbody></table></div>'; tbl = null } };
    for (const l of lines) {
      if (code !== null) { if (/^```/.test(l)) { out += `<pre class="mdpre">${esc(code)}</pre>`; code = null } else code += (code ? '\n' : '') + l; continue }
      if (/^```/.test(l)) { close(); code = ''; continue }
      if (/^\|/.test(l)) { if (/^\|[\s:|-]+\|$/.test(l.trim())) continue; const cells = l.trim().replace(/^\||\|$/g, '').split('|').map(c => inl(c.trim())); if (!tbl) { close(); tbl = 1; out += `<div class="mdtbl"><table><thead><tr>${cells.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>` } else out += `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`; continue }
      let m;
      if ((m = l.match(/^(#{2,4})\s+(.*)/))) { close(); out += `<h${m[1].length + 1}>${inl(m[2])}</h${m[1].length + 1}>`; continue }
      if ((m = l.match(/^\s*[-*]\s+(.*)/))) { if (list !== 'ul') { close(); list = 'ul'; out += '<ul>' } out += `<li>${inl(m[1])}</li>`; continue }
      if ((m = l.match(/^\s*\d+[.、]\s+(.*)/))) { if (list !== 'ol') { close(); list = 'ol'; out += '<ol>' } out += `<li>${inl(m[1])}</li>`; continue }
      if ((m = l.match(/^>\s?(.*)/))) { close(); out += `<blockquote>${inl(m[1])}</blockquote>`; continue }
      if (!l.trim()) { close(); continue }
      close(); out += `<p>${inl(l)}</p>`;
    }
    close(); return out;
  }

  /* 复制：剪贴板 + 兜底 */
  function copyText(t) {
    if (navigator.clipboard && isSecureContext) return navigator.clipboard.writeText(t).catch(() => fallback(t));
    return Promise.resolve(fallback(t));
    function fallback(x) { const a = document.createElement('textarea'); a.value = x; a.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(a); a.select(); try { document.execCommand('copy') } catch (e) { } a.remove() }
  }
  /* 复制按钮统一状态机：按下 → 已复制（2.4s）→ 复原；按钮上加 .is-done 由各方向 CSS 决定长相 */
  function bindCopy(btn, getText, toastMsg) {
    btn.addEventListener('click', () => {
      copyText(getText()).then(() => {
        const lab = btn.querySelector('.lab'); const old = btn.dataset.lab || (lab && lab.textContent);
        btn.dataset.lab = old; btn.classList.remove('is-done'); void btn.offsetWidth; btn.classList.add('is-done');
        if (lab) lab.textContent = '已复制';
        const ico = btn.querySelector('i.ph-light'); if (ico) { ico.dataset.c = ico.dataset.c || ico.className; ico.className = 'ph-light ph-check' }
        toast(toastMsg || '已复制，粘到你用的 AI 对话框里');
        clearTimeout(btn._t); btn._t = setTimeout(() => { btn.classList.remove('is-done'); if (lab) lab.textContent = old; if (ico && ico.dataset.c) ico.className = ico.dataset.c }, 2400);
        try { const n = +localStorage.getItem('ly_take') || 0; localStorage.setItem('ly_take', n + 1) } catch (e) { }
      });
    });
  }
  let toastT;
  function toast(msg) {
    let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite'); document.body.appendChild(t) }
    t.innerHTML = `${ic('check-circle')}<span>${esc(msg)}</span>`; t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* 提示词变量：就地填写。prompt 文本里的 {{名}} 变成自适应宽度的输入框 */
  function fillable(p, store) {
    const vars = p.vars || []; const vm = Object.fromEntries(vars.map(v => [v.name, v]));
    const html = esc(p.prompt).replace(/\{\{(.+?)\}\}/g, (_, n) => {
      const v = vm[n] || { name: n, hint: '' }; const long = /全文|材料|正文|记录|描述|纪要/.test(n);
      return long
        ? `<span class="var var-long" data-v="${esc(n)}"><textarea rows="1" aria-label="${esc(n)}" placeholder="${esc(n)}：${esc(v.hint || '粘贴在这里')}"></textarea></span>`
        : `<span class="var" data-v="${esc(n)}"><input aria-label="${esc(n)}" placeholder="${esc(n)}" size="${Math.max(4, n.length * 2 + 1)}"></span>`;
    });
    return { html, vars, bind(root, onChange) {
      const save = {}; try { Object.assign(save, JSON.parse(localStorage.getItem('ly_vars_' + p.id) || '{}')) } catch (e) { }
      $$('.var', root).forEach(w => {
        const n = w.dataset.v, f = w.querySelector('input,textarea');
        const fit = () => { if (f.tagName === 'INPUT') f.size = Math.max(4, Math.min(40, (f.value || f.placeholder).replace(/[^\x00-\xff]/g, 'aa').length + 1)); else { f.style.height = 'auto'; f.style.height = Math.min(220, f.scrollHeight) + 'px' } w.classList.toggle('filled', !!f.value.trim()) };
        if (save[n]) f.value = save[n]; fit();
        f.addEventListener('input', () => { fit(); save[n] = f.value; try { localStorage.setItem('ly_vars_' + p.id, JSON.stringify(save)) } catch (e) { } onChange && onChange() });
      });
      onChange && onChange();
    }, text(root) {
      let t = p.prompt; $$('.var', root).forEach(w => { const f = w.querySelector('input,textarea'); const v = f.value.trim(); t = t.replace('{{' + w.dataset.v + '}}', v || '{{' + w.dataset.v + '}}') }); return t;
    }, progress(root) { const all = $$('.var', root); return [all.filter(w => w.classList.contains('filled')).length, all.length] },
    example(root) { $$('.var', root).forEach(w => { const v = vm[w.dataset.v]; const f = w.querySelector('input,textarea'); if (v && v.example && !f.value) { f.value = v.example; f.dispatchEvent(new Event('input')) } }) },
    clear(root) { $$('.var', root).forEach(w => { const f = w.querySelector('input,textarea'); f.value = ''; f.dispatchEvent(new Event('input')) }) } };
  }

  /* 滚动出现：IntersectionObserver（禁止 scroll 监听） */
  function reveal() {
    const els = $$('[data-rv]'); if (RM() || !('IntersectionObserver' in W)) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    els.forEach((e, i) => { e.style.setProperty('--i', e.dataset.rv || 0); io.observe(e) });
  }

  /* ⌘K 命令面板：提示词 / Skill / 长文，编号直达，方向键 + 回车，Esc 关，焦点锁定，关闭回到触发处 */
  function palette(opt) {
    const o = Object.assign({ promptHref: id => 'prompt.html?id=' + id, skillHref: id => 'skill.html?id=' + id, articleHref: id => '../../forum.html#p/' + id, placeholder: '搜提示词、Skill、长文，或输入编号 P-015 / S-1000' }, opt || {});
    const box = document.createElement('div'); box.className = 'cmdk'; box.hidden = true;
    box.innerHTML = `<div class="cmdk-scrim" data-x></div><div class="cmdk-panel" role="dialog" aria-modal="true" aria-label="搜索">
      <label class="cmdk-in">${ic('magnifying-glass')}<input type="search" autocomplete="off" spellcheck="false" placeholder="${esc(o.placeholder)}" aria-label="搜索"><kbd>Esc</kbd></label>
      <div class="cmdk-list" role="listbox"></div>
      <div class="cmdk-ft"><span><kbd>↑</kbd><kbd>↓</kbd> 选择</span><span><kbd>↵</kbd> 打开</span><span><kbd>⌘</kbd><kbd>C</kbd> 直接复制提示词</span></div></div>`;
    document.body.appendChild(box);
    const inp = $('input', box), list = $('.cmdk-list', box); let sel = 0, items = [], back = null, tm;
    const pool = [].concat(
      prompts.map(p => ({ t: 'p', id: p.id, title: p.title, sub: p.excerpt, code: p.rid, hay: [p.title, p.excerpt, (p.tags || []).join(' '), (p.scenes || []).join(' '), p.rid].join(' '), ic: SCENE_IC[(p.scenes || [])[0]] || 'chat-centered-text', p })),
      SKILLS.map(s => ({ t: 's', id: s.id, title: s.name, sub: s.one, code: s.code, hay: [s.name, s.title, s.one, (s.tags || []).join(' '), s.code, s.slug].join(' '), ic: SKCAT_IC[s.cat] || 'puzzle-piece' })),
      articles.map(a => ({ t: 'a', id: a.id, title: a.title, sub: a.excerpt, code: '长文', hay: [a.title, a.excerpt, (a.tags || []).join(' ')].join(' '), ic: 'book-open-text' })));
    const href = it => it.t === 'p' ? o.promptHref(it.id) : it.t === 's' ? o.skillHref(it.id) : o.articleHref(it.id);
    const G = { p: '提示词', s: 'Skill', a: '长文' };
    function run() {
      const q = inp.value.trim(); const nq = W.nz ? W.nz(q) : q.toLowerCase();
      const codeHit = q && pool.filter(it => it.code && W.nz(it.code).replace(/-0*/, '-') === nq.replace(/-0*/, '-'));
      let r = q ? pool.filter(it => W.nzHas(it.hay, q)) : [].concat(pool.filter(i => i.t === 's').slice(0, 3), pool.filter(i => i.t === 'p').slice(0, 5), pool.filter(i => i.t === 'a').slice(0, 2));
      if (codeHit && codeHit.length) r = codeHit.concat(r.filter(x => !codeHit.includes(x)));
      const grouped = ['s', 'p', 'a'].map(g => [g, r.filter(x => x.t === g).slice(0, g === 'p' ? 7 : 4)]).filter(x => x[1].length);
      items = grouped.flatMap(x => x[1]); sel = 0;
      const hl = s => W.hlText ? W.hlText(esc(s), q) : esc(s);
      list.innerHTML = items.length ? grouped.map(([g, arr]) => `<div class="cmdk-g">${q ? G[g] : (g === 's' ? '先从这几个 Skill 开始' : g === 'p' ? '新上的提示词' : '长文精华')}<small>${q ? `${r.filter(x => x.t === g).length} 条` : ''}</small></div>` + arr.map(it => `<a class="cmdk-it" role="option" href="${href(it)}" data-k="${items.indexOf(it)}">${ic(it.ic, 'cmdk-ic')}<span class="cmdk-tx"><b>${hl(it.title)}</b><small>${hl(it.sub || '')}</small></span><code>${esc(it.code || '')}</code></a>`).join('')).join('')
        : `<div class="cmdk-empty">${ic('magnifying-glass-minus')}<b>没找到「${esc(q)}」</b><span>换个说法试试：PRD、竞品、周报、简历；或者直接输入编号</span></div>`;
      mark();
    }
    function mark() { $$('.cmdk-it', list).forEach((a, i) => { a.classList.toggle('on', i === sel); a.setAttribute('aria-selected', i === sel) }); const a = $$('.cmdk-it', list)[sel]; a && a.scrollIntoView({ block: 'nearest' }) }
    function open(q) { back = document.activeElement; box.hidden = false; requestAnimationFrame(() => box.classList.add('open')); inp.value = typeof q === 'string' ? q : ''; run(); inp.focus(); document.documentElement.style.overflow = 'hidden' }
    function close() { box.classList.remove('open'); document.documentElement.style.overflow = ''; setTimeout(() => { box.hidden = true }, RM() ? 0 : 180); back && back.focus && back.focus() }
    inp.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(run, 120) });
    box.addEventListener('click', e => { if (e.target.dataset.x !== undefined) close() });
    box.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.preventDefault(); close() }
      else if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(items.length - 1, sel + 1); mark() }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); mark() }
      else if (e.key === 'Enter' && items[sel]) { e.preventDefault(); location.href = href(items[sel]) }
      else if ((e.metaKey || e.ctrlKey) && e.key === 'c' && items[sel] && items[sel].t === 'p' && !getSelection().toString()) { e.preventDefault(); copyText(items[sel].p.prompt).then(() => toast('提示词已复制（变量保留 {{ }}，粘贴后再填）')) }
      else if (e.key === 'Tab') { const f = $$('input,a.cmdk-it', box); const i = f.indexOf(document.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus() } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus() } }
    });
    list.addEventListener('mousemove', e => { const a = e.target.closest('.cmdk-it'); if (a && +a.dataset.k !== sel) { sel = +a.dataset.k; mark() } });
    document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); box.hidden ? open() : close() } else if (e.key === '/' && box.hidden && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); open() } });
    $$('[data-cmdk]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); open() }));
    return { open, close };
  }

  /* Skill 安装命令（沿用 forum-data.js 的 SKILL_AI / skillCmd / instPref，行为与现有原型一致） */
  function install(root, s, opt) {
    const o = Object.assign({ copyCls: 'btn btn-ink' }, opt || {});
    function draw() {
      const pf = W.instPref.get(); const ai = W.SKILL_AI.find(a => a.id === pf.ai) || W.SKILL_AI[0]; const slug = W.skillSlug(s);
      const tabs = `<div class="ai-tabs" role="tablist" aria-label="选你用的 AI">${W.SKILL_AI.map(a => `<button role="tab" aria-selected="${a.id === ai.id}" data-ai="${a.id}">${esc(a.name)}</button>`).join('')}<span class="ai-ink" aria-hidden="true"></span></div>`;
      const verify = `<p class="verify">${ic('seal-check')}<span><b>验证装好：</b>${esc(ai.verify).replace(/\{slug\}/g, `<code>${slug}</code>`)}</span></p>`;
      if (ai.web) { root.innerHTML = tabs + `<div class="web-note"><p><b>${esc(ai.sub)}</b> 这类网页版 AI 暂时没有 Skill 机制。把完整内容复制下来，粘到对话开头就能用；差别是每次新对话都要重新贴、不会自动触发。</p><button class="${o.copyCls} cp-full">${ic('copy')}<span class="lab">复制完整 Skill 内容</span></button></div>` + verify; bindCopy($('.cp-full', root), () => W.skillFull(s), '已复制完整 Skill 内容，粘到对话开头') }
      else {
        const os = pf.os;
        root.innerHTML = tabs + `<div class="term"><div class="term-h"><span class="os" role="radiogroup" aria-label="系统">${[['mac', 'macOS / Linux'], ['win', 'Windows']].map(([k, n]) => `<button role="radio" aria-checked="${os === k}" data-os="${k}">${n}</button>`).join('')}</span><small>${os === 'win' ? 'PowerShell' : '终端'} · 已按你的电脑选好</small><button class="${o.copyCls} cp-cmd">${ic('copy')}<span class="lab">复制命令</span></button></div><pre class="term-b"><code>${esc(W.skillCmd(s, ai, os))}</code></pre><p class="term-n">只做 3 件事：建目录、下载、解压到 <code>${esc(os === 'win' ? ai.win : ai.dir)}</code>。不运行任何脚本，可以先读一遍再执行。</p></div>` + verify;
        bindCopy($('.cp-cmd', root), () => W.skillCmd(s, ai, os), '命令已复制，打开终端粘贴、回车');
      }
      $$('[data-ai]', root).forEach(b => b.onclick = () => { W.instPref.set('ai', b.dataset.ai); draw(); const n = $(`[data-ai="${b.dataset.ai}"]`, root); n && n.focus() });
      $$('[data-os]', root).forEach(b => b.onclick = () => { W.instPref.set('os', b.dataset.os); draw() });
      const on = $('[aria-selected="true"]', root), ink = $('.ai-ink', root); if (on && ink) { ink.style.width = on.offsetWidth + 'px'; ink.style.transform = `translateX(${on.offsetLeft}px)` }
    }
    draw(); W.addEventListener('resize', () => { const on = $('[aria-selected="true"]', root), ink = $('.ai-ink', root); if (on && ink) { ink.style.width = on.offsetWidth + 'px'; ink.style.transform = `translateX(${on.offsetLeft}px)` } });
  }

  /* Tab：键盘左右切换、指示条滑动 */
  function tabs(root, onSwitch) {
    const bs = $$('[role="tab"]', root); const ink = $('.tab-ink', root);
    function go(b, focus) {
      bs.forEach(x => { const on = x === b; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; const pn = document.getElementById(x.getAttribute('aria-controls')); if (pn) pn.hidden = !on });
      if (ink) { ink.style.width = b.offsetWidth + 'px'; ink.style.transform = `translateX(${b.offsetLeft}px)` }
      focus && b.focus(); onSwitch && onSwitch(b.dataset.tab); history.replaceState(null, '', '#' + b.dataset.tab);
    }
    bs.forEach((b, i) => { b.onclick = () => go(b); b.onkeydown = e => { if (e.key === 'ArrowRight') go(bs[(i + 1) % bs.length], 1); if (e.key === 'ArrowLeft') go(bs[(i - 1 + bs.length) % bs.length], 1) } });
    const init = bs.find(b => '#' + b.dataset.tab === location.hash) || bs[0]; requestAnimationFrame(() => go(init));
    W.addEventListener('resize', () => { const b = bs.find(x => x.getAttribute('aria-selected') === 'true'); if (b && ink) { ink.style.width = b.offsetWidth + 'px'; ink.style.transform = `translateX(${b.offsetLeft}px)` } });
    return { go: t => go(bs.find(b => b.dataset.tab === t)) };
  }

  /* 生成式封面用的稳定随机数（同一条内容每次长得一样） */
  function seeded(seed) { let h = 2166136261; for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) } return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000 } }

  const related = (p, n = 4) => prompts.filter(x => x.id !== p.id && (x.scenes || []).some(s => (p.scenes || []).includes(s))).slice(0, n);
  const fmtDate = d => d ? d.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$1.$2.$3') : '';
  const sceneCount = s => prompts.filter(p => (p.scenes || []).includes(s)).length;
  const parseArr = v => Array.isArray(v) ? v : [];

  W.LY = { $, $$, esc, qs, RM, prompts, articles, byId, skill, skCat, col, SCENE_IC, SKCAT_IC, ic, md, copyText, bindCopy, toast, fillable, reveal, palette, install, tabs, seeded, related, fmtDate, sceneCount, parseArr, STATS: W.STATS || {}, SCENES: W.SCENES || [] };
})();
