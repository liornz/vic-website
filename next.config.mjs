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
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        sharp: false,
      };
    }

    return config;
  },
  // Your Next.js config.
};

export default withPWA(withPlaiceholder(config));
