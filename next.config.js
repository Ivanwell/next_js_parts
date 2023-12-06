/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // images: {
  //   domains: ['bayrakparts.com'],
  // },
}

// module.exports = {
//   reactStrictMode: false,
// }

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.bm.parts',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.ftcdn.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
