const { spawnSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

const CHROME = 'C:\\Users\\fuzmaster\\AppData\\Local\\ms-playwright\\chromium-1217\\chrome-win64\\chrome.exe';
const IMAGES = 'C:\\Sites\\New Portfolio\\.claude\\worktrees\\elastic-bassi-9399e1\\images';
const TMP    = 'C:\\Sites\\New Portfolio\\.claude\\worktrees\\elastic-bassi-9399e1';

const STYLE = `<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#060810;font-family:'JetBrains Mono','Fira Code','SF Mono',monospace;padding:0;}
.panel{width:760px;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);
  box-shadow:0 24px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(0,255,200,0.06);background:#0d1117;}
.titlebar{display:flex;align-items:center;gap:10px;padding:10px 16px;background:#161b22;border-bottom:1px solid rgba(255,255,255,0.06);}
.dot{width:12px;height:12px;border-radius:50%;flex-shrink:0;}
.dot-r{background:#ff5f57;}.dot-y{background:#febc2e;}.dot-g{background:#28c840;}
.filename{font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.04em;margin-left:8px;}
.badge{margin-left:auto;font-size:10px;padding:2px 8px;border-radius:10px;border:1px solid rgba(0,255,200,0.25);color:rgba(0,255,200,0.65);letter-spacing:0.08em;text-transform:uppercase;}
pre{padding:22px 24px;font-size:12.5px;line-height:1.75;overflow:hidden;tab-size:2;}
.k{color:#ff7b72;}.t{color:#79c0ff;}.f{color:#d2a8ff;}.s{color:#a5d6ff;}.n{color:#e6edf3;}
.c{color:#8b949e;}.p{color:#e6edf3;}.v{color:#ffa657;}.m{color:#79c0ff;}.num{color:#79c0ff;}
.cy{color:#00ffc8;}.dim{color:rgba(230,237,243,0.35);}
</style>`;

const DOTS = `<span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span>`;

const code = `<span class="c">// the entire model is one pure function — no server, no DB</span>
<span class="k">const</span> <span class="cy">SCALE_COEFFICIENTS</span><span class="p">:</span> <span class="t">Record</span><span class="p">&lt;</span><span class="t">Scale</span><span class="p">,</span> <span class="t">number</span><span class="p">&gt;</span> <span class="p">= {</span>
  <span class="v">O</span><span class="p">:</span> <span class="num">60</span><span class="p">,</span> <span class="v">S</span><span class="p">:</span> <span class="num">43</span><span class="p">,</span> <span class="v">HO</span><span class="p">:</span> <span class="num">32</span><span class="p">,</span> <span class="v">N</span><span class="p">:</span> <span class="num">17</span><span class="p">,</span> <span class="v">Z</span><span class="p">:</span> <span class="num">12</span><span class="p">,</span>  <span class="c">// John Allen's drag rule</span>
<span class="p">};</span>

<span class="k">export function</span> <span class="f">calculateHelix</span><span class="p">(</span><span class="v">state</span><span class="p">:</span> <span class="t">HelixState</span><span class="p">) {</span>
  <span class="k">const</span> <span class="v">risePerTurn</span>        <span class="p">=</span> <span class="v">clearance</span> <span class="p">+</span> <span class="v">track</span> <span class="p">+</span> <span class="v">roadbed</span> <span class="p">+</span> <span class="v">deck</span> <span class="p">+</span> <span class="v">safety</span><span class="p">;</span>
  <span class="k">const</span> <span class="v">trackLengthPerTurn</span> <span class="p">=</span> <span class="num">2</span> <span class="p">*</span> <span class="t">Math</span><span class="p">.</span><span class="cy">PI</span> <span class="p">*</span> <span class="v">radius</span><span class="p">;</span>
  <span class="k">const</span> <span class="v">rawGrade</span>           <span class="p">= (</span><span class="v">risePerTurn</span> <span class="p">/</span> <span class="v">trackLengthPerTurn</span><span class="p">) *</span> <span class="num">100</span><span class="p">;</span>

  <span class="c">// curve drag = scale coefficient ÷ radius, added to raw grade</span>
  <span class="k">const</span> <span class="v">curveDragGrade</span>     <span class="p">=</span> <span class="cy">SCALE_COEFFICIENTS</span><span class="p">[</span><span class="v">state</span><span class="p">.</span><span class="v">scale</span><span class="p">] /</span> <span class="v">radius</span><span class="p">;</span>
  <span class="k">const</span> <span class="cy">effectiveGrade</span>     <span class="p">=</span> <span class="v">rawGrade</span> <span class="p">+</span> <span class="v">curveDragGrade</span><span class="p">;</span>

  <span class="k">let</span> <span class="v">verdict</span><span class="p">:</span> <span class="t">Verdict</span><span class="p">;</span>
  <span class="k">if</span>      <span class="p">(</span><span class="cy">effectiveGrade</span> <span class="p">&lt;=</span> <span class="num">2.0</span><span class="p">)</span>  <span class="v">verdict</span> <span class="p">=</span> <span class="s">'Looks Good'</span><span class="p">;</span>
  <span class="k">else if</span> <span class="p">(</span><span class="cy">effectiveGrade</span> <span class="p">&lt;=</span> <span class="num">2.75</span><span class="p">)</span> <span class="v">verdict</span> <span class="p">=</span> <span class="s">'Proceed with Caution'</span><span class="p">;</span>
  <span class="k">else if</span> <span class="p">(</span><span class="cy">effectiveGrade</span> <span class="p">&lt;=</span> <span class="num">3.5</span><span class="p">)</span>  <span class="v">verdict</span> <span class="p">=</span> <span class="s">'Risky'</span><span class="p">;</span>
  <span class="k">else</span>                            <span class="v">verdict</span> <span class="p">=</span> <span class="s">'High Risk'</span><span class="p">;</span>

  <span class="k">return</span> <span class="p">{</span> <span class="cy">effectiveGrade</span><span class="p">,</span> <span class="v">curveDragGrade</span><span class="p">,</span> <span class="v">verdict</span> <span class="p">};</span>
<span class="p">}</span>`;

const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>${STYLE}</head>
<body><div class="panel">
<div class="titlebar">${DOTS}<span class="filename">lib/helix.ts</span><span class="badge">Next.js · TypeScript</span></div>
<pre>${code}</pre>
</div></body></html>`;

const tmpFile = path.join(TMP, '_tmp_helix.html');
fs.writeFileSync(tmpFile, html, 'utf8');

const outPath = path.join(IMAGES, 'code-helix.png');
const res = spawnSync(CHROME, [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
  '--window-size=780,640',
  `--screenshot=${outPath}`,
  '--default-background-color=060810',
  `file:///${tmpFile.replace(/\\/g, '/')}`,
], { timeout: 20000 });

if (res.error) console.error('error:', res.error.message);
else if (!fs.existsSync(outPath)) console.error('not created. stderr:', (res.stderr||'').toString().slice(0,300));
else console.log(`OK code-helix.png (${fs.statSync(outPath).size} bytes)`);

fs.unlinkSync(tmpFile);
