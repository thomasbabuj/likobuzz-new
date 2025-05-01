import type { NextConfig } from "next";
import "./lib/env.server";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.allkpop.com"],
  },
};

export default nextConfig;
