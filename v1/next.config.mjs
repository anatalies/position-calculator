/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverActions: {
        allowedOrigins: ['https://animated-halibut-pjjxp4px655vh76g4-3000.app.github.dev/', '127.0.0.1', 'localhost:3000'],
        },
    },
};

export default nextConfig;
