/* THESIS · 0:08 - 0:20 · 360 frames
 * Multi-line typographic statement. Lines fade in stagger, accent line highlights cyan.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONTS } from '../constants';

interface Props {
  data: { lines: string[]; accent: string };
}

export const Thesis: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();

  // each line fades in 20 frames after the previous
  const linesPerSec = 0.7;
  const stagger = 30 / linesPerSec; // ~43 frames per line

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: '0 8%' }}>
      <div style={{ maxWidth: 1500 }}>
        {data.lines.map((line, i) => {
          const startFrame = i * stagger + 10;
          const opacity = interpolate(frame, [startFrame, startFrame + 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const yOffset = interpolate(frame, [startFrame, startFrame + 24], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          const isAccent = line.trim() === data.accent.trim();
          const color = isAccent ? COLORS.cyan : COLORS.text;

          // global out near scene end
          const outOpacity = interpolate(frame, [330, 360], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          return (
            <div key={i} style={{
              fontFamily: FONTS.sans,
              fontSize: 96, fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color, opacity: opacity * outOpacity,
              transform: `translateY(${yOffset}px)`,
              marginBottom: 6,
            }}>
              {line}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
