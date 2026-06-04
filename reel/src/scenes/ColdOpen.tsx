/* COLD OPEN · 0:00 - 0:08 · 240 frames
 * Brand wordmark wipes in, threadline drops below.
 */
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';

interface Props { data: { brandLine: string; threadLine: string } }

export const ColdOpen: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // wordmark wipe-in
  const wordmarkOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const wordmarkScale = spring({ frame, fps, config: { damping: 18 } });

  // thread line slides up
  const threadOffset = interpolate(frame, [25, 50], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const threadOpacity = interpolate(frame, [25, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // cyan line draw-in
  const lineScale = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // out — everything fades together at the end of the scene
  const outOpacity = interpolate(frame, [210, 240], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{
      justifyContent: 'center', alignItems: 'center',
      opacity: outOpacity,
    }}>
      <div style={{ textAlign: 'center', transform: `scale(${wordmarkScale})` }}>
        <div style={{
          fontFamily: FONTS.mono, color: COLORS.text, opacity: wordmarkOpacity,
          fontSize: 96, fontWeight: 700, letterSpacing: '0.04em',
        }}>
          {data.brandLine.toUpperCase()}
          <span style={{ color: COLORS.cyan }}>.</span>
        </div>

        <div style={{
          width: 240, height: 2, background: COLORS.cyan, margin: '40px auto 30px',
          transform: `scaleX(${lineScale})`, transformOrigin: 'center',
        }} />

        <div style={{
          fontFamily: FONTS.mono, color: COLORS.cyan,
          fontSize: 22, letterSpacing: '0.32em', textTransform: 'uppercase',
          opacity: threadOpacity, transform: `translateY(${threadOffset}px)`,
        }}>
          {data.threadLine}
        </div>
      </div>
    </AbsoluteFill>
  );
};
