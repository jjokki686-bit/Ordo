/* ---- source script 1 ---- */
/* =========================================================
   ordo mobile — 전체 로직
   데이터는 localStorage에 저장됩니다. (키: ordo_v3_*)
   ========================================================= */

/* ---------- 0. 아이콘 (외부 폰트 없이 인라인 SVG) ---------- */
const ICONS = {
  home:'<path d="M3 10.6 12 3.4l9 7.2V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  calendar:'<path d="M3.5 9.5h17M7.5 3v4M16.5 3v4"/><rect x="3.5" y="5" width="17" height="16" rx="2"/>',
  'cal-check':'<path d="M3.5 9.5h17M7.5 3v4M16.5 3v4"/><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M8.5 14.5l2.4 2.4 4.6-4.6"/>',
  chat:'<path d="M21 11.5c0 4.2-4 7.6-9 7.6-.9 0-1.8-.1-2.6-.3L4 21l1.3-3.5C3.9 16.1 3 13.9 3 11.5 3 7.3 7 4 12 4s9 3.3 9 7.5z"/>',
  user:'<path d="M20 21v-1.8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4V21"/><circle cx="12" cy="7.5" r="4"/>',
  users:'<path d="M16 21v-1.8a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V21"/><circle cx="9" cy="7.5" r="3.6"/><path d="M22 21v-1.8a4 4 0 0 0-3-3.8M16.5 4.2a3.6 3.6 0 0 1 0 6.9"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  close:'<path d="M18 6 6 18M6 6l12 12"/>',
  'chev-l':'<path d="M15 18.5 8.5 12 15 5.5"/>',
  'chev-r':'<path d="M9 5.5 15.5 12 9 18.5"/>',
  'chev-d':'<path d="M5.5 9 12 15.5 18.5 9"/>',
  bell:'<path d="M18 8.5a6 6 0 1 0-12 0c0 6.5-2.5 7.5-2.5 7.5h17S18 15 18 8.5M13.8 20a2.1 2.1 0 0 1-3.6 0"/>',
  sparkle:'<path d="M12 3.2l1.9 5.2 5.2 1.9-5.2 1.9L12 17.4l-1.9-5.2L4.9 10.3l5.2-1.9zM18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
  pin:'<path d="M9.5 3.5h5l-.8 5.6 3.1 3.1v1.9H7.2v-1.9l3.1-3.1zM12 14.1V20.5"/>',
  trash:'<path d="M4 7h16M10 11v6M14 11v6M6.5 7l.9 12.1a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4L17.5 7M9.5 7V4.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V7"/>',
  settings:'<path d="M4 21v-6M4 11V3M12 21v-9M12 8V3M20 21v-4M20 13V3M1.5 15h5M9.5 8h5M17.5 17h5"/>',
  image:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 16.5 8.5 11.5l3.8 3.8 3-3 5.2 5.2"/><circle cx="8.6" cy="9.4" r="1.3"/>',
  camera:'<path d="M4 8h3l1.8-2h6.4L17 8h3a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.6"/>',
  send:'<path d="M21.5 2.5 10.8 13.2M21.5 2.5l-6.8 19-3.9-8.3-8.3-3.9z"/>',
  check:'<path d="M20 6.5 9.2 17.3 4 12.1"/>',
  clock:'<circle cx="12" cy="12" r="8.6"/><path d="M12 7.2V12l3.2 2"/>',
  'pin-map':'<path d="M12 21.2s6.8-5.6 6.8-10.6a6.8 6.8 0 1 0-13.6 0c0 5 6.8 10.6 6.8 10.6z"/><circle cx="12" cy="10.4" r="2.5"/>',
  compass:'<circle cx="12" cy="12" r="8.6"/><path d="M15.4 8.6l-2 4.8-4.8 2 2-4.8z"/>',
  poll:'<path d="M6 20.5V10M12 20.5V3.5M18 20.5v-7"/>',
  file:'<path d="M14 3.2H7.5a1.5 1.5 0 0 0-1.5 1.5v14.6a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V7.2zM14 3.2V7.2h4"/>',
  chart:'<path d="M4 19.5h16M7.5 16.5V10M12 16.5V5M16.5 16.5v-4.5"/>',
  table:'<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 10h18M9.5 10v9M15 10v9"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  crown:'<path d="M3.5 7.5 8 11.5l4-7 4 7 4.5-4V18a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1z"/>',
  download:'<path d="M12 3.5v12M7.5 11 12 15.5 16.5 11M4.5 20.5h15"/>',
  edit:'<path d="M4 20h4.2L20 8.2 15.8 4 4 15.8zM14.5 5.3l4.2 4.2"/>'
};
function paint(root){
  (root||document).querySelectorAll('[data-ic]').forEach(el=>{
    if(el.dataset.painted) return;
    const inner = ICONS[el.dataset.ic]; if(!inner) return;
    el.innerHTML = '<svg class="ic" viewBox="0 0 24 24">'+inner+'</svg>';
    el.dataset.painted = '1';
  });
}

