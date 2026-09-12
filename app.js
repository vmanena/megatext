const message=document.querySelector('#message');
const display=document.querySelector('#display');
const toolbar=document.querySelector('#toolbar');
const settingsButton=document.querySelector('#settingsButton');
const sizeInput=document.querySelector('#sizeInput');
const themeButton=document.querySelector('#themeButton');
const clearButton=document.querySelector('#clearButton');
const fullscreenButton=document.querySelector('#fullscreenButton');
const themeMeta=document.querySelector('meta[name="theme-color"]');

const storage={
  get(area,key){try{return window[area].getItem(key)}catch{return null}},
  set(area,key,value){try{window[area].setItem(key,value)}catch{}},
  remove(area,key){try{window[area].removeItem(key)}catch{}}
};
const keys={text:'megatext:text',size:'megatext:size',theme:'megatext:theme'};

function setToolbar(open){
  toolbar.classList.toggle('is-open',open);
  settingsButton.setAttribute('aria-expanded',String(open));
  settingsButton.querySelector('.sr-only').textContent=open?'Skrýt nastavení':'Zobrazit nastavení';
}

function resizeTextarea(fontSize){
  message.style.fontSize=`${fontSize}px`;
  message.style.height='auto';
  message.style.height=`${message.scrollHeight}px`;
}

function fits(fontSize){
  resizeTextarea(fontSize);
  const displayStyle=getComputedStyle(display);
  const availableHeight=display.clientHeight
    -parseFloat(displayStyle.paddingTop)
    -parseFloat(displayStyle.paddingBottom);
  return message.scrollWidth<=message.clientWidth+1&&message.scrollHeight<=availableHeight;
}

function fitText(){
  let low=24;
  let high=Number(sizeInput.value);
  let best=low;
  while(low<=high){
    const candidate=Math.floor((low+high)/2);
    if(fits(candidate)){best=candidate;low=candidate+1}else{high=candidate-1}
  }
  resizeTextarea(best);
}

function applyTheme(theme){
  const light=theme==='light';
  document.documentElement.dataset.theme=light?'light':'dark';
  themeButton.textContent=light?'Tmavý režim':'Světlý režim';
  themeMeta.content=light?'#ffffff':'#111827';
}

async function enterPresentation(){
  setToolbar(false);
  document.body.classList.add('is-presenting');
  message.readOnly=true;
  message.blur();
  try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen()}catch{}
  fitText();
}

async function leavePresentation(){
  document.body.classList.remove('is-presenting');
  message.readOnly=false;
  if(document.fullscreenElement){try{await document.exitFullscreen()}catch{}}
  fitText();
  message.focus({preventScroll:true});
}

settingsButton.addEventListener('click',event=>{event.stopPropagation();setToolbar(!toolbar.classList.contains('is-open'))});
document.addEventListener('click',event=>{
  if(!toolbar.classList.contains('is-open'))return;
  if(toolbar.contains(event.target)||settingsButton.contains(event.target))return;
  setToolbar(false);
});
document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  if(document.body.classList.contains('is-presenting'))leavePresentation();else setToolbar(false);
});
message.addEventListener('input',()=>{storage.set('sessionStorage',keys.text,message.value);fitText()});
sizeInput.addEventListener('input',()=>{storage.set('localStorage',keys.size,sizeInput.value);fitText()});
themeButton.addEventListener('click',()=>{
  const next=document.documentElement.dataset.theme==='light'?'dark':'light';
  storage.set('localStorage',keys.theme,next);applyTheme(next);fitText();
});
clearButton.addEventListener('click',()=>{message.value='';storage.remove('sessionStorage',keys.text);setToolbar(false);fitText();message.focus()});
fullscreenButton.addEventListener('click',enterPresentation);
display.addEventListener('click',()=>{if(document.body.classList.contains('is-presenting'))leavePresentation()});
document.addEventListener('fullscreenchange',()=>{
  if(!document.fullscreenElement&&document.body.classList.contains('is-presenting')){
    document.body.classList.remove('is-presenting');message.readOnly=false;fitText();
  }
});
window.addEventListener('resize',fitText);

const savedTheme=storage.get('localStorage',keys.theme);
applyTheme(savedTheme==='light'?'light':'dark');
const savedSize=Number(storage.get('localStorage',keys.size));
if(savedSize>=48&&savedSize<=320)sizeInput.value=String(savedSize);
message.value=storage.get('sessionStorage',keys.text)||'';
fitText();
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
