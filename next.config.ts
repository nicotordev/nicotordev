import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

function directusImageHostname(): string {
  const raw =
    process.env.NEXT_PUBLIC_DIRECTUS_URL ??
    process.env.DIRECTUS_URL ??
    "https://directus.nicotordev.com";
  try {
    const withProto = raw.startsWith("http") ? raw : `https://${raw}`;
    return new URL(withProto).hostname;
  } catch {
    return "directus.nicotordev.com";
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  poweredByHeader: false,
  compress: true,
  output: "standalone",

  images: {
    qualities: [45, 75],
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "avatars.dicebear.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: directusImageHostname() },
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
