import { getLanguage } from "./actions/language.actions";
import { getSession } from "./actions/auth.actions";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

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
        <head />
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
