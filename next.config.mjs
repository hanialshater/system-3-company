/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Separate build dirs let parallel agents build without clobbering each other.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};
export default nextConfig;
