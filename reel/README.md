# Jacob Britten — Sizzle Reel

A programmatic 80-second portfolio sizzle reel. Schema-validated config, six typographic scenes, footage-optional. Built on Remotion 4 + Zod.

Tuned for **Boston-area media producer roles** — leads with the High Functioning Podcast production credit (100+ episodes, ongoing) and the operational story; drone, motion graphics, and tooling support the thesis rather than lead it.

The reel renders **watchable today with three real assets already wired in.** Two slots are still awaiting source files (gear shot + a lower-third clip). Missing files render as labeled placeholders, so the reel never breaks.

---

## Quick start

```bash
cd reel
npm install
npm run studio          # opens Remotion Studio in your browser
```

Once you like what you see:

```bash
npm run render          # → out/sizzle.mp4 (1920×1080 H.264)
npm run render:square   # → out/sizzle-square.mp4 (1080×1080)
npm run render:vertical # → out/sizzle-vertical.mp4 (1080×1920)
npm run still           # → out/poster.png (frame 60 thumbnail)
```

---

## Asset status

| Slot | File | Status |
|---|---|---|
| Lead | `assets/hf-cover.webp` | ✅ Real HF Podcast cover art |
| 2 | `assets/podcast-gear.webp` | ⏳ TODO — drop the Stream Deck + switcher shot |
| 3 | `assets/bas-aerial.webp` | ✅ Real Britten Aerial Services drone photo |
| 4 | `assets/strictsub-caption.webp` | ✅ Real caption frame still |
| 5 | `assets/hf-lower-third.mp4` | ⏳ TODO — render a 3-second lower-third clip from the HF Graphics pipeline |

Three of five clips already render real content. The remaining two render as branded placeholders until the files land.

To add the missing two:
- **Podcast gear shot:** copy from `../images/podcast-gear.webp` into `assets/` (once you save the file from your phone)
- **Lower-third clip:** render a 3-second sample from the High Functioning Graphics project, drop it in `assets/hf-lower-third.mp4`

---

## The structure

80 seconds total, six scenes:

| Scene | Time | Frames | What it does |
|---|---|---|---|
| `ColdOpen`    | 0:00–0:08 | 240 | "JACOB BRITTEN." wordmark wipes in. Cyan rule. Threadline. |
| `Thesis`      | 0:08–0:20 | 360 | *"I produce podcasts, video, motion graphics, and captions — and build the systems behind it all."* Accent line in cyan. |
| `Production`  | 0:20–0:35 | 450 | 5-clip montage: HF cover · gear · BAS aerial · caption frame · lower-third. Stills get slow Ken Burns drift. |
| `Numbers`     | 0:35–0:50 | 450 | 4-stat grid: 100+ episodes · 274K+ views · 40% faster post · 41 → 31K growth. |
| `Credits`     | 0:50–1:10 | 600 | Film-credit attribution + tool chips. |
| `Outro`       | 1:10–1:20 | 300 | "Hiring in Boston?" + URL + pulsing cyan dot. |

Adjust any scene's window in `src/constants.ts` → `TIMING`.

---

## Customizing — only one file to edit

Everything is driven by `src/config.ts`. Edit it, save, the Studio preview updates instantly.

The current tune leads with the podcast production credit because the lane priority is Boston-area media producer roles. If you swap to a different lane (creative tech, motion graphics specialist, etc.), the easiest pivot is:
- Reorder `production.clips` (lead with whatever asset matches the lane)
- Tweak `thesis.lines` to match
- Update `credits.eyebrow` / `outro.subline` if needed

---

## Real images vs. video clips — both work

The Production scene auto-detects file extension:
- `.mp4` / `.webm` / `.mov` → renders with Remotion's `OffthreadVideo`
- `.jpg` / `.png` / `.webp` → renders as a still with a slow Ken Burns zoom + horizontal drift

This means you can ship the reel today with the three real stills and add the two video slots later without changing any code.

---

## What's where

```
reel/
├── package.json
├── remotion.config.ts    # public dir → ./assets
├── tsconfig.json
├── assets/               # YOUR FOOTAGE GOES HERE
│   ├── hf-cover.webp     # ✅ wired (HF Podcast cover)
│   ├── bas-aerial.webp   # ✅ wired (BAS drone shot)
│   ├── strictsub-caption.webp  # ✅ wired (caption frame)
│   ├── podcast-gear.webp # ⏳ TODO
│   └── hf-lower-third.mp4 # ⏳ TODO
└── src/
    ├── index.ts          # registerRoot
    ├── Root.tsx          # composition registry (landscape / square / vertical)
    ├── Reel.tsx          # sequences the six scenes
    ├── constants.ts      # colors, fonts, scene timing
    ├── types.ts          # Zod schema (ReelConfig)
    ├── config.ts         # THE DATA FILE — edit this
    ├── fonts.ts          # Google Fonts loader (DM Sans + JetBrains Mono)
    └── scenes/
        ├── ColdOpen.tsx
        ├── Thesis.tsx
        ├── Production.tsx   # handles video AND image stills
        ├── Numbers.tsx
        ├── Credits.tsx
        └── Outro.tsx
```

---

## Design system

Matches jacobbritten.com — same palette, same typography, same visual cadence.

- Background: `#0A0C12`
- Cyan accent: `#00FFC8`
- Text: `#E8EDF4`
- Display + body: DM Sans
- Mono / labels: JetBrains Mono

Anything else hex-coded comes from `src/constants.ts`. Change the palette there and every scene updates.

---

## Output targets

| Aspect | ID | Use |
|---|---|---|
| 16:9 (1920×1080) | `Reel`         | Embed on homepage, LinkedIn video post, YouTube |
| 1:1 (1080×1080)  | `ReelSquare`   | LinkedIn feed, Instagram feed |
| 9:16 (1080×1920) | `ReelVertical` | Shorts, Reels, TikTok |

All three render from the same `config.ts` — no duplicated copy.

---

## Audio

This scaffold renders silent. Three options when you're ready:

1. **Post in DaVinci / Premiere.** Render the silent MP4, drop into your NLE, lay a licensed track underneath, export.
2. **Add via Remotion's `<Audio>` tag.** Drop a track into `assets/`, import in `Reel.tsx`.
3. **Per-scene stingers.** `<Sequence>` + `<Audio>` for transition sounds.

Licensing: Artlist, Musicbed, or Epidemic are safe for portfolio reels. Free options (YouTube Audio Library, Uppbeat) sometimes have licensing fine print — skim it before publishing.

---

## License

This scaffold is a standalone deliverable for jacobbritten.com. The code structure is reusable; the content (copy, stats, credits) is specific to me.

---

*Built as part of the portfolio. The reel is itself a programmatic-render artifact — same philosophy as the High Functioning Podcast pipeline, scaled down to one composition.*
