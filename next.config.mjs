/** @type {import('next').NextConfig} */
const nextConfig = {
  // The animation code is imperative DOM work ported from the original static
  // site; strict-mode double-mounting in dev would run every effect twice.
  reactStrictMode: false,
};

export default nextConfig;
