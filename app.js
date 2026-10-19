const $=id=>document.getElementById(id);

const ranges={basic:[[0x4e00,0x9fff]],a:[[0x3400,0x4dbf]],compat:[[0xf900,0xfaff]],b:[[0x20000,0x2a6df]],c:[[0x2a700,0x2b73f],[0x2b740,0x2b81f],[0x2b820,0x2ceaf],[0x2ceb0,0x2ebef],[0x30000,0x323af]]};

const dict={ni:['你','妳','尼','呢','泥','拟','妮','逆','腻','倪'],hao:['好','号','浩','豪','毫','郝','耗','昊','皓','蒿'],nihao:['你好','您好'],zhong:['中','种','重','众','钟','忠','终','仲'],zhongguo:['中国','中國'],guo:['国','國','过','果','郭','锅','裹'],xie:['谢','謝','写','写','鞋','些','协','斜'],xiexie:['谢谢','謝謝'],wo:['我','握','窝','卧','沃'],ai:['爱','愛','矮','挨','哀','碍'],woaini:['我爱你','我愛你'],shi:['是','时','時','事','市','十','使','世','式','师','師','识','識'],jie:['界','解','接','节','節','街','姐','借'],zhongwen:['中文'],hanzi:['汉字','漢字'],ren:['人','仁','认','認','任'],ma:['吗','嗎','马','馬','妈','媽'],ming:['明','名','命','鸣','鳴'],tian:['天','田','甜','添'],shui:['水','谁','誰','睡'],dian:['电','電','店','点','點'],na:['哪','那','拿','纳','納'],zai:['在','再','载','載'],bu:['不','部','步','布'],de:['的','得','地'],le:['了','乐','樂'],men:['们','們','门','門'],xue:['学','學','雪','血'],sheng:['生','声','聲','省','胜','勝'],qing:['请','請','清','情','青','轻','輕'],chi:['吃','迟','遲','持'],qu:['去','取','区','區'],lai:['来','來'],kan:['看','刊'],ting:['听','聽'],dong:['东','東','懂','动','動'],xin:['新','心','信'],fu:['服','福','复','復','付'],daxue:['大学','大學'],xuesheng:['学生','學生'],zaijian:['再见','再見'],zaoshanghao:['早上好'],wanan:['晚安'],duibuqi:['对不起','對不起'],meiguanxi:['没关系','沒關係'],qingwen:['请问','請問'],zaijian:['再见','再見']};

const details={'你':['nǐ','you'],'妳':['nǐ','you (female; traditional usage)'],'好':['hǎo / hào','good; well; to like'],'好':['hǎo','good'],'中':['zhōng / zhòng','middle; China; to hit'],'國':['guó','country; nation'],'国':['guó','country; nation'],'汉':['hàn','Han; Chinese'],'漢':['hàn','Han; Chinese'],'字':['zì','written character; word'],'人':['rén','person; people'],'我':['wǒ','I; me'],'爱':['ài','love'],'愛':['ài','love'],'你':['nǐ','you'],'谢':['xiè','to thank'],'謝':['xiè','to thank'],'水':['shuǐ','water'],'火':['huǒ','fire'],'山':['shān','mountain'],'日':['rì','sun; day'],'月':['yuè','moon; month'],'木':['mù','wood; tree'],'大':['dà','big; large'],'小':['xiǎo','small'],'天':['tiān','sky; heaven'],'学':['xué','to study; learning'],'學':['xué','to study; learning'],'文':['wén','writing; language; culture'],'龙':['lóng','dragon'],'龍':['lóng','dragon'],'马':['mǎ','horse'],'馬':['mǎ','horse'],'门':['mén','door; gate'],'門':['mén','door; gate'],'书':['shū','book'],'書':['shū','book'],'语':['yǔ','language; speech'],'語':['yǔ','language; speech'],'中':['zhōng','middle; China'],'国':['guó','country'],'國':['guó','country'],'的':['de','grammatical particle'],'是':['shì','to be; yes'],'不':['bù','no; not'],'吗':['ma','question particle'],'嗎':['ma','question particle'],'了':['le','completed action particle'],'声':['shēng','sound; voice'],'聲':['shēng','sound; voice']};

