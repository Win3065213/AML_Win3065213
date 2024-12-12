import NextAuth from 'next-auth';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXTAUTH_SECRET: "JNeIwhHCzaMnuOiOnw9buF874h829DUf",
        NEXTAUTH_URL: "http://localhost:3000",
    }
};

export default nextConfig;
