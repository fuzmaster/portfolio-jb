/* CREDITS · 0:50 - 1:10 · 600 frames
 * Film-credit-style attribution: ROLE LINE + show name + tool chips fly in.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONTS } from '../constants';

interface Props {
  data: {
    eyebrow: string;
    roleLine: string;
    toolStack: string[];
    showName?: string;
  };
}

export const Credits: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const sceneOpacity = interpolate(frame, [0, 14, 580, 600], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // staggered in: eyebrow → show name → role line → tool chips
  const eyebrowOp  = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const showOp     = interpolate(frame, [22, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const showY      = interpolate(frame, [22, 50], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const roleOp     = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dividerW   = interpolate(frame, [85, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity, justifyContent: 'center', alignItems: 'center', padding: '0 7%' }}>
      <div style={{ textAlign: 'center', maxWidth: 1500 }}>
        <div style={{
          fontFamily: FONTS.mono, color: COLORS.cyan,
          fontSize: 18, letterSpacing: '0.32em', textTransform: 'uppercase',
          opacity: eyebrowOp, marginBottom: 36,
        }}>
          {data.eyebrow}
        </div>

        {data.showName && (
          <div style={{
            fontFamily: FONTS.sans, color: COLORS.text,
            fontSize: 84, fontWeight: 700, letterSpacing: '-0.02em',
            opacity: showOp, transform: `translateY(${showY}px)`,
            marginBottom: 24,
          }}>
            {data.showName}
          </div>
        )}

        <div style={{
          fontFamily: FONTS.mono, color: COLORS.cyan,
          fontSize: 22, letterSpacing: '0.16em', textTransform: 'uppercase',
          opacity: roleOp, marginBottom: 48,
        }}>
          {data.roleLine}
        </div>

        <div style={{
          width: 240, height: 1, background: COLORS.cyanDim, margin: '0 auto 40px',
          transform: `scaleX(${dividerW})`, transformOrigin: 'center',
        }} />

        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: 12, maxWidth: 1100, margin: '0 auto',
        }}>
          {data.toolStack.map((tool, i) => (
            <ToolChip key={i} text={tool} startFrame={140 + i * 14} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ToolChip: React.FC<{ text: string; startFrame: number }> = ({ text, startFrame }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [startFrame, startFrame + 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [startFrame, startFrame + 18], [0.92, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{
      fontFamily: FONTS.mono, color: COLORS.text,
      fontSize: 18, letterSpacing: '0.04em',
      border: `1px solid ${COLORS.cyanDim}`,
      background: COLORS.cyanSoft,
      borderRadius: 10, padding: '12px 22px',
      opacity: enter, transform: `scale(${scale})`,
    }}>
      {text}
    </div>
  );
};
