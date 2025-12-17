import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  poweredByHeader: false,
  compress: true,
  output: "standalone",

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "avatars.dicebear.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },

  productionBrowserSourceMaps: false,

  logging: {
    fetches: { fullUrl: true },
  },

  transpilePackages: [],
  serverExternalPackages: [
    "pino",
    "sharp",
    "bcrypt",
    "prisma",
    "@prisma/client",
  ],
  // Disable cacheComponents to allow per-route dynamic configs (e.g., force-dynamic).
  cacheComponents: false,

  experimental: {
    // ✅ reemplazo de ppr

    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "lodash",
      "ramda",
      "@radix-ui/react-icons",
      "@radix-ui/react-avatar",
      "recharts",
      "framer-motion",
    ],

    // ⛔ eliminar serverComponentsExternalPackages (ya movido arriba)
    // ⛔ eliminar parallelServerCompiles / optimizeServerReact (internas)

    staleTimes: {
      dynamic: 30,
      static: 180,
    },

    // CWV diagnostics: include attribution for CLS/LCP when available (e.g., DOM node summary).
    webVitalsAttribution: ["CLS", "LCP"],

  },

  turbopack: {
    resolveAlias: {
      underscore: "lodash",
    },
  },

  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
      preventFullImport: true,
    },
    "date-fns": {
      transform: "date-fns/{{member}}",
    },
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|png|webp|avif|css|js)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async rewrites() {
    const backendBase =
      process.env.ADMIN_API_BASE_URL ??
      process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ??
      "http://localhost:3001";
    const backend = backendBase.replace(/\/$/, "");

    return [
      {
        source: "/r/:slug*",
        destination: `${backend}/r/:slug*`,
      },
      {
        source: "/api/:path*",
        destination: `${backend}/api/:path*`,
      },
    ];
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
    reactRemoveProperties: true,
  },
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./locales/es-cl.json",
  },
});

export default withNextIntl(nextConfig);
