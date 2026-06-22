import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` on `next build`, so it can be
  // uploaded to any web host (cPanel/FTP, Netlify, etc.). The site has no
  // server features — all pages are static and the 3D viewer runs client-side.
  output: "export",

  // Emit `/path/index.html` so directory-style hosts resolve routes cleanly.
  trailingSlash: true,
};

export default nextConfig;
