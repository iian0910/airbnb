/**
 * @type {import('next').NextConfig}
 */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: isProd ? 'out' : undefined,
  // distDir: 'dist',
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com"
    ]
  },
  assetPrefix: isProd
    ? 'https://iian0910.github.io/airbnb'
    : undefined
};

export default nextConfig;