/* ---------- 1. 저장소 ---------- */
const LS = {
  get:(k,d)=>{ try{ const v=localStorage.getItem('ordo_v3_'+k); return v?JSON.parse(v):d; }catch(e){ return d; } },
  set:(k,v)=>{ try{ localStorage.setItem('ordo_v3_'+k, JSON.stringify(v)); }catch(e){ showToast('저장 공간이 부족합니다.'); } }
};
const todayStr = ()=> {const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
const pad = n => String(n).padStart(2,'0');
const dstr = (y,m,d)=> `${y}-${pad(m+1)}-${pad(d)}`;

const PALETTE = ['#3B82F6','#22C55E','#EF4444','#F59E0B','#A855F7','#14B8A6','#EC4899','#F97316','#6366F1','#111214'];
const ROOM_CATS = ['업무','스터디','취미','친구','가족','기타'];

let theme      = LS.get('theme','system');
let categories = LS.get('cats', [{name:'업무',color:'#3B82F6'},{name:'일상',color:'#22C55E'},{name:'모임',color:'#F59E0B'}]);
let tasks      = LS.get('tasks', [
  {id:1, title:'UI 디자인 리뷰', memo:'시안 3가지 확인하기', date:todayStr(), time:'14:00', status:'todo', cat:'업무'},
  {id:2, title:'저녁 러닝 5km', memo:'', date:todayStr(), time:'19:30', status:'done', cat:'일상'}
]);
let rooms = LS.get('rooms', [
  {id:1, name:'오르도 런칭팀', desc:'앱 런칭까지 화이팅!', cat:'업무', color:'#6366F1', banner:null, pinned:true, owner:true, members:['나','지훈','수연','민아']},
  {id:2, name:'주말 러닝 크루', desc:'토요일 아침 한강 러닝', cat:'취미', color:'#22C55E', banner:null, pinned:false, owner:false, members:['나','현우','서진']}
]);
let chats = LS.get('chats', {
  1:[{id:1,who:'지훈',text:'다들 이번 주 스프린트 확인했나요?',ts:Date.now()-7200000},
     {id:2,who:'me',text:'네! 디자인 리뷰만 남았어요 👍',ts:Date.now()-7000000}],
  2:[{id:3,who:'현우',text:'토요일 7시 한강 어때요?',ts:Date.now()-3600000}]
});

let statusTab='todo', catFilter='전체', newCatColor='#3B82F6';
let viewY=new Date().getFullYear(), viewM=new Date().getMonth(), selectedDate='';
let monthMode=true, jumpY=new Date().getFullYear();
let optRoomId=null, editingRoomId=null, openChatId=null;
let roomForm={cat:'업무', color:'#3B82F6', banner:null};
let navIndex=0;

const save=()=>{ LS.set('cats',categories); LS.set('tasks',tasks); LS.set('rooms',rooms); LS.set('chats',chats); };
const catColor = n => (categories.find(c=>c.name===n)||{color:'#9AA0A6'}).color;

/* ---------- 2. 토스트 ---------- */
function showToast(msg){
  const box=document.getElementById('toasts');
  const t=document.createElement('div'); t.className='toast';
  t.textContent=msg;
  box.appendChild(t); paint(t);
  setTimeout(()=>{ t.classList.add('toast-out'); setTimeout(()=>t.remove(),300); }, 2400);
}

/* ---------- 3. 다크 모드 (로고 탭) ---------- */
const systemTheme=window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme(){
  const resolved=theme==='system'?(systemTheme.matches?'dark':'light'):theme;
  document.documentElement.setAttribute('data-theme',resolved);
  document.querySelectorAll('[data-theme-choice]').forEach(b=>{b.classList.toggle('selected',b.dataset.themeChoice===theme);b.setAttribute('aria-pressed',String(b.dataset.themeChoice===theme));});
  LS.set('theme',theme);
}
function setTheme(value){theme=value;applyTheme();}
systemTheme.addEventListener('change',()=>{if(theme==='system')applyTheme();});

/* ---------- 4. 네비게이션 ---------- */
const VIEWS=['view-home','view-cal','view-rooms','view-me'];
function switchNav(i){
  navIndex=i;
  document.querySelectorAll('.nav-item').forEach((b,k)=>b.classList.toggle('active',k===i));
  VIEWS.forEach((id,k)=>document.getElementById(id).classList.toggle('hidden',k!==i));
  document.getElementById('main').scrollTop=0;
  document.getElementById('fab').style.display = (i===0||i===1)?'flex':'none';
  moveIndicator();
  if(i===0){ renderCatTabs(); renderTasks(); }
  if(i===1) renderCalendar();
  if(i===2) renderRooms();
  if(i===3) renderMe();
}
function moveIndicator(){
  const nav=document.querySelector('.nav-inner');
  const btn=nav.querySelectorAll('.nav-item')[navIndex];
  const ind=document.getElementById('nav-ind');
  if(!btn) return;
  const r=btn.getBoundingClientRect(), nr=nav.getBoundingClientRect();
  ind.style.width=r.width+'px';
  ind.style.transform='translateX('+(r.left-nr.left)+'px)';
}
window.addEventListener('resize', ()=>setTimeout(moveIndicator,50));

/* ---------- 5. 시트 ---------- */
function openSheet(id){
  document.getElementById('backdrop').classList.add('on');
  document.getElementById(id).classList.add('open');
  if(id==='sheet-jump') renderJump();
}
function closeSheets(){
  document.getElementById('backdrop').classList.remove('on');
  document.querySelectorAll('.sheet').forEach(s=>s.classList.remove('open'));
}

/* ---------- 6. 시계 & 여정 현황 ---------- */
setInterval(()=>{ const e=document.getElementById('clock'); if(e) e.textContent=new Date().toTimeString().slice(0,8); },1000);
function toggleProgressMode(){ monthMode=!monthMode; renderProgress(); }
function renderProgress(){
  const now=new Date(), grid=document.getElementById('m-grid'); grid.innerHTML='';
  let pct=0;
  if(monthMode){
    document.getElementById('m-toggle').textContent=(now.getMonth()+1)+'월';
    const total=new Date(now.getFullYear(),now.getMonth()+1,0).getDate(), d=now.getDate();
    grid.style.gridTemplateColumns='repeat('+total+',minmax(0,1fr))';
    for(let i=1;i<=total;i++){
      const b=document.createElement('div');
      b.className='m-box'+(i<d?' filled':'')+(i===d?' today':'');
      b.onclick=()=>{ viewY=now.getFullYear(); viewM=now.getMonth(); switchNav(1); setTimeout(()=>selectDate(dstr(viewY,viewM,i)),120); };
      grid.appendChild(b);
    }
    pct=Math.round(d/total*100);
  }else{
    document.getElementById('m-toggle').textContent=now.getFullYear()+'년';
    grid.style.gridTemplateColumns='repeat(12,minmax(0,1fr))';
    const m=now.getMonth()+1;
    for(let i=1;i<=12;i++){
      const b=document.createElement('div');
      b.className='m-box'+(i<m?' filled':'')+(i===m?' today':'');
      b.onclick=()=>{ viewY=now.getFullYear(); viewM=i-1; switchNav(1); };
      grid.appendChild(b);
    }
    pct=Math.round(m/12*100);
  }
  document.getElementById('m-pct').textContent=pct+'%';
}

/* ---------- 7. 카테고리 & 일정 ---------- */
function renderCatTabs(){
  const c=document.getElementById('cat-tabs');
  const mk=(name,color)=>{
    const on = catFilter===name;
    return '<button class="press rounded-2xl px-4 py-2.5 text-[13px] font-black flex items-center gap-1.5 shrink-0" style="border:1px solid '+(on?'transparent':'var(--line)')+';background:'+(on?'var(--accent)':'var(--surface)')+';color:'+(on?'var(--accent-t)':'var(--t2)')+'" onclick="setFilter(\''+name+'\')">'+
      (color?'<i style="width:8px;height:8px;border-radius:99px;background:'+color+';display:block"></i>':'')+name+'</button>';
  };
  c.innerHTML = mk('전체',null) + categories.map(x=>mk(x.name,x.color)).join('');
}
function setFilter(n){ catFilter=n; renderCatTabs(); renderTasks(); }
function setStatusTab(s){
  statusTab=s;
  document.querySelectorAll('#status-tabs button').forEach(b=>{
    const on=b.dataset.st===s;
    b.style.background = on?'var(--surface)':'transparent';
    b.style.color = on?'var(--t1)':'var(--t3)';
    b.style.boxShadow = on?'0 2px 8px rgba(0,0,0,.08)':'none';
  });
  renderTasks();
}
function escapeHTML(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderTasks(){
  const list=document.getElementById('task-list');
  let f=tasks.filter(t=>t.status===statusTab);
  if(catFilter!=='전체') f=f.filter(t=>t.cat===catFilter);
  f.sort((a,b)=> (a.date+a.time).localeCompare(b.date+b.time));
  if(!f.length){ list.innerHTML='<div class="empty-timeline">아직 일정이 없어요.<small>새로운 계획을 가볍게 남겨보세요.</small><button class="secondary" onclick="openAddTask()">＋ 일정 추가</button></div>'; return; }
  list.innerHTML = f.map(t=>`
    <article class="timeline-row">
      <div class="timeline-time"><span>${escapeHTML(t.time||'종일')}</span><small>${escapeHTML(t.date.slice(5).replace('-',' / '))}</small><i></i></div>
      <div class="timeline-content"><button class="task-title" onclick="taskDetail(${t.id})">${escapeHTML(t.title)}</button><p>${escapeHTML(t.memo||'차분하게, 하나씩 해볼까요.')}</p><div class="task-meta"><span>${escapeHTML(t.cat)}</span><select aria-label="${escapeHTML(t.title)} 상태" onchange="setStatus(${t.id},this.value)"><option value="todo" ${t.status==='todo'?'selected':''}>시작 전</option><option value="doing" ${t.status==='doing'?'selected':''}>진행 중</option><option value="done" ${t.status==='done'?'selected':''}>완료</option></select></div></div>
    </article>`).join('')+'<button class="timeline-add" onclick="openAddTask()">＋ 새 일정 추가</button>';

}
function taskDetail(id){ const t=tasks.find(x=>x.id===id); showToast(t.memo? '📝 '+t.memo : '메모가 없습니다.'); }
function setStatus(id,v){ const t=tasks.find(x=>x.id===id); if(t){ t.status=v; save(); renderTasks(); renderMe(); } }

function openAddTask(date){
  document.getElementById('t-date').value = date || selectedDate || todayStr();
  document.getElementById('t-time').value = new Date().toTimeString().slice(0,5);
  document.getElementById('t-title').value=''; document.getElementById('t-memo').value='';
  document.getElementById('cat-form').classList.add('hidden');
  renderCatSelect(); openSheet('sheet-task');
}
let pickedCat = categories[0] ? categories[0].name : '업무';
function renderCatSelect(){
  document.getElementById('cat-select').innerHTML = categories.map(c=>{
    const on=c.name===pickedCat;
    return '<button class="press rounded-2xl px-4 py-2.5 text-[13px] font-black flex items-center gap-2" style="border:1px solid '+(on?'transparent':'var(--line)')+';background:'+(on?'var(--accent)':'var(--surface)')+';color:'+(on?'var(--accent-t)':'var(--t2)')+'" onclick="pickedCat=\''+c.name+'\';renderCatSelect()"><i style="width:9px;height:9px;border-radius:99px;background:'+c.color+';display:block"></i>'+c.name+'</button>';
  }).join('');
}
function toggleCatForm(){
  const f=document.getElementById('cat-form'); f.classList.toggle('hidden');
  if(!f.classList.contains('hidden')) renderCatColors();
}
function renderCatColors(){
  document.getElementById('cat-colors').innerHTML = PALETTE.map(c=>
    '<button class="color-dot press'+(c===newCatColor?' sel':'')+'" style="background:'+c+'" onclick="newCatColor=\''+c+'\';renderCatColors()"></button>').join('');
}
function saveCategory(){
  const n=document.getElementById('new-cat').value.trim();
  if(!n) return showToast('분류 이름을 입력하세요.');
  if(categories.length>=10) return showToast('분류는 최대 10개까지 가능합니다.');
  categories.push({name:n,color:newCatColor}); save();
  pickedCat=n; document.getElementById('new-cat').value='';
  toggleCatForm(); renderCatSelect(); renderCatTabs();
}
function saveTask(){
  const title=document.getElementById('t-title').value.trim();
  if(!title) return showToast('일정 내용을 입력해주세요.');
  tasks.push({ id:Date.now(), title, memo:document.getElementById('t-memo').value.trim(),
    date:document.getElementById('t-date').value||todayStr(),
    time:document.getElementById('t-time').value||'00:00', status:'todo', cat:pickedCat });
  save(); closeSheets(); showToast('일정이 저장되었습니다.');
  renderTasks(); renderCalendar(); renderProgress();
  if(selectedDate) selectDate(selectedDate);
}
;

/* ---- source script 2 ---- */
/* ---------- 8. 달력 ---------- */
function changeMonth(d){ viewM+=d; if(viewM>11){viewM=0;viewY++;} if(viewM<0){viewM=11;viewY--;} closeDetail(); renderCalendar(); }
function renderCalendar(){
  const el=document.getElementById('cal-title'); if(!el) return;
  el.textContent = viewY+'. '+pad(viewM+1);
  const total=new Date(viewY,viewM+1,0).getDate(), first=new Date(viewY,viewM,1).getDay();
  const now=new Date(), grid=document.getElementById('cal-grid');
  let html='';
  for(let i=0;i<first;i++) html+='<div></div>';
  for(let i=1;i<=total;i++){
    const ds=dstr(viewY,viewM,i);
    const isToday = now.getFullYear()===viewY && now.getMonth()===viewM && now.getDate()===i;
    const day=tasks.filter(t=>t.date===ds);
    const dots = day.length? '<span class="cal-dots">'+day.slice(0,3).map(t=>'<i style="background:'+catColor(t.cat)+'"></i>').join('')+'</span>' : '';
    html+='<button id="c-'+ds+'" class="cal-cell'+(isToday?' today':'')+(ds===selectedDate?' selected':'')+'" onclick="selectDate(\''+ds+'\')"><span>'+i+'</span>'+dots+'</button>';
  }
  grid.innerHTML=html;
}
function selectDate(ds){
  if(ds.slice(0,4)*1!==viewY || ds.slice(5,7)*1-1!==viewM){ viewY=ds.slice(0,4)*1; viewM=ds.slice(5,7)*1-1; }
  if(navIndex!==1) switchNav(1);
  selectedDate=ds; renderCalendar();
  const box=document.getElementById('cal-detail');
  box.classList.remove('hidden'); box.classList.add('flex');
  document.getElementById('detail-title').textContent=ds.replace(/-/g,'. ');
  const day=tasks.filter(t=>t.date===ds).sort((a,b)=>a.time.localeCompare(b.time));
  document.getElementById('detail-list').innerHTML = day.length ? day.map(t=>`
    <div class="flex items-start gap-2.5">
      <i style="width:9px;height:9px;border-radius:99px;background:${catColor(t.cat)};display:block;margin-top:6px;flex:none"></i>
      <div class="min-w-0">
        <div class="font-black text-[15px] c1">${t.title} <span class="c3 text-xs font-bold">${t.time}</span></div>
        ${t.memo?`<div class="c2 text-xs font-bold mt-0.5 line-2">${t.memo}</div>`:''}
      </div>
    </div>`).join('') : '<div class="c3 text-sm font-bold py-2">등록된 일정이 없습니다.</div>';
  document.getElementById('cal-detail').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeDetail(){
  const b=document.getElementById('cal-detail');
  b.classList.add('hidden'); b.classList.remove('flex');
  selectedDate=''; renderCalendar();
}

/* 날짜 이동 시트 */
function renderJump(){
  jumpY = viewY;
  document.getElementById('jump-year').textContent=jumpY;
  document.getElementById('jump-date').value = selectedDate || todayStr();
  drawJumpMonths();
}
function jumpYear(d){ jumpY+=d; document.getElementById('jump-year').textContent=jumpY; drawJumpMonths(); }
function drawJumpMonths(){
  document.getElementById('jump-months').innerHTML = Array.from({length:12},(_,i)=>{
    const on = (jumpY===viewY && i===viewM);
    return '<button class="press rounded-2xl py-3.5 font-black text-sm" style="border:1px solid '+(on?'transparent':'var(--line)')+';background:'+(on?'var(--accent)':'var(--elev)')+';color:'+(on?'var(--accent-t)':'var(--t1)')+'" onclick="goMonth('+i+')">'+(i+1)+'월</button>';
  }).join('');
}
function goMonth(m){ viewY=jumpY; viewM=m; closeSheets(); if(navIndex!==1) switchNav(1); renderCalendar(); showToast(viewY+'년 '+(m+1)+'월로 이동했어요.'); }
function goPickedDate(){
  const v=document.getElementById('jump-date').value;
  if(!v) return showToast('날짜를 선택해주세요.');
  closeSheets(); selectDate(v); showToast(v.replace(/-/g,'. ')+' 로 이동했어요.');
}
function goToday(){ const t=todayStr(); closeSheets(); selectDate(t); showToast('오늘로 이동했어요.'); }

/* ---------- 9. AI 공동 일정 조율 (초록/주황/빨강) ---------- */
function openCoordination(){
  const days=[], now=new Date();
  for(let i=0;i<14;i++){
    const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i);
    const ds=dstr(d.getFullYear(),d.getMonth(),d.getDate());
    const dayTasks=tasks.filter(t=>t.date===ds && t.status!=='done');
    const weekend=[0,6].includes(d.getDay());
    let score=dayTasks.length*2 + (weekend?-1:1);
    let level, color, label;
    if(score<=1){ level='free'; color='#22C55E'; label='여유'; }
    else if(score<=4){ level='mid'; color='#F59E0B'; label='보통'; }
    else { level='busy'; color='#EF4444'; label='바쁨'; }
    days.push({ds,d,dayTasks,color,label,level,score});
  }
  const free=days.filter(x=>x.level==='free');
  const best=free[0]||days.sort((a,b)=>a.score-b.score)[0];
  const W=['일','월','화','수','목','금','토'];
  const bd=best.d;
  document.getElementById('coord-summary').innerHTML =
    '<div style="background:rgba(34,197,94,.12);color:#16A34A;border-radius:16px;padding:14px">'+
    '🤖 2주 중 <b>'+free.length+'일</b>이 여유로워요. 가장 조율하기 좋은 날은 <b>'+(bd.getMonth()+1)+'월 '+bd.getDate()+'일('+W[bd.getDay()]+')</b> 입니다.'+
    (best.level==='free'?' 오후 시간대를 추천해요.':' 일정이 조금 있으니 저녁 시간대를 추천해요.')+'</div>';
  document.getElementById('coord-list').innerHTML = days.map(x=>{
    const w=W[x.d.getDay()];
    const bar = Math.min(100, 20 + x.dayTasks.length*28);
    return `<div class="flex items-center gap-3 p-3 rounded-2xl" style="background:var(--elev)">
      <div style="width:46px;flex:none;text-align:center">
        <div class="c3 text-[11px] font-black">${w}</div>
        <div class="c1 text-base font-black">${x.d.getDate()}</div>
      </div>
      <div class="flex-1 min-w-0">
        <div style="height:9px;border-radius:99px;background:var(--elev2);overflow:hidden">
          <div style="height:100%;width:${bar}%;background:${x.color};border-radius:99px;transition:width .5s"></div>
        </div>
        <div class="c3 text-[11px] font-bold mt-1.5 line-1">${x.dayTasks.length? x.dayTasks.map(t=>t.title).join(' · ') : '일정 없음'}</div>
      </div>
      <span class="text-[12px] font-black px-2.5 py-1 rounded-full" style="background:${x.color}22;color:${x.color};flex:none">${x.label}</span>
    </div>`;
  }).join('');
  openSheet('sheet-coord');
}

/* ---------- 10. 모임방 ---------- */
function renderRooms(){
  const pin=document.getElementById('pinned-list'), all=document.getElementById('rooms-list');
  const pinned=rooms.filter(r=>r.pinned);
  pin.innerHTML = pinned.length? '' : '<div class="c3 text-xs font-bold py-3">고정된 모임이 없어요. 방을 꾹 눌러 고정해보세요.</div>';
  pinned.forEach(r=>{
    const el=document.createElement('div');
    el.className='press shrink-0';
    el.style.cssText='width:132px;height:108px;border-radius:22px;padding:14px;display:flex;flex-direction:column;justify-content:space-between;color:#fff;'+
      (r.banner?`background:linear-gradient(0deg,rgba(0,0,0,.55),rgba(0,0,0,.15)),url(${r.banner});background-size:cover;background-position:center`:`background:${r.color}`);
    el.innerHTML='<span class="ic" style="font-size:16px;align-self:flex-end;opacity:.85" data-ic="pin"></span><div class="font-black text-sm leading-tight">'+r.name+'</div>';
    bindRoom(el,r.id); paint(el); pin.appendChild(el);
  });

  all.innerHTML='';
  if(!rooms.length){ all.innerHTML='<div class="c3 text-sm font-bold text-center py-10">아직 모임방이 없어요.<br>+ 새 모임으로 만들어보세요.</div>'; return; }
  rooms.forEach(r=>{
    const el=document.createElement('div');
    el.className='card press overflow-hidden';
    el.style.padding='0';
    el.innerHTML=`
      ${r.banner?`<div style="height:96px;background:url(${r.banner});background-size:cover;background-position:center"></div>`:''}
      <div class="flex items-center gap-3 p-4">
        <div style="width:52px;height:52px;border-radius:18px;background:${r.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;flex:none">${r.name.charAt(0)}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5">
            <i style="width:8px;height:8px;border-radius:99px;background:${r.color};display:block;flex:none"></i>
            <span class="c3 text-[11px] font-black">${r.cat}</span>
            ${r.owner?'<span class="text-[10px] font-black px-1.5 py-0.5 rounded" style="background:rgba(99,102,241,.15);color:#6366F1">방장</span>':''}
            ${r.pinned?'<span class="ic c3" style="font-size:13px" data-ic="pin"></span>':''}
          </div>
          <div class="font-black text-base c1 line-1 mt-0.5">${r.name}</div>
          <div class="c3 text-xs font-bold line-1">${lastMsg(r.id)}</div>
        </div>
        <span class="ic c3" data-ic="chev-r"></span>
      </div>`;
    bindRoom(el,r.id); paint(el); all.appendChild(el);
  });
}
function lastMsg(id){
  const l=(chats[id]||[]);
  if(!l.length) return '대화를 시작해보세요';
  const m=l[l.length-1];
  return (m.who==='me'?'나: ':m.who+': ') + (m.type==='schedule'? '📅 '+m.schedule.title : m.type==='image'?'📷 사진':m.text);
}
/* 탭 = 입장 / 꾹 누르기 = 옵션 */
function bindRoom(el,id){
  let timer=null, longed=false;
  const start=()=>{ longed=false; timer=setTimeout(()=>{ longed=true; if(navigator.vibrate)navigator.vibrate(18); openRoomOptions(id); },480); };
  const cancel=()=>clearTimeout(timer);
  el.addEventListener('touchstart',start,{passive:true});
  el.addEventListener('touchend',cancel); el.addEventListener('touchmove',cancel);
  el.addEventListener('mousedown',start); el.addEventListener('mouseup',cancel); el.addEventListener('mouseleave',cancel);
  el.addEventListener('click',()=>{ if(longed){ longed=false; return; } openChat(id); });
  el.addEventListener('contextmenu',e=>e.preventDefault());
}
function openRoomOptions(id){
  optRoomId=id; const r=rooms.find(x=>x.id===id); if(!r) return;
  document.getElementById('opt-title').textContent=r.name;
  document.getElementById('opt-pin-text').textContent=r.pinned?'즐겨찾기 해제':'즐겨찾기 고정';
  document.getElementById('opt-settings').style.display = r.owner?'flex':'none';
  openSheet('sheet-roomopt');
}
function togglePin(){
  const r=rooms.find(x=>x.id===optRoomId); if(r){ r.pinned=!r.pinned; save(); renderRooms(); showToast(r.pinned?'고정했어요.':'고정을 해제했어요.'); }
  closeSheets();
}
function removeRoom(){
  if(openChatId===optRoomId) closeChat();
  rooms=rooms.filter(r=>r.id!==optRoomId); delete chats[optRoomId];
  save(); renderRooms(); renderMe(); closeSheets(); showToast('모임방을 제거했어요.');
}

/* 모임 만들기 / 수정 */
function openCreateRoom(){
  editingRoomId=null; roomForm={cat:'업무',color:'#3B82F6',banner:null};
  document.getElementById('room-form-title').textContent='새 모임 만들기';
  document.getElementById('room-submit').textContent='모임 개설하기';
  document.getElementById('r-name').value=''; document.getElementById('r-desc').value='';
  setBannerPreview(null); renderRoomCats(); openSheet('sheet-room');
}
function editRoom(){
  const r=rooms.find(x=>x.id===optRoomId); if(!r) return;
  editingRoomId=r.id; roomForm={cat:r.cat,color:r.color,banner:r.banner};
  document.getElementById('room-form-title').textContent='모임 설정';
  document.getElementById('room-submit').textContent='변경사항 저장';
  document.getElementById('r-name').value=r.name; document.getElementById('r-desc').value=r.desc;
  setBannerPreview(r.banner); renderRoomCats();
  closeSheets(); setTimeout(()=>openSheet('sheet-room'),260);
}
function renderRoomCats(){
  document.getElementById('room-cat-list').innerHTML = ROOM_CATS.map(c=>{
    const on=roomForm.cat===c;
    return '<button class="press rounded-2xl px-4 py-2.5 text-[13px] font-black flex items-center gap-2" style="border:1px solid '+(on?'transparent':'var(--line)')+';background:'+(on?'var(--accent)':'var(--surface)')+';color:'+(on?'var(--accent-t)':'var(--t2)')+'" onclick="roomForm.cat=\''+c+'\';renderRoomCats()"><i style="width:9px;height:9px;border-radius:99px;background:'+roomForm.color+';display:block"></i>'+c+'</button>';
  }).join('');
  document.getElementById('room-color-list').innerHTML = PALETTE.map(c=>
    '<button class="color-dot press'+(c===roomForm.color?' sel':'')+'" style="background:'+c+'" onclick="roomForm.color=\''+c+'\';renderRoomCats()"></button>').join('');
}
function setBannerPreview(src){
  const b=document.getElementById('banner-pick');
  b.style.backgroundImage = src?`url(${src})`:'none';
  document.getElementById('banner-hint').textContent = src?'사진 변경하기':'탭해서 배너 사진 선택';
  b.querySelectorAll('span').forEach(s=>s.style.color = src?'#fff':'');
  b.style.textShadow = src?'0 1px 6px rgba(0,0,0,.7)':'none';
}
function pickBanner(e){
  const f=e.target.files[0]; if(!f) return;
  const rd=new FileReader();
  rd.onload=ev=>{
    const img=new Image();
    img.onload=()=>{ // 저장 공간을 위해 축소
      const c=document.createElement('canvas'); const w=640, h=Math.round(img.height*w/img.width);
      c.width=w; c.height=h; c.getContext('2d').drawImage(img,0,0,w,h);
      roomForm.banner=c.toDataURL('image/jpeg',0.72); setBannerPreview(roomForm.banner);
    };
    img.src=ev.target.result;
  };
  rd.readAsDataURL(f);
}
function submitRoom(){
  const name=document.getElementById('r-name').value.trim();
  const desc=document.getElementById('r-desc').value.trim();
  if(!name) return showToast('모임 이름을 입력하세요.');
  if(editingRoomId){
    const r=rooms.find(x=>x.id===editingRoomId);
    Object.assign(r,{name,desc,cat:roomForm.cat,color:roomForm.color,banner:roomForm.banner});
    showToast('모임 정보를 저장했어요.');
  }else{
    const id=Date.now();
    rooms.unshift({id,name,desc,cat:roomForm.cat,color:roomForm.color,banner:roomForm.banner,pinned:false,owner:true,members:['나']});
    chats[id]=[];
    showToast('모임방이 개설되었습니다 🎉');
  }
  save(); closeSheets(); renderRooms(); renderMe();
}

/* ---------- 11. 채팅방 (카카오톡 스타일) ---------- */
function openChat(id){
  openChatId=id; const r=rooms.find(x=>x.id===id); if(!r) return;
  document.getElementById('chat-name').textContent=r.name;
  document.getElementById('chat-members').textContent=(r.members||['나']).length;
  const box=document.getElementById('chatroom');
  box.style.display='flex'; requestAnimationFrame(()=>box.classList.add('on'));
  document.getElementById('attach-panel').classList.remove('open');
  renderChat();
}
function closeChat(){
  const box=document.getElementById('chatroom');
  box.classList.remove('on'); setTimeout(()=>{ box.style.display='none'; },320);
  openChatId=null; renderRooms();
}
function chatMenu(){ if(openChatId) openRoomOptions(openChatId); }
function timeLabel(ts){ const d=new Date(ts); const h=d.getHours(); return (h<12?'오전 ':'오후 ')+(h%12||12)+':'+pad(d.getMinutes()); }
function renderChat(){
  const log=document.getElementById('chat-log');
  const list=chats[openChatId]||[];
  let lastDay='';
  log.innerHTML = list.map(m=>{
    const d=new Date(m.ts), day=d.toDateString();
    let divider='';
    if(day!==lastDay){ lastDay=day; divider=`<div class="k-date">${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일</div>`; }
    const mine=m.who==='me';
    const body = m.type==='schedule' ? scheduleCard(m,mine)
              : m.type==='image' ? `<img src="${m.src}" style="max-width:190px;border-radius:16px;display:block">`
              : `<div class="kbubble ${mine?'k-me':'k-other'}">${m.text}</div>`;
    if(mine){
      return divider+`<div class="flex items-end justify-end gap-1.5">
        <span style="font-size:10px;color:var(--chat-meta);font-weight:700">${timeLabel(m.ts)}</span>${body}</div>`;
    }
    return divider+`<div class="flex items-start gap-2">
      <div style="width:38px;height:38px;border-radius:14px;background:var(--elev2);color:var(--t2);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;flex:none">${m.who.charAt(0)}</div>
      <div style="min-width:0">
        <div style="font-size:11.5px;font-weight:700;color:var(--chat-meta);margin-bottom:4px">${m.who}</div>
        <div class="flex items-end gap-1.5">${body}<span style="font-size:10px;color:var(--chat-meta);font-weight:700">${timeLabel(m.ts)}</span></div>
      </div></div>`;
  }).join('') || '<div style="text-align:center;color:var(--chat-meta);font-size:13px;font-weight:700;padding:30px 0">첫 메시지를 보내보세요 👋</div>';
  paint(log);
  log.scrollTop=log.scrollHeight;
}
function scheduleCard(m,mine){
  const s=m.schedule;
  const added = tasks.some(t=>t.date===s.date && t.title===s.title);
  return `<div class="kbubble ${mine?'k-me':'k-other'}" style="padding:0;overflow:hidden;width:216px">
    <div style="padding:12px 14px;background:rgba(0,0,0,.06);display:flex;align-items:center;gap:7px;font-weight:900;font-size:12.5px">
      <span class="ic" data-ic="cal-check"></span> 모임 일정
    </div>
    <div style="padding:12px 14px">
      <div style="font-weight:900;font-size:15px;line-height:1.3">${s.title}</div>
      <div style="font-size:12.5px;font-weight:700;opacity:.75;margin-top:5px">${s.date.replace(/-/g,'.')} ${s.time}</div>
      ${s.place?`<div style="font-size:12px;font-weight:700;opacity:.65;margin-top:2px">📍 ${s.place}</div>`:''}
      <button onclick="addSharedToCalendar(${m.id})" style="width:100%;margin-top:10px;padding:9px;border:0;border-radius:12px;font-weight:900;font-size:12.5px;font-family:inherit;background:${added?'rgba(128,128,128,.28)':'#111214'};color:${added?'inherit':'#fff'};opacity:${added?'.8':'1'}">
        ${added?'✓ 캘린더에 추가됨':'내 캘린더에 추가'}
      </button>
    </div></div>`;
}
function addSharedToCalendar(msgId){
  const m=(chats[openChatId]||[]).find(x=>x.id===msgId); if(!m) return;
  const s=m.schedule;
  if(tasks.some(t=>t.date===s.date && t.title===s.title)) return showToast('이미 캘린더에 있는 일정이에요.');
  tasks.push({id:Date.now(),title:s.title,memo:(s.place?'장소: '+s.place+' / ':'')+'모임 공유 일정',date:s.date,time:s.time,status:'todo',cat:catExists('모임')});
  save(); renderChat(); renderTasks(); renderCalendar();
  showToast('메인 캘린더에 추가했어요 📅');
}
function catExists(n){
  if(!categories.some(c=>c.name===n)){ categories.push({name:n,color:'#F59E0B'}); save(); renderCatTabs(); }
  return n;
}
function toggleAttach(){ document.getElementById('attach-panel').classList.toggle('open'); }
function sendChat(){
  const i=document.getElementById('chat-input'); const text=i.value.trim(); if(!text||!openChatId) return;
  chats[openChatId]=chats[openChatId]||[];
  chats[openChatId].push({id:Date.now(),who:'me',text,ts:Date.now()});
  i.value=''; save(); renderChat(); autoReply();
}
function autoReply(){
  const r=rooms.find(x=>x.id===openChatId); if(!r) return;
  const others=(r.members||[]).filter(m=>m!=='나');
  if(!others.length) return;
  const who=others[Math.floor(Math.random()*others.length)];
  const lines=['좋아요 👍','확인했습니다!','저도 그 시간 괜찮아요','오 좋은데요?','넵 준비할게요'];
  setTimeout(()=>{
    if(!openChatId) return;
    chats[openChatId].push({id:Date.now(),who,text:lines[Math.floor(Math.random()*lines.length)],ts:Date.now()});
    save(); renderChat();
  },1100);
}
function openChatShare(){
  if(!openChatId) return showToast('모임방에서 사용할 수 있어요.');
  document.getElementById('s-title').value='';
  document.getElementById('s-date').value=todayStr();
  document.getElementById('s-time').value='19:00';
  document.getElementById('s-place').value='';
  document.getElementById('attach-panel').classList.remove('open');
  openSheet('sheet-share');
}
function shareSchedule(){
  const title=document.getElementById('s-title').value.trim();
  if(!title) return showToast('일정 이름을 입력하세요.');
  const date=document.getElementById('s-date').value||todayStr();
  const time=document.getElementById('s-time').value||'00:00';
  const place=document.getElementById('s-place').value.trim();
  chats[openChatId]=chats[openChatId]||[];
  chats[openChatId].push({id:Date.now(),who:'me',type:'schedule',ts:Date.now(),schedule:{title,date,time,place}});
  /* 공유 = 내 캘린더 자동 등록 */
  tasks.push({id:Date.now()+1,title,memo:(place?'장소: '+place+' / ':'')+'모임 공유 일정',date,time,status:'todo',cat:catExists('모임')});
  save(); closeSheets(); renderChat(); renderTasks(); renderCalendar(); renderProgress();
  showToast('공유 완료! 메인 캘린더에도 추가했어요 📅');
  autoReply();
}
function attachPhoto(){ document.getElementById('chat-photo').click(); }
function photoPicked(e){
  const f=e.target.files[0]; if(!f) return;
  const rd=new FileReader();
  rd.onload=ev=>{
    const img=new Image();
    img.onload=()=>{
      const c=document.createElement('canvas'); const w=480,h=Math.round(img.height*w/img.width);
      c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);
      chats[openChatId].push({id:Date.now(),who:'me',type:'image',src:c.toDataURL('image/jpeg',0.7),ts:Date.now()});
      save(); renderChat(); document.getElementById('attach-panel').classList.remove('open');
    };
    img.src=ev.target.result;
  };
  rd.readAsDataURL(f);
}
function botMsg(text){
  if(!openChatId) return;
  chats[openChatId]=chats[openChatId]||[];
  const r=rooms.find(x=>x.id===openChatId);
  const who=((r&&r.members)||['오르도 봇']).filter(m=>m!=='나')[0]||'오르도 봇';
  chats[openChatId].push({id:Date.now(),who,text,ts:Date.now()});
  save(); renderChat(); document.getElementById('attach-panel').classList.remove('open');
}
function attachVote(){ botMsg('🗳️ 투표가 열렸어요 — "다음 모임 요일은?" (토 3표 / 일 1표)'); }
function attachPlace(){ botMsg('📍 장소 공유: 성남시 분당구 정자동 카페거리'); }
function attachFile(){ botMsg('📄 파일 공유: 모임_회의록.pdf (1.2MB)'); }
function attachSettle(){ botMsg('💸 정산 요청: 1인당 12,500원 (총 50,000원 / 4명)'); }
function attachExcel(){ botMsg('📊 엑셀 정리(프리미엄): 이번 달 모임 지출을 시트로 정리했어요.'); showToast('👑 엑셀 정리는 프리미엄 기능이에요.'); }
function attachCoord(){ document.getElementById('attach-panel').classList.remove('open'); closeChat(); setTimeout(()=>{ switchNav(0); openCoordination(); },340); }

/* ---------- 12. 내 정보 / 완료된 일정 / 구독 플랜 ---------- */
const PLANS=[
  {key:'free',name:'기본 (Free)',price:'₩0',tag:'현재 사용중',color:'#9AA0A6',
   feats:[['개인 일정 관리','check'],['모임방 3개까지 참여','users'],['기본 캘린더 & 분류 3개','calendar']]},
  {key:'pro',name:'그룹 프로 (Group Pro)',price:'₩4,900',tag:'/월',color:'#6366F1',
   feats:[['AI 공동 일정 조율 무제한','compass'],['모임방 무제한 개설','users'],['분류 무제한 + 배너 커스텀','image'],['모임 일정 캘린더 자동 연동','cal-check']]},
  {key:'premium',name:'프리미엄 (Premium)',price:'₩9,900',tag:'/월',color:'#F59E0B',
   feats:[['엑셀 정리 — 일정·지출 자동 시트화','table'],['데이터 정리 — 월간 패턴 리포트','chart'],['CSV / 구글 캘린더 내보내기','download'],['AI 주간 브리핑 & 우선 지원','sparkle']]},
  {key:'hub',name:'엔터프라이즈 허브',price:'별도 문의',tag:'',color:'#111214',
   feats:[['무제한 인원 & 관리자 대시보드','users'],['사내망 연동 / SSO','settings']]}
];
let openPlan='premium';
function renderMe(){
  document.getElementById('me-room-count').textContent=rooms.length;
  document.getElementById('me-done-count').textContent=tasks.filter(t=>t.status==='done').length+'개';
  renderPlans();
}
function renderPlans(){
  document.getElementById('plans').innerHTML=PLANS.map(p=>`
    <div class="plan ${openPlan===p.key?'open':''}" id="plan-${p.key}">
      <button class="w-full flex justify-between items-center p-4" style="background:none;border:0" onclick="togglePlan('${p.key}')">
        <span class="flex items-center gap-2.5">
          <span style="width:34px;height:34px;border-radius:12px;background:${p.color}22;color:${p.color};display:flex;align-items:center;justify-content:center;font-size:18px"><span class="ic" data-ic="crown"></span></span>
          <span style="text-align:left">
            <span class="font-black text-[15px] c1" style="display:block">${p.name}</span>
            <span class="c3 text-xs font-bold">${p.price}${p.tag?' '+p.tag:''}</span>
          </span>
        </span>
        <span class="ic c3 plan-chev" data-ic="chev-d"></span>
      </button>
      <div class="plan-body">
        <div class="px-4 pb-4">
          ${p.feats.map((f,i)=>`<div class="feat" style="transition-delay:${i*70+60}ms">
             <span class="dotc" style="background:${p.color}22;color:${p.color}"><span class="ic" data-ic="${f[1]}"></span></span>${f[0]}</div>`).join('')}
          ${p.key!=='free'?`<button class="press w-full rounded-2xl py-3.5 mt-3 font-black text-sm" style="background:${p.color};color:#fff;border:0" onclick="showToast('${p.name} 결제 화면으로 이동합니다.')">${p.key==='hub'?'문의하기':'업그레이드'}</button>`:''}
        </div>
      </div>
    </div>`).join('');
  paint(document.getElementById('plans'));
}
function togglePlan(k){ openPlan = openPlan===k?'':k; renderPlans(); }

function openDoneSheet(){
  const done=tasks.filter(t=>t.status==='done').sort((a,b)=>b.date.localeCompare(a.date));
  const now=new Date(), ym=now.getFullYear()+'-'+pad(now.getMonth()+1);
  const week=new Date(now.getTime()-6*86400000).toISOString().split('T')[0];
  const stats=[['총 완료',done.length],['이번 달',done.filter(t=>t.date.startsWith(ym)).length],['최근 7일',done.filter(t=>t.date>=week).length]];
  document.getElementById('done-stats').innerHTML=stats.map(s=>
    `<div class="s-elev rounded-2xl p-3 text-center"><div class="c3 text-[11px] font-black">${s[0]}</div><div class="c1 text-2xl font-black mt-1">${s[1]}</div></div>`).join('');
  const groups={};
  done.forEach(t=>{ (groups[t.date]=groups[t.date]||[]).push(t); });
  const keys=Object.keys(groups);
  document.getElementById('done-list').innerHTML = keys.length? keys.map(d=>`
    <div>
      <button class="press flex items-center gap-1.5 mb-2" style="background:none;border:0" onclick="closeSheets();selectDate('${d}')">
        <span class="c1 text-sm font-black">${d.replace(/-/g,'. ')}</span>
        <span class="c3 text-[11px] font-bold">캘린더에서 보기</span><span class="ic c3" style="font-size:14px" data-ic="chev-r"></span>
      </button>
      ${groups[d].map(t=>`<div class="s-elev rounded-2xl p-3.5 mb-2 flex items-center gap-2.5">
        <span class="ic" style="color:#22C55E;font-size:17px" data-ic="check"></span>
        <div class="min-w-0"><div class="c1 font-black text-sm line-1">${t.title}</div>
        <div class="c3 text-[11px] font-bold mt-0.5">${t.time} · ${t.cat}</div></div></div>`).join('')}
    </div>`).join('') : '<div class="c3 text-sm font-bold text-center py-10">아직 완료한 일정이 없어요.</div>';
  paint(document.getElementById('done-list'));
  openSheet('sheet-done');
}

/* ---------- 13. AI 비서 ---------- */
function sendAI(){
  const i=document.getElementById('ai-input'), text=i.value.trim(); if(!text) return;
  const box=document.getElementById('ai-chat');
  box.insertAdjacentHTML('beforeend','<div class="kbubble k-me fade" style="align-self:flex-end">'+text+'</div>');
  i.value=''; box.scrollTop=box.scrollHeight;
  setTimeout(()=>{
    box.insertAdjacentHTML('beforeend','<div class="kbubble k-other fade" style="align-self:flex-start">일정으로 정리했어요. 저장할까요?<br><button class="btn-main" style="padding:10px;font-size:13px;margin-top:8px" onclick="aiQuickSave(\''+text.replace(/'/g,'')+'\')">확인 및 저장</button></div>');
    box.scrollTop=box.scrollHeight;
  },600);
}
function aiQuickSave(text){
  tasks.push({id:Date.now(),title:text.slice(0,40),memo:'AI 비서로 등록',date:todayStr(),time:new Date().toTimeString().slice(0,5),status:'todo',cat:categories[0].name});
  save(); closeSheets(); renderTasks(); renderCalendar(); showToast('일정을 저장했어요.');
}

/* ---------- 14. 시작 ---------- */
(function init(){
  applyTheme(); paint();
  renderProgress(); renderCatTabs(); setStatusTab('todo'); renderTasks();
  renderCalendar(); renderRooms(); renderMe();
  const ta=document.getElementById('chat-input');
  ta.addEventListener('input',()=>{ ta.style.height='auto'; ta.style.height=Math.min(ta.scrollHeight,90)+'px'; });
  setTimeout(moveIndicator,120);
  window.addEventListener('load',()=>setTimeout(moveIndicator,150));
})();
;

/* ---- source script 3 ---- */
function goOverview(i){const el=document.getElementById('overview-track');el.scrollTo({left:i*(el.children[0].offsetWidth+12),behavior:'smooth'});}
function slideOverview(d){const el=document.getElementById('overview-track');const n=Math.round(el.scrollLeft/(el.children[0].offsetWidth+12));goOverview(Math.max(0,Math.min(3,n+d)));}
document.getElementById('overview-track').addEventListener('scroll',function(){const n=Math.round(this.scrollLeft/(this.children[0].offsetWidth+12));document.querySelectorAll('.overview-dots button').forEach((b,i)=>{b.classList.toggle('active',i===n);b.setAttribute('aria-pressed',String(i===n));});},{passive:true});
const entry=document.getElementById('entry');
function lockApp(lock){document.querySelectorAll('#app > :not(#entry):not(#toasts)').forEach(el=>{el.inert=lock;});}
function showWelcome(){entry.hidden=false;lockApp(true);document.getElementById('intro').hidden=true;document.getElementById('welcome').hidden=false;document.getElementById('login-form').hidden=true;document.getElementById('login-password').value='';document.querySelector('#welcome .btn-main').focus();}
function showLogin(){document.getElementById('welcome').hidden=true;document.getElementById('login-form').hidden=false;document.getElementById('login-email').focus();}
function enterGuest(){entry.hidden=true;lockApp(false);document.getElementById('login-password').value='';switchNav(0);document.getElementById('logo-btn').focus();}
lockApp(true);
const now=new Date();document.getElementById('today-label').textContent=now.toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'long'});document.getElementById('welcome-day').textContent=now.getDate();document.getElementById('welcome-month').textContent=now.toLocaleDateString('en-US',{month:'long'}).toUpperCase();document.getElementById('clock').textContent=now.toTimeString().slice(0,8);
setTimeout(showWelcome,matchMedia('(prefers-reduced-motion: reduce)').matches?100:2600);
;

