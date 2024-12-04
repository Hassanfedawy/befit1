/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/page',
      },
    ]
  },
}

module.exports = nextConfig
