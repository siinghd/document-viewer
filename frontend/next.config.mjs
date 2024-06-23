/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    webpack: (config) => {
      config.resolve.alias.canvas = false;
      return config;
    },
  },
};

export default nextConfig;
