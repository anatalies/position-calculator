/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverActions: {
        allowedOrigins: ['https://animated-halibut-pjjxp4px655vh76g4-3000.app.github.dev/', '127.0.0.1', 'localhost:3000', "https://animated-halibut-pjjxp4px655vh76g4-3001.app.github.dev/", 'localhost:3001', 'https://improved-dollop-5gxr65ppg55x3774q-3000.app.github.dev/'],
        },
    },
};

export default nextConfig;
