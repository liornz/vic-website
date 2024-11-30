// @ts-check
import withPlaiceholder from '@plaiceholder/next';
import pwa from 'next-pwa';
import runtimeCaching from './cache.js';

const withPWA = pwa({
  dest: 'public',
  runtimeCaching,
  dynamicStartUrl: false,
  buildExcludes: [/middleware-manifest.json$/],
});

/**
 * @type {import('next').NextConfig}
 */
const config = {
  // Your Next.js config.
};

export default withPWA(withPlaiceholder(config));
