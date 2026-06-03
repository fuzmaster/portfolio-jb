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

const panels = [
  {
    out: 'code-podcast-pipeline.png',
    filename: 'pipeline/transcript-to-clips.ts',
    badge: 'Remotion · Zod',
    code: `<span class="k">import</span> <span class="p">{</span> <span class="t">renderMedia</span><span class="p">,</span> <span class="t">selectComposition</span> <span class="p">}</span> <span class="k">from</span> <span class="s">'@remotion/renderer'</span><span class="p">;</span>
<span class="k">import</span> <span class="p">{</span> <span class="v">segmentSchema</span> <span class="p">}</span> <span class="k">from</span> <span class="s">'./schemas/segment'</span><span class="p">;</span>
<span class="k">import</span> <span class="p">{</span> <span class="f">parseTranscript</span> <span class="p">}</span> <span class="k">from</span> <span class="s">'./parsers/srt'</span><span class="p">;</span>

<span class="k">export async function</span> <span class="f">buildClips</span><span class="p">(</span>
  <span class="v">srtPath</span><span class="p">:</span> <span class="t">string</span><span class="p">,</span>
  <span class="v">branding</span><span class="p">:</span> <span class="t">BrandConfig</span>
<span class="p">) {</span>
  <span class="k">const</span> <span class="v">raw</span>       <span class="p">=</span> <span class="k">await</span> <span class="f">parseTranscript</span><span class="p">(</span><span class="v">srtPath</span><span class="p">);</span>
  <span class="k">const</span> <span class="cy">segments</span>  <span class="p">=</span> <span class="v">segmentSchema</span><span class="p">.</span><span class="m">parse</span><span class="p">(</span><span class="v">raw</span><span class="p">);</span>   <span class="c">// throws on bad data</span>

  <span class="k">for</span> <span class="p">(</span><span class="k">const</span> <span class="v">clip</span> <span class="k">of</span> <span class="cy">segments</span><span class="p">) {</span>
    <span class="k">const</span> <span class="v">comp</span> <span class="p">=</span> <span class="k">await</span> <span class="f">selectComposition</span><span class="p">({</span>
      <span class="v">serveUrl</span><span class="p">:</span> <span class="v">bundleUrl</span><span class="p">,</span>  <span class="v">id</span><span class="p">:</span> <span class="s">'PodcastClip'</span><span class="p">,</span>
      <span class="v">inputProps</span><span class="p">:</span> <span class="p">{</span> <span class="v">clip</span><span class="p">,</span> <span class="v">branding</span> <span class="p">},</span>
    <span class="p">});</span>
    <span class="k">await</span> <span class="f">renderMedia</span><span class="p">({</span>
      <span class="v">composition</span><span class="p">:</span> <span class="v">comp</span><span class="p">,</span>
      <span class="v">outputLocation</span><span class="p">:</span> <span class="s">\`./dist/\${clip.id}.mp4\`</span><span class="p">,</span>
      <span class="v">codec</span><span class="p">:</span> <span class="s">'h264'</span><span class="p">,</span>
    <span class="p">});</span>
  <span class="p">}</span>
<span class="p">}</span>`
  },
  {
    out: 'code-retention-dashboard.png',
    filename: 'dashboard/retention-map.ts',
    badge: 'TypeScript · Analytics',
    code: `<span class="k">interface</span> <span class="t">WatchPoint</span> <span class="p">{</span>
  <span class="v">timestamp</span><span class="p">:</span> <span class="t">number</span><span class="p">;</span>
  <span class="v">retentionPct</span><span class="p">:</span> <span class="t">number</span><span class="p">;</span>
<span class="p">}</span>
<span class="k">type</span> <span class="t">EditSignal</span> <span class="p">=</span> <span class="s">'cut'</span> <span class="p">|</span> <span class="s">'keep'</span> <span class="p">|</span> <span class="s">'retime'</span><span class="p">;</span>

<span class="k">interface</span> <span class="t">RetentionSignal</span> <span class="p">{</span>
  <span class="v">timestamp</span><span class="p">:</span>    <span class="t">number</span><span class="p">;</span>
  <span class="v">dropOffRate</span><span class="p">:</span>  <span class="t">number</span><span class="p">;</span>
  <span class="cy">editDecision</span><span class="p">:</span> <span class="t">EditSignal</span><span class="p">;</span>
<span class="p">}</span>

<span class="k">export const</span> <span class="f">mapRetentionSignals</span> <span class="p">= (</span>
  <span class="v">points</span><span class="p">:</span> <span class="t">WatchPoint</span><span class="p">[]</span>
<span class="p">):</span> <span class="t">RetentionSignal</span><span class="p">[]</span> <span class="p">=></span>
  <span class="v">points</span><span class="p">.</span><span class="m">map</span><span class="p">(({</span> <span class="v">timestamp</span><span class="p">,</span> <span class="v">retentionPct</span> <span class="p">}) =></span> <span class="p">({</span>
    <span class="v">timestamp</span><span class="p">,</span>
    <span class="v">dropOffRate</span><span class="p">:</span> <span class="num">1</span> <span class="p">-</span> <span class="v">retentionPct</span><span class="p">,</span>
    <span class="cy">editDecision</span><span class="p">:</span> <span class="v">retentionPct</span> <span class="p">&lt;</span> <span class="num">0.4</span> <span class="p">?</span> <span class="s">'cut'</span>
      <span class="p">:</span> <span class="v">retentionPct</span> <span class="p">&lt;</span> <span class="num">0.65</span> <span class="p">?</span> <span class="s">'retime'</span> <span class="p">:</span> <span class="s">'keep'</span><span class="p">,</span>
  <span class="p">}));</span>`
  },
  {
    out: 'code-genera-reels.png',
    filename: 'schemas/reel-payload.ts',
    badge: 'Zod · React · Remotion',
    code: `<span class="k">import</span> <span class="p">{</span> <span class="t">z</span> <span class="p">}</span> <span class="k">from</span> <span class="s">'zod'</span><span class="p">;</span>

<span class="k">export const</span> <span class="cy">ReelSchema</span> <span class="p">=</span> <span class="v">z</span><span class="p">.</span><span class="m">object</span><span class="p">({</span>
  <span class="v">project</span><span class="p">:</span>  <span class="v">z</span><span class="p">.</span><span class="m">string</span><span class="p">().</span><span class="m">min</span><span class="p">(</span><span class="num">1</span><span class="p">),</span>
  <span class="v">artist</span><span class="p">:</span>   <span class="v">z</span><span class="p">.</span><span class="m">array</span><span class="p">(</span><span class="v">z</span><span class="p">.</span><span class="m">string</span><span class="p">()),</span>
  <span class="v">ctaText</span><span class="p">:</span>  <span class="v">z</span><span class="p">.</span><span class="m">enum</span><span class="p">([</span><span class="s">'LISTEN ON'</span><span class="p">,</span> <span class="s">'STREAM ON'</span><span class="p">,</span> <span class="s">'OUT NOW ON'</span><span class="p">]),</span>
  <span class="v">reelType</span><span class="p">:</span> <span class="v">z</span><span class="p">.</span><span class="m">enum</span><span class="p">([</span><span class="s">'Driving'</span><span class="p">,</span> <span class="s">'Artwork'</span><span class="p">,</span> <span class="s">'Anytime'</span><span class="p">]),</span>
  <span class="v">timing</span><span class="p">:</span>   <span class="v">z</span><span class="p">.</span><span class="m">object</span><span class="p">({</span>
    <span class="v">clipDuration</span><span class="p">:</span> <span class="v">z</span><span class="p">.</span><span class="m">number</span><span class="p">().</span><span class="m">min</span><span class="p">(</span><span class="num">15</span><span class="p">).</span><span class="m">max</span><span class="p">(</span><span class="num">60</span><span class="p">),</span>
    <span class="v">audioStart</span><span class="p">:</span>  <span class="v">z</span><span class="p">.</span><span class="m">string</span><span class="p">().</span><span class="m">regex</span><span class="p">(</span><span class="s">/^\d{2}:\d{2}:\d{2}$/</span><span class="p">),</span>
    <span class="v">syncFootage</span><span class="p">:</span> <span class="v">z</span><span class="p">.</span><span class="m">boolean</span><span class="p">().</span><span class="m">default</span><span class="p">(</span><span class="k">false</span><span class="p">),</span>
  <span class="p">}),</span>
<span class="p">});</span>
<span class="k">export type</span> <span class="t">ReelPayload</span> <span class="p">=</span> <span class="v">z</span><span class="p">.</span><span class="m">infer</span><span class="p">&lt;</span><span class="k">typeof</span> <span class="cy">ReelSchema</span><span class="p">&gt;;</span>
<span class="k">export const</span> <span class="f">validatePayload</span> <span class="p">= (</span><span class="v">raw</span><span class="p">:</span> <span class="t">unknown</span><span class="p">):</span> <span class="t">ReelPayload</span> <span class="p">=></span>
  <span class="cy">ReelSchema</span><span class="p">.</span><span class="m">parse</span><span class="p">(</span><span class="v">raw</span><span class="p">);</span>`
  },
  {
    out: 'code-keep7.png',
    filename: 'src/parsers/normalizeCards.ts',
    badge: 'TypeScript · Algorithms',
    code: `<span class="k">interface</span> <span class="t">Card</span> <span class="p">{</span>
  <span class="v">quantity</span><span class="p">:</span> <span class="t">number</span><span class="p">;</span>
  <span class="v">name</span><span class="p">:</span>     <span class="t">string</span><span class="p">;</span>
<span class="p">}</span>

<span class="k">export const</span> <span class="f">normalizeCards</span> <span class="p">= (</span><span class="v">rawText</span><span class="p">:</span> <span class="t">string</span><span class="p">):</span> <span class="t">Card</span><span class="p">[]</span> <span class="p">=></span> <span class="p">{</span>
  <span class="k">const</span> <span class="v">lines</span> <span class="p">=</span> <span class="v">rawText</span><span class="p">.</span><span class="m">split</span><span class="p">(</span><span class="s">/\r?\n/</span><span class="p">);</span>

  <span class="k">return</span> <span class="v">lines</span><span class="p">.</span><span class="m">flatMap</span><span class="p">((</span><span class="v">line</span><span class="p">) =></span> <span class="p">{</span>
    <span class="k">const</span> <span class="v">trimmed</span> <span class="p">=</span> <span class="v">line</span><span class="p">.</span><span class="m">trim</span><span class="p">();</span>
    <span class="k">if</span> <span class="p">(!</span><span class="v">trimmed</span><span class="p">)</span> <span class="k">return</span> <span class="p">[];</span>

    <span class="c">// Match: "4 Lightning Bolt" or "1 Black Lotus"</span>
    <span class="k">const</span> <span class="v">match</span> <span class="p">=</span> <span class="v">trimmed</span><span class="p">.</span><span class="m">match</span><span class="p">(</span><span class="s">/^(\d+)\s+(.+)$/</span><span class="p">);</span>
    <span class="k">if</span> <span class="p">(!</span><span class="v">match</span><span class="p">)</span> <span class="k">return</span> <span class="p">[];</span>

    <span class="k">return</span> <span class="p">[{</span>
      <span class="v">quantity</span><span class="p">:</span> <span class="v">parseInt</span><span class="p">(</span><span class="v">match</span><span class="p">[</span><span class="num">1</span><span class="p">],</span> <span class="num">10</span><span class="p">),</span>
      <span class="cy">name</span><span class="p">:</span>     <span class="v">match</span><span class="p">[</span><span class="num">2</span><span class="p">].</span><span class="m">trim</span><span class="p">(),</span>
    <span class="p">}];</span>
  <span class="p">});</span>
<span class="p">};</span>`
  },
  {
    out: 'code-blackjack.png',
    filename: 'src/reducers/gameReducer.ts',
    badge: 'Redux · State Machines',
    code: `<span class="k">export function</span> <span class="f">gameReducer</span><span class="p">(</span>
  <span class="v">state</span><span class="p">:</span> <span class="t">GameState</span><span class="p">,</span>  <span class="v">action</span><span class="p">:</span> <span class="t">GameAction</span>
<span class="p">):</span> <span class="t">GameState</span> <span class="p">{</span>
  <span class="k">switch</span> <span class="p">(</span><span class="v">action</span><span class="p">.</span><span class="v">type</span><span class="p">) {</span>
    <span class="k">case</span> <span class="s">'PLAYER_HIT'</span><span class="p">:</span> <span class="p">{</span>
      <span class="c">// Guard: no hits allowed outside PLAYER_TURN</span>
      <span class="k">if</span> <span class="p">(</span><span class="v">state</span><span class="p">.</span><span class="v">gamePhase</span> <span class="p">!==</span> <span class="s">'PLAYER_TURN'</span><span class="p">)</span> <span class="k">return</span> <span class="v">state</span><span class="p">;</span>

      <span class="k">const</span> <span class="v">newDeck</span>      <span class="p">=</span> <span class="p">[...</span><span class="v">state</span><span class="p">.</span><span class="v">deck</span><span class="p">];</span>
      <span class="k">const</span> <span class="v">drawnCard</span>    <span class="p">=</span> <span class="v">newDeck</span><span class="p">.</span><span class="m">pop</span><span class="p">();</span>
      <span class="k">const</span> <span class="cy">newPlayerHand</span> <span class="p">=</span> <span class="p">[...</span><span class="v">state</span><span class="p">.</span><span class="v">playerHand</span><span class="p">,</span> <span class="v">drawnCard</span><span class="p">];</span>
      <span class="k">const</span> <span class="v">handValue</span>    <span class="p">=</span> <span class="f">calcHandValue</span><span class="p">(</span><span class="cy">newPlayerHand</span><span class="p">);</span>

      <span class="k">return</span> <span class="p">{</span>
        <span class="p">...</span><span class="v">state</span><span class="p">,</span>
        <span class="v">deck</span><span class="p">:</span>       <span class="v">newDeck</span><span class="p">,</span>
        <span class="v">playerHand</span><span class="p">:</span> <span class="cy">newPlayerHand</span><span class="p">,</span>
        <span class="v">gamePhase</span><span class="p">:</span>  <span class="v">handValue</span> <span class="p">&gt;</span> <span class="num">21</span> <span class="p">?</span> <span class="s">'BUST'</span> <span class="p">:</span> <span class="s">'PLAYER_TURN'</span><span class="p">,</span>
      <span class="p">};</span>
    <span class="p">}</span>
    <span class="k">default</span><span class="p">:</span> <span class="k">return</span> <span class="v">state</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>`
  },
  {
    out: 'code-cropcheck.png',
    filename: 'tests/crop-safe.spec.ts',
    badge: 'Playwright · TypeScript',
    code: `<span class="k">import</span> <span class="p">{</span> <span class="t">test</span><span class="p">,</span> <span class="t">expect</span> <span class="p">}</span> <span class="k">from</span> <span class="s">'@playwright/test'</span><span class="p">;</span>

<span class="k">const</span> <span class="v">PLATFORMS</span><span class="p">:</span> <span class="t">Record</span><span class="p">&lt;</span><span class="t">string</span><span class="p">,</span> <span class="p">[</span><span class="t">number</span><span class="p">,</span> <span class="t">number</span><span class="p">]&gt;</span> <span class="p">=</span> <span class="p">{</span>
  <span class="v">instagram</span><span class="p">:</span>  <span class="p">[</span><span class="num">1080</span><span class="p">,</span> <span class="num">1920</span><span class="p">],</span>
  <span class="v">youtube</span><span class="p">:</span>    <span class="p">[</span><span class="num">1920</span><span class="p">,</span> <span class="num">1080</span><span class="p">],</span>
  <span class="v">tiktok</span><span class="p">:</span>     <span class="p">[</span><span class="num">1080</span><span class="p">,</span> <span class="num">1920</span><span class="p">],</span>
<span class="p">};</span>

<span class="k">for</span> <span class="p">(</span><span class="k">const</span> <span class="p">[</span><span class="v">platform</span><span class="p">,</span> <span class="p">[</span><span class="v">w</span><span class="p">,</span> <span class="v">h</span><span class="p">]]</span> <span class="k">of</span> <span class="t">Object</span><span class="p">.</span><span class="m">entries</span><span class="p">(</span><span class="v">PLATFORMS</span><span class="p">))</span> <span class="p">{</span>
  <span class="f">test</span><span class="p">(</span><span class="s">\`crop-safe: \${platform} \${w}x\${h}\`</span><span class="p">,</span> <span class="k">async</span> <span class="p">({</span> <span class="v">page</span> <span class="p">}) =></span> <span class="p">{</span>
    <span class="k">await</span> <span class="v">page</span><span class="p">.</span><span class="m">setViewportSize</span><span class="p">({</span> <span class="v">width</span><span class="p">:</span> <span class="v">w</span><span class="p">,</span> <span class="v">height</span><span class="p">:</span> <span class="v">h</span> <span class="p">});</span>
    <span class="k">await</span> <span class="v">page</span><span class="p">.</span><span class="m">goto</span><span class="p">(</span><span class="s">\`/preview?platform=\${platform}\`</span><span class="p">);</span>
    <span class="k">const</span> <span class="cy">safeZone</span> <span class="p">=</span> <span class="v">page</span><span class="p">.</span><span class="m">locator</span><span class="p">(</span><span class="s">'[data-safe-zone]'</span><span class="p">);</span>
    <span class="k">await</span> <span class="m">expect</span><span class="p">(</span><span class="cy">safeZone</span><span class="p">).</span><span class="m">toBeVisible</span><span class="p">();</span>
    <span class="k">await</span> <span class="m">expect</span><span class="p">(</span><span class="cy">safeZone</span><span class="p">).</span><span class="m">not</span><span class="p">.</span><span class="m">toBeClipped</span><span class="p">();</span>
  <span class="p">});</span>
<span class="p">}</span>`
  },
];

for (const { out, filename, badge, code } of panels) {
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>${STYLE}</head>
<body><div class="panel">
<div class="titlebar">${DOTS}<span class="filename">${filename}</span><span class="badge">${badge}</span></div>
<pre>${code}</pre>
</div></body></html>`;

  const tmpFile = path.join(TMP, '_tmp_panel.html');
  fs.writeFileSync(tmpFile, html, 'utf8');

  const outPath = path.join(IMAGES, out);
  const res = spawnSync(CHROME, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=780,500',
    `--screenshot=${outPath}`,
    '--default-background-color=060810',
    `file:///${tmpFile.replace(/\\/g, '/')}`,
  ], { timeout: 20000 });

  if (res.error) {
    console.error(`✗ ${out}:`, res.error.message);
  } else if (!fs.existsSync(outPath)) {
    console.error(`✗ ${out}: file not created. stderr:`, (res.stderr||'').toString().slice(0,200));
  } else {
    console.log(`✓ ${out} (${fs.statSync(outPath).size} bytes)`);
  }
}

fs.unlinkSync(path.join(TMP, '_tmp_panel.html'));
console.log('All done.');
