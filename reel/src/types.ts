/* Zod-validated schema for the reel config.
 * Mirrors the schema-validated render contract pattern from the HF Podcast pipeline:
 * a typo in config doesn't ship a broken reel — Zod rejects it before render.
 */
import { z } from 'zod';

/** A single piece of source footage. All fields optional → scene falls back gracefully. */
export const AssetSchema = z.object({
  src:        z.string().optional().describe('Path relative to public/, e.g. "drone-01.mp4". Leave empty for text-only.'),
  startFrame: z.number().nonnegative().default(0).describe('In-point in the source clip.'),
  caption:    z.string().optional().describe('Optional caption overlay shown over the clip.'),
});
export type Asset = z.infer<typeof AssetSchema>;

export const ReelConfigSchema = z.object({
  /** Cold open — brand wordmark + thesis line. */
  coldOpen: z.object({
    brandLine:  z.string(),
    threadLine: z.string(),
  }),

  /** Thesis — the central positioning statement, typographic. */
  thesis: z.object({
    lines: z.array(z.string()).min(2).max(4),
    accent: z.string().describe('Word/phrase in `lines` to highlight in cyan.'),
  }),

  /** Production beat — montage of real work. */
  production: z.object({
    eyebrow: z.string(),
    clips:   z.array(AssetSchema).min(0).max(6),
    /** Optional fallback caption shown if no clips provided. */
    fallback: z.string().optional(),
  }),

  /** Numbers beat — animated counters. */
  numbers: z.object({
    eyebrow: z.string(),
    items: z.array(z.object({
      value: z.string().describe('Final display value, e.g. "274K", "40%".'),
      label: z.string(),
      detail: z.string().optional(),
    })).min(2).max(4),
  }),

  /** Credits beat — film-credit style attribution. */
  credits: z.object({
    eyebrow:    z.string(),
    roleLine:   z.string().describe('e.g. "Producer · Editor · Captions · Pipeline"'),
    toolStack:  z.array(z.string()).describe('Each becomes a chip.'),
    showName:   z.string().optional(),
  }),

  /** Outro CTA. */
  outro: z.object({
    headline: z.string(),
    subline:  z.string().optional(),
    url:      z.string(),
  }),
});

export type ReelConfig = z.infer<typeof ReelConfigSchema>;
