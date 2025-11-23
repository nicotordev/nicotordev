export default async function manifest() {
  return {
    name: "NicoTorDev",
    short_name: "NicoTorDev",
    start_url: "/",
    display: "standalone",
    icons: [
      { src: "/web-app-manifest-192x192.webp", sizes: "192x192", type: "image/webp" },
      { src: "/web-app-manifest-512x512.webp", sizes: "512x512", type: "image/webp" },
    ],
  };
}
