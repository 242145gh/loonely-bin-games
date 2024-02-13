/** @type {import('next').NextConfig} */
module.exports = {
  mode: 'production',
    experimental: {
      serverActions: {
        allowedOrigins: ['discord.com'],
      },
    },
  }