/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/declaratie',
                destination: process?.env?.DECLARATIE_REDIRECT ?? '/',
                permanent: false,
            },
            {
                source: '/planning',
                destination: process?.env?.PLANNING_REDIRECT ?? '/',
                permanent: false,
            },
        ];
    },
    output: 'standalone',
    images: {
        unoptimized: true,
    },
    experimental: {
        taint: true,
    },
};

module.exports = nextConfig;
