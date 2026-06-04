/* Font loaders for Remotion.
 * Remotion needs fonts to be explicitly loaded so they're available at render time.
 * Using @remotion/google-fonts ensures the woff2 is bundled with the render worker.
 */
import { loadFont as loadDmSans } from '@remotion/google-fonts/DMSans';
import { loadFont as loadJetBrains } from '@remotion/google-fonts/JetBrainsMono';

// Side-effect: registers the fonts and starts loading them
loadDmSans('normal', { weights: ['400', '500', '700'] });
loadJetBrains('normal', { weights: ['400', '500', '700'] });
