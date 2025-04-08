/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/dosyatakip',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig
