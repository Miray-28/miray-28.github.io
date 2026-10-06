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
