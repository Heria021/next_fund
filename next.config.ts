/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, 
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/auth/sign-in',
          permanent: true,
        },
      ];
    }
  };
  
  export default nextConfig;