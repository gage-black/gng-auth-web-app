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
      '/': { page: '/' },
      '/login': { page: '/login' },
      '/login/index': { page: '/login' },
      '/profile': { page: '/profile' },
      '/profile/index': { page: '/profile' },
      '/sign-up': { page: '/sign-up' },
      '/sign-up/index': { page: '/sign-up' },
    }
  },
}

module.exports = nextConfig
