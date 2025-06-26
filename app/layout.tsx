import { getLanguage } from "./actions/language.actions";
import { getSession } from "./actions/auth.actions";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { JetBrains_Mono, IBM_Plex_Mono, Fira_Code } from "next/font/google";
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-sans",
    subsets: ["latin"],
    display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
    variable: "--font-serif",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    display: "swap",
});

const firaCode = Fira_Code({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
});



export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const userLanguage = await getLanguage()
    await getSession()
    return <>
        <html lang={userLanguage} suppressHydrationWarning>
            <head />
            <body
                className={`${jetbrainsMono.variable} ${ibmPlexMono.variable} ${firaCode.variable} antialiased`}
            >
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
}