const isProd = process.env.NODE_ENV === 'production';
const base = '/next-website';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  output: "export",
  productionBrowserSourceMaps: false,
  images: { unoptimized: true },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md'],
  basePath: isProd ? base : '',
  assetPrefix: isProd ? `${base}/` : '',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/fonts/[name][ext]",
      },
    });
    return config;
  },
};

export default nextConfig;