/* ---- source script 4 ---- */
// UI refinement, local task editing and calendar presentation.
const $=id=>document.getElementById(id);
let editingTaskId=null, taskMenuId=null, deletedTask=null, tutorialIndex=0;
const mutedPalette=['#e8eddb','#ece5f4','#f8e5d7','#dfeaf5','#f4e1e8'];
const taskTint=t=>mutedPalette[Math.max(0,categories.findIndex(c=>c.name===t.cat))%mutedPalette.length];
const sortedTasks=list=>[...list].sort((a,b)=>(a.date+(a.time||'')).localeCompare(b.date+(b.time||'')));

// The schedule is the first content block. Information and sponsorship remain swipable.
const home=$('view-home'), schedule=home.querySelector(':scope > .p-4');
schedule.classList.add('today-section');home.prepend(schedule);
schedule.querySelector('h2').outerHTML='<div><span class="section-kicker" id="home-date"></span><h1 class="home-title">시간 · 요일 · 일정</h1></div>';
const heading=schedule.firstElementChild;heading.classList.add('schedule-heading');
const coord=heading.querySelector('button');coord.classList.add('coord-button');
coord.innerHTML='<span class="coord-button-icon">◎</span><span><b>공용 시간 보기</b><small>7일의 여유를 한눈에</small></span><span class="coord-button-arrow">↗</span>';
heading.insertAdjacentHTML('beforeend','<button class="round-add" aria-label="오늘 일정 추가" onclick="openAddTask(todayStr())">+</button>');
const homeRoundAdd=heading.querySelector('.round-add'); if(homeRoundAdd) homeRoundAdd.remove();
schedule.insertAdjacentHTML('beforeend','<button class="calendar-link" onclick="switchNav(1)">다른 날짜의 일정은 캘린더에서 <span>↗</span></button>');
schedule.insertAdjacentHTML('beforeend','<button id="coord-snapshot" class="coord-snapshot" onclick="openCoordination()" aria-label="공동 일정 관리표 열기"></button>');
schedule.insertAdjacentHTML('afterend','<aside class="home-ad-rail" aria-label="일정 사이 광고"><div class="home-ad-track no-sb"><article><span>AD</span><b>계획 사이, 가벼운 발견</b><small>당신의 하루와 어울리는 제안</small></article><article><span>AD</span><b>함께하는 시간을 위한 혜택</b><small>모임에 어울리는 새로운 발견</small></article></div></aside>');
$('fab').setAttribute('aria-label','새 일정 추가');
$('view-cal').insertAdjacentHTML('afterbegin','<div class="calendar-heading"><div><span class="section-kicker">ALL YOUR PLANS · CALENDAR</span></div><button class="round-add" aria-label="캘린더 일정 추가" onclick="openAddTask(selectedDate || dstr(viewY,viewM,new Date().getFullYear()===viewY && new Date().getMonth()===viewM?new Date().getDate():1))">+</button></div>');
$('view-cal').insertAdjacentHTML('beforeend','<aside class="ad-slot calendar-ad" aria-label="캘린더 광고 영역"><span class="ad-label">AD · 광고</span><div class="ad-orbit">o<span>•</span></div><h3>좋은 계획 곁에, 좋은 발견.</h3><p>브랜드를 위한 공간 · 광고 연결 준비 중</p></aside><section class="month-agenda"><div class="agenda-heading"><h2>이번 달 모든 일정</h2><span id="month-count"></span></div><div id="month-list"></div></section>');
const strip='<aside class="ad-strip promo-carousel" aria-label="좌우로 넘기는 띠 배너 광고"><div class="promo-track no-sb"><article><span class="ad-strip-icon">o.</span><div><strong>일상에 어울리는 새로운 발견</strong><small>스폰서 배너 · 광고 연결 준비 중</small></div><span class="ad-label">AD</span></article><article><span class="ad-strip-icon">o:</span><div><strong>함께하는 날을 위한 제안</strong><small>모임 혜택 · 광고 연결 준비 중</small></div><span class="ad-label">AD</span></article><article><span class="ad-strip-icon">o°</span><div><strong>오늘의 작은 리워드</strong><small>라이프스타일 · 광고 연결 준비 중</small></div><span class="ad-label">AD</span></article></div></aside>';
home.insertAdjacentHTML('beforeend',strip);$('view-cal').insertAdjacentHTML('beforeend',strip);
const track=$('overview-track');
const adCard=(title,copy,tone)=>`<article class="overview-card sponsor-card ${tone}"><span class="ad-label">AD · 광고 영역</span><div class="sponsor-shape"><i></i><i></i><i></i></div><h2>${title}</h2><p>${copy}</p><small>광고 연결 준비 중</small></article>`;
track.children[1].insertAdjacentHTML('afterend',adCard('계획 사이, 작은 쉼.','당신의 일상과 어울리는 브랜드를 위한 자리.','sage'));
track.children[4].insertAdjacentHTML('afterend',adCard('함께하는 날을 더 특별하게.','취향을 나누는 순간을 위한 새로운 발견.','peach'));
const slides=['오늘','날씨','광고 1','AI 안내','월·연 현황','광고 2'];
document.querySelector('.overview-dots').innerHTML=slides.map((name,i)=>`<button aria-label="${name}" onclick="goOverview(${i})" aria-pressed="${i===0}" class="${i===0?'active':''}"></button>`).join('');
track.setAttribute('aria-label','오늘 정보와 광고 카드를 좌우로 넘겨보세요');
track.querySelector('.hero-bottom span:last-child').textContent='TODAY';
slideOverview=function(d){const el=$('overview-track');const n=Math.round(el.scrollLeft/(el.children[0].offsetWidth+12));goOverview(Math.max(0,Math.min(el.children.length-1,n+d)));};
track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();slideOverview(e.key==='ArrowRight'?1:-1);}});
const themeOptions=document.querySelector('.theme-options');['system','light','dark'].forEach(t=>themeOptions.append(themeOptions.querySelector(`[data-theme-choice="${t}"]`)));

// Small tutorial illustrations are real interface components, so their text stays crisp.
const tutorialSlides=[
 {k:'01 / 03 · 일정 관리',title:'오늘 할 일에, 가볍게 집중.',copy:'시간순으로 정리하고, 끝낸 일정은 체크하세요.',art:'<div class="tutorial-mini"><div class="mini-heading">오늘의 일정 <span>＋</span></div><div class="mini-task"><b>09:30</b><span>하루 계획 정리<small>나를 위한 10분</small></span><i>✓</i></div><div class="mini-task"><b>14:00</b><span>디자인 미팅<small>차근차근, 하나씩</small></span><i>○</i></div><div class="mini-week">월　 화　 수　 <b>목</b>　 금　 토　 일</div></div>'},
 {k:'02 / 03 · 모임 관리',title:'함께할 사람들, 한곳에.',copy:'모임별 대화와 약속을 편하게 관리하세요.',art:'<div class="tutorial-mini"><div class="mini-heading">우리의 모임 <span>＋</span></div><div class="mini-group"><div class="mini-avatars"><i>J</i><i>S</i><i>나</i></div><b>토요일 러닝 클럽</b><small>함께 달리면 더 즐거우니까</small></div><div class="mini-chat">이번 주도 같은 시간에 만나요! <span>♡</span></div></div>'},
 {k:'03 / 03 · 모임 일정 공유',title:'한 번의 공유로, 같은 약속.',copy:'모임에서 공유한 일정을 내 캘린더로 이어보세요.',art:'<div class="tutorial-mini"><div class="mini-heading">공유된 약속 <span>↗</span></div><div class="mini-shared"><span>토요일 · 09:00</span><b>한강 모닝 러닝</b><small>러닝 클럽 · 함께하는 일정</small></div><div class="mini-save">✓ 내 캘린더에 담기</div></div>'}
];
document.querySelector('.welcome-art').outerHTML='<div class="tutorial-track no-sb" id="tutorial-track" aria-label="오르도 핵심 기능 소개" tabindex="0">'+tutorialSlides.map(t=>`<article class="tutorial-slide">${t.art}<span class="section-kicker">${t.k}</span><h2>${t.title}</h2><p>${t.copy}</p></article>`).join('')+'</div><div class="tutorial-controls"><button aria-label="이전 소개" onclick="moveTutorial(-1)">←</button><div id="tutorial-dots">'+tutorialSlides.map((t,i)=>`<button aria-label="${['일정 관리 소개','모임 관리 소개','일정 공유 소개'][i]}" onclick="goTutorial(${i})" class="${i===0?'active':''}" aria-pressed="${i===0}"></button>`).join('')+'</div><button aria-label="다음 소개" onclick="moveTutorial(1)">→</button></div>';
document.querySelector('#welcome > .eyebrow').remove();document.querySelector('#welcome > h1').remove();document.querySelector('#welcome > p').remove();
function goTutorial(i){tutorialIndex=Math.max(0,Math.min(2,i));$('tutorial-track').scrollTo({left:tutorialIndex*$('tutorial-track').clientWidth,behavior:'smooth'});}
function moveTutorial(d){goTutorial(tutorialIndex+d);}
$('tutorial-track').addEventListener('scroll',function(){tutorialIndex=Math.round(this.scrollLeft/this.clientWidth);document.querySelectorAll('#tutorial-dots button').forEach((b,i)=>{b.classList.toggle('active',i===tutorialIndex);b.setAttribute('aria-pressed',String(i===tutorialIndex));});},{passive:true});
$('tutorial-track').addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();moveTutorial(e.key==='ArrowRight'?1:-1);}});

