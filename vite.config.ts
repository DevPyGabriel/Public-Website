import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import path from "path";

const SEO_LAST_MOD = new Date().toISOString().split("T")[0];

// Genera robots.txt y sitemap.xml usando el dominio de VITE_SITE_URL.
function seoFiles(siteUrl: string): Plugin {
  return {
    name: "generate-seo-files",
    apply: "build",
    generateBundle() {
      const origin = siteUrl.replace(/\/+$/, "");
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <lastmod>${SEO_LAST_MOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
      const robots = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl =
    env.VITE_SITE_URL || "https://novadrive.vercel.app";

  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
})