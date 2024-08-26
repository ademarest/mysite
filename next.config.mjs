/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/game/:id*',
          headers: [
            {
              key: 'Cross-origin-Embedder-Policy',
              value: 'require-corp',
            },
            {
              key: 'Cross-origin-Opener-Policy',
              value: 'same-origin',
            },
          ],
        },
      ]
    },
  };


export default nextConfig;




/*
headers: [
    {
        key: 'Cross-origin-Embedder-Policy',
        value: 'require-corp',
    },
    {
        key: 'Cross-origin-Opener-Policy',
        value: 'same-origin',
    },
],
 */