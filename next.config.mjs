/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STRAPI_ADDRESS: 'http://127.0.0.1:1337/graphql'
  }
};

export default nextConfig;
