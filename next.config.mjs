// next.config.mjs
// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin();

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
  // export default withNextIntl(nextConfig);