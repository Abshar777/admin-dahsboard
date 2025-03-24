/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // This will ignore all ESLint errors during build
    },
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
            },
        ],
    },
};

module.exports = nextConfig;
