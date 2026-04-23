import type { NextConfig } from "next";
import path from "node:path";

const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  // Pin Turbopack to this project so its file watcher doesn't crawl sibling
  // projects (gearwildrose, wildrose-site, wildrosecollective) in the parent
  // /Users/joshjack/Work/WildRose directory.
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    // Turbopack's persistent fs cache writes constantly into .next/dev/cache
    // (grew to 636 MB), which triggers an fseventsd feedback loop on macOS and
    // pins next-server at ~700% CPU. Disable in dev to stop the thrash.
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    // In dev we render dozens of remote Pexels images; sharp re-encoding each
    // into multiple sizes/formats burns hundreds of CPU% on first load. Skip
    // optimization in dev — production still uses sharp.
    unoptimized: isDev,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      new URL(
        "https://mqupvuhrhdxfoesburac.supabase.co/storage/v1/object/public/**",
      ),
    ],
  },
};

export default nextConfig;
