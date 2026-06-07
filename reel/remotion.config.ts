import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setPixelFormat('yuv420p');
Config.setConcurrency(4);
Config.setOverwriteOutput(true);
/* staticFile() in scenes resolves from this directory. Keep your real source
 * footage and stills in ./assets/ — Remotion treats it as the public root. */
Config.setPublicDir('./assets');
