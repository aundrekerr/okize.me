/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';
import { routeRewrites } from './app/utils/buildRouteRewrites.mjs'

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  async rewrites() {
    return routeRewrites()
  },
};

export default bundleAnalyzer(nextConfig);
