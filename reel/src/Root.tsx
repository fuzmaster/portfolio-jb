/* Composition registry. Three aspect ratios share one config. */
import './fonts';  // side-effect: registers DM Sans + JetBrains Mono with Remotion
import { Composition } from 'remotion';
import { Reel } from './Reel';
import { ReelConfigSchema } from './types';
import { config } from './config';
import { FPS, TOTAL_FRAMES, RESOLUTIONS } from './constants';

// Validate the config at module load — fail fast if it's malformed.
ReelConfigSchema.parse(config);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={RESOLUTIONS.landscape.width}
        height={RESOLUTIONS.landscape.height}
        defaultProps={{ config }}
        schema={ReelConfigSchema}
      />
      <Composition
        id="ReelSquare"
        component={Reel}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={RESOLUTIONS.square.width}
        height={RESOLUTIONS.square.height}
        defaultProps={{ config }}
        schema={ReelConfigSchema}
      />
      <Composition
        id="ReelVertical"
        component={Reel}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={RESOLUTIONS.vertical.width}
        height={RESOLUTIONS.vertical.height}
        defaultProps={{ config }}
        schema={ReelConfigSchema}
      />
    </>
  );
};
