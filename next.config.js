/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
  webpack: true,
  webpack: (config) => {
    config.resolve.fallback = {fs: false};
    return config;
  },
  domains: [
    "i.scdn.co",
    "t.scdn.co",
    "newjams-images.scdn.co",
    "dailymix-images.scdn.co",
    "seed-mix-image.spotifycdn.com",
    "charts-images.scdn.co",
    "daily-mix.scdn.co",
    "mixed-media-images.spotifycdn.com",
    "open.spotify.com"
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "i.scdn.co",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "t.scdn.co",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "newjams-images.scdn.co",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "dailymix-images.scdn.co",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "seed-mix-image.spotifycdn.com",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "charts-images.scdn.co",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "daily-mix.scdn.co",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "mixed-media-images.spotifycdn.com",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "open.spotify.com",
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
