/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_URL: process.env.SERVER_URL,
        TOKEN: process.env.TOKEN
}}

module.exports = nextConfig
