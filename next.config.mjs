/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "cdn-icons-mp4.flaticon.com" },
            { protocol: "https", hostname: "imgs.search.brave.com" },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
