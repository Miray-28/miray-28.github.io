// Informations visibles sur les profils publics GitHub et TryHackMe le 06/10/2026.
// Les compteurs sont un relevé, pas une connexion en direct à TryHackMe.
window.PROFIL = {
  pseudo: "miray",
  discordPseudo: "miray.28.",
  description: "",
  reseaux: [
    { nom: "Discord", lien: "https://discord.com/users/1446790294472232990" },
    { nom: "GitHub", lien: "https://github.com/Miray-28" },
    { nom: "TryHackMe", lien: "https://tryhackme.com/p/Miray.28" },
    { nom: "guns.lol", lien: "https://guns.lol/miray.28" },
    { nom: "TikTok", lien: "https://www.tiktok.com/@miray.280?_r=1&_t=ZN-9AL6AjfXinW" }
  ],
  rooms: [
    { nom: "HeartBleed", categorie: "challenge", type: "Challenge", niveau: "Easy", sujet: "SSL / OpenSSL", description: "Une faille célèbre, un challenge pour la comprendre.", lien: "https://tryhackme.com/room/heartbleed", icon: "shield" },
    { nom: "Wgel CTF", categorie: "challenge", type: "Challenge", niveau: "Easy", sujet: "CTF", description: "Un challenge avec un flag root à trouver.", lien: "https://tryhackme.com/room/wgelctf", icon: "lab" },
    { nom: "DNS in Detail", categorie: "reseau", type: "Walkthrough", niveau: "Easy", sujet: "DNS", description: "Le rôle du DNS et la résolution des noms.", lien: "https://tryhackme.com/room/dnsindetail", icon: "network" },
    { nom: "What is Networking?", categorie: "reseau", type: "Walkthrough", niveau: "Info", sujet: "Réseau", description: "Les premières bases de la communication en réseau.", lien: "https://tryhackme.com/room/whatisnetworking", icon: "network" },
    { nom: "Intro to LAN", categorie: "reseau", type: "Walkthrough", niveau: "Info", sujet: "LAN", description: "Les réseaux locaux et leur fonctionnement.", lien: "https://tryhackme.com/room/introtolan", icon: "network" },
    { nom: "OSI Model", categorie: "reseau", type: "Walkthrough", niveau: "Info", sujet: "Modèle OSI", description: "Les couches du modèle OSI.", lien: "https://tryhackme.com/room/osimodelzi", icon: "network" },
    { nom: "Packets & Frames", categorie: "reseau", type: "Walkthrough", niveau: "Info", sujet: "Paquets", description: "Paquets et trames : comment circulent les données.", lien: "https://tryhackme.com/room/packetsframes", icon: "network" },
    { nom: "Extending Your Network", categorie: "reseau", type: "Walkthrough", niveau: "Info", sujet: "Réseau", description: "Aller plus loin dans les bases réseau.", lien: "https://tryhackme.com/room/extendingyournetwork", icon: "network" },
    { nom: "W1seGuy", categorie: "challenge", type: "Challenge", niveau: "Easy", sujet: "CTF", description: "Un autre challenge terminé sur TryHackMe.", lien: "https://tryhackme.com/room/w1seguy", icon: "lab" },
    { nom: "Careers in Cyber", categorie: "intro", type: "Walkthrough", niveau: "Info", sujet: "Métiers cyber", description: "Découvrir les métiers de la cybersécurité.", lien: "https://tryhackme.com/room/careersincyber5zy1sk0al", icon: "shield" },
    { nom: "HealthGPT", categorie: "challenge", type: "Challenge", niveau: "Easy", sujet: "IA", description: "Un challenge autour d’un assistant IA.", lien: "https://tryhackme.com/room/healthgpt", icon: "spark" },
    { nom: "Offensive Security Intro", categorie: "intro", type: "Walkthrough", niveau: "Easy", sujet: "Sécurité offensive", description: "Une introduction à la sécurité offensive.", lien: "https://tryhackme.com/room/offensivesecurityintrokKx12l39", icon: "shield" },
    { nom: "Love Letter Locker", categorie: "challenge", type: "Challenge", niveau: "Easy", sujet: "CTF", description: "Un challenge de la série Love at First Breach.", lien: "https://tryhackme.com/room/lafb2026e2", icon: "lab" },
    { nom: "Defensive Security Intro", categorie: "intro", type: "Walkthrough", niveau: "Info", sujet: "Sécurité défensive", description: "Une introduction à la sécurité défensive.", lien: "https://tryhackme.com/room/defensivesecurityintroezn39", icon: "shield" }
  ],
  badges: [
    { nom: "3 Day Streak", description: "Trois jours de pratique d’affilée.", icon: "fire", theme: "fire" },
    { nom: "Networking Nerd", description: "Module Network Fundamentals terminé.", icon: "network", theme: "net" },
    { nom: "Model Compromise", description: "Module LLM Attacks terminé.", icon: "spark", theme: "ai" },
    { nom: "First Mobile Quiz", description: "Premier quiz ou récap sur l’app mobile.", icon: "mobile", theme: "mobile" }
  ]
};

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
    const url = safeUrl(r.lien), card = make(url ? 'a' : 'article', '', 'room-card tilt-card' + (i === 0 ? ' featured' : ''));
    card.dataset.category = r.categorie; card.dataset.reveal = '';
    if (url) { card.href = url; card.target = '_blank'; card.rel = 'noopener noreferrer'; }
    const top = make('div', '', 'room-top'), done = make('span', '', 'room-done'); done.append(icon('check'), make('span', 'Terminée'));
    top.append(make('span', r.type, 'room-type'), done);
    const main = make('div', '', 'room-main'), ico = make('span', '', 'room-icon'); ico.append(icon(r.icon)); main.append(ico, make('h3', r.nom));
    const bottom = make('div', '', 'room-bottom'), tags = make('span', '', 'room-tags'); tags.append(make('span', r.niveau, 'difficulty'), make('span', r.sujet)); bottom.append(tags, icon('arrow'));
    card.append(top, main, make('p', r.description), bottom); return card;
  });
  roomGrid.replaceChildren(...roomCards);
  const filters = [...document.querySelectorAll('[data-filter]')];
  filters.forEach(b => { b.querySelector('span').textContent = rooms.filter(r => b.dataset.filter === 'all' || r.categorie === b.dataset.filter).length; });
  const search = document.getElementById('room-search');
  const normalise = text => String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const roomSearchText = rooms.map(r => normalise([r.nom, r.sujet, r.description].join(' ')));
  let selected = 'all';
  function filterRooms(animate = true) {
    const query = normalise(search.value.trim()); let count = 0;
    roomCards.forEach((card, i) => {
      const r = rooms[i], show = (selected === 'all' || r.categorie === selected) && roomSearchText[i].includes(query);
      card.hidden = !show; card.classList.remove('filter-enter');
      if (show) {
        if (animate && !reduced.matches) {
          card.classList.add('visible'); card.style.setProperty('--filter-delay', Math.min(count * 35, 175) + 'ms');
          requestAnimationFrame(() => card.classList.add('filter-enter'));
        }
        count++;
      }
    });
    document.getElementById('filter-status').textContent = count + (count === 1 ? ' room affichée' : ' rooms affichées');
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
    const emblem = make('div', '', 'badge-emblem'); emblem.setAttribute('aria-hidden', 'true'); emblem.append(make('span', '', 'badge-glint'), icon(b.icon));
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

(() => {
  'use strict';
  const canvas=document.getElementById('ambient-canvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d',{alpha:false});
  if(!ctx)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine=window.matchMedia('(hover: hover) and (pointer: fine)');
  const light=document.getElementById('pointer-light');
  const pointer={x:-1000,y:-1000,active:false};
  const trail=[];
  const bursts=[];
  let width=0,height=0,dpr=1,stars=[],frame=0,last=0,time=0,elapsed=0;
  let samples=[],spreads=[],ribbons;
  let base0,base1,cos9,sin9,sin3,cos3;
  const rand=(min,max)=>min+Math.random()*(max-min);
  function resize(){
    width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
    const count=width<680?34:75;
    stars=Array.from({length:count},()=>({x:rand(0,width),y:rand(0,height),r:rand(.45,1.6),speed:rand(.1,.36),phase:rand(0,Math.PI*2)}));
    // Cache the fixed geometry; only the wave phases change each frame.
    samples=[];
    for(let x=-30;x<=width+30;x+=22){const u=x/width;samples.push({x,u,s5:Math.sin(u*5.5),c5:Math.cos(u*5.5),s9:Math.sin(u*9.5),c9:Math.cos(u*9.5),s3:Math.sin(u*3),c3:Math.cos(u*3)});}
    const lines=width<680?22:34;
    spreads=Array.from({length:lines},(_,i)=>{const k=i/(lines-1);return {k,c8:Math.cos(k*.8),s8:Math.sin(k*.8),c2:Math.cos(k*2),s2:Math.sin(k*2)};});
    [base0,base1,cos9,sin9,sin3,cos3]=Array.from({length:6},()=>new Float64Array(samples.length));
    ribbons=ctx.createLinearGradient(0,0,width,height);
    ribbons.addColorStop(0,'rgba(168,181,191,.03)');ribbons.addColorStop(.2,'rgba(140,155,169,.24)');ribbons.addColorStop(.48,'rgba(162,145,181,.12)');ribbons.addColorStop(.77,'rgba(185,161,209,.34)');ribbons.addColorStop(1,'rgba(114,103,128,.07)');
    if(reduced.matches)draw(0);
  }
  function bloom(x,y,r,color){
    const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'rgba(15,10,28,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);
  }
  function draw(t){
    ctx.fillStyle='#030303';ctx.fillRect(0,0,width,height);
    const mx=pointer.active?(pointer.x/width-.5):0,my=pointer.active?(pointer.y/height-.5):0;
    const travel=Math.sin(window.scrollY/1200)*70;
    bloom(width*.74+Math.sin(t*.25)*75+mx*55,height*.31+Math.cos(t*.18)*45,Math.max(width*.42,360),'rgba(54,47,66,.24)');
    bloom(width*.16+Math.cos(t*.17)*60,height*.78+my*30,Math.max(width*.3,280),'rgba(33,39,43,.2)');
    bloom(width*.46,height*.77,Math.max(width*.28,260),'rgba(47,43,51,.08)');
    const s50=Math.sin(t*.37),c50=Math.cos(t*.37),s51=Math.sin(t*.37+1.4),c51=Math.cos(t*.37+1.4);
    const s9t=Math.sin(-t*.18),c9t=Math.cos(-t*.18),s3t=Math.sin(t*.1),c3t=Math.cos(t*.1);
    for(let j=0;j<samples.length;j++){
      const p=samples[j],shift=-travel+mx*(p.u-.5)*35+my*16;
      base0[j]=height*.7+(p.s5*c50+p.c5*s50)*height*.16+shift;
      base1[j]=height*.44+(p.s5*c51+p.c5*s51)*height*.16+shift;
      cos9[j]=p.c9*c9t-p.s9*s9t;sin9[j]=p.s9*c9t+p.c9*s9t;
      sin3[j]=p.s3*c3t+p.c3*s3t;cos3[j]=p.c3*c3t-p.s3*s3t;
    }
    ctx.strokeStyle=ribbons;
    const lines=spreads.length;
    for(let band=0;band<2;band++){
      const base=band===0?base0:base1;
      for(let i=0;i<lines;i++){
        const s=spreads[i],offset=(s.k-.5)*(band===0?150:90),amplitude=s.k*55;
        ctx.beginPath();
        for(let j=0;j<samples.length;j++){
          const y=base[j]+(cos9[j]*s.c8-sin9[j]*s.s8)*height*.065+offset+(sin3[j]*s.c2+cos3[j]*s.s2)*amplitude;
          if(j===0)ctx.moveTo(samples[j].x,y);else ctx.lineTo(samples[j].x,y);
        }
        ctx.globalAlpha=band===0?.75:.4;ctx.lineWidth=i%8===0?1.15:.55;ctx.stroke();
      }
    }
    ctx.globalAlpha=1;
    const nearby=[];
    for(const s of stars){
      const x=(s.x+Math.sin(t*s.speed+s.phase)*12+width)%width;
      const y=((s.y-t*s.speed*3-travel*.2)%height+height)%height;
      const alpha=.28+(Math.sin(t*.8+s.phase)+1)*.16;
      ctx.fillStyle='rgba(195,189,231,'+alpha+')';ctx.beginPath();ctx.arc(x,y,s.r,0,Math.PI*2);ctx.fill();
      if(pointer.active){const dx=x-pointer.x,dy=y-pointer.y;if(dx*dx+dy*dy<30625){s.drawX=x;s.drawY=y;nearby.push(s);}}
    }
    if(pointer.active&&!reduced.matches){
      bloom(pointer.x,pointer.y,145,'rgba(142,109,221,.075)');
      for(let i=0;i<Math.min(nearby.length,12);i++){const s=nearby[i],distance=Math.hypot(s.drawX-pointer.x,s.drawY-pointer.y);ctx.strokeStyle='rgba(183,149,235,'+(.19*(1-distance/175))+')';ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(s.drawX,s.drawY);ctx.lineTo(pointer.x,pointer.y);ctx.stroke();}
      for(let i=1;i<trail.length;i++){const a=trail[i-1],b=trail[i];ctx.strokeStyle='rgba(190,163,234,'+(i/trail.length*.28)+')';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
    }
    for(let i=bursts.length-1;i>=0;i--){const b=bursts[i];b.age+=elapsed;const k=b.age/650;if(k>=1){bursts.splice(i,1);continue;}ctx.strokeStyle='rgba(197,166,244,'+((1-k)*.35)+')';ctx.lineWidth=.7;ctx.beginPath();ctx.arc(b.x,b.y,8+k*75,0,Math.PI*2);ctx.stroke();}
  }
  function loop(now){
    frame=0;
    if(document.hidden||reduced.matches)return;
    if(now-last>=28){elapsed=Math.min(now-last||33,60);last=now;time+=elapsed/1000;draw(time);if(trail.length)trail.shift();}
    frame=requestAnimationFrame(loop);
  }
  function start(){if(!frame&&!document.hidden&&!reduced.matches){last=0;canvas.dataset.state='running';frame=requestAnimationFrame(loop);}}
  function stop(){if(frame)cancelAnimationFrame(frame);frame=0;canvas.dataset.state='static';}
  let resizeFrame=0,uiFrame=0,pointerDirty=false;
  const pendingEffects=new Map();
  function flushEffects(){
    uiFrame=0;
    if(document.hidden)return;
    // Read all rectangles before writing any style to avoid layout thrashing.
    const updates=[];
    for(const [element,event] of pendingEffects)updates.push({element,event,rect:element.getBoundingClientRect()});
    pendingEffects.clear();
    if(pointerDirty){pointerDirty=false;light.style.transform='translate3d('+pointer.x+'px,'+pointer.y+'px,0)';light.classList.add('active');}
    for(const {element,event,rect:r} of updates){
      if(event.kind==='button'){element.style.setProperty('--pull-x',(event.x-r.left-r.width/2)*.11+'px');element.style.setProperty('--pull-y',(event.y-r.top-r.height/2)*.12+'px');}
      else{const x=(event.x-r.left)/r.width,y=(event.y-r.top)/r.height;element.style.setProperty('--rx',(y-.5)*-5+'deg');element.style.setProperty('--ry',(x-.5)*6+'deg');element.style.setProperty('--mx',x*100+'%');element.style.setProperty('--my',y*100+'%');}
    }
  }
  function scheduleEffects(){if(!uiFrame&&!document.hidden)uiFrame=requestAnimationFrame(flushEffects);}
  function clearEffects(){if(uiFrame)cancelAnimationFrame(uiFrame);uiFrame=0;pendingEffects.clear();pointerDirty=false;pointer.active=false;trail.length=0;light.classList.remove('active');}
  window.addEventListener('resize',()=>{if(!resizeFrame)resizeFrame=requestAnimationFrame(()=>{resizeFrame=0;resize();});},{passive:true});
  document.addEventListener('visibilitychange',()=>{document.body.classList.toggle('motion-paused',document.hidden);if(document.hidden){stop();clearEffects();}else start();});
  reduced.addEventListener('change',()=>{if(reduced.matches){stop();draw(0);}else start();});
  document.addEventListener('pointermove',e=>{if(!fine.matches||reduced.matches||document.hidden)return;pointer.x=e.clientX;pointer.y=e.clientY;pointer.active=true;trail.push({x:e.clientX,y:e.clientY});if(trail.length>16)trail.shift();pointerDirty=true;scheduleEffects();},{passive:true});
  document.addEventListener('pointerleave',clearEffects);
  document.addEventListener('pointerdown',e=>{if(reduced.matches)return;if(bursts.length>5)bursts.shift();bursts.push({x:e.clientX,y:e.clientY,age:0});},{passive:true});
  document.querySelectorAll('.button,.nav-contact').forEach(button=>{
    button.addEventListener('pointermove',e=>{if(!fine.matches||reduced.matches)return;pendingEffects.set(button,{x:e.clientX,y:e.clientY,kind:'button'});scheduleEffects();},{passive:true});
    button.addEventListener('pointerleave',()=>{pendingEffects.delete(button);button.style.setProperty('--pull-x','0px');button.style.setProperty('--pull-y','0px');});
  });
  document.querySelectorAll('a.network-row,.tilt-card').forEach(card=>{
    card.addEventListener('pointermove',e=>{if(!fine.matches||reduced.matches)return;pendingEffects.set(card,{x:e.clientX,y:e.clientY,kind:'card'});scheduleEffects();},{passive:true});
    card.addEventListener('pointerleave',()=>{pendingEffects.delete(card);card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg');});
  });
  if('IntersectionObserver' in window){
    const visibility=new IntersectionObserver(entries=>{for(const entry of entries)entry.target.classList.toggle('animation-idle',!entry.isIntersecting);},{rootMargin:'120px'});
    document.querySelectorAll('main>section').forEach(section=>visibility.observe(section));
  }
  resize();draw(0);start();
})();
