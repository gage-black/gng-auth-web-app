/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'imgix',
    path: 'https://noop/'
  },
  reactStrictMode: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/login': { page: '/login' },
      '/login/index': { page: '/login' },
      '/profile/index': { page: '/profile' },
      '/sign-up/index': { page: '/sign-up' },
    }
  },
}

module.exports = nextConfig
