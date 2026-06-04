# Jacob Britten — Sizzle Reel

A programmatic 60-90s portfolio sizzle reel. Schema-validated config, six typographic scenes, footage-optional. Built on Remotion 4 + Zod.

The reel renders **watchable on day one with no footage** — every clip slot falls back to a labeled placeholder. Drop real `.mp4` files into `assets/` and reference them in `src/config.ts` as you cut them.

---

## Quick start

```bash
cd reel
npm install
npm run studio          # opens the Remotion Studio in your browser for live preview
```

Once you're happy:

```bash
npm run render          # → out/sizzle.mp4 (1920×1080 H.264)
npm run render:square   # → out/sizzle-square.mp4 (1080×1080 — for LinkedIn feed)
npm run render:vertical # → out/sizzle-vertical.mp4 (1080×1920 — for Shorts / Reels / TikTok)
npm run still           # → out/poster.png (frame 60 — for embed thumbnail)
```

---

## The structure

80 seconds total, six scenes:

| Scene | Time | Frames | What it does |
|---|---|---|---|
| `ColdOpen`    | 0:00–0:08 | 240 | Brand wordmark wipes in. Cyan rule. Threadline. |
| `Thesis`      | 0:08–0:20 | 360 | Multi-line typographic statement. Accent line in cyan. |
| `Production`  | 0:20–0:35 | 450 | Montage of real footage. Falls back to labeled placeholders. |
| `Numbers`     | 0:35–0:50 | 450 | Stat grid with animated values. |
| `Credits`     | 0:50–1:10 | 600 | Film-credit attribution + tool chips. |
| `Outro`       | 1:10–1:20 | 300 | "Available" CTA + URL + pulsing dot. |

Adjust any scene's window in `src/constants.ts` (`TIMING`).

---

## Customizing — only one file to edit

Everything is driven by `src/config.ts`. Edit that file, save, the Studio preview updates instantly.

```ts
export const config: ReelConfig = {
  thesis: {
    lines: [
      'I edit, mix, caption, and package',
      'real media —',
      'and build the systems',     // ← this line is cyan because it matches `accent`
      'behind it.',
    ],
    accent: 'and build the systems',
  },
  numbers: {
    items: [
      { value: '274K', label: 'total views produced', detail: 'HF Podcast, 18 months' },
      // ...
    ],
  },
  // ...
};
```

The config is Zod-validated at module load — a typo in a field name or a missing required key throws **before** render starts, not 90 seconds in.

---

## Adding real footage

1. Drop the video file into `assets/`, e.g. `assets/bas-drone-01.mp4`
2. Reference it in `src/config.ts` under `production.clips`:
   ```ts
   { src: 'bas-drone-01.mp4', caption: 'BAS · Aerial real estate' }
   ```
3. Optionally trim the in-point:
   ```ts
   { src: 'bas-drone-01.mp4', startFrame: 90, caption: '...' }
   ```

That's it — Remotion handles decode + scaling. No need to pre-cut clips.

**Asset slots in the current config:**
- `bas-drone-01.mp4` — aerial real-estate shot
- `bas-drone-02.mp4` — new-construction development shot
- `hf-lower-third.mp4` — a rendered lower-third overlay clip
- `caption-frame.mp4` — a frame with a styled subtitle

Any `src:` that points to a missing file just renders the placeholder card — no crash. So you can ship the reel today with three of four slots filled, then drop in the last one whenever.

---

## What's where

```
reel/
├── package.json              # deps + render scripts
├── remotion.config.ts        # global render config
├── tsconfig.json
├── assets/                   # drop your footage here (.gitignored for /raw and /private)
└── src/
    ├── index.ts              # registerRoot entry point
    ├── Root.tsx              # composition registry (landscape, square, vertical)
    ├── Reel.tsx              # main composition — sequences the six scenes
    ├── constants.ts          # colors, fonts, timing windows
    ├── types.ts              # Zod schema (ReelConfig)
    ├── config.ts             # THE DATA FILE — edit this
    ├── fonts.ts              # Google Fonts loader (DM Sans + JetBrains Mono)
    └── scenes/
        ├── ColdOpen.tsx
        ├── Thesis.tsx
        ├── Production.tsx
        ├── Numbers.tsx
        ├── Credits.tsx
        └── Outro.tsx
```

---

## Design system

Matches jacobbritten.com — same palette, same typography, same visual cadence as the rest of the portfolio.

- Background: `#0A0C12`
- Cyan accent: `#00FFC8`
- Text: `#E8EDF4`
- Display + body: DM Sans
- Mono / labels: JetBrains Mono

Anything else hex-coded in this project comes from `src/constants.ts`. Change the palette there and every scene updates.

---

## Output targets

| Aspect | ID | Use |
|---|---|---|
| 16:9 (1920×1080) | `Reel`         | Embed on homepage above hero, LinkedIn video post, YouTube |
| 1:1 (1080×1080)  | `ReelSquare`   | LinkedIn feed, Instagram feed |
| 9:16 (1080×1920) | `ReelVertical` | Shorts, Reels, TikTok |

All three render from the **same** `config.ts` — no duplicated copy.

---

## Audio

This scaffold renders silent. Three paths for sound, ordered by effort:

1. **Add a music bed in post.** Render the silent MP4, drop into DaVinci or Premiere, lay a licensed track underneath, export.
2. **Add audio via Remotion's `<Audio>` tag.** Drop a track into `assets/`, import in `Reel.tsx`. License must allow distribution.
3. **Mix per-scene SFX.** Use `<Sequence>` + `<Audio>` per scene if you want stingers on transitions.

Music licensing: **Artlist, Musicbed, or Epidemic** are the safe bets for portfolio reels. Free options exist (YouTube Audio Library, Uppbeat) but skim the license terms for "portfolio / showreel" allowance.

---

## Performance / render tips

- `npm run studio` is the fast loop. Live edit `config.ts` and the preview updates.
- Render with `--concurrency=N` (set in `remotion.config.ts`, default 4) to scale to your CPU.
- Real clips slow the render. Pre-transcode raw 4K masters to 1080p H.264 before referencing — Remotion still works with raw files but the scrub gets sluggish.
- The 80-second landscape render is ~2 minutes on an M1 Pro with no source clips, ~5-8 minutes with four 1080p source clips.

---

## License

This scaffold is a standalone deliverable for jacobbritten.com. The code structure is reusable — the content (copy, stats, credits) is specific to me.

---

*Built as part of the portfolio. The reel is itself a programmatic-render artifact — the same philosophy as the High Functioning Podcast pipeline, scaled down to one composition.*
