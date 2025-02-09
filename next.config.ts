/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
      return [
          {
              source: '/',
              destination: '/auth/sign-in',
              permanent: true,
          }
      ]
  }
};

export default nextConfig;
