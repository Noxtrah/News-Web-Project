// next.config.mjs

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    pageExtensions: ['tsx', 'jsx'],
  };

  

  export default nextConfig;