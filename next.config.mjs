/** @type {import('next').NextConfig} */
import { routeRewrites } from './app/utils/buildRouteRewrites.mjs'

const nextConfig = {
  async rewrites() {
    return routeRewrites()
  },
};

export default nextConfig;
