/** @type {import('next').NextConfig} */

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.ENV_MODE == 'development',
});

module.exports = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.social-dev.cloud',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'resons-dev.eu-central-1.linodeobjects.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
});
