/* THE DATA FILE.
 * Customize this. Drop assets into ./assets/, reference them with `src:`.
 * Validated by Zod (see types.ts) — a typo here is caught BEFORE render.
 *
 * Everything is text-driven by default. Add `src:` paths as you cut clips.
 *
 * Current tune: Boston-area media producer lane.
 *   Lead with the HF Podcast production credit and the operational story.
 *   Drone + motion graphics + tooling support the thesis, not lead it.
 */
import type { ReelConfig } from './types';

export const config: ReelConfig = {
  coldOpen: {
    brandLine:  'Jacob Britten',
    threadLine: 'Media Production & Workflow Systems',
  },

  thesis: {
    lines: [
      'I produce podcasts,',
      'video, motion graphics,',
      'and captions —',
      'and build the systems',
      'behind it all.',
    ],
    accent: 'and build the systems',
  },

  production: {
    eyebrow: 'Production',
    clips: [
      // Order matters — first clip leads the production beat.
      // Files live in reel/assets/. Missing files render as labeled placeholders.
      // Five clips × ~3s each fits the 15s Production scene.
      { src: 'hf-cover.webp',         caption: 'High Functioning Podcast · Producer · Editor · Captions · Pipeline' },
      { src: 'podcast-gear.webp',     caption: 'Multi-cam record · ATEM switching · live audio' },     // TODO: drop podcast-gear.webp from /images
      { src: 'bas-aerial.webp',       caption: 'Britten Aerial Services · FAA Part 107' },
      { src: 'strictsub-caption.webp',caption: 'StrictSub · Caption pass on every release' },
      { src: 'hf-lower-third.mp4',    caption: 'High Functioning Graphics · Remotion lower-thirds' }, // TODO: render this clip
    ],
    fallback: 'Podcast · Multi-cam Video · Motion Graphics · Captions · Drone',
  },

  numbers: {
    eyebrow: 'Results — and still going',
    items: [
      { value: '100+',  label: 'episodes shipped end to end', detail: 'with a two-person team, weekly cadence' },
      { value: '274K+', label: 'total views produced',         detail: 'High Functioning Podcast · Oct 2024 — present' },
      { value: '40%',   label: 'faster post turnaround',       detail: 'after the pipeline rebuild' },
      { value: '41 → 31K', label: 'monthly views',             detail: '770× growth, sustained on every release' },
    ],
  },

  credits: {
    eyebrow:   'Primary Credit',
    showName:  'High Functioning Podcast',
    roleLine:  'Producer · Editor · Captions · Pipeline',
    toolStack: [
      'Premiere',
      'DaVinci Resolve',
      'Descript',
      'Remotion',
      'After Effects',
      'React',
      'TypeScript',
      'Zod',
      'Vercel',
    ],
  },

  outro: {
    headline: 'Hiring in Boston?',
    subline:  'Media Producer · Technical Producer · Podcast Ops · On-site or hybrid',
    url:      'jacobbritten.com',
  },
};
