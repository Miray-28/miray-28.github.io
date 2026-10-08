(() => {
  'use strict';
  const p = window.PROFIL || {}, name = p.pseudo || 'miray';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const make = (tag, value, className) => { const e = document.createElement(tag); if (value) e.textContent = value; if (className) e.className = className; return e; };
  const safeUrl = value => { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : null; } catch { return null; } };
  const icon = id => { const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.classList.add('icon'); s.setAttribute('aria-hidden', 'true'); const u = document.createElementNS('http://www.w3.org/2000/svg', 'use'); u.setAttribute('href', '#i-' + id); s.append(u); return s; };
  document.querySelectorAll('[data-name]').forEach(e => e.textContent = name);
  const heroName = document.querySelector('.hero-name');
  heroName.setAttribute('aria-label', name);
  heroName.replaceChildren(...Array.from(name).map((letter, i) => { const s = make('span', letter); s.setAttribute('aria-hidden', 'true'); s.style.setProperty('--letter', i); return s; }));
  document.title = name + ' — cybersécurité';
  document.getElementById('year').textContent = new Date().getFullYear();
  if (p.description) document.getElementById('intro').textContent = p.description;
  const discordHandle = p.discordPseudo || 'miray.28.';
  document.querySelectorAll('[data-discord-handle]').forEach(e => e.textContent = discordHandle);

  const networks = Array.isArray(p.reseaux) ? p.reseaux : [];
  document.querySelectorAll('[data-network]').forEach(a => { const n = networks.find(n => n.nom === a.dataset.network), url = safeUrl(n?.lien); if (url) a.href = url; else a.hidden = true; });
  const info = { Discord: { icon: 'discord', detail: discordHandle }, GitHub: { icon: 'github', detail: 'Miray-28' }, TryHackMe: { icon: 'lab', detail: 'Miray.28' }, 'guns.lol': { icon: 'link', detail: 'miray.28' }, TikTok: { icon: 'tiktok', detail: '@miray.280' } };
  document.getElementById('socials').replaceChildren(...networks.map(n => {
    const data = info[n.nom] || { icon: 'link', detail: '' }, url = safeUrl(n.lien);
    const row = make(url ? 'a' : 'div', '', 'network-row network-' + data.icon + (url ? '' : ' pending'));
    row.dataset.reveal = '';
    if (url) { row.href = url; row.target = '_blank'; row.rel = 'noopener noreferrer'; }
    const ico = make('span', '', 'network-icon'); ico.append(icon(data.icon));
    const label = make('span', '', 'network-label'); label.append(make('span', n.nom, 'network-name'));
    if (url && data.detail) label.append(make('span', data.detail, 'network-detail'));
    const end = make('span', '', 'network-end'); end.append(url ? icon('arrow') : make('span', 'À venir', 'pending-label'));
    row.append(ico, label, end); return row;
  }));

  const rooms = Array.isArray(p.rooms) ? p.rooms : [];
  const roomGrid = document.getElementById('room-grid');
  const roomCards = rooms.map((r, i) => {
    const url = safeUrl(r.lien), card = make(url ? 'a' : 'article', '', 'room-card tilt-card');
    card.dataset.category = r.categorie; card.dataset.reveal = '';
    if (url) { card.href = url; card.target = '_blank'; card.rel = 'noopener noreferrer'; }
    const top = make('div', '', 'room-top'), done = make('span', '', 'room-done'); done.append(icon('check'), make('span', 'Terminée'));
    top.append(make('span', r.type, 'room-type'), done);
    const main = make('div', '', 'room-main'), ico = make('span', r.repere || r.sujet, 'room-marker'); ico.setAttribute('aria-hidden', 'true'); main.append(ico, make('h3', r.nom));
    const bottom = make('div', '', 'room-bottom'), tags = make('span', '', 'room-tags'); tags.append(make('span', r.niveau, 'difficulty'), make('span', r.sujet)); bottom.append(tags, icon('arrow'));
    card.append(top, main, make('p', r.description), bottom); return card;
  });
  roomGrid.replaceChildren(...roomCards);
  const filters = [...document.querySelectorAll('[data-filter]')];
  filters.forEach(b => { b.querySelector('span').textContent = rooms.filter(r => b.dataset.filter === 'all' ? r.selection === true : r.categorie === b.dataset.filter).length; });
  const search = document.getElementById('room-search');
  const normalise = text => String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const roomSearchText = rooms.map(r => normalise([r.nom, r.sujet, r.description].join(' ')));
  let selected = 'all';
  function filterRooms(animate = true) {
    const query = normalise(search.value.trim()); let count = 0;
    roomCards.forEach((card, i) => {
      const r = rooms[i], show = (selected === 'all' ? r.selection === true : r.categorie === selected) && roomSearchText[i].includes(query);
      card.hidden = !show; card.classList.remove('filter-enter');
      if (show) {
        if (animate && !reduced.matches) {
          card.classList.add('visible'); card.style.setProperty('--filter-delay', Math.min(count * 35, 175) + 'ms');
          requestAnimationFrame(() => card.classList.add('filter-enter'));
        }
        count++;
      }
    });
    document.getElementById('filter-status').textContent = count + (selected === 'all' ? (count === 1 ? ' room sélectionnée' : ' rooms sélectionnées') : (count === 1 ? ' room affichée' : ' rooms affichées'));
    document.getElementById('empty-state').hidden = count > 0;
  }
  function selectFilter(value) {
    selected = value;
    filters.forEach(b => { const active = b.dataset.filter === value; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
    filterRooms();
  }
  filters.forEach(b => b.addEventListener('click', () => selectFilter(b.dataset.filter)));
  search.addEventListener('input', () => filterRooms(false));
  document.querySelectorAll('[data-jump-filter]').forEach(a => a.addEventListener('click', () => { search.value = ''; selectFilter(a.dataset.jumpFilter); }));
  filterRooms(false);

  document.getElementById('badge-grid').replaceChildren(...(p.badges || []).map((b, i) => {
    const card = make('article', '', 'badge-card badge-' + b.theme + ' tilt-card'); card.dataset.reveal = '';
    const check = make('span', '', 'badge-check'); check.append(icon('check')); check.setAttribute('aria-label', 'Badge obtenu');
    const emblem = make('div', b.repere, 'badge-mark'); emblem.setAttribute('aria-hidden', 'true');
    card.append(make('span', '0' + (i + 1), 'badge-number'), check, emblem, make('h3', b.nom), make('p', b.description)); return card;
  }));

  const toggle = document.querySelector('.menu-toggle'), nav = document.getElementById('navigation');
  const close = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Ouvrir le menu'); };
  toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu'); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { close(); toggle.focus(); } });
  document.addEventListener('click', e => { if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) close(); });

  const revealElements = [...document.querySelectorAll('[data-reveal]')];
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(items => items.forEach(item => { if (item.isIntersecting) { item.target.classList.add('visible'); revealObserver.unobserve(item.target); } }), { threshold: .06 });
    revealElements.forEach(e => { const siblings = e.parentElement.children; const index = Array.from(siblings).indexOf(e); e.classList.add('reveal'); e.style.setProperty('--reveal-delay', Math.min(index % 4 * 70, 210) + 'ms'); revealObserver.observe(e); });
  }
  const counters = [...document.querySelectorAll('[data-count]')];
  let counterFrame = 0;
  const statBoard = document.querySelector('.stats-grid');
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(items => {
      if (!items.some(item => item.isIntersecting)) return;
      countObserver.disconnect();
      const start = performance.now(), duration = 1450;
      const tick = now => { const t = Math.min((now - start) / duration, 1), ease = 1 - Math.pow(1 - t, 3); counters.forEach(e => e.textContent = Math.round(Number(e.dataset.count) * ease)); if (t < 1 && !reduced.matches) counterFrame = requestAnimationFrame(tick); else counters.forEach(e => e.textContent = e.dataset.count); };
      counterFrame = requestAnimationFrame(tick);
    }, { threshold: .3 });
    countObserver.observe(statBoard);
  }
  reduced.addEventListener('change', () => {
    if (reduced.matches) { cancelAnimationFrame(counterFrame); counters.forEach(e => e.textContent = e.dataset.count); revealElements.forEach(e => e.classList.add('visible')); }
  });

  const chapters = [...document.querySelectorAll('[data-chapter]')], railLinks = [...document.querySelectorAll('.chapter-rail a')], header = document.querySelector('.site-header');
  const progress = document.getElementById('reading-progress'), navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  let scheduled = false, currentId = '';
  function onScroll() {
    scheduled = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    let active = chapters[0];
    chapters.forEach(c => { if (c.getBoundingClientRect().top <= innerHeight * .38) active = c; });
    progress.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
    header.classList.toggle('scrolled', scrollY > 28);
    if (active.id !== currentId) {
      currentId = active.id;
      railLinks.forEach(a => { const selected = a.hash === '#' + currentId; a.classList.toggle('active', selected); if (selected) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
      navLinks.forEach(a => a.classList.toggle('current', a.hash === '#' + currentId));
    }
  }
  window.addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll); onScroll();
})();
