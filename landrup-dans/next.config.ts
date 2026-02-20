import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4000',
                pathname: '/**',
            },
        ],
    },
    /* config options here */
};

export default nextConfig;
