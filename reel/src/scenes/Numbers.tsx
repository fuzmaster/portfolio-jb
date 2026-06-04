/* NUMBERS · 0:35 - 0:50 · 450 frames
 * 2x2 stat grid. Each value animates in with a brief "counter" feel, then settles.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONTS } from '../constants';

interface Props {
  data: {
    eyebrow: string;
    items: { value: string; label: string; detail?: string }[];
  };
}

export const Numbers: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const sceneOpacity = interpolate(frame, [0, 14, 436, 450], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cols = data.items.length === 4 ? 2 : data.items.length;

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        fontFamily: FONTS.mono, color: COLORS.cyan,
        fontSize: 18, letterSpacing: '0.32em', textTransform: 'uppercase',
        marginBottom: 56, opacity: interpolate(frame, [0, 22], [0, 1]),
      }}>
        {data.eyebrow}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 32,
        maxWidth: 1500,
        width: '85%',
      }}>
        {data.items.map((item, i) => (
          <StatCell key={i} item={item} startFrame={40 + i * 20} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const StatCell: React.FC<{ item: { value: string; label: string; detail?: string }; startFrame: number }> = ({ item, startFrame }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [startFrame, startFrame + 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yOff  = interpolate(frame, [startFrame, startFrame + 24], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const valueScale = interpolate(frame, [startFrame, startFrame + 30], [0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{
      background: COLORS.bgSoft,
      border: `1px solid ${COLORS.cyanSoft}`,
      borderRadius: 18, padding: '36px 40px',
      opacity: enter, transform: `translateY(${yOff}px)`,
    }}>
      <div style={{
        fontFamily: FONTS.sans, color: COLORS.cyan,
        fontSize: 84, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1,
        transform: `scale(${valueScale})`, transformOrigin: 'left',
        marginBottom: 18,
      }}>
        {item.value}
      </div>
      <div style={{
        fontFamily: FONTS.sans, color: COLORS.text,
        fontSize: 24, fontWeight: 600, marginBottom: item.detail ? 8 : 0,
      }}>
        {item.label}
      </div>
      {item.detail && (
        <div style={{
          fontFamily: FONTS.mono, color: COLORS.dim,
          fontSize: 14, letterSpacing: '0.04em',
        }}>
          {item.detail}
        </div>
      )}
    </div>
  );
};
