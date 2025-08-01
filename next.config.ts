const nextConfig = {
  images: {
    domains: ['conik-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
  // TypeScript 에러 무시
  typescript: {
    ignoreBuildErrors: true,
  },

  // ESLint 에러 무시
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
