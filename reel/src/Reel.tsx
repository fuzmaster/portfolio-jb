/* Main Reel composition. Sequences the six scenes with a shared background.
 * Each scene is offset by its TIMING window — adjust in constants.ts.
 */
import { AbsoluteFill, Sequence } from 'remotion';
import { COLORS, TIMING } from './constants';
import type { ReelConfig } from './types';
import { ColdOpen } from './scenes/ColdOpen';
import { Thesis } from './scenes/Thesis';
import { Production } from './scenes/Production';
import { Numbers } from './scenes/Numbers';
import { Credits } from './scenes/Credits';
import { Outro } from './scenes/Outro';

export const Reel: React.FC<{ config: ReelConfig }> = ({ config }) => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg, fontFamily: 'sans-serif' }}>
      {/* faint grid backdrop, shared across all scenes for visual continuity */}
      <AbsoluteFill style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <Sequence from={TIMING.coldOpen.start}   durationInFrames={TIMING.coldOpen.frames}>
        <ColdOpen data={config.coldOpen} />
      </Sequence>
      <Sequence from={TIMING.thesis.start}     durationInFrames={TIMING.thesis.frames}>
        <Thesis data={config.thesis} />
      </Sequence>
      <Sequence from={TIMING.production.start} durationInFrames={TIMING.production.frames}>
        <Production data={config.production} />
      </Sequence>
      <Sequence from={TIMING.numbers.start}    durationInFrames={TIMING.numbers.frames}>
        <Numbers data={config.numbers} />
      </Sequence>
      <Sequence from={TIMING.credits.start}    durationInFrames={TIMING.credits.frames}>
        <Credits data={config.credits} />
      </Sequence>
      <Sequence from={TIMING.outro.start}      durationInFrames={TIMING.outro.frames}>
        <Outro data={config.outro} />
      </Sequence>
    </AbsoluteFill>
  );
};