// Time summary: readable numbered cells instead of 31 compressed blocks.
renderProgress=function(){
 const now=new Date(), total=monthMode?new Date(now.getFullYear(),now.getMonth()+1,0).getDate():12, current=monthMode?now.getDate():now.getMonth()+1;
 $('m-toggle').textContent=monthMode?`${now.getFullYear()}년 ${now.getMonth()+1}월 ▾`:`${now.getFullYear()}년 ▾`;
 $('m-toggle').setAttribute('aria-label',monthMode?'연간 현황으로 전환':'월간 현황으로 전환');
 $('m-grid').style.gridTemplateColumns=`repeat(${monthMode?7:6},minmax(0,1fr))`;
 $('m-grid').innerHTML=Array.from({length:total},(_,i)=>`<button class="progress-cell ${i+1<current?'elapsed':''} ${i+1===current?'current':''}" aria-label="${now.getFullYear()}년 ${monthMode?now.getMonth()+1+'월 '+(i+1)+'일':(i+1)+'월'}" onclick="${monthMode?`selectDate('${dstr(now.getFullYear(),now.getMonth(),i+1)}')`:`viewY=${now.getFullYear()};viewM=${i};switchNav(1)`}">${i+1}${monthMode?'':'월'}</button>`).join('');
 $('m-pct').textContent=Math.round(current/total*100)+'%';
};
const progressCard=$('m-grid').closest('.overview-card');progressCard.classList.add('time-card');progressCard.querySelector('h2').textContent='지나온 날, 다가올 날.';progressCard.querySelector('p').textContent='월 · 연도를 눌러 보기 전환';

function taskRow(t,context){return `<article class="timeline-row" style="--task-tint:${taskTint(t)}"><div class="timeline-time"><span>${escapeHTML(t.time||'종일')}</span><small>${escapeHTML(t.date.slice(5).replace('-',' / '))}</small><i></i></div><div class="timeline-content"><div class="task-title-row"><button class="task-title ${t.status==='done'?'is-done':''}" onclick="editTask(${t.id})">${escapeHTML(t.title)}</button><button class="task-more" aria-label="${escapeHTML(t.title)} 더보기" onclick="openTaskMenu(${t.id})">⋯</button></div>${t.memo?`<p>${escapeHTML(t.memo)}</p>`:''}<div class="task-meta"><span>${escapeHTML(t.cat)}</span><select aria-label="${escapeHTML(t.title)} 상태" onchange="setStatus(${t.id},this.value)"><option value="todo" ${t.status==='todo'?'selected':''}>시작 전</option><option value="doing" ${t.status==='doing'?'selected':''}>진행 중</option><option value="done" ${t.status==='done'?'selected':''}>완료</option></select></div></div></article>`;}
renderTasks=function(){
 $('home-date').textContent=new Date().toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'long'});
 const list=sortedTasks(tasks.filter(t=>t.date===todayStr() && t.status===statusTab && (catFilter==='전체'||t.cat===catFilter)));
 $('task-list').innerHTML=list.length?list.map(t=>taskRow(t,'home')).join(''):'<div class="empty-timeline">이 상태의 오늘 일정이 없어요.<small>다른 날짜의 일정은 캘린더에서 확인하세요.</small><button class="secondary" onclick="openAddTask(todayStr())">＋ 오늘 일정 추가</button></div>';
};
function refreshSchedules(){renderTasks();renderCalendar();renderProgress();renderMe();if(selectedDate)renderDayDetail(selectedDate);}
setStatus=function(id,value){const t=tasks.find(t=>t.id===id);if(t){t.status=value;save();refreshSchedules();}};
const originalAddTask=openAddTask;
openAddTask=function(date){editingTaskId=null;originalAddTask(date||todayStr());$('sheet-task').querySelector('h3').textContent='새 일정 추가';$('sheet-task').querySelector('[onclick="saveTask()"]').textContent='저장하기';setTimeout(()=>$('t-title').focus({preventScroll:true}),100);};
function editTask(id){const t=tasks.find(t=>t.id===id);if(!t)return;closeSheets();openAddTask(t.date);editingTaskId=id;$('t-title').value=t.title;$('t-memo').value=t.memo||'';$('t-time').value=t.time||'';pickedCat=t.cat;renderCatSelect();$('sheet-task').querySelector('h3').textContent='일정 수정';$('sheet-task').querySelector('[onclick="saveTask()"]').textContent='수정 저장';}
saveTask=function(){const title=$('t-title').value.trim();if(!title)return showToast('일정 제목을 입력해주세요.');const data={title,memo:$('t-memo').value.trim(),date:$('t-date').value||todayStr(),time:$('t-time').value||'00:00',cat:pickedCat};if(editingTaskId!==null){const t=tasks.find(t=>t.id===editingTaskId);if(t)Object.assign(t,data);}else tasks.push({id:Date.now(),status:'todo',...data});save();closeSheets();refreshSchedules();showToast(editingTaskId!==null?'일정을 수정했어요.':'일정을 저장했어요.');editingTaskId=null;};
$('app').insertAdjacentHTML('beforeend','<div id="sheet-task-menu" class="sheet" role="dialog" aria-modal="true" aria-labelledby="task-menu-title"><div class="grab"></div><div class="task-menu-inner"><div class="task-menu-heading"><h3 id="task-menu-title">일정 관리</h3><button aria-label="일정 메뉴 닫기" onclick="closeSheets()">×</button></div><button class="menu-action" onclick="editTask(taskMenuId)"><span>✎</span> 일정 수정 <span>↗</span></button><button class="menu-action danger" onclick="deleteTask(taskMenuId)"><span>−</span> 일정 삭제 <span>↗</span></button><small>삭제한 일정은 알림에서 되돌릴 수 있어요.</small></div></div>');
function openTaskMenu(id){taskMenuId=id;const t=tasks.find(t=>t.id===id);if(!t)return;$('task-menu-title').textContent=t.title;openSheet('sheet-task-menu');$('sheet-task-menu').querySelector('.menu-action').focus({preventScroll:true});}
function deleteTask(id){const index=tasks.findIndex(t=>t.id===id);if(index<0)return;const removed={task:tasks[index],index};tasks.splice(index,1);save();closeSheets();refreshSchedules();const toast=document.createElement('div');toast.className='toast undo-toast';toast.innerHTML='<span>일정을 삭제했어요.</span><button>되돌리기</button>';toast.querySelector('button').onclick=()=>{if(!tasks.some(t=>t.id===removed.task.id)){tasks.splice(removed.index,0,removed.task);save();refreshSchedules();showToast('일정을 복원했어요.');}toast.remove();};$('toasts').append(toast);setTimeout(()=>toast.remove(),9000);}
function undoDelete(){if(!deletedTask)return;tasks.splice(deletedTask.index,0,deletedTask.task);deletedTask=null;save();refreshSchedules();showToast('일정을 복원했어요.');}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSheets();});

// Calendar: each day previews its appointments. All appointments remain in the monthly agenda.
renderCalendar=function(){
 $('cal-title').textContent=`${viewY}년 ${viewM+1}월`;
 const count=new Date(viewY,viewM+1,0).getDate(),first=new Date(viewY,viewM,1).getDay();let html='';
 for(let i=0;i<Math.ceil((first+count)/7)*7;i++){
  const day=i-first+1;if(day<1||day>count){html+='<div class="calendar-blank"></div>';continue;}
  const ds=dstr(viewY,viewM,day), list=sortedTasks(tasks.filter(t=>t.date===ds));
  html+=`<button class="cal-cell ${ds===todayStr()?'today':''} ${ds===selectedDate?'selected':''}" aria-label="${viewM+1}월 ${day}일, 일정 ${list.length}개" onclick="selectDate('${ds}')"><span class="day-number">${day}</span><span class="cal-events">${list.slice(0,2).map(t=>`<span class="cal-event" style="--event-color:${taskTint(t)}">${escapeHTML(t.title)}</span>`).join('')}${list.length>2?`<small>+${list.length-2}개</small>`:''}</span></button>`;
 }
 $('cal-grid').innerHTML=html;
 const month=sortedTasks(tasks.filter(t=>t.date.startsWith(`${viewY}-${pad(viewM+1)}-`)));
 $('month-count').textContent=month.length+'개';
 $('month-list').innerHTML=month.length?month.map(t=>taskRow(t,'month')).join(''):'<p class="month-empty">이번 달은 아직 일정이 없어요.<br>위의 + 버튼으로 첫 계획을 남겨보세요.</p>';
};
function renderDayDetail(ds){const day=sortedTasks(tasks.filter(t=>t.date===ds));$('detail-title').textContent=ds.replace(/-/g,'. ');$('detail-list').innerHTML=day.length?day.map(t=>taskRow(t,'detail')).join(''):'<div class="month-empty">이 날에는 등록된 일정이 없어요.</div>';}
selectDate=function(ds){viewY=Number(ds.slice(0,4));viewM=Number(ds.slice(5,7))-1;if(navIndex!==1)switchNav(1);selectedDate=ds;renderCalendar();$('cal-detail').classList.remove('hidden');$('cal-detail').classList.add('flex');renderDayDetail(ds);$('cal-detail').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});};
openCoordination=function(){const now=new Date(),week=Array.from({length:7},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i),ds=dstr(d.getFullYear(),d.getMonth(),d.getDate());return {d,ds,list:tasks.filter(t=>t.date===ds&&t.status!=='done')};});const best=[...week].sort((a,b)=>a.list.length-b.list.length)[0];$('coord-summary').innerHTML=`<div class="week-summary"><span>오늘부터 7일</span><strong>${week[0].d.getMonth()+1}.${week[0].d.getDate()} — ${week[6].d.getMonth()+1}.${week[6].d.getDate()}</strong><p>등록된 내 일정 기준, ${best.d.getMonth()+1}월 ${best.d.getDate()}일이 가장 여유로워요.</p><small>초록 여유 · 주황 보통 · 빨강 바쁨</small></div>`;$('coord-list').innerHTML=week.map((x,i)=>{const load=x.list.length===0?'free':x.list.length>2?'busy':'mid';const label=load==='free'?'여유':load==='busy'?'바쁨':'보통';return `<button class="week-row" onclick="closeSheets();selectDate('${x.ds}')"><span class="week-day">${i===0?'오늘':x.d.toLocaleDateString('ko-KR',{weekday:'short'})}<b>${x.d.getDate()}</b></span><span class="week-copy">${x.list.length?escapeHTML(x.list.map(t=>t.title).join(' · ')):'아직 잡힌 일정이 없어요'}<small>예정 ${x.list.length}개</small></span><span class="week-level ${load}" data-state="${label}"><i aria-hidden="true"></i>${label}</span></button>`;}).join('');openSheet('sheet-coord');};
$('sheet-coord').querySelector('h3').textContent='이번 주 공동 일정';$('sheet-coord').querySelector('h3 + p').textContent='오늘부터 일주일, 한눈에 살펴보세요';
const legend=$('sheet-coord').querySelector('.flex.gap-3.text-xs');if(legend)legend.remove();
$('sheet-coord').querySelector('button[onclick="closeSheets()"]').setAttribute('aria-label','공동 일정 닫기');
coord.setAttribute('title','공동 일정 조율');
const baseSwitchNav=switchNav;
switchNav=function(i){baseSwitchNav(i);$('app').scrollTop=0;};
applyTheme();refreshSchedules();lockApp(!entry.hidden);
// Refresh date-sensitive content when returning after midnight.
let renderedDay=todayStr();setInterval(()=>{if(todayStr()!==renderedDay){renderedDay=todayStr();refreshSchedules();}},30000);
;

/* ---- source script 5 ---- */
/* v3 — cinematic motion, automatic schedule state, multi-category colors, and calendar modes. */
const v3$=id=>document.getElementById(id);
let autoAdvance=LS.get('autoAdvance',true);
let selectedCats=[];
let calendarMode='month';
let calendarAnchor=new Date();
let visibleTodayTasks=[];

function taskCategories(task){
  const raw=Array.isArray(task.cats)&&task.cats.length?task.cats:[task.cat||categories[0]?.name||'업무'];
  return [...new Set(raw)].filter(name=>categories.some(c=>c.name===name));
}
function taskColorDots(task,large=false){
  return '<span class="task-color-dots" aria-label="일정 색상">'+taskCategories(task).map(name=>`<i title="${escapeHTML(name)}" style="background:${catColor(name)}"></i>`).join('')+'</span>';
}
function statusSlider(task){
  const states=['todo','doing','done'],labels=['시작 전','진행 중','완료'],index=Math.max(0,states.indexOf(task.status));
  return `<div class="status-slider" style="--status-index:${index}" data-status="${task.status}" onpointerdown="startStatusDrag(event,${task.id})" aria-label="${escapeHTML(task.title)} 상태: ${labels[index]}"><i class="status-thumb"></i>${states.map((state,i)=>`<button type="button" class="${state===task.status?'active':''}" onclick="setStatusFromSlider(event,${task.id},'${state}')">${labels[i]}</button>`).join('')}</div>`;
}
let statusDrag=null;
function setStatusFromSlider(event,id,status){event.stopPropagation();if(statusDrag?.moved)return;setStatus(id,status);}
function startStatusDrag(event,id){
  if(event.pointerType==='mouse'&&event.button!==0)return;
  const element=event.currentTarget,startX=event.clientX;
  let active=false,moved=false,index=Number(getComputedStyle(element).getPropertyValue('--status-index'))||0;
  const timer=setTimeout(()=>{active=true;element.classList.add('dragging');if(navigator.vibrate)navigator.vibrate(12);},230);
  const move=e=>{if(!active)return;moved=true;const rect=element.getBoundingClientRect();index=Math.max(0,Math.min(2,Math.floor((e.clientX-rect.left)/rect.width*3)));element.style.setProperty('--status-index',index);element.querySelectorAll('button').forEach((button,i)=>button.classList.toggle('active',i===index));};
  const end=()=>{clearTimeout(timer);element.classList.remove('dragging');element.removeEventListener('pointermove',move);element.removeEventListener('pointerup',end);element.removeEventListener('pointercancel',end);statusDrag={moved};setTimeout(()=>statusDrag=null,80);if(active)setStatus(id,['todo','doing','done'][index]);};
  element.setPointerCapture?.(event.pointerId);element.addEventListener('pointermove',move);element.addEventListener('pointerup',end);element.addEventListener('pointercancel',end);
}
function toScheduleDate(task,time){ return new Date(`${task.date}T${time||'00:00'}:00`); }
function applyAutoStatuses(){
  if(!autoAdvance) return false;
  const now=new Date(); let changed=false;
  tasks.forEach(task=>{
    if(!task.date || task.status==='done') return;
    const start=toScheduleDate(task,task.time);
    const end=task.endTime?toScheduleDate(task,task.endTime):null;
    if(end && end<=start) return;
    if(end && now>=end){task.status='done';changed=true;return;}
    if(now>=start && task.status==='todo'){task.status='doing';changed=true;}
  });
  if(changed) save();
  return changed;
}
function syncAutoAdvanceButton(){
  const button=v3$('auto-advance-toggle'); if(!button) return;
  button.classList.toggle('on',autoAdvance);
  button.setAttribute('aria-pressed',String(autoAdvance));
  button.querySelector('strong').textContent=autoAdvance?'켜짐':'꺼짐';
  button.querySelector('small').textContent=autoAdvance?'시작 시간에 진행 중 · 종료 시간에 완료':'일정 상태는 직접 변경';
}
function setAutoAdvance(){autoAdvance=!autoAdvance;LS.set('autoAdvance',autoAdvance);if(autoAdvance)applyAutoStatuses();syncAutoAdvanceButton();refreshSchedules();showToast(autoAdvance?'일정 상태 자동 변경을 켰어요.':'일정 상태 자동 변경을 껐어요.');}

/* Keep the existing form structure but give date/start/end their own stable fields. */
const timeFields=v3$('t-time').closest('.grid');
timeFields.classList.add('task-time-fields');
timeFields.children[0].classList.add('date-time-field');
timeFields.children[1].classList.add('start-time-field');
timeFields.insertAdjacentHTML('beforeend','<div class="end-time-field"><label class="c3 text-xs font-black mb-1.5 block" for="t-end-time">종료 시간 <span>선택</span></label><input type="time" id="t-end-time" class="inp" aria-describedby="end-time-help"></div><p id="end-time-help" class="auto-time-help">종료 시간을 비워두면 시작 시간에만 자동으로 진행 중으로 바뀌어요.</p>');
v3$('view-me').querySelector('.settings-card').insertAdjacentHTML('afterend','<section class="card automation-card"><div class="automation-copy"><span class="setting-icon">◷</span><div><h3>일정 상태 자동 변경</h3><p>시작·종료 시간에 따라 상태를 갱신해요.</p></div></div><button id="auto-advance-toggle" class="setting-switch" onclick="setAutoAdvance()" role="switch" aria-pressed="true"><span></span><strong></strong><small></small></button></section>');
syncAutoAdvanceButton();

/* Information cards are gesture-led: no redundant arrow controls. */
const overviewArrows=document.querySelector('.overview-heading > div');
if(overviewArrows) overviewArrows.remove();
document.querySelector('.overview-heading > span').textContent='SWIPE TO EXPLORE';
document.querySelectorAll('.tutorial-controls>button').forEach(button=>button.remove());
document.querySelector('.tutorial-controls').insertAdjacentHTML('beforeend','<span class="tutorial-swipe-hint">좌우로 넘겨보세요</span>');
const statusTabs=v3$('status-tabs');
if(statusTabs) statusTabs.remove();

/* Large schedules stay compact on home; the rest opens as a focused bottom sheet. */
v3$('app').insertAdjacentHTML('beforeend','<div id="sheet-today-tasks" class="sheet" role="dialog" aria-modal="true" aria-labelledby="today-tasks-title"><div class="grab"></div><div class="today-tasks-inner"><div class="task-menu-heading"><div><span class="section-kicker">TODAY\'S SCHEDULE</span><h3 id="today-tasks-title">오늘 일정</h3></div><button aria-label="오늘 일정 닫기" onclick="closeSheets()">×</button></div><div id="today-tasks-list"></div><button class="schedule-add-wide" onclick="closeSheets();openAddTask(todayStr())">＋ 일정 추가</button></div></div>');
function openTodaySchedule(){
  const title=v3$('today-tasks-title');title.textContent=`오늘 일정 ${visibleTodayTasks.length}개`;
  v3$('today-tasks-list').innerHTML=visibleTodayTasks.map(task=>taskRowV3(task,'today-sheet')).join('');
  openSheet('sheet-today-tasks');
}

/* Multi-select category chips keep all selected colors on the home schedule and calendar. */
renderCatSelect=function(){
  if(!selectedCats.length) selectedCats=[categories[0]?.name||'업무'];
  v3$('cat-select').innerHTML=categories.map(c=>{
    const on=selectedCats.includes(c.name);
    return `<button type="button" class="category-pick ${on?'chosen':''}" aria-pressed="${on}" style="--cat-color:${c.color}" onclick="toggleTaskCategory('${c.name.replace(/'/g,'')}')"><i></i>${escapeHTML(c.name)}</button>`;
  }).join('');
};
function toggleTaskCategory(name){
  if(selectedCats.includes(name)&&selectedCats.length>1) selectedCats=selectedCats.filter(x=>x!==name);
  else if(!selectedCats.includes(name)) selectedCats=[...selectedCats,name];
  renderCatSelect();
}
const v2OpenAddTask=openAddTask;
openAddTask=function(date){
  editingTaskId=null; selectedCats=[categories[0]?.name||'업무']; v2OpenAddTask(date||todayStr());
  v3$('t-end-time').value=''; renderCatSelect();
  v3$('sheet-task').querySelector('h3').textContent='새 일정 추가';
  v3$('sheet-task').querySelector('[onclick="saveTask()"]').textContent='저장하기';
};
editTask=function(id){
  const task=tasks.find(x=>x.id===id); if(!task)return;
  editingTaskId=id; selectedCats=taskCategories(task); v2OpenAddTask(task.date);
  v3$('t-title').value=task.title; v3$('t-memo').value=task.memo||''; v3$('t-time').value=task.time||''; v3$('t-end-time').value=task.endTime||'';
  renderCatSelect(); v3$('sheet-task').querySelector('h3').textContent='일정 수정';
  v3$('sheet-task').querySelector('[onclick="saveTask()"]').textContent='수정 저장';
};
saveTask=function(){
  const title=v3$('t-title').value.trim(); if(!title)return showToast('일정 제목을 입력해주세요.');
  const start=v3$('t-time').value||'00:00', end=v3$('t-end-time').value;
  if(end && end<=start)return showToast('종료 시간은 시작 시간 이후로 선택해주세요.');
  const data={title,memo:v3$('t-memo').value.trim(),date:v3$('t-date').value||todayStr(),time:start,endTime:end,cat:selectedCats[0],cats:[...selectedCats]};
  if(editingTaskId!==null){const task=tasks.find(x=>x.id===editingTaskId);if(task)Object.assign(task,data);}else tasks.push({id:Date.now(),status:'todo',...data});
  applyAutoStatuses(); save(); closeSheets(); refreshSchedules(); showToast(editingTaskId!==null?'일정을 수정했어요.':'일정을 저장했어요.'); editingTaskId=null;
};

function taskRowV3(task,context='home'){
  const end=task.endTime?`<span class="task-end">— ${escapeHTML(task.endTime)}</span>`:'';
  return `<article class="timeline-row v3-task ${task.status==='doing'?'is-active':''} ${task.status==='done'?'is-done-row':''}">
    <div class="timeline-time"><span>${escapeHTML(task.time||'종일')}</span>${end}<small>${new Date(`${task.date}T12:00:00`).toLocaleDateString('ko-KR',{weekday:'short'})} · ${escapeHTML(task.date.slice(5).replace('-',' / '))}</small><span class="task-kind">${taskColorDots(task)}<b>${taskCategories(task).map(escapeHTML).join(' · ')}</b></span></div>
    <div class="timeline-content"><div class="task-title-row"><button class="task-title ${task.status==='done'?'is-done':''}" onclick="editTask(${task.id})">${escapeHTML(task.title)}</button><button class="task-more" aria-label="${escapeHTML(task.title)} 더보기" onclick="openTaskMenu(${task.id})">⋯</button></div>${task.memo?`<p>${escapeHTML(task.memo)}</p>`:''}<div class="task-meta">${statusSlider(task)}</div></div></article>`;
}
taskRow=taskRowV3;
renderCatTabs=function(){
  const holder=v3$('cat-tabs');
  const chip=(name,color)=>{const on=catFilter===name;return `<button class="color-filter ${on?'active':''}" style="--filter-color:${color||'var(--accent)'}" onclick="setFilter('${name.replace(/'/g,'')}')">${color?`<i></i>`:''}${escapeHTML(name)}</button>`;};
  holder.innerHTML=chip('전체',null)+categories.map(category=>chip(category.name,category.color)).join('');
};
renderTasks=function(){
  applyAutoStatuses();
  v3$('home-date').textContent=new Date().toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'long'});
  const list=sortedTasks(tasks.filter(t=>t.date===todayStr()&&(catFilter==='전체'||taskCategories(t).includes(catFilter))));
  visibleTodayTasks=list;
  const preview=list.slice(0,3);
  const overflow=list.length>3?`<button class="schedule-overflow" onclick="openTodaySchedule()">오늘 일정 ${list.length}개 모두 보기 <span>↗</span></button>`:'';
  const add='<button class="schedule-add-wide" onclick="openAddTask(todayStr())">＋ 일정 추가</button>';
  v3$('task-list').innerHTML=list.length?preview.map(task=>taskRowV3(task)).join('')+overflow+add:'<div class="empty-timeline">이 상태의 오늘 일정이 없어요.<small>다른 날짜의 일정은 캘린더에서 확인하세요.</small></div>'+add;
  renderCoordSnapshot();
};
function renderCoordSnapshot(){
  const holder=v3$('coord-snapshot');if(!holder)return;
  const now=new Date(),days=Array.from({length:7},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i),ds=dstr(d.getFullYear(),d.getMonth(),d.getDate()),count=tasks.filter(t=>t.date===ds&&t.status!=='done').length;return {d,count,load:count===0?'free':count>2?'busy':'mid'};});
  const free=days.filter(day=>day.load==='free').length;
  holder.innerHTML=`<span class="coord-snapshot-copy"><small>공동 일정 관리표</small><b>${free?`${free}일이 여유로워요`:'이번 주는 일정이 촘촘해요'}</b></span><span class="coord-snapshot-days">${days.map(day=>`<i class="${day.load}" title="${day.d.getMonth()+1}월 ${day.d.getDate()}일"></i>`).join('')}</span><span class="coord-snapshot-arrow">↗</span>`;
}
setStatus=function(id,value){const task=tasks.find(x=>x.id===id);if(task){task.status=value;save();refreshSchedules();}};

/* Calendar: retain the monthly form, and add weekly/day views with matching schedule detail. */
v3$('view-cal').querySelector('.calendar-heading').insertAdjacentHTML('afterend','<div class="calendar-view-switch" role="group" aria-label="캘린더 보기"><button data-calendar-mode="month" onclick="setCalendarMode(\'month\')">월</button><button data-calendar-mode="week" onclick="setCalendarMode(\'week\')">주</button><button data-calendar-mode="day" onclick="setCalendarMode(\'day\')">일</button></div>');
function startOfWeek(date){const d=new Date(date);d.setHours(0,0,0,0);d.setDate(d.getDate()-d.getDay());return d;}
function sameDay(a,b){return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();}
function dateLabel(date){return `${date.getMonth()+1}월 ${date.getDate()}일`}
function setCalendarMode(mode){calendarMode=mode;const anchor=selectedDate?new Date(`${selectedDate}T12:00:00`):new Date();calendarAnchor=anchor;v3$('cal-detail').classList.add('hidden');v3$('cal-detail').classList.remove('flex');renderCalendar();}
function renderCalendarTabs(){document.querySelectorAll('[data-calendar-mode]').forEach(button=>{const on=button.dataset.calendarMode===calendarMode;button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on));});}
changeMonth=function(delta){
  if(calendarMode==='month'){viewM+=delta;if(viewM>11){viewM=0;viewY++;}if(viewM<0){viewM=11;viewY--;};calendarAnchor=new Date(viewY,viewM,1);}
  else {calendarAnchor=new Date(calendarAnchor);calendarAnchor.setDate(calendarAnchor.getDate()+delta*(calendarMode==='week'?7:1));viewY=calendarAnchor.getFullYear();viewM=calendarAnchor.getMonth();}
  selectedDate='';renderCalendar();
};
function eventPill(task){return `<button class="calendar-event-pill" style="--event-color:${catColor(taskCategories(task)[0])}" onclick="selectDate('${task.date}')"><b>${escapeHTML(task.time||'종일')}${task.endTime?'–'+escapeHTML(task.endTime):''}</b><span>${escapeHTML(task.title)}</span>${taskColorDots(task)}</button>`;}
function renderMonthView(){
  const total=new Date(viewY,viewM+1,0).getDate(),first=new Date(viewY,viewM,1).getDay();let html='';
  for(let i=0;i<Math.ceil((first+total)/7)*7;i++){const day=i-first+1;if(day<1||day>total){html+='<div class="calendar-blank"></div>';continue;}const ds=dstr(viewY,viewM,day),list=sortedTasks(tasks.filter(t=>t.date===ds));html+=`<button class="cal-cell ${ds===todayStr()?'today':''} ${ds===selectedDate?'selected':''}" aria-label="${viewM+1}월 ${day}일, 일정 ${list.length}개" onclick="selectDate('${ds}')"><span class="day-number">${day}</span><span class="cal-events">${list.slice(0,2).map(t=>`<span class="cal-event" style="--event-color:${catColor(taskCategories(t)[0])}">${taskColorDots(t)}${escapeHTML(t.title)}</span>`).join('')}${list.length>2?`<small>+${list.length-2}개</small>`:''}</span></button>`;}
  v3$('cal-grid').className='month-grid';v3$('cal-grid').innerHTML=html;
  const list=sortedTasks(tasks.filter(t=>t.date.startsWith(`${viewY}-${pad(viewM+1)}-`)));v3$('month-count').textContent=list.length+'개';v3$('month-list').innerHTML=list.length?list.map(t=>taskRowV3(t,'month')).join(''):'<p class="month-empty">이번 달은 아직 일정이 없어요.<br>위의 + 버튼으로 첫 계획을 남겨보세요.</p>';
}
function renderWeekView(){
  const start=startOfWeek(calendarAnchor), days=Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(start.getDate()+i);return d;}), W=['일','월','화','수','목','금','토'];
  v3$('cal-grid').className='week-grid';v3$('cal-grid').innerHTML=days.map((date,i)=>{const ds=dstr(date.getFullYear(),date.getMonth(),date.getDate()),list=sortedTasks(tasks.filter(t=>t.date===ds)),load=list.length===0?'free':list.length>2?'busy':'mid',label=load==='free'?'여유':load==='busy'?'바쁨':'보통';return `<button class="week-day-card ${ds===todayStr()?'today':''} ${sameDay(date,calendarAnchor)?'selected':''}" onclick="openCalendarDay('${ds}')"><span>${W[i]}</span><b>${date.getDate()}</b><i class="load-dot ${load}" title="${label}"></i><em>${list.length}</em></button>`;}).join('');
  const entries=days.flatMap(date=>{const ds=dstr(date.getFullYear(),date.getMonth(),date.getDate());return sortedTasks(tasks.filter(t=>t.date===ds)).map(task=>({date,task}));});
  v3$('month-count').textContent=entries.length+'개';v3$('month-list').innerHTML=entries.length?`<div class="week-agenda">${entries.map(({date,task})=>`<div class="week-agenda-row"><time>${date.toLocaleDateString('ko-KR',{weekday:'short'})}<b>${date.getDate()}</b></time>${eventPill(task)}</div>`).join('')}</div>`:'<p class="month-empty">이번 주에는 등록된 일정이 없어요.</p>';
}
function renderDayView(){
  const date=new Date(calendarAnchor),ds=dstr(date.getFullYear(),date.getMonth(),date.getDate()),list=sortedTasks(tasks.filter(t=>t.date===ds));
  v3$('cal-grid').className='day-grid';v3$('cal-grid').innerHTML=`<section class="day-overview"><span>${date.toLocaleDateString('ko-KR',{weekday:'long'})}</span><h2>${date.getDate()}</h2><p>${list.length?`오늘 일정 ${list.length}개`:'여유로운 하루예요.'}</p></section><div class="day-hour-list">${list.length?list.map(task=>`<div class="day-hour-row"><time>${escapeHTML(task.time||'종일')}${task.endTime?`<small>— ${escapeHTML(task.endTime)}</small>`:''}</time>${eventPill(task)}</div>`).join(''):'<button class="day-empty" onclick="openAddTask(\'${ds}\')">＋ 이 날 첫 일정 추가</button>'}</div>`;
  v3$('month-count').textContent=list.length+'개';v3$('month-list').innerHTML=`<button class="day-back-to-week" onclick="setCalendarMode('week')">← 주간 보기로 돌아가기</button>`;
}
renderCalendar=function(){
  applyAutoStatuses();renderCalendarTabs();
  const calendarAd=v3$('view-cal').querySelector('.calendar-ad');
  const monthAgenda=v3$('view-cal').querySelector('.month-agenda');
  if(calendarMode==='month') calendarAd.before(monthAgenda); else monthAgenda.before(calendarAd);
  const title=v3$('cal-title');
  if(calendarMode==='month'){title.textContent=`${viewY}년 ${viewM+1}월`;renderMonthView();}
  else if(calendarMode==='week'){const start=startOfWeek(calendarAnchor),end=new Date(start);end.setDate(start.getDate()+6);title.textContent=`${dateLabel(start)} – ${dateLabel(end)}`;renderWeekView();}
  else {title.textContent=calendarAnchor.toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'short'});renderDayView();}
};
function openCalendarDay(ds){calendarAnchor=new Date(`${ds}T12:00:00`);selectedDate=ds;calendarMode='day';renderCalendar();}
selectDate=function(ds){openCalendarDay(ds);};
const previousSwitchNav=switchNav;
switchNav=function(index){previousSwitchNav(index);document.querySelectorAll('.view-shift').forEach(el=>el.classList.remove('view-shift'));const active=VIEWS[index];requestAnimationFrame(()=>v3$(active).classList.add('view-shift'));if(index===1){calendarAnchor=selectedDate?new Date(`${selectedDate}T12:00:00`):calendarAnchor;renderCalendar();}};

applyAutoStatuses();
setInterval(()=>{if(applyAutoStatuses())refreshSchedules();},30000);
;

/* ---- source script 6 ---- */
/* Calm, compact interactions layered over the established layout. */
let homeState='all',categoryEmoji='';
const statusNames={all:'전체',todo:'시작 전',doing:'진행 중',done:'완료'};
const statusMarks={all:'☷',todo:'○',doing:'◷',done:'✓'};
function categoryLabel(name){const c=categories.find(c=>c.name===name);return `${c?.emoji?escapeHTML(c.emoji)+' ':''}${escapeHTML(name)}`;}
document.querySelector('.coord-button').outerHTML='<div class="filter-anchor"><button class="filter-orb" aria-label="일정 상태 필터" aria-expanded="false" onclick="toggleStateMenu()" onpointerdown="holdFilter()" onpointerup="clearTimeout(filterHold)" onpointercancel="clearTimeout(filterHold)">☷</button><div id="state-fan" hidden></div></div>';
let filterHold,filterLong=false;
function holdFilter(){filterLong=false;filterHold=setTimeout(()=>{filterLong=true;showStateMenu(true);},400);}
function toggleStateMenu(){if(filterLong){filterLong=false;return;}showStateMenu(document.getElementById('state-fan').hidden);}
function showStateMenu(open){const menu=$('state-fan');menu.hidden=!open;document.querySelector('.filter-orb').setAttribute('aria-expanded',String(open));menu.innerHTML=Object.entries(statusNames).map(([key,label])=>`<button onclick="chooseHomeState('${key}')" class="${homeState===key?'selected':''}"><i>${statusMarks[key]}</i>${label}</button>`).join('');}
function chooseHomeState(state){homeState=state;document.querySelector('.filter-orb').textContent=statusMarks[state];showStateMenu(false);renderTasks();}
document.addEventListener('click',e=>{if(!e.target.closest('.filter-anchor'))showStateMenu(false);});
statusSlider=function(task){return `<button class="task-state-pill" aria-label="${escapeHTML(task.title)} 상태 ${statusNames[task.status]}" onclick="openStatePopup(event,${task.id})"><i>${statusMarks[task.status]}</i><span>${statusNames[task.status]}</span></button>`;};
const oldRow=taskRowV3;
taskRowV3=function(task,context){const temp=document.createElement('div');temp.innerHTML=oldRow(task,context);const state=temp.querySelector('.task-state-pill');temp.querySelector('.task-title-row').insertBefore(state,temp.querySelector('.task-more'));temp.querySelector('.task-meta').remove();temp.querySelector('.task-kind').innerHTML=taskCategories(task).map(name=>`<span class="kind-unit"><i style="background:${catColor(name)}"></i><b>${categoryLabel(name)}</b></span>`).join('');return temp.innerHTML;};taskRow=taskRowV3;
$('app').insertAdjacentHTML('beforeend','<div id="state-popover" class="compact-popover" hidden></div>');
function openStatePopup(event,id){event.stopPropagation();const popup=$('state-popover'),task=tasks.find(t=>t.id===id);popup.innerHTML=Object.entries(statusNames).filter(([s])=>s!=='all').map(([s,label])=>`<button onclick="chooseTaskState(${id},'${s}')"><i>${statusMarks[s]}</i>${label}<span>${task.status===s?'✓':''}</span></button>`).join('');popup.hidden=false;const a=$('app').getBoundingClientRect(),b=event.currentTarget.getBoundingClientRect();popup.style.top=Math.min(b.bottom-a.top+8,a.height-160)+'px';popup.style.right='22px';}
function chooseTaskState(id,state){$('state-popover').hidden=true;const task=tasks.find(t=>t.id===id);task.status=state;task.manualStatus=true;save();refreshSchedules();}
document.addEventListener('click',e=>{if(!e.target.closest('#state-popover'))$('state-popover').hidden=true;});
const priorAuto=applyAutoStatuses;applyAutoStatuses=function(){const held=tasks.filter(t=>t.manualStatus),snapshot=held.map(t=>[t,t.status]);held.forEach(t=>t.status='done');const result=priorAuto();snapshot.forEach(([t,status])=>t.status=status);if(held.length)save();return result;};
const priorRenderTasks=renderTasks;
renderTasks=function(){priorRenderTasks();const legacyDate=$('home-date');if(legacyDate)legacyDate.hidden=true;const legacyTitle=document.querySelector('.home-title');if(legacyTitle)legacyTitle.textContent=new Date().toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'long'});const list=sortedTasks(tasks.filter(t=>t.date===todayStr()&&(homeState==='all'||t.status===homeState)&&(catFilter==='전체'||taskCategories(t).includes(catFilter))));visibleTodayTasks=list;$('task-list').innerHTML=(list.length?list.slice(0,3).map(t=>taskRowV3(t)).join(''):'<p class="month-empty">이 상태의 오늘 일정이 없어요.</p>')+(list.length>3?`<button class="schedule-overflow" onclick="openTodaySchedule()">일정 ${list.length}개 모두 보기</button>`:'')+'<button class="schedule-add-wide" onclick="openAddTask(todayStr())">＋ 일정 추가</button>';document.querySelector('.coord-snapshot-arrow')?.remove();};
$('cat-form').insertAdjacentHTML('afterbegin','<div class="emoji-picker" aria-label="분류 이모지">'+['','💼','🏃','🏠','☕','📚','🎂','✈️','💪','🎨','🎵','🍽️','❤️','🌿','🐾','💻'].map(e=>`<button type="button" onclick="pickCategoryEmoji(this,'${e}')">${e||'없음'}</button>`).join('')+'</div>');
function pickCategoryEmoji(button,emoji){categoryEmoji=emoji;document.querySelectorAll('.emoji-picker button').forEach(b=>b.classList.toggle('selected',b===button));}
const priorSaveCategory=saveCategory;saveCategory=function(){const before=categories.length;priorSaveCategory();if(categories.length>before){categories[categories.length-1].emoji=categoryEmoji;selectedCats=[categories[categories.length-1].name];save();renderCatSelect();renderCatTabs();renderTasks();}};
const priorCatSelect=renderCatSelect;renderCatSelect=function(){priorCatSelect();$('cat-select').querySelectorAll('button').forEach((b,i)=>{if(categories[i].emoji)b.append(document.createTextNode(' '+categories[i].emoji));});};
const priorCatTabs=renderCatTabs;renderCatTabs=function(){priorCatTabs();$('cat-tabs').querySelectorAll('button').forEach((b,i)=>{if(i&&categories[i-1].emoji)b.prepend(document.createTextNode(categories[i-1].emoji+' '));});};
document.querySelector('.overview-heading').hidden=true;
document.querySelectorAll('.overview-card').forEach(card=>{card.querySelector('.eyebrow')?.setAttribute('hidden','');});
/* Horizontal touch gestures lock to the banner rather than moving the page. */
document.querySelectorAll('.overview-track,.promo-track,.home-ad-track').forEach(el=>{let x,y,left,axis;el.addEventListener('touchstart',e=>{x=e.touches[0].clientX;y=e.touches[0].clientY;left=el.scrollLeft;axis=null;},{passive:true});el.addEventListener('touchmove',e=>{const dx=e.touches[0].clientX-x,dy=e.touches[0].clientY-y;if(!axis&&Math.max(Math.abs(dx),Math.abs(dy))>5)axis=Math.abs(dx)>Math.abs(dy)?'x':'y';if(axis==='x'){e.preventDefault();el.scrollLeft=left-dx;}},{passive:false});});
const priorCalendar=renderCalendar;
renderCalendar=function(){if(calendarMode==='year'){showYearOverview();return;}priorCalendar();document.querySelector('.month-agenda h2').textContent=calendarMode==='month'?'이번 달 일정':calendarMode==='week'?'이번 주 일정':'선택한 날';$('cal-grid').previousElementSibling.hidden=calendarMode!=='month';};
document.querySelector('.calendar-view-switch').insertAdjacentHTML('afterbegin','<button data-calendar-mode="year" onclick="showYearOverview()">년</button>');
function showYearOverview(){calendarMode='year';renderCalendarTabs();$('cal-title').textContent=viewY+'년';$('cal-grid').className='year-overview';$('cal-grid').previousElementSibling.hidden=true;$('cal-grid').innerHTML=Array.from({length:12},(_,m)=>`<button onclick="jumpToMonth(${m})"><b>${m+1}월</b><span>${tasks.filter(t=>t.date.startsWith(viewY+'-'+pad(m+1))).length}개 일정</span></button>`).join('');$('month-list').innerHTML='';}
function jumpToMonth(m){viewM=m;calendarMode='month';renderCalendar();}
const priorChangeMonth=changeMonth;changeMonth=function(delta){if(calendarMode==='year'){viewY+=delta;showYearOverview();}else priorChangeMonth(delta);};
const priorWeek=renderWeekView;renderWeekView=function(){priorWeek();const start=startOfWeek(calendarAnchor),days=Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return d;});$('month-list').innerHTML='<div class="week-lanes">'+days.map(date=>{const ds=dstr(date.getFullYear(),date.getMonth(),date.getDate());return '<div class="week-lane">'+sortedTasks(tasks.filter(t=>t.date===ds)).map(t=>`<button style="--lane-color:${catColor(taskCategories(t)[0])}" onclick="editTask(${t.id})" title="${escapeHTML(t.title)}"><time>${escapeHTML(t.time)}</time><span>${escapeHTML(categories.find(c=>c.name===taskCategories(t)[0])?.emoji||'○')}</span><small>${escapeHTML(t.title)}</small></button>`).join('')+'</div>';}).join('')+'</div>';};
renderCatTabs();refreshSchedules();
;

