/* Shared visual + timing constants for the sizzle reel.
 * Matches jacobbritten.com design system: dark bg + cyan accent + DM Sans/JetBrains Mono.
 */

export const COLORS = {
  bg:        '#0A0C12',
  bgSoft:    '#0E1119',
  text:      '#E8EDF4',
  dim:       'rgba(232, 237, 244, 0.55)',
  faint:     'rgba(232, 237, 244, 0.32)',
  cyan:      '#00FFC8',
  cyanDim:   'rgba(0, 255, 200, 0.55)',
  cyanSoft:  'rgba(0, 255, 200, 0.08)',
  line:      'rgba(255, 255, 255, 0.08)',
};

export const FONTS = {
  sans:  'DM Sans, system-ui, sans-serif',
  mono:  'JetBrains Mono, SF Mono, Consolas, monospace',
};

/* 30 fps · 80s total · scene budget */
export const FPS = 30;

export const TIMING = {
  coldOpen:   { start:    0, frames:  240 },  // 0:00 - 0:08
  thesis:     { start:  240, frames:  360 },  // 0:08 - 0:20
  production: { start:  600, frames:  450 },  // 0:20 - 0:35
  numbers:    { start: 1050, frames:  450 },  // 0:35 - 0:50
  credits:    { start: 1500, frames:  600 },  // 0:50 - 1:10
  outro:      { start: 2100, frames:  300 },  // 1:10 - 1:20
};

export const TOTAL_FRAMES = 2400;  // 80s · keep < 90s for sizzle pacing

export const RESOLUTIONS = {
  landscape: { width: 1920, height: 1080 },
  square:    { width: 1080, height: 1080 },
  vertical:  { width: 1080, height: 1920 },
};
