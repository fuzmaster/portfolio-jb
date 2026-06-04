/* THE DATA FILE.
 * Customize this. Drop assets into ./assets/, reference them with `src:`.
 * Validated by Zod (see types.ts) — a typo here is caught BEFORE render.
 *
 * Everything is text-driven by default. Add `src:` paths as you cut clips.
 */
import type { ReelConfig } from './types';

export const config: ReelConfig = {
  coldOpen: {
    brandLine:  'Jacob Britten',
    threadLine: 'Media Production & Workflow Systems',
  },

  thesis: {
    lines: [
      'I edit, mix, caption, and package',
      'real media —',
      'and build the systems',
      'behind it.',
    ],
    accent: 'and build the systems',
  },

  production: {
    eyebrow: 'Production',
    clips: [
      // Drop real footage here as you cut it. Empty `src:` falls back to text frame.
      { src: 'bas-drone-01.mp4', caption: 'BAS · Aerial real estate' },
      { src: 'bas-drone-02.mp4', caption: 'BAS · New construction' },
      { src: 'hf-lower-third.mp4', caption: 'HF · Lower-third overlay' },
      { src: 'caption-frame.mp4', caption: 'StrictSub · Captions' },
    ],
    fallback: 'Podcast · Drone · Motion Graphics · Captions',
  },

  numbers: {
    eyebrow: 'Results',
    items: [
      { value: '274K',  label: 'total views produced',         detail: 'High Functioning Podcast, 18 months' },
      { value: '50+',   label: 'episodes shipped end to end',  detail: 'with a two-person team' },
      { value: '40%',   label: 'faster post turnaround',       detail: 'after workflow rebuild' },
      { value: '41 → 31K',  label: 'monthly views',            detail: 'baseline to sustained' },
    ],
  },

  credits: {
    eyebrow:   'Credits',
    showName:  'High Functioning Podcast',
    roleLine:  'Producer · Editor · Captions · Pipeline',
    toolStack: [
      'Premiere',
      'DaVinci',
      'Descript',
      'Remotion',
      'After Effects',
      'React',
      'TypeScript',
      'Zod',
    ],
  },

  outro: {
    headline: 'Open for hire',
    subline:  'Boston area · On-site or hybrid',
    url:      'jacobbritten.com',
  },
};
