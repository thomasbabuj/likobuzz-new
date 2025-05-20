// import type { NextConfig } from "next";
// import "./lib/env.server";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["www.allkpop.com", "https://utfs.io/f"],
//   },
// };

// export default nextConfig;

import { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.allkpop.com",
        port: "",
        pathname: "/upload/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**",
        search: "",
      },
    ],
  },
};

export default config;
