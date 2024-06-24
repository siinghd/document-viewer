/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true,
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },

  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
    };
    return config;
  },
  env: {
    MY_VAR: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
