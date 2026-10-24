'use strict';
const $ = id => document.getElementById(id);
let records = [];
let selected = null;
let visibleLimit = 100;
let currentMatches = [];
const codeOf = r => String(r.code ?? '').trim();
const soundOf = r => String(r.sheng ?? '').trim();
const shapeOf = r => Array.isArray(r.shape) ? r.shape.join('') : String(r.shape ?? '').trim();
const gbkOf = r => String(r.gbk ?? '').trim();
const unicodeOf = r => String(r.unicode ?? '').replace(/^U\+/i, '').trim().toUpperCase();
const characterOf = r => { const value = unicodeOf(r); const point = Number.parseInt(value, 16); return value && Number.isFinite(point) && point >= 0 && point <= 0x10FFFF ? String.fromCodePoint(point) : ''; };
const pinyinOf = r => {
  const character = characterOf(r);
  try { return character && window.pinyinPro?.pinyin ? window.pinyinPro.pinyin(character, { toneType: 'symbol', type: 'string' }) : ''; } catch { return ''; }
};
function playCharacter(record) {
  const character = characterOf(record);
  const pinyin = pinyinOf(record);
  if (!character) { setStatus('No Chinese character is available for this record', false); return; }
  if (!('speechSynthesis' in window)) { setStatus('Chinese speech playback is not supported by this browser', false); return; }
  // Speak the actual Chinese character using a Chinese voice. Never send the EC code
  // or romanized Pinyin to speech synthesis, which can read it as English letters.
  const voices = window.speechSynthesis.getVoices();
  const chineseVoice = voices.find(voice => /^zh[-_]CN\b/i.test(voice.lang))
    || voices.find(voice => /^zh[-_]Hans\b/i.test(voice.lang))
    || voices.find(voice => /^zh/i.test(voice.lang));
  if (!chineseVoice) {
    setStatus('No Chinese voice is available. Install or enable a Mandarin Chinese voice in your system/browser.', false);
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(character);
  utterance.voice = chineseVoice;
  utterance.lang = chineseVoice.lang || 'zh-CN';
  utterance.rate = 0.82;
  utterance.onstart = () => setStatus(`Mandarin pronunciation: ${character}${pinyin ? ` · ${pinyin}` : ''}`);
  utterance.onend = () => setStatus(`${records.length.toLocaleString()} records ready`);
  utterance.onerror = () => setStatus('Chinese speech playback failed. Check your Mandarin voice settings.', false);
  window.speechSynthesis.speak(utterance);
}
const codeSearchFields = r => [codeOf(r), soundOf(r), shapeOf(r)].filter(Boolean);
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function setStatus(message, ok = true) {
  $('loadStatus').textContent = message;
  $('footerStatus').textContent = message;
  document.querySelector('.status-dot').style.background = ok ? '#45cfa1' : '#ff817f';
}
function selectRecord(record) {
  selected = record;
  const character = characterOf(record);
  const pinyin = pinyinOf(record);
  $('detailEmblem').textContent = character || '—';
  $('detailCode').textContent = character || 'Character unavailable';
  $('detailPinyin').textContent = pinyin || 'Pinyin loading…';
  $('detailSub').textContent = `ECCode ${codeOf(record) || '—'} · Record ${records.indexOf(record) + 1} of ${records.length}`;
  $('fieldCode').textContent = codeOf(record) || '—';
  $('fieldSound').textContent = soundOf(record) || '—';
  $('fieldShape').textContent = shapeOf(record) || '—';
  $('fieldGbk').textContent = gbkOf(record) || '—';
  $('fieldUnicode').textContent = unicodeOf(record) ? `U+${unicodeOf(record)}` : '—';
  $('copyCode').disabled = !codeOf(record);
  $('copyDetails').disabled = false;
  $('playSearchCharacter').disabled = !character;
  $('playDetailCharacter').disabled = !character;
  document.querySelectorAll('.result-item').forEach(el => el.classList.toggle('active', Number(el.dataset.index) === records.indexOf(record)));
}
function renderMatches() {
  const box = $('resultsList');
  box.innerHTML = '';
  $('resultCount').textContent = `${currentMatches.length.toLocaleString()} match${currentMatches.length === 1 ? '' : 'es'}`;
  if (!currentMatches.length) {
    $('resultsTitle').textContent = 'No matching ECCode';
    $('resultsMeta').textContent = 'Try a different code or code component.';
    box.innerHTML = '<div class="empty-state"><div class="empty-orbit"><span>EC</span></div><strong>No matching code found</strong><p>Check the code and try again.</p></div>';
    $('showMore').hidden = true;
    return;
  }
  $('resultsTitle').textContent = 'Matching ECCode records';
  $('resultsMeta').textContent = `Showing ${Math.min(visibleLimit, currentMatches.length).toLocaleString()} of ${currentMatches.length.toLocaleString()}`;
  currentMatches.slice(0, visibleLimit).forEach(record => {
    const index = records.indexOf(record);
    const entry = document.createElement('div'); entry.className = 'result-entry';
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'result-item'; button.dataset.index = String(index); button.setAttribute('aria-label', `Select and hear Chinese character ${characterOf(record) || ''}`.trim());
    const mark = document.createElement('span'); mark.className = 'result-code-mark'; mark.textContent = characterOf(record) || '—';
    const copy = document.createElement('span'); copy.className = 'result-copy';
    const code = document.createElement('strong'); code.textContent = codeOf(record) || 'Uncoded record';
    const pinyin = document.createElement('small'); pinyin.className = 'result-pinyin'; pinyin.textContent = pinyinOf(record) || 'Pinyin loading…';
    const meta = document.createElement('small'); meta.textContent = `Sound code ${soundOf(record) || '—'} · Shape ${shapeOf(record) || '—'}`;
    copy.append(code, pinyin, meta); button.append(mark, copy); button.addEventListener('click', () => { selectRecord(record); playCharacter(record); });
    entry.append(button); box.append(entry);
  });
  $('showMore').hidden = currentMatches.length <= visibleLimit;
  if (!selected || !currentMatches.includes(selected)) selectRecord(currentMatches[0]);
}
function search() {
  const q = $('codeSearch').value.trim().toLowerCase();
  if (!q) {
    currentMatches = [];
    $('resultCount').textContent = '0 matches';
    $('resultsTitle').textContent = 'Enter a code to begin';
    $('resultsMeta').textContent = 'All records stay hidden until you search.';
    $('resultsList').innerHTML = '<div class="empty-state"><div class="empty-orbit"><span>EC</span></div><strong>Ready for your code</strong><p>Type above to reveal matching ECCode records.</p></div>';
    $('showMore').hidden = true;
    return;
  }
  if (!records.length) return;
  currentMatches = records.filter(r => codeSearchFields(r).some(value => value.toLowerCase().includes(q)));
  visibleLimit = 100;
  renderMatches();
}
function copyText(text) {
  if (!text) return;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => setStatus('Copied to clipboard')).catch(() => fallbackCopy(text));
  } else fallbackCopy(text);
}
function fallbackCopy(text) {
  const input = document.createElement('textarea'); input.value = text; input.style.position = 'fixed'; input.style.opacity = '0'; document.body.append(input); input.select();
  try { document.execCommand('copy'); setStatus('Copied to clipboard'); } catch { setStatus('Copy unavailable', false); }
  input.remove();
}
function detailText() {
  if (!selected) return '';
  return [`Character: ${characterOf(selected) || '—'}`, `Pinyin: ${pinyinOf(selected) || 'unavailable'}`, `ECCode: ${codeOf(selected)}`, `Sound component: ${soundOf(selected) || '—'}`, `Shape component: ${shapeOf(selected) || '—'}`, `GBK value: ${gbkOf(selected) || '—'}`, `Unicode value: ${unicodeOf(selected) ? 'U+' + unicodeOf(selected) : '—'}`].join('\n');
}
async function loadData() {
  try {
    const response = await fetch('./eccode-data.json');
    if (!response.ok) throw new Error(`Dataset request failed (${response.status})`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Dataset format is invalid');
    records = data.filter(r => codeOf(r));
    const unique = new Set(records.map(codeOf));
    $('statLoaded').textContent = records.length.toLocaleString();
    $('statUnique').textContent = unique.size.toLocaleString();
    $('datasetCount').textContent = `${records.length.toLocaleString()} records`;
    setStatus(`${records.length.toLocaleString()} records ready`);
    $('resultsList').innerHTML = '<div class="empty-state"><div class="empty-orbit"><span>EC</span></div><strong>Ready for your code</strong><p>Type above to reveal matching ECCode records.</p></div>';
    if ($('codeSearch').value.trim()) search();
  } catch (error) {
    console.error(error); setStatus('Data failed to load', false);
    $('resultsTitle').textContent = 'ECCode data unavailable';
    $('resultsMeta').textContent = 'Start the local app using run_app.py and refresh.';
    $('resultsList').innerHTML = '<div class="empty-state"><div class="empty-orbit"><span>!</span></div><strong>Could not load ECCode data</strong><p>Run python3 run_app.py from the project folder, then refresh this page.</p></div>';
  }
}
$('codeSearch').addEventListener('input', search);
document.querySelectorAll('[data-query]').forEach(button => button.addEventListener('click', () => { $('codeSearch').value = button.dataset.query; search(); $('codeSearch').focus(); }));
$('showMore').addEventListener('click', () => { visibleLimit += 100; renderMatches(); });
$('copyCode').addEventListener('click', () => selected && copyText(codeOf(selected)));
$('playSearchCharacter').addEventListener('click', () => selected && playCharacter(selected));
$('playDetailCharacter').addEventListener('click', () => selected && playCharacter(selected));
$('copyDetails').addEventListener('click', () => copyText(detailText()));
window.addEventListener('load', () => { if (currentMatches.length) renderMatches(); });
loadData();
