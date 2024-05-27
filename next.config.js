/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/declaratie',
                destination: process?.env?.DECLARATIE_REDIRECT,
                permanent: true,
            },
            {
                source: '/planning',
                destination: process?.env?.PLANNING_REDIRECT,
                permanent: true,
            },
        ];
    },
    output: 'standalone',
};

module.exports = nextConfig;