const tradMap={'汉':'漢','龙':'龍','马':'馬','门':'門','国':'國','书':'書','学':'學','语':'語','体':'體','发':'發','后':'後','云':'雲','里':'裡','台':'臺','万':'萬','听':'聽','见':'見','风':'風','东':'東','车':'車','电':'電','脑':'腦','爱':'愛','时':'時','间':'間','开':'開','关':'關','长':'長','为':'為','无':'無','对':'對','这':'這','来':'來','说':'說','话':'話','会':'會','边':'邊','头':'頭','鸟':'鳥','鱼':'魚','画':'畫','乐':'樂','气':'氣','钱':'錢','买':'買','卖':'賣','饭':'飯','馆':'館','点':'點','认':'認','识':'識','请':'請','谢':'謝','欢':'歡','难':'難','简':'簡','单':'單','实':'實','现':'現','数':'數','据':'據','机':'機','线':'線','经':'經','历':'歷','药':'藥','医':'醫','阳':'陽','阴':'陰','声':'聲','没':'沒','见':'見','种':'種','钟':'鐘','过':'過','听':'聽','写':'寫','们':'們','吗':'嗎'};

let selected='汉', atlasPage=0, atlasList=[], eccode=[];

function cp(n){return 'U+'+n.toString(16).toUpperCase().padStart(n>65535?5:4,'0')}
function isHan(n){return ranges.basic[0]&&((n>=0x3400&&n<=0x4dbf)||(n>=0x4e00&&n<=0x9fff)||(n>=0xf900&&n<=0xfaff)||(n>=0x20000&&n<=0x323af))}
function select(c){if(!c)return;
selected=c;
const n=c.codePointAt(0),d=details[c]||null;
$('spotChar').textContent=c;
$('spotTitle').firstChild.textContent=c+' ';
$('traditional').textContent=tradMap[c]||c;
$('pinyin').textContent=d?d[0]:'Pronunciation not available in the bundled mini-dictionary';
$('meaning').textContent=d?d[1]:'Use Play pronunciation to hear the character if a Chinese speech voice is available.';
$('unicode').textContent=cp(n);
$('metaUnicode').textContent=cp(n);
$('entity').textContent='&#'+n+';';
$('utf8').textContent=[...new TextEncoder().encode(c)].map(x=>x.toString(16).toUpperCase().padStart(2,'0')).join(' ');
$('variant').textContent=tradMap[c]&&tradMap[c]!==c?'SIMPLIFIED / TRADITIONAL':'HAN CHARACTER';
document.querySelectorAll('.result-card,.atlas button').forEach(b=>b.classList.toggle('active',b.dataset.char===c));
}
function speak(c=selected){if(!('speechSynthesis'in window)){alert('Speech is not supported in this browser.');
return}speechSynthesis.cancel();
const u=new SpeechSynthesisUtterance(c);
u.lang='zh-CN';
u.rate=.78;
const vs=speechSynthesis.getVoices();
u.voice=vs.find(v=>/^zh[-_](CN|TW|HK)/i.test(v.lang))||vs.find(v=>/Chinese|中文|Mandarin/i.test(v.name))||null;
speechSynthesis.speak(u)}
function resultCards(list){const box=$('results');
box.innerHTML='';
if(!list.length){box.innerHTML='<div class="empty-state"><span>字</span><b>No local Pinyin match</b><small>Paste the Chinese character, use your computer’s Chinese IME, or browse the atlas below.</small></div>';
$('count').textContent='0 results';
return}list.slice(0,40).forEach(c=>{const b=document.createElement('button');
b.className='result-card';
b.dataset.char=c;
b.innerHTML=`<span class="glyph"></span><small></small>`;
b.querySelector('.glyph').textContent=c;
b.querySelector('small').textContent=(details[c]||[])[0]||cp(c.codePointAt(0));
b.onclick=()=>select(c);
box.appendChild(b)});
$('count').textContent=list.length+' result'+(list.length===1?'':'s');
select(list[0]);
}
function processEntry(){const raw=$('entry').value.trim().toLowerCase();
if(!raw){$('resultTitle').textContent='Ready when you are';
resultCards([]);
return} $('resultTitle').textContent='Matching characters';
const uni=raw.match(/^u\+([0-9a-f]{1,6})$/i);
if(uni){const n=parseInt(uni[1],16);
resultCards(n<=0x10ffff?[String.fromCodePoint(n)]:[]);
return}if(/[\u3400-\u9fff\uf900-\ufaff\u{20000}-\u{323af}]/u.test(raw)){resultCards([...new Set([...raw].filter(c=>isHan(c.codePointAt(0))))]);
return}const key=raw.replace(/[^a-z]/g,'');
let found=dict[key]||[];
if(!found.length&&key.length>=1){for(const [k,v] of Object.entries(dict)){if(k.startsWith(key))found.push(...v)}found=[...new Set(found)].slice(0,30)}resultCards(found)}
function renderAtlas(){const key=$('range').value,blocks=ranges[key]||ranges.basic;
atlasList=[];
blocks.forEach(([a,b])=>{for(let n=a;
n<=b;
n++)if(isHan(n))atlasList.push(String.fromCodePoint(n))});
const size=140,start=atlasPage*size,slice=atlasList.slice(start,start+size);
$('atlas').innerHTML='';
slice.forEach(c=>{const b=document.createElement('button');
b.textContent=c;
b.dataset.char=c;
b.title=cp(c.codePointAt(0));
b.onclick=()=>{select(c);
$('resultTitle').textContent='Selected from atlas';
resultCards([c]);
window.scrollTo({top:0,behavior:'smooth'})};
$('atlas').appendChild(b)});
$('atlasInfo').textContent=`${(start+1).toLocaleString()}–${Math.min(start+size,atlasList.length).toLocaleString()} of ${atlasList.length.toLocaleString()} code points in this block`;
 $('prev').disabled=atlasPage===0;
$('next').disabled=start+size>=atlasList.length}
function insert(){const e=$('editor'),a=e.selectionStart,b=e.selectionEnd;
e.value=e.value.slice(0,a)+selected+e.value.slice(b);
e.focus();
e.selectionStart=e.selectionEnd=a+selected.length;
stats()}
function stats(){$('stats').textContent=[...$('editor').value].length+' characters · '+new TextEncoder().encode($('editor').value).length+' bytes'}
async function loadEccode(){try{const r=await fetch('eccode-data.json');
eccode=await r.json()}catch(e){eccode=[]}}
function searchEccode(){const q=$('eccodeSearch').value.trim().toLowerCase(),box=$('eccodeResults');
if(!eccode.length){box.textContent='ECCode data did not load. Run the app through python3 run_app.py.';
return}const found=eccode.filter(x=>Object.values(x).some(v=>String(v??'').toLowerCase().includes(q))).slice(0,20);
box.innerHTML='';
if(!found.length){box.textContent='No matching ECCode records.';
return}found.forEach(x=>{const c=x.character||x.char||x['汉字']||x['字符']||'';
const b=document.createElement('button');
b.className='eccode-item';
const strong=document.createElement('strong');
strong.textContent=c||'字';
const span=document.createElement('span');
span.textContent=Object.entries(x).filter(([k,v])=>v&&k!=='character').slice(0,4).map(([k,v])=>k+': '+v).join(' · ');
b.append(strong,span);
b.onclick=()=>select(c);
box.appendChild(b)})}
$('entry').addEventListener('input',()=>{clearTimeout(window.ecTimer);
window.ecTimer=setTimeout(processEntry,100)});
$('entry').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();
processEntry();
if(selected)speak(selected)}});
$('clear').onclick=()=>{$('entry').value='';
processEntry();
$('entry').focus()};
$('hearInput').onclick=()=>speak($('entry').value.trim()||selected);
document.querySelectorAll('[data-word]').forEach(b=>b.onclick=()=>{$('entry').value=b.dataset.word;
processEntry()});
$('speak').onclick=()=>speak();
$('insert').onclick=insert;
$('copy').onclick=()=>navigator.clipboard.writeText(selected);
$('copyText').onclick=()=>navigator.clipboard.writeText($('editor').value);
$('clearText').onclick=()=>{$('editor').value='';
stats()};
$('editor').addEventListener('input',stats);
$('range').onchange=()=>{atlasPage=0;
renderAtlas()};
$('prev').onclick=()=>{if(atlasPage>0)atlasPage--;
renderAtlas()};
$('next').onclick=()=>{atlasPage++;
renderAtlas()};
$('eccodeGo').onclick=searchEccode;
$('eccodeSearch').onkeydown=e=>{if(e.key==='Enter')searchEccode()};

renderAtlas();
select('汉');
loadEccode();

