import { getLanguage } from "./actions/language.actions";
import { getSession } from "./actions/auth.actions";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata = {
  title: "NicoTorDev",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLanguage = await getLanguage();
  await getSession();
  return (
    <>
      <html lang={userLanguage} suppressHydrationWarning>
        <head>
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-title" content="NicoTorDev" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body className={`antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