/* ---- source script 7 ---- */
/* Date-first home, priorities, calendar clock and completion identity motion. */
const priorityInfo={high:{label:'상',color:'#d96d62'},normal:{label:'중',color:'#d7a449'},low:{label:'하',color:'#87a873'}};
tasks.forEach(task=>{if(!task.priority)task.priority='normal';});save();
let pickedPriority='normal';
const headingBox=document.querySelector('.schedule-heading>div:first-child');
headingBox.innerHTML='<span id="home-date" hidden></span><div class="date-lockup"><strong id="date-number"></strong><span><b id="date-weekday"></b><small id="date-month"></small></span></div><div class="day-meter"><div><i id="day-progress-fill"></i></div><time id="day-clock">00:00:00</time></div>';
function updateDateHero(){const now=new Date(),seconds=now.getHours()*3600+now.getMinutes()*60+now.getSeconds();$('date-number').textContent=now.getDate();$('date-weekday').textContent=now.toLocaleDateString('ko-KR',{weekday:'long'});$('date-month').textContent=`${now.getFullYear()} · ${now.getMonth()+1}월`;$('day-progress-fill').style.width=(seconds/86400*100)+'%';$('day-clock').textContent=[now.getHours(),now.getMinutes(),now.getSeconds()].map(pad).join(':');}
updateDateHero();setInterval(updateDateHero,1000);
document.querySelectorAll('header>div:last-child button').forEach(button=>button.classList.add('micro-head-button'));
document.querySelector('.filter-orb').classList.add('micro-filter');
const taskSheet=$('sheet-task'),catBlock=$('cat-select').parentElement;
catBlock.insertAdjacentHTML('afterend','<div class="priority-field"><div><label>중요도</label><small>일정과 달력에 함께 표시됩니다.</small></div><div class="priority-toggle" id="priority-toggle">'+Object.entries(priorityInfo).map(([key,value])=>`<button type="button" data-priority="${key}" onclick="pickPriority('${key}')"><i style="background:${value.color}"></i>${value.label}</button>`).join('')+'</div></div>');
document.querySelector('.emoji-picker').hidden=true;
function pickPriority(priority){pickedPriority=priority;document.querySelectorAll('[data-priority]').forEach(button=>button.classList.toggle('selected',button.dataset.priority===priority));}
pickPriority('normal');
const baseOpenAdd5=openAddTask;openAddTask=function(date){closeSheets();pickedPriority='normal';baseOpenAdd5(date);pickPriority('normal');taskSheet.querySelector('.overflow-y-auto').scrollTop=0;const action=taskSheet.querySelector('[onclick="saveTask()"]');if(action)action.textContent='일정 만들기';};
const baseEdit5=editTask;editTask=function(id){closeSheets();baseEdit5(id);const task=tasks.find(t=>t.id===id);pickedPriority=task?.priority||'normal';pickPriority(pickedPriority);taskSheet.querySelector('.overflow-y-auto').scrollTop=0;taskSheet.querySelector('h3').textContent='일정 수정';const action=taskSheet.querySelector('[onclick="saveTask()"]');if(action)action.textContent='수정 완료';};
const baseSave5=saveTask;saveTask=function(){const title=$('t-title').value.trim();if(!title)return baseSave5();const wasEditing=editingTaskId;const previousIds=new Set(tasks.map(t=>t.id));baseSave5();let task=wasEditing!==null?tasks.find(t=>t.id===wasEditing):tasks.find(t=>!previousIds.has(t.id));if(task){task.priority=pickedPriority;save();refreshSchedules();celebrateOrdo(wasEditing!==null?'수정 완료':'일정 완료');}};
const rowBefore5=taskRowV3;taskRowV3=function(task,context){const wrap=document.createElement('div');wrap.innerHTML=rowBefore5(task,context);const color=catColor(taskCategories(task)[0]),article=wrap.querySelector('.timeline-row'),content=wrap.querySelector('.timeline-content');article.style.setProperty('--task-color',color);content.insertAdjacentHTML('afterbegin',`<i class="task-title-line" style="background:${color}"></i>`);const kind=wrap.querySelector('.task-kind');kind.insertAdjacentHTML('beforeend',`<span class="priority-chip ${task.priority}"><i></i>${priorityInfo[task.priority||'normal'].label}</span>`);return wrap.innerHTML;};taskRow=taskRowV3;
const oldRender5=renderTasks;renderTasks=function(){oldRender5();const list=prioritySorted(tasks.filter(t=>t.date===todayStr()&&(homeState==='all'||t.status===homeState)&&(catFilter==='전체'||taskCategories(t).includes(catFilter))));visibleTodayTasks=list;$('task-list').innerHTML=(list.length?list.slice(0,3).map(t=>taskRowV3(t)).join(''):'<p class="month-empty">이 상태의 오늘 일정이 없어요.</p>')+(list.length>3?`<button class="schedule-overflow" onclick="openTodaySchedule()">일정 ${list.length}개 모두 보기</button>`:'')+'<button class="schedule-add-wide" onclick="openAddTask(todayStr())">＋ 일정 추가</button>';};
function priorityRank(task){return ({high:0,normal:1,low:2})[task.priority||'normal'];}
function prioritySorted(list){return [...list].sort((a,b)=>priorityRank(a)-priorityRank(b)||(a.date+(a.time||'')).localeCompare(b.date+(b.time||'')));}
const monthPriorityBase=renderMonthView;renderMonthView=function(){monthPriorityBase();const list=prioritySorted(tasks.filter(t=>t.date.startsWith(`${viewY}-${pad(viewM+1)}-`)));$('month-list').innerHTML=list.length?list.map(t=>taskRowV3(t,'month')).join(''):'<p class="month-empty">이번 달은 아직 일정이 없어요.</p>';};
const dayPriorityBase=renderDayView;renderDayView=function(){dayPriorityBase();const date=new Date(calendarAnchor),ds=dstr(date.getFullYear(),date.getMonth(),date.getDate()),list=prioritySorted(tasks.filter(t=>t.date===ds));document.querySelector('.day-hour-list').innerHTML=list.length?list.map(task=>`<div class="day-hour-row"><time>${escapeHTML(task.time||'종일')}${task.endTime?`<small>— ${escapeHTML(task.endTime)}</small>`:''}</time>${eventPill(task)}<i class="calendar-priority ${task.priority||'normal'}">${priorityInfo[task.priority||'normal'].label}</i></div>`).join(''):`<button class="day-empty" onclick="openAddTask('${ds}')">＋ 이 날 첫 일정 추가</button>`;};
const calendarView=$('view-cal');calendarView.insertAdjacentHTML('afterbegin','<section class="calendar-time-hero"><div class="clock-ring"><div><strong id="calendar-percent">0%</strong><span>오늘</span></div></div><div class="calendar-now"><small>24 HOUR FLOW</small><time id="calendar-clock">00:00:00</time><p id="calendar-next"></p></div></section>');
function updateCalendarHero(){const now=new Date(),seconds=now.getHours()*3600+now.getMinutes()*60+now.getSeconds(),percent=Math.floor(seconds/86400*100);$('calendar-percent').textContent=percent+'%';document.querySelector('.clock-ring').style.setProperty('--day-angle',(seconds/86400*360)+'deg');$('calendar-clock').textContent=[now.getHours(),now.getMinutes(),now.getSeconds()].map(pad).join(':');const future=sortedTasks(tasks.filter(t=>t.date===todayStr()&&toScheduleDate(t,t.time)>now))[0];$('calendar-next').textContent=future?`다음 일정 ${future.time} · ${future.title}`:'오늘 남은 일정이 없어요.';}
updateCalendarHero();setInterval(updateCalendarHero,1000);
$('main').addEventListener('scroll',()=>calendarView.classList.toggle('calendar-scrolled',$('main').scrollTop>90),{passive:true});
const baseCoord5=openCoordination;openCoordination=function(){baseCoord5();const important=prioritySorted(tasks.filter(t=>t.priority==='high'&&t.date>=todayStr()))[0];$('coord-summary').insertAdjacentHTML('beforeend',`<div class="coord-guidance"><i>!</i><span>${important?`${important.date.slice(5).replace('-','월 ')}일은 중요한 일정이 있습니다.`:'가까운 중요한 일정은 없습니다.'}<small>시간을 비워 마음을 편하게 준비해 보세요.</small></span></div>`);};
document.querySelectorAll('.calendar-ad').forEach(ad=>ad.classList.add('compact-calendar-ad'));
function celebrateOrdo(label){let layer=$('ordo-complete');if(!layer){$('app').insertAdjacentHTML('beforeend','<div id="ordo-complete" hidden><div class="fall-dot"></div><div class="complete-mark"><i>✓</i></div><small></small></div>');layer=$('ordo-complete');}layer.querySelector('small').textContent=label;layer.hidden=false;layer.classList.remove('play');requestAnimationFrame(()=>layer.classList.add('play'));setTimeout(()=>layer.hidden=true,1150);}
const welcome=$('welcome');welcome.querySelector('.welcome-brand').insertAdjacentHTML('afterend','<section class="mascot-guide"><img src="ordo-mascot.png" alt="달력을 들고 일정을 안내하는 오르도 마스코트"><div><b>안녕하세요, 오르도예요.</b><span id="mascot-copy">오늘의 일정을 함께 정리해 볼까요?</span></div></section>');
const mascotLines=['오늘의 일정을 함께 정리해 볼까요?','모임의 빈 시간도 한눈에 찾아드려요.','중요한 날은 미리 준비할 수 있게 알려드릴게요.'];let mascotLine=0;setInterval(()=>{mascotLine=(mascotLine+1)%mascotLines.length;if($('mascot-copy'))$('mascot-copy').textContent=mascotLines[mascotLine];},2600);
renderTasks();renderCalendar();
;

/* ---- source script 8 ---- */
/* Final alignment and interaction polish while preserving the established feature set. */
const categoryTabs=$('cat-tabs');
const statusFilter=document.querySelector('.filter-anchor');
if(categoryTabs&&statusFilter&&!categoryTabs.parentElement.classList.contains('filter-category-row')){
  const filterRow=document.createElement('div');
  filterRow.className='filter-category-row';
  categoryTabs.parentElement.insertBefore(filterRow,categoryTabs);
  filterRow.append(categoryTabs,statusFilter);
}

/* Give every actionable button immediate tactile feedback without changing its action. */
document.addEventListener('pointerdown',event=>{
  const button=event.target.closest('button:not(:disabled)');
  if(button)button.classList.add('is-pressed');
});
['pointerup','pointercancel','pointerleave'].forEach(type=>document.addEventListener(type,event=>{
  const button=event.target.closest?.('button');
  if(button)button.classList.remove('is-pressed');
}));

/* Enforce saved priority and the category-colored divider at the final row renderer. */
const taskRowV6Base=taskRowV3;
taskRowV3=function(task,context){
  const wrap=document.createElement('div');
  wrap.innerHTML=taskRowV6Base(task,context);
  const color=catColor(taskCategories(task)[0]);
  const content=wrap.querySelector('.timeline-content');
  const kind=wrap.querySelector('.task-kind');
  wrap.querySelectorAll('.task-title-line').forEach(line=>line.remove());
  if(content)content.style.setProperty('--task-color',color);
  if(kind&&!kind.querySelector('.priority-chip')){
    const priority=task.priority||'normal';
    kind.insertAdjacentHTML('beforeend',`<span class="priority-chip ${priority}"><i></i>${priorityInfo[priority].label}</span>`);
  }
  return wrap.innerHTML;
};
taskRow=taskRowV3;

/* Keep filter, category and schedule controls freshly aligned after every render. */
const renderTasksV6=renderTasks;
renderTasks=function(){renderTasksV6();document.querySelector('.filter-orb').setAttribute('title',statusNames[homeState]);};
renderTasks();
;

/* ---- source script 9 ---- */
/* v7 — onboarding banner, clock-style calendar, banner agendas, tucked navigation. */

/* ---------- 1. 시작 화면을 마스코트가 안내하는 단일 배너로 ---------- */
(function buildOnboarding(){
  const welcome=$('welcome');if(!welcome||typeof tutorialSlides==='undefined')return;
  const banner=document.createElement('section');
  banner.className='ordo-onboard';
  banner.innerHTML='<div class="onboard-top"><span class="onboard-brand">ordo<i>●</i></span><span class="onboard-step" id="onboard-step"></span></div>'
    +'<div class="onboard-body"><img class="onboard-mascot" src="ordo-mascot.png" alt="일정을 안내하는 오르도 마스코트">'
    +'<div class="onboard-speech" id="onboard-speech"><span class="onboard-kicker" id="onboard-kicker"></span><b id="onboard-title"></b><p id="onboard-copy"></p></div></div>'
    +'<div class="onboard-foot"><button type="button" aria-label="이전 소개" onclick="moveTutorial(-1)">←</button><div id="onboard-dots">'
    +tutorialSlides.map((t,i)=>`<button type="button" aria-label="${escapeHTML(t.title)}" onclick="goTutorial(${i})" class="${i?'':'active'}"></button>`).join('')
    +'</div><button type="button" aria-label="다음 소개" onclick="moveTutorial(1)">→</button></div>';
  welcome.insertBefore(banner,welcome.querySelector('.btn-main'));

  let slide=0,timer=null;
  const mascotCopy=['오늘의 일정을 함께 정리해 볼까요?','모임의 빈 시간도 한눈에 찾아드려요.','중요한 날은 미리 준비하도록 알려드릴게요.'];
  function paintSlide(){
    const t=tutorialSlides[slide];
    $('onboard-step').textContent=`0${slide+1} / 0${tutorialSlides.length}`;
    $('onboard-kicker').textContent=t.k.replace(/^\d+ \/ \d+ · /,'')+' · 오르도 안내';
    $('onboard-title').textContent=t.title;
    $('onboard-copy').textContent=t.copy+' '+(mascotCopy[slide]||'');
    document.querySelectorAll('#onboard-dots button').forEach((b,i)=>b.classList.toggle('active',i===slide));
    const speech=$('onboard-speech');speech.classList.remove('turn');void speech.offsetWidth;speech.classList.add('turn');
  }
  function schedule(){clearTimeout(timer);timer=setTimeout(()=>{slide=(slide+1)%tutorialSlides.length;paintSlide();schedule();},4800);}
  goTutorial=function(i){slide=(i+tutorialSlides.length)%tutorialSlides.length;paintSlide();schedule();};
  moveTutorial=function(d){goTutorial(slide+d);};
  paintSlide();schedule();
})();

/* ---------- 2. 하루를 시계처럼 보여주는 캘린더 헤더 ---------- */
const ringHost=document.querySelector('.clock-ring');
if(ringHost&&!ringHost.querySelector('.day-dial')){
  ringHost.insertAdjacentHTML('afterbegin','<div class="day-dial"></div>');
  document.querySelector('.calendar-time-hero').insertAdjacentHTML('beforeend','<div class="dial-legend" id="dial-legend"></div>');
}
function dialAnchorStr(){
  if(selectedDate)return selectedDate;
  const now=new Date();
  if(calendarMode==='month'&&(now.getFullYear()!==viewY||now.getMonth()!==viewM))return dstr(viewY,viewM,1);
  if(calendarMode==='day'||calendarMode==='week'){const d=calendarAnchor||now;return dstr(d.getFullYear(),d.getMonth(),d.getDate());}
  return todayStr();
}
function minutesOfTime(value){const [h,m]=String(value||'0:0').split(':').map(Number);return (h||0)*60+(m||0);}
function renderDayDial(){
  const ring=document.querySelector('.clock-ring'),dial=ring&&ring.querySelector('.day-dial');if(!dial)return;
  const ds=dialAnchorStr(),isToday=ds===todayStr();
  const list=sortedTasks(tasks.filter(t=>t.date===ds));
  const R=88,C=2*Math.PI*R,now=new Date(),seconds=now.getHours()*3600+now.getMinutes()*60+now.getSeconds();
  const arcs=list.filter(t=>t.time).map(task=>{
    const start=minutesOfTime(task.time);
    let end=task.endTime?minutesOfTime(task.endTime):start+55;
    if(end<=start)end=start+55;
    const span=Math.max(18,Math.min(end,1440)-start),len=span/1440*C;
    return `<circle r="${R}" cx="110" cy="110" fill="none" stroke="${catColor(taskCategories(task)[0])}" stroke-width="19" stroke-linecap="round" stroke-dasharray="${len.toFixed(2)} ${(C-len).toFixed(2)}" stroke-dashoffset="${(-start/1440*C).toFixed(2)}" opacity="${task.status==='done'?.45:1}"></circle>`;
  }).join('');
  const elapsed=isToday?seconds/86400*C:0;
  dial.innerHTML=`<svg viewBox="0 0 220 220" aria-hidden="true">`
    +`<circle r="${R}" cx="110" cy="110" fill="none" style="stroke:var(--elev)" stroke-width="19"></circle>`
    +`<g transform="rotate(-90 110 110)">`
    +(isToday?`<circle r="${R}" cx="110" cy="110" fill="none" style="stroke:var(--line)" stroke-width="19" stroke-dasharray="${elapsed.toFixed(2)} ${(C-elapsed).toFixed(2)}"></circle>`:'')
    +arcs
    +(isToday?`<circle r="5.5" cx="110" cy="${110-R}" fill="#d96d62" transform="rotate(${(seconds/86400*360).toFixed(2)} 110 110)"></circle>`:'')
    +`</g></svg>`;
  const legend=$('dial-legend');
  if(legend){
    const names=[...new Set(list.flatMap(t=>taskCategories(t)))];
    const label=`${Number(ds.slice(5,7))}월 ${Number(ds.slice(8,10))}일${isToday?' · 오늘':''}`;
    legend.innerHTML=`<span><i style="background:var(--t1)"></i>${label}</span>`
      +(list.length?names.slice(0,3).map(name=>`<span><i style="background:${catColor(name)}"></i>${escapeHTML(name)}</span>`).join('')+`<span><i style="background:var(--t3)"></i>일정 ${list.length}개</span>`
      :'<span><i style="background:var(--t3)"></i>일정 없음</span>');
  }
}
renderDayDial();setInterval(renderDayDial,5000);

/* ---------- 3. 연·월·주 일정을 배너로 ---------- */
const BANNER_TONES=['#E4DCF4','#F6DDDC','#DCEBE2','#F6E8D3','#DCE5F5','#EBE2D6','#E5F0D9'];
const WEEKDAY_KO=['일','월','화','수','목','금','토'];
function bannerChips(list){
  if(!list.length)return '<small class="day-banner-empty">여유로운 하루예요</small>';
  return '<div class="day-banner-events">'+list.slice(0,6).map(task=>
    `<span class="day-banner-chip" style="--chip:${catColor(taskCategories(task)[0])}"><b>${escapeHTML(task.time||'종일')}</b><small>${escapeHTML(task.title)}</small></span>`).join('')
    +(list.length>6?`<span class="day-banner-chip"><b>+${list.length-6}</b><small>더 보기</small></span>`:'')+'</div>';
}
function dayBanner(date,tone){
  const ds=dstr(date.getFullYear(),date.getMonth(),date.getDate());
  const list=sortedTasks(tasks.filter(t=>t.date===ds));
  return `<button class="day-banner ${ds===todayStr()?'is-today':''}" style="--banner:${tone}" onclick="openCalendarDay('${ds}')" aria-label="${date.getMonth()+1}월 ${date.getDate()}일 일정 ${list.length}개">`
    +`<div class="day-banner-head"><span>${WEEKDAY_KO[date.getDay()]}요일</span><strong>${date.getDate()}<em>${date.getMonth()+1}월</em></strong></div>${bannerChips(list)}</button>`;
}
function dayBannerStack(dates){return '<div class="banner-stack">'+dates.map((d,i)=>dayBanner(d,BANNER_TONES[i%BANNER_TONES.length])).join('')+'</div>';}

