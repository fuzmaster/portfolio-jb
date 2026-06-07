/* PRODUCTION · 0:20 - 0:35 · 450 frames
 * Montage of real work. Each clip occupies a window; falls back to a labeled
 * card if no asset exists yet.
 *
 * Each clip can be a video (.mp4/.webm/.mov) OR a still image (.jpg/.png/.webp).
 * Stills get a slow Ken Burns drift so they feel motion-graphics-y. Video plays normally.
 * Drop real files into ../../assets/ and reference by name in config.ts.
 */
import { AbsoluteFill, OffthreadVideo, Sequence, interpolate, useCurrentFrame, staticFile } from 'remotion';
import { COLORS, FONTS } from '../constants';
import type { Asset } from '../types';

interface Props {
  data: {
    eyebrow: string;
    clips: Asset[];
    fallback?: string;
  };
}

const isVideo = (src: string): boolean =>
  /\.(mp4|webm|mov|m4v)$/i.test(src);

export const Production: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const sceneOpacity = interpolate(frame, [0, 14, 436, 450], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const clipDuration = 90; // ~3s each — 5 clips fit comfortably with breathing room
  const gap = 8;

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity }}>
      <Eyebrow text={data.eyebrow} />
      {data.clips.length === 0 ? (
        <FallbackText text={data.fallback ?? 'Production'} />
      ) : (
        data.clips.map((clip, i) => (
          <Sequence key={i} from={i * (clipDuration + gap)} durationInFrames={clipDuration}>
            <ClipFrame clip={clip} index={i} />
          </Sequence>
        ))
      )}
    </AbsoluteFill>
  );
};

const Eyebrow: React.FC<{ text: string }> = ({ text }) => (
  <div style={{
    position: 'absolute', top: 60, left: 80,
    fontFamily: FONTS.mono, color: COLORS.cyan,
    fontSize: 18, letterSpacing: '0.24em', textTransform: 'uppercase',
    zIndex: 10,
  }}>
    <span style={{ display: 'inline-block', width: 40, height: 1, background: COLORS.cyan, verticalAlign: 'middle', marginRight: 16 }} />
    {text}
  </div>
);

const FallbackText: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        fontFamily: FONTS.sans, color: COLORS.text,
        fontSize: 72, fontWeight: 700, letterSpacing: '-0.02em',
        textAlign: 'center', opacity, maxWidth: '70%',
      }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

const ClipFrame: React.FC<{ clip: Asset; index: number }> = ({ clip, index }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const out   = interpolate(frame, [75, 90], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yIn   = interpolate(frame, [0, 18], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Slow Ken Burns drift on stills — feels like motion graphics instead of a flat photo
  const kenBurnsScale = interpolate(frame, [0, 90], [1.0, 1.06]);
  const kenBurnsX     = interpolate(frame, [0, 90], [0, index % 2 === 0 ? -1.5 : 1.5]); // alternate drift direction

  const hasSrc = !!clip.src;
  const srcIsVideo = hasSrc && isVideo(clip.src!);

  return (
    <AbsoluteFill style={{
      opacity: enter * out, transform: `translateY(${yIn}px)`,
      padding: '15% 8% 12%',
    }}>
      <div style={{
        width: '100%', height: '100%',
        background: COLORS.bgSoft,
        border: `1px solid ${COLORS.cyanSoft}`,
        borderRadius: 18,
        overflow: 'hidden', position: 'relative',
      }}>
        {!hasSrc ? (
          <Placeholder index={index} />
        ) : srcIsVideo ? (
          <OffthreadVideo
            src={staticFile(clip.src!)}
            startFrom={clip.startFrame ?? 0}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          // Still image with Ken Burns drift
          <img
            src={staticFile(clip.src!)}
            alt=""
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: `scale(${kenBurnsScale}) translateX(${kenBurnsX}%)`,
              transformOrigin: 'center center',
              transition: 'none',
            }}
            onError={(e) => {
              // If the file is missing, just swap to placeholder visually
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        )}

        {clip.caption && (
          <div style={{
            position: 'absolute', left: 28, bottom: 28, right: 28,
            fontFamily: FONTS.mono, color: COLORS.text,
            fontSize: 18, letterSpacing: '0.06em',
            background: 'rgba(10,12,18,0.78)',
            padding: '10px 16px', borderRadius: 8,
            border: `1px solid ${COLORS.cyanDim}`,
            maxWidth: 'fit-content',
          }}>
            <span style={{ color: COLORS.cyan }}>● </span>{clip.caption}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

const Placeholder: React.FC<{ index: number }> = ({ index }) => (
  <div style={{
    width: '100%', height: '100%',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    fontFamily: FONTS.mono, color: COLORS.faint,
    fontSize: 22, letterSpacing: '0.18em', textTransform: 'uppercase',
  }}>
    CLIP_{String(index + 1).padStart(2, '0')} · awaiting asset
  </div>
);
