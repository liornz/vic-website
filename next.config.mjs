import withPlaiceholder from "@plaiceholder/next";
import runtimeCaching from './cache.js';
import pwa from 'next-pwa';

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
  // Force webpack for PWA compatibility
  webpack: (config, { isServer }) => {
    return config;
  },
};
 
export default withPWA(withPlaiceholder(config));
