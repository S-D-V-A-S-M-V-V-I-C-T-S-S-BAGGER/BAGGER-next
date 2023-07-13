/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/declaratie',
                destination: 'https://docs.google.com/forms/d/e/1FAIpQLSdyzIyKEI8HndK9RSDrTiIpkLLD2TLotthQI-kscaF8MA7TuA/viewform',
                permanent: true
            },
            {
                source: '/planning',
                destination: 'https://docs.google.com/spreadsheets/d/1o6McMzRbeRmsw71dv7S6Yz6koyDP60c9yVAX_mkPbKI',
                permanent: true
            }
        ]
    }
}

module.exports = nextConfig
