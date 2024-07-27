/** @type {import('next').NextConfig} */
// const routeRewrites = "./app/utils/buildRouteRewrites.js";
// const { rr } = routeRewrites;
import { routeRewrites } from './app/utils/buildRouteRewrites.mjs'

const nextConfig = {
  // distDir: 'dist',
  async rewrites() {
    return routeRewrites()
  },
};

export default nextConfig;
