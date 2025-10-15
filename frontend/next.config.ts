import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const pwaConfig = withPWA({
  dest: "public",
  swSrc: "src/firebase-messaging-sw.js",
  register: false,
  swcMinify: false,
  buildExcludes: [/middleware-manifest.json$/],
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default pwaConfig(nextConfig);
