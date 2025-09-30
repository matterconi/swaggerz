/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.nike.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig