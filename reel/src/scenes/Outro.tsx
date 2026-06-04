/* OUTRO · 1:10 - 1:20 · 300 frames
 * "Open for hire" CTA + URL + pulsing cyan availability dot.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONTS } from '../constants';

interface Props {
  data: { headline: string; subline?: string; url: string };
}

export const Outro: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();

  const headlineOp = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const headlineY  = interpolate(frame, [0, 30], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const sublineOp = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const urlOp     = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // dot pulse
  const dotPhase = (frame % 60) / 60;
  const dotScale = 1 + Math.sin(dotPhase * Math.PI) * 0.35;
  const dotOpacity = 1 - dotPhase * 0.4;

  const fadeOut = interpolate(frame, [240, 300], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: fadeOut }}>
      <div style={{ textAlign: 'center' }}>
        {/* pulsing dot + Available */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 18,
          marginBottom: 36, opacity: headlineOp,
        }}>
          <div style={{
            width: 16, height: 16, borderRadius: '50%', background: COLORS.cyan,
            transform: `scale(${dotScale})`, opacity: dotOpacity,
          }} />
          <span style={{
            fontFamily: FONTS.mono, color: COLORS.cyan,
            fontSize: 20, letterSpacing: '0.32em', textTransform: 'uppercase',
          }}>
            Available
          </span>
        </div>

        <div style={{
          fontFamily: FONTS.sans, color: COLORS.text,
          fontSize: 132, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1,
          opacity: headlineOp, transform: `translateY(${headlineY}px)`,
          marginBottom: 30,
        }}>
          {data.headline}<span style={{ color: COLORS.cyan }}>.</span>
        </div>

        {data.subline && (
          <div style={{
            fontFamily: FONTS.mono, color: COLORS.dim,
            fontSize: 22, letterSpacing: '0.12em', textTransform: 'uppercase',
            opacity: sublineOp, marginBottom: 60,
          }}>
            {data.subline}
          </div>
        )}

        <div style={{
          fontFamily: FONTS.mono, color: COLORS.cyan,
          fontSize: 32, letterSpacing: '0.06em',
          opacity: urlOp,
          paddingTop: 36, borderTop: `1px solid ${COLORS.cyanDim}`,
          display: 'inline-block', minWidth: 360,
        }}>
          {data.url}
        </div>
      </div>
    </AbsoluteFill>
  );
};
