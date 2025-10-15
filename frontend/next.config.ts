import type { NextConfig } from "next";
import withSerwist from "@serwist/next";

const withSerwistConfig = withSerwist({
  swSrc: "src/firebase-messaging-sw.js",
  swDest: "public/sw.js",
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSerwistConfig(nextConfig);
