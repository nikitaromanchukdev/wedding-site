import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder outfit photos until real assets land in src/assets/dress-code/.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
