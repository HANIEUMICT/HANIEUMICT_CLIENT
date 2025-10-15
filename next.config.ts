const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'conik-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        port: '',
        pathname: '/**',
      },
    ],
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