const v7Month=renderMonthView;
renderMonthView=function(){
  v7Month();
  const total=new Date(viewY,viewM+1,0).getDate();
  const dates=[];
  for(let d=1;d<=total;d++){const ds=dstr(viewY,viewM,d);if(tasks.some(t=>t.date===ds))dates.push(new Date(viewY,viewM,d));}
  const count=tasks.filter(t=>t.date.startsWith(`${viewY}-${pad(viewM+1)}-`)).length;
  $('month-count').textContent=count+'개';
  $('month-list').innerHTML=dates.length?dayBannerStack(dates):'<p class="month-empty">이번 달은 아직 일정이 없어요.<br>위의 + 버튼으로 첫 계획을 남겨보세요.</p>';
};
const v7Week=renderWeekView;
renderWeekView=function(){
  v7Week();
  const start=startOfWeek(calendarAnchor);
  const dates=Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(start.getDate()+i);return d;});
  $('month-count').textContent=dates.reduce((sum,d)=>sum+tasks.filter(t=>t.date===dstr(d.getFullYear(),d.getMonth(),d.getDate())).length,0)+'개';
  $('month-list').innerHTML=dayBannerStack(dates);
};
const v7Day=renderDayView;
renderDayView=function(){
  v7Day();
  const date=new Date(calendarAnchor),ds=dstr(date.getFullYear(),date.getMonth(),date.getDate());
  const overview=document.querySelector('.day-overview');
  if(overview){
    const list=tasks.filter(t=>t.date===ds);
    overview.innerHTML=`<div><span>${date.toLocaleDateString('ko-KR',{weekday:'long'})}</span><h2>${date.getDate()}<em style="font-style:normal;font-size:15px;margin-left:6px">${date.getMonth()+1}월</em></h2></div><p>${list.length?`일정 ${list.length}개`:'여유로운 하루예요.'}</p>`;
  }
};
showYearOverview=function(){
  calendarMode='year';renderCalendarTabs();
  $('cal-title').textContent=viewY+'년';
  $('cal-grid').className='year-overview';
  $('cal-grid').previousElementSibling.hidden=true;
  $('cal-grid').innerHTML='<div class="banner-stack">'+Array.from({length:12},(_,m)=>{
    const list=sortedTasks(tasks.filter(t=>t.date.startsWith(`${viewY}-${pad(m+1)}`)));
    const now=new Date(),isNow=now.getFullYear()===viewY&&now.getMonth()===m;
    return `<button class="day-banner ${isNow?'is-today':''}" style="--banner:${BANNER_TONES[m%BANNER_TONES.length]}" onclick="jumpToMonth(${m})" aria-label="${m+1}월 일정 ${list.length}개">`
      +`<div class="day-banner-head"><span>${viewY}</span><strong>${m+1}<em>월</em></strong></div>`
      +(list.length?'<div class="day-banner-events">'+list.slice(0,5).map(task=>`<span class="day-banner-chip" style="--chip:${catColor(taskCategories(task)[0])}"><b>${Number(task.date.slice(8,10))}일</b><small>${escapeHTML(task.title)}</small></span>`).join('')+(list.length>5?`<span class="day-banner-chip"><b>+${list.length-5}</b><small>더 보기</small></span>`:'')+'</div>'
      :'<small class="day-banner-empty">비어 있는 달이에요</small>')+'</button>';
  }).join('')+'</div>';
  $('month-list').innerHTML='';
  $('month-count').textContent=tasks.filter(t=>t.date.startsWith(viewY+'-')).length+'개';
  renderDayDial();
};
const v7Calendar=renderCalendar;
renderCalendar=function(){v7Calendar();renderDayDial();};

/* ---------- 4. 하단 네비를 오른쪽으로 숨기기 ---------- */
(function tuckableNav(){
  const nav=$('nav');if(!nav||$('nav-handle'))return;
  nav.insertAdjacentHTML('afterbegin','<button id="nav-handle" aria-label="메뉴 열기" aria-expanded="false"><span class="nav-handle-pill">‹<span class="ic" data-ic="menu"></span></span></button>');
  paint(nav);
  let idle;
  function tuck(on){
    nav.classList.toggle('tucked',on);
    $('nav-handle').setAttribute('aria-expanded',String(!on));
    clearTimeout(idle);
    if(!on)idle=setTimeout(()=>tuck(true),4200);
  }
  window.toggleNav=()=>tuck(!nav.classList.contains('tucked'));
  $('nav-handle').addEventListener('click',e=>{e.stopPropagation();tuck(false);});
  nav.querySelectorAll('.nav-item').forEach(item=>item.addEventListener('click',()=>tuck(false)));
  $('main').addEventListener('scroll',()=>{if(!nav.classList.contains('tucked'))tuck(true);},{passive:true});
  setTimeout(()=>tuck(true),2600);
})();

renderCalendar();renderTasks();
;

/* ---- source script 10 ---- */
/* v8 — 일정 수정 버그 수정, 마스코트 대체 이미지, 접히는 주간 배너, 공동 일정 가독성. */

/* 1. 사라진 .home-title 참조 때문에 렌더링이 중간에 끊기던 문제 */
(function restoreHomeTitle(){
  if(document.querySelector('.home-title'))return;
  const box=document.querySelector('.schedule-heading>div:first-child');
  if(box)box.insertAdjacentHTML('afterbegin','<span class="home-title" hidden style="display:none"></span>');
})();

/* 2. 일정 수정: 새로 만들지 않고 기존 일정을 고치도록 */
const v8Edit=editTask;
editTask=function(id){v8Edit(id);editingTaskId=id;};
const v8Save=saveTask;
saveTask=function(){const keep=editingTaskId;try{v8Save();}finally{if(keep!==null&&editingTaskId===keep)editingTaskId=null;}};

/* 3. 마스코트 이미지가 없을 때를 위한 대체 그림 */
const MASCOT_FALLBACK='data:image/svg+xml;utf8,'+encodeURIComponent(
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<ellipse cx="100" cy="182" rx="52" ry="8" fill="#00000010"/>
<path d="M44 46c26-22 72-20 96 6" stroke="#97A87F" stroke-width="7" fill="none" stroke-linecap="round"/>
<circle cx="52" cy="48" r="17" fill="#26282A"/>
<circle cx="103" cy="106" r="62" fill="#26282A"/>
<circle cx="86" cy="96" r="16" fill="#F7F5EF"/><circle cx="124" cy="96" r="14" fill="#F7F5EF"/>
<circle cx="88" cy="99" r="7" fill="#1A1B1C"/><circle cx="125" cy="99" r="6" fill="#1A1B1C"/>
<path d="M97 122c6 8 16 8 22 0" stroke="#E4796B" stroke-width="7" fill="none" stroke-linecap="round"/>
<rect x="38" y="104" width="54" height="46" rx="8" fill="#F1EEE4"/>
<rect x="38" y="104" width="54" height="13" rx="6" fill="#97A87F"/>
<rect x="46" y="124" width="12" height="9" rx="3" fill="#D9D6CC"/>
<rect x="63" y="124" width="12" height="9" rx="3" fill="#E4906B"/>
<rect x="46" y="137" width="12" height="9" rx="3" fill="#D9D6CC"/>
<rect x="63" y="137" width="12" height="9" rx="3" fill="#97A87F"/>
<circle cx="86" cy="170" r="13" fill="#26282A"/><circle cx="126" cy="170" r="13" fill="#26282A"/>
<circle cx="163" cy="86" r="13" fill="#26282A"/>
</svg>`);
function guardMascot(img){
  if(!img)return;
  img.addEventListener('error',()=>{if(img.src!==MASCOT_FALLBACK)img.src=MASCOT_FALLBACK;},{once:true});
  if(img.complete&&!img.naturalWidth)img.src=MASCOT_FALLBACK;
}
document.querySelectorAll('.onboard-mascot,.mascot-guide img').forEach(guardMascot);

/* 4. 이번 주 공동 일정: 요일과 개수를 함께 */
renderCoordSnapshot=function(){
  const holder=$('coord-snapshot');if(!holder)return;
  const W=['일','월','화','수','목','금','토'],now=new Date();
  const days=Array.from({length:7},(_,i)=>{
    const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i);
    const ds=dstr(d.getFullYear(),d.getMonth(),d.getDate());
    const count=tasks.filter(t=>t.date===ds&&t.status!=='done').length;
    return {d,ds,count,load:count===0?'free':count>2?'busy':'mid'};
  });
  const free=days.filter(day=>day.load==='free').length;
  holder.innerHTML=`<span class="coord-snapshot-copy"><small>이번 주 공동 일정</small><b>${free?`${free}일이 여유로워요`:'이번 주는 일정이 촘촘해요'}</b></span>`
    +`<span class="coord-week">${days.map((day,i)=>`<b class="${day.load} ${i?'':'today'}" title="${day.d.getMonth()+1}월 ${day.d.getDate()}일 일정 ${day.count}개"><em>${W[day.d.getDay()]}</em><i></i><u>${day.count}</u></b>`).join('')}</span>`;
};

/* 5. 연·월·주 배너: 파일처럼 겹쳐두고 눌러서 펼치기 */
dayBanner=function(date,tone){
  const ds=dstr(date.getFullYear(),date.getMonth(),date.getDate());
  const list=sortedTasks(tasks.filter(t=>t.date===ds));
  return `<button class="day-banner ${ds===todayStr()?'is-today':''}" style="--banner:${tone}" onclick="openCalendarDay('${ds}')" aria-label="${date.getMonth()+1}월 ${date.getDate()}일 일정 ${list.length}개">`
    +`<div class="day-banner-head"><span>${WEEKDAY_KO[date.getDay()]}요일</span><strong>${date.getDate()}<em>${date.getMonth()+1}월</em></strong>`
    +`<span class="day-banner-count">${list.length?`일정 ${list.length}`:'여유'}</span></div>${bannerChips(list)}</button>`;
};
dayBannerStack=function(dates){
  const total=dates.reduce((sum,d)=>sum+tasks.filter(t=>t.date===dstr(d.getFullYear(),d.getMonth(),d.getDate())).length,0);
  return `<div class="stack-wrap"><button class="stack-toggle" onclick="toggleStack(this)"><span>${dates.length}일 · 일정 ${total}개</span><b>펼치기 ▾</b></button>`
    +'<div class="banner-stack collapsed">'+dates.map((d,i)=>dayBanner(d,BANNER_TONES[i%BANNER_TONES.length])).join('')+'</div></div>';
};
function toggleStack(button){
  const stack=button.parentElement.querySelector('.banner-stack');
  const opened=!stack.classList.toggle('collapsed');
  button.querySelector('b').textContent=opened?'접기 ▴':'펼치기 ▾';
}
document.addEventListener('click',event=>{
  const banner=event.target.closest?.('.banner-stack.collapsed .day-banner');
  if(!banner)return;
  event.preventDefault();event.stopPropagation();
  toggleStack(banner.closest('.stack-wrap').querySelector('.stack-toggle'));
},true);

refreshSchedules();renderCalendar();
;

/* ---- source script 11 ---- */
/* v9 — direct, single-path schedule editing and self-contained onboarding artwork. */
(function installInlineMascot(){
  const source=typeof MASCOT_FALLBACK!=='undefined'?MASCOT_FALLBACK:'';
  if(!source)return;
  document.querySelectorAll('.onboard-mascot,.mascot-guide img').forEach(img=>{img.src=source;img.removeAttribute('srcset');});
})();

/* Do not chain previous save wrappers: an edit always changes the same task object. */
let v9Saving=false;
editTask=function(id){
  const task=tasks.find(item=>item.id===id);
  if(!task)return;
  editingTaskId=id;
  selectedCats=taskCategories(task);
  pickedPriority=task.priority||'normal';
  closeSheets();
  $('t-title').value=task.title||'';
  $('t-memo').value=task.memo||'';
  $('t-date').value=task.date||todayStr();
  $('t-time').value=task.time||'';
  $('t-end-time').value=task.endTime||'';
  $('cat-form').classList.add('hidden');
  renderCatSelect();
  pickPriority(pickedPriority);
  taskSheet.querySelector('h3').textContent='일정 수정';
  const action=taskSheet.querySelector('[onclick="saveTask()"]');
  if(action)action.textContent='수정 완료';
  openSheet('sheet-task');
  taskSheet.querySelector('.overflow-y-auto').scrollTop=0;
};

saveTask=function(){
  if(v9Saving)return;
  const title=$('t-title').value.trim();
  if(!title){showToast('일정 제목을 입력해주세요.');return;}
  const start=$('t-time').value||'00:00';
  const end=$('t-end-time').value;
  if(end&&end<=start){showToast('종료 시간은 시작 시간 이후로 선택해주세요.');return;}
  v9Saving=true;
  const editId=editingTaskId;
  const data={
    title,memo:$('t-memo').value.trim(),date:$('t-date').value||todayStr(),time:start,endTime:end,
    cat:selectedCats[0]||categories[0]?.name||'업무',cats:[...(selectedCats.length?selectedCats:[categories[0]?.name||'업무'])],priority:pickedPriority||'normal'
  };
  let target;
  if(editId!==null){target=tasks.find(item=>item.id===editId);if(target)Object.assign(target,data);}
  if(!target){target={id:Date.now(),status:'todo',...data};tasks.push(target);}
  applyAutoStatuses();
  save();
  editingTaskId=null;
  closeSheets();
  refreshSchedules();
  showToast(editId!==null?'일정을 수정했어요.':'일정을 저장했어요.');
  celebrateOrdo(editId!==null?'수정 완료':'일정 완료');
  setTimeout(()=>{v9Saving=false;},180);
};

/* Ensure a category change drives the divider color in every view. */
const v9TaskRowBase=taskRowV3;
taskRowV3=function(task,context){
  const wrap=document.createElement('div');
  wrap.innerHTML=v9TaskRowBase(task,context);
  const content=wrap.querySelector('.timeline-content');
  if(content)content.style.setProperty('--task-color',catColor(taskCategories(task)[0]));
  return wrap.innerHTML;
};
taskRow=taskRowV3;

refreshSchedules();
;

/* ---- source script 12 ---- */
/* v10 — date-first calendar heading, always linked to the selected calendar date. */
(function dateFirstCalendar(){
  const hero=document.querySelector('.calendar-time-hero');
  if(!hero||hero.querySelector('.calendar-date-summary'))return;
  hero.insertAdjacentHTML('afterbegin','<div class="calendar-date-summary"><strong id="calendar-date-number"></strong><div><b id="calendar-date-month"></b><span id="calendar-date-weekday"></span></div></div>');
  function paintCalendarDate(){
    const value=typeof dialAnchorStr==='function'?dialAnchorStr():todayStr();
    const date=new Date(`${value}T12:00:00`);
    $('calendar-date-number').textContent=date.getDate();
    $('calendar-date-month').textContent=`${date.getMonth()+1}월`;
    $('calendar-date-weekday').textContent=date.toLocaleDateString('ko-KR',{weekday:'long'});
  }
  const v10CalendarRender=renderCalendar;
  renderCalendar=function(){v10CalendarRender();paintCalendarDate();};
  paintCalendarDate();
})();
;

/* ---- source script 13 ---- */
/* v11 — keep legacy schedule labels present before any older renderer runs. */
(function stabilizeScheduleRender(){
  function ensureLegacyTaskNodes(){
    const host=document.querySelector('.schedule-heading > div')||document.querySelector('.schedule-heading');
    if(!host)return;
    if(!$('home-date')){
      const node=document.createElement('span');
      node.id='home-date';
      node.hidden=true;
      host.prepend(node);
    }
    if(!document.querySelector('.home-title')){
      const node=document.createElement('span');
      node.className='home-title';
      node.hidden=true;
      host.prepend(node);
    }
  }
  ensureLegacyTaskNodes();
  const v11TaskRender=renderTasks;
  renderTasks=function(){
    ensureLegacyTaskNodes();
    return v11TaskRender();
  };
  renderTasks();
})();
;

/* ---- source script 14 ---- */
/* v12 — preserve time order, unify calendar modes, and make lower banners foldable. */
(function finalCalendarAndBannerPass(){
  /* 중요도는 표기 정보이며, 일정은 사용자가 정한 시간순을 유지합니다. */
  prioritySorted=function(list){return sortedTasks(list);};

  const switcher=document.querySelector('.calendar-view-switch');
  if(switcher&&!switcher.querySelector('[data-calendar-mode="year"]')){
    switcher.insertAdjacentHTML('afterbegin','<button data-calendar-mode="year" onclick="setCalendarMode(\'year\')">년</button>');
  }
  const v12SetCalendarMode=setCalendarMode;
  setCalendarMode=function(mode){
    if(mode==='year'){
      calendarMode='year';
      $('cal-detail')?.classList.add('hidden');
      $('cal-detail')?.classList.remove('flex');
      showYearOverview();
      return;
    }
    v12SetCalendarMode(mode);
  };

  /* 광고는 캘린더 정보 뒤 한 자리에서만 보입니다. */
  function placeCalendarAd(){
    const ad=document.querySelector('#view-cal .calendar-ad');
    const agenda=document.querySelector('#view-cal .month-agenda');
    if(!ad||!agenda)return;
    ad.classList.add('calendar-bottom-ad');
    if(agenda.nextElementSibling!==ad)agenda.insertAdjacentElement('afterend',ad);
  }
  const v12CalendarRender=renderCalendar;
  renderCalendar=function(){
    v12CalendarRender();
    placeCalendarAd();
    renderCalendarTabs();
    renderDayDial();
  };
  placeCalendarAd();

  /* 홈의 정보/광고 슬라이드는 필요할 때만 펼칠 수 있습니다. */
  const track=$('overview-track');
  if(track&&!$('overview-fold-toggle')){
    const toggle=document.createElement('button');
    toggle.id='overview-fold-toggle';
    toggle.className='overview-fold-toggle';
    toggle.type='button';
    toggle.innerHTML='<span>오늘의 배너</span><b>접기 ▴</b>';
    toggle.addEventListener('click',()=>{
      const folded=track.classList.toggle('overview-folded');
      toggle.querySelector('b').textContent=folded?'펼치기 ▾':'접기 ▴';
      toggle.setAttribute('aria-expanded',String(!folded));
    });
    track.parentElement.insertBefore(toggle,track);
  }
  renderTasks();
  renderCalendar();
})();
;

/* ---- source script 15 ---- */
/* v13 — final interaction pass for calendar, navigation, ads and chat composer. */
(function installV13(){
  /* 로딩 애니메이션과 로그인 화면이 겹치지 않도록 소개 화면을 바로 엽니다. */
  if(!entry.hidden)showWelcome();

  document.querySelectorAll('#view-cal .calendar-ad').forEach(node=>node.remove());
  document.querySelector('.calendar-heading .section-kicker')?.remove();

  const navInner=document.querySelector('#nav .nav-inner');
  if(navInner&&!navInner.querySelector('.nav-create')){
    const items=navInner.querySelectorAll('.nav-item');
    const create=document.createElement('button');
    create.type='button';create.className='nav-create';create.setAttribute('aria-label','일정 추가');
    create.innerHTML='<span aria-hidden="true">＋</span>';
    create.onclick=()=>openAddTask(navIndex===1&&selectedDate?selectedDate:todayStr());
    items[1].insertAdjacentElement('afterend',create);
  }
  const composer=$('chat-input')?.parentElement;
  if(composer)composer.classList.add('chat-composer');

  const timeMinutes=value=>{const [h,m]=String(value||'00:00').split(':').map(Number);return Math.max(0,Math.min(1439,(h||0)*60+(m||0)));};
  const taskColor=task=>catColor(taskCategories(task)[0]);
  const durationMinutes=task=>{
    const start=timeMinutes(task.time),end=task.endTime?timeMinutes(task.endTime):start+60;
    return Math.max(35,end>start?end-start:60);
  };
  const eventBlock=task=>{
    const top=40+timeMinutes(task.time)/1440*660;
    const height=Math.max(30,durationMinutes(task)/1440*660);
    return `<button class="calendar-event-block" data-task-id="${task.id}" style="--event-top:${top}px;--event-height:${height}px;--event-color:${taskColor(task)}" aria-label="${escapeHTML(task.title)}. 길게 눌러 수정"><time>${escapeHTML(task.time||'종일')}</time><b>${escapeHTML(task.title)}</b></button>`;
  };
  function selectedAnchor(){
    if(selectedDate)return new Date(`${selectedDate}T12:00:00`);
    return calendarAnchor instanceof Date?new Date(calendarAnchor):new Date(viewY,viewM,new Date().getDate());
  }
  function paintCalendarHero(){
    const date=selectedAnchor(),ds=dstr(date.getFullYear(),date.getMonth(),date.getDate());
    if($('calendar-date-number'))$('calendar-date-number').textContent=date.getDate();
    if($('calendar-date-month'))$('calendar-date-month').textContent=`${date.getMonth()+1}월`;
    if($('calendar-date-weekday'))$('calendar-date-weekday').textContent=date.toLocaleDateString('ko-KR',{weekday:'long'});
    const ring=document.querySelector('.clock-ring'),dial=ring?.querySelector('.day-dial');if(!dial)return;
    const list=sortedTasks(tasks.filter(task=>task.date===ds));
    const R=48,C=2*Math.PI*R;
    const arcs=list.map(task=>{
      const start=timeMinutes(task.time),length=Math.max(16,durationMinutes(task))/1440*C;
      return `<circle r="${R}" cx="62" cy="62" fill="none" stroke="${taskColor(task)}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${length.toFixed(2)} ${(C-length).toFixed(2)}" stroke-dashoffset="${(-start/1440*C).toFixed(2)}"></circle>`;
    }).join('');
    dial.innerHTML=`<svg viewBox="0 0 124 124" aria-hidden="true"><circle r="${R}" cx="62" cy="62" fill="none" style="stroke:var(--elev)" stroke-width="12"></circle><g transform="rotate(-90 62 62)">${arcs}</g></svg>`;
    const legend=$('dial-legend');
    if(legend)legend.innerHTML=(list.length?list.map(task=>`<span><i style="background:${taskColor(task)}"></i>${escapeHTML(task.time||'종일')} · ${escapeHTML(task.title)}</span>`).join(''):'<span><i style="background:var(--t3)"></i>이 날은 등록된 일정이 없어요</span>')+'<span class="dial-hint">시간 링을 길게 누르면 하루 일정을 열어요</span>';
    if(ring&&!ring.dataset.holdReady){
      ring.dataset.holdReady='1';ring.tabIndex=0;ring.setAttribute('role','button');ring.setAttribute('aria-label','길게 눌러 선택한 날 일정 보기');
      let hold;
      const cancel=()=>clearTimeout(hold);
      ring.addEventListener('pointerdown',()=>{hold=setTimeout(()=>openCalendarDay(dialAnchorStr()),520);});
      ['pointerup','pointercancel','pointerleave'].forEach(type=>ring.addEventListener(type,cancel));
    }
  }
  function calendarHeader(modeTitle){
    $('cal-title').textContent=modeTitle;
    renderCalendarTabs();
    paintCalendarHero();
  }
  function monthAgenda(){
    const total=new Date(viewY,viewM+1,0).getDate();
    const dates=Array.from({length:total},(_,i)=>new Date(viewY,viewM,i+1)).filter(date=>tasks.some(task=>task.date===dstr(date.getFullYear(),date.getMonth(),date.getDate())));
    $('month-count').textContent=`${tasks.filter(task=>task.date.startsWith(`${viewY}-${pad(viewM+1)}-`)).length}개`;
    $('month-list').innerHTML=dates.length?dayBannerStack(dates):'<p class="month-empty">이번 달은 아직 일정이 없어요.</p>';
  }
  function renderMonthV13(){
    calendarHeader(`${viewY}년 ${viewM+1}월`);
    const grid=$('cal-grid'),weekdays=grid.previousElementSibling;weekdays.hidden=false;grid.className='month-grid';
    const first=new Date(viewY,viewM,1).getDay(),total=new Date(viewY,viewM+1,0).getDate(),now=new Date();
    let html=Array.from({length:first},()=>'<div class="calendar-blank"></div>').join('');
    for(let day=1;day<=total;day++){
      const ds=dstr(viewY,viewM,day),list=sortedTasks(tasks.filter(task=>task.date===ds));
      const today=now.getFullYear()===viewY&&now.getMonth()===viewM&&now.getDate()===day;
      html+=`<button class="cal-cell ${today?'today':''} ${selectedDate===ds?'selected':''}" data-date="${ds}" onclick="selectDate('${ds}')"><span class="day-number">${day}</span><span class="cal-events">${list.slice(0,2).map(task=>`<i class="cal-event" style="--event-color:${taskColor(task)}">${escapeHTML(task.title)}</i>`).join('')}${list.length>2?`<small>+${list.length-2}</small>`:''}</span></button>`;
    }
    grid.innerHTML=html;monthAgenda();
  }
  function renderYearV13(){
    calendarHeader(`${viewY}년`);
    const grid=$('cal-grid');grid.previousElementSibling.hidden=true;grid.className='year-v13-grid';
    grid.innerHTML=Array.from({length:12},(_,month)=>{
      const list=sortedTasks(tasks.filter(task=>task.date.startsWith(`${viewY}-${pad(month+1)}-`)));
      const colors=[...new Set(list.map(taskColor))].slice(0,6);
      return `<button class="year-v13-card" onclick="jumpToMonth(${month})"><small>${viewY}</small><strong>${month+1}<em style="font-size:12px;font-style:normal">월</em></strong><span class="year-v13-dots">${colors.map(color=>`<i style="background:${color}"></i>`).join('')}</span><small>${list.length?`일정 ${list.length}개`:'비어 있는 달'}</small></button>`;
    }).join('');$('month-count').textContent=`${tasks.filter(task=>task.date.startsWith(viewY+'-')).length}개`;$('month-list').innerHTML='';
  }
  function renderWeekV13(){
    const anchor=selectedAnchor(),start=startOfWeek(anchor),dates=Array.from({length:7},(_,index)=>{const date=new Date(start);date.setDate(start.getDate()+index);return date;});
    calendarHeader(`${dates[0].getMonth()+1}월 ${dates[0].getDate()}일 – ${dates[6].getMonth()+1}월 ${dates[6].getDate()}일`);
    const grid=$('cal-grid');grid.previousElementSibling.hidden=true;grid.className='week-timeline-scroll';
    const labels=[0,4,8,12,16,20,24].map(hour=>`<span style="top:${40+hour/24*660}px">${pad(hour)}시</span>`).join('');
    grid.innerHTML=`<div class="calendar-timeline week-timeline-inner"><div class="week-time-axis">${labels}</div>${dates.map(date=>{const ds=dstr(date.getFullYear(),date.getMonth(),date.getDate()),list=sortedTasks(tasks.filter(task=>task.date===ds));return `<div class="week-day-column"><header>${WEEKDAY_KO[date.getDay()]}<b>${date.getDate()}</b></header>${list.map(eventBlock).join('')}</div>`;}).join('')}</div>`;
    $('month-count').textContent=`${dates.reduce((sum,date)=>sum+tasks.filter(task=>task.date===dstr(date.getFullYear(),date.getMonth(),date.getDate())).length,0)}개`;$('month-list').innerHTML='';
  }
  function renderDayV13(){
    const date=selectedAnchor(),ds=dstr(date.getFullYear(),date.getMonth(),date.getDate()),list=sortedTasks(tasks.filter(task=>task.date===ds));
    calendarHeader(`${date.getMonth()+1}월 ${date.getDate()}일 ${WEEKDAY_KO[date.getDay()]}요일`);
    const grid=$('cal-grid');grid.previousElementSibling.hidden=true;grid.className='calendar-timeline';
    const labels=[0,4,8,12,16,20,24].map(hour=>`<span style="top:${hour/24*660}px">${pad(hour)}시</span>`).join('');
    grid.innerHTML=`<div class="day-timeline-inner"><div class="day-time-axis">${labels}</div>${list.map(eventBlock).join('')}</div>`;
    $('month-count').textContent=`${list.length}개`;$('month-list').innerHTML=list.length?dayBannerStack([date]):'<p class="month-empty">이 날은 등록된 일정이 없어요.</p>';
  }
  renderCalendar=function(){
    applyAutoStatuses();
    if(calendarMode==='year')renderYearV13();else if(calendarMode==='week')renderWeekV13();else if(calendarMode==='day')renderDayV13();else renderMonthV13();
  };
  showYearOverview=function(){calendarMode='year';renderCalendar();};
  const v13SetMode=setCalendarMode;
  setCalendarMode=function(mode){calendarMode=mode;if(mode!=='year')v13SetMode(mode);else renderCalendar();};
  changeMonth=function(delta){
    if(calendarMode==='year'){viewY+=delta;}else if(calendarMode==='week'||calendarMode==='day'){calendarAnchor=selectedAnchor();calendarAnchor.setDate(calendarAnchor.getDate()+delta*(calendarMode==='week'?7:1));viewY=calendarAnchor.getFullYear();viewM=calendarAnchor.getMonth();selectedDate=dstr(viewY,viewM,calendarAnchor.getDate());}else{viewM+=delta;if(viewM>11){viewM=0;viewY++;}if(viewM<0){viewM=11;viewY--;}}
    closeDetail();renderCalendar();
  };
  const calendarRoot=$('view-cal');let eventHold;
  calendarRoot.addEventListener('pointerdown',event=>{const block=event.target.closest('.calendar-event-block');if(block)eventHold=setTimeout(()=>editTask(Number(block.dataset.taskId)),520);});
  ['pointerup','pointercancel','pointerleave'].forEach(type=>calendarRoot.addEventListener(type,()=>clearTimeout(eventHold)));
  calendarRoot.addEventListener('click',event=>{if(event.target.closest('.calendar-event-block')){event.preventDefault();event.stopPropagation();}},true);
  setInterval(()=>{if(navIndex===1)paintCalendarHero();},700);
  refreshSchedules();renderCalendar();
})();
;

/* ---- source script 16 ---- */
(function(){
  const root=document.documentElement;
  const choices={leeseoyun:'이서윤체',pretendard:'Pretendard',paperlogy:'Paperlogy'};
  function storedFont(){try{return localStorage.getItem('ordo-ui-font')}catch(e){return null}}
  function applyFont(font,persist){
    const next=choices[font]?font:'pretendard';
    root.setAttribute('data-ui-font',next);
    if(persist!==false){try{localStorage.setItem('ordo-ui-font',next)}catch(e){}}
    document.querySelectorAll('[data-font-choice]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.fontChoice===next)));
    const label=document.getElementById('font-current-label');
    if(label) label.textContent=choices[next]+' 적용 중';
    if(persist!==false&&typeof showToast==='function') showToast(choices[next]+'를 전체 화면에 적용했어요.');
  }
  function toggleFonts(){
    const panel=document.getElementById('font-options-panel');
    const toggle=document.getElementById('font-settings-toggle');
    if(!panel||!toggle)return;
    const open=panel.hidden;
    panel.hidden=!open;
    toggle.setAttribute('aria-expanded',String(open));
  }
  window.applyOrdoFont=applyFont;
  window.toggleOrdoFonts=toggleFonts;
  const themeCard=document.querySelector('#view-me .settings-card');
  if(themeCard&&!document.getElementById('font-settings-card')){
    themeCard.insertAdjacentHTML('afterend',`<section id="font-settings-card" class="card settings-card font-settings-card"><button id="font-settings-toggle" type="button" class="font-settings-toggle" onclick="toggleOrdoFonts()" aria-expanded="false" aria-controls="font-options-panel"><span><b>전체 글꼴</b><small id="font-current-label">Pretendard 적용 중</small></span><span aria-hidden="true">⌄</span></button><div id="font-options-panel" class="font-options-panel" hidden><div class="font-options" role="group" aria-label="전체 글꼴"><button type="button" class="font-choice" data-font-choice="leeseoyun" onclick="applyOrdoFont('leeseoyun',true)" aria-pressed="false"><span><b>이서윤체</b><small>일정 09:30 · 토요일</small></span><em>✓</em></button><button type="button" class="font-choice" data-font-choice="pretendard" onclick="applyOrdoFont('pretendard',true)" aria-pressed="false"><span><b>Pretendard</b><small>일정 09:30 · 토요일</small></span><em>✓</em></button><button type="button" class="font-choice" data-font-choice="paperlogy" onclick="applyOrdoFont('paperlogy',true)" aria-pressed="false"><span><b>Paperlogy</b><small>일정 09:30 · 토요일</small></span><em>✓</em></button></div></div></section>`);
  }
  applyFont(storedFont()||'pretendard',false);
})();
;

/* ---- source script 17 ---- */
(function(){
  const baseRenderCalendar=renderCalendar;
  const baseSetCalendarMode=setCalendarMode;
  const baseSwitchNav=switchNav;
  const view=document.getElementById('view-cal');
  const main=document.getElementById('main');
  let calendarWasCompacted=false;
  document.querySelectorAll('#nav .nav-item').forEach((button,index)=>button.setAttribute('aria-label',['홈','달력','모임방','나'][index]));

  function anchorDate(){
    if(selectedDate)return new Date(selectedDate+'T12:00:00');
    if(calendarAnchor instanceof Date)return new Date(calendarAnchor);
    return new Date(viewY,viewM,new Date().getDate());
  }
  function colorOf(task){return catColor(taskCategories(task)[0]);}
  function taskCard(task){
    return '<button class="calendar-event-block" data-task-id="'+task.id+'" style="--event-color:'+colorOf(task)+';background:color-mix(in srgb,'+colorOf(task)+' 34%,var(--surface))" aria-label="'+escapeHTML(task.title)+'. 길게 눌러 수정"><time>'+escapeHTML(task.time||'종일')+(task.endTime?'–'+escapeHTML(task.endTime):'')+'</time><b>'+escapeHTML(task.title)+'</b></button>';
  }
  function setHeader(text){
    const title=document.getElementById('cal-title');if(title)title.textContent=text;
    const weekdays=document.getElementById('cal-grid')?.previousElementSibling;
    if(weekdays)weekdays.classList.add('calendar-weekdays');
  }
  function renderWeekVertical(){
    const anchor=anchorDate(),start=startOfWeek(anchor),dates=Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(start.getDate()+i);return d;});
    setHeader((dates[0].getMonth()+1)+'월 '+dates[0].getDate()+'일 – '+(dates[6].getMonth()+1)+'월 '+dates[6].getDate()+'일');
    const grid=document.getElementById('cal-grid');grid.previousElementSibling.hidden=true;grid.className='week-vertical-list';
    grid.innerHTML=dates.map(date=>{const ds=dstr(date.getFullYear(),date.getMonth(),date.getDate()),list=sortedTasks(tasks.filter(t=>t.date===ds));return '<section class="week-vertical-day"><button class="week-vertical-date" data-calendar-date="'+ds+'"><small>'+WEEKDAY_KO[date.getDay()]+'요일</small><strong>'+date.getDate()+'</strong><em>'+(date.getMonth()+1)+'월</em></button><div class="week-vertical-events">'+(list.length?list.map(taskCard).join(''):'<span class="week-empty">등록된 일정이 없어요.</span>')+'</div></section>';}).join('');
    grid.querySelectorAll('[data-calendar-date]').forEach(button=>button.addEventListener('click',()=>openVerticalCalendarDay(button.dataset.calendarDate)));
    const count=dates.reduce((n,d)=>n+tasks.filter(t=>t.date===dstr(d.getFullYear(),d.getMonth(),d.getDate())).length,0);document.getElementById('month-count').textContent=count+'개';document.getElementById('month-list').innerHTML='';
  }
  function renderDayVertical(){
    const date=anchorDate(),ds=dstr(date.getFullYear(),date.getMonth(),date.getDate()),list=sortedTasks(tasks.filter(t=>t.date===ds));
    setHeader((date.getMonth()+1)+'월 '+date.getDate()+'일 '+WEEKDAY_KO[date.getDay()]+'요일');
    const grid=document.getElementById('cal-grid');grid.previousElementSibling.hidden=true;grid.className='day-vertical-list';
    grid.innerHTML='<header class="day-vertical-head"><small>'+date.getFullYear()+'년 '+(date.getMonth()+1)+'월</small><strong>'+date.getDate()+'</strong><span>'+WEEKDAY_KO[date.getDay()]+'요일 · 일정 '+list.length+'개</span></header><div class="day-vertical-events">'+(list.length?list.map(taskCard).join(''):'<div class="day-vertical-empty">이 날은 등록된 일정이 없어요.</div>')+'</div>';
    document.getElementById('month-count').textContent=list.length+'개';document.getElementById('month-list').innerHTML='';
  }
  window.openVerticalCalendarDay=function(ds){selectedDate=ds;calendarAnchor=new Date(ds+'T12:00:00');calendarMode='day';renderCalendar();};
  renderCalendar=function(){
    baseRenderCalendar();
    const weekdays=document.getElementById('cal-grid')?.previousElementSibling;if(weekdays)weekdays.classList.add('calendar-weekdays');
    if(calendarMode==='week')renderWeekVertical();
    if(calendarMode==='day')renderDayVertical();
  };
  setCalendarMode=function(mode){calendarWasCompacted=false;view.classList.remove('calendar-scroll-compact');baseSetCalendarMode(mode);};
  switchNav=function(index){baseSwitchNav(index);if(index!==1){calendarWasCompacted=false;view.classList.remove('calendar-scroll-compact');}else if(main){main.scrollTop=0;view.classList.remove('calendar-scroll-compact');}};
  if(main){
    main.addEventListener('scroll',()=>{
      if(navIndex!==1)return;
      const compact=main.scrollTop>58;
      view.classList.toggle('calendar-scroll-compact',compact);
      if(compact&&!calendarWasCompacted&&(calendarMode==='year'||calendarMode==='month')){
        calendarWasCompacted=true;
        calendarMode='week';renderCalendar();setTimeout(()=>{if(main.scrollTop>62)main.scrollTop=62;},80);setTimeout(()=>{if(main.scrollTop>62)main.scrollTop=62;},80);setTimeout(()=>{if(main.scrollTop>62)main.scrollTop=62;},80);setTimeout(()=>{if(main.scrollTop>62)main.scrollTop=62;},80);setTimeout(()=>{if(main.scrollTop>62)main.scrollTop=62;},80);requestAnimationFrame(()=>{if(main.scrollTop>62)main.scrollTop=62;});
      }
      if(!compact)calendarWasCompacted=false;
    },{passive:true});
  }
  renderCalendar();
})();
;

/* ---- source script 18 ---- */
(function(){
  const ads=[...document.querySelectorAll('.home-ad-track article,.promo-track article,.sponsor-card')];
  ads.forEach((card,index)=>{
    card.classList.add('photo-ad',index%2?'photo-ad-together':'photo-ad-desk');
  });
  const calendar=document.getElementById('view-cal');
  const hero=calendar?.querySelector('.calendar-time-hero');
  const switcher=calendar?.querySelector('.calendar-view-switch');
  if(calendar&&hero&&switcher&&!calendar.querySelector('.calendar-sticky-shell')){
    const shell=document.createElement('div');
    shell.className='calendar-sticky-shell';
    calendar.insertBefore(shell,hero);
    shell.append(hero,switcher);
  }
  function syncCalendarLegend(){
    const legend=document.getElementById('dial-legend');
    if(!legend||typeof tasks==='undefined')return;
    const date=selectedDate?new Date(selectedDate+'T12:00:00'):(calendarAnchor instanceof Date?calendarAnchor:new Date());
    const day=typeof dialAnchorStr==='function'?dialAnchorStr():(typeof dstr==='function'?dstr(date.getFullYear(),date.getMonth(),date.getDate()):date.toISOString().slice(0,10));
    const list=typeof sortedTasks==='function'?sortedTasks(tasks.filter(task=>task.date===day)):tasks.filter(task=>task.date===day);
    const markup=list.length?list.map(task=>'<span><i style="background:'+catColor(taskCategories(task)[0])+'"></i>'+escapeHTML(task.time||'종일')+' · '+escapeHTML(task.title)+'</span>').join(''):'<span><i style="background:var(--t3)"></i>이 날은 등록된 일정이 없어요.</span>';
    if(legend.innerHTML!==markup)legend.innerHTML=markup;
  }
  syncCalendarLegend();
  const legend=document.getElementById('dial-legend');
  if(legend){new MutationObserver(syncCalendarLegend).observe(legend,{childList:true,subtree:true});}
  setInterval(syncCalendarLegend,350);
})();
;