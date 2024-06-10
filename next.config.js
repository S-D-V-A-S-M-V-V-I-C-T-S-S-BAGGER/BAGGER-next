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
};

module.exports = nextConfig;
