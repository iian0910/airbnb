/**
 * @type {import('next').NextConfig}
 */
// const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  // output: isProd ? 'out' : undefined,
  // distDir: 'dist',
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**'
      }
    ]
  },
  // assetPrefix: isProd
  //   ? 'https://iian0910.github.io/airbnb'
  //   : undefined
};

export default nextConfig;
