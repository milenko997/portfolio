import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value:
              process.env.VERCEL_ENV === "production"
                ? "index, follow"
                : "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
