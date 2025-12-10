import { footerNavigation } from "@/app/data/layout.data";
import type { Messages } from "@/types/i18n";
import Logo from "../logo";
import FooterNewsletter from "./footer-newsletter";

interface FooterProps {
  messages: Messages;
}

export default function Footer({ messages }: FooterProps) {
  const navigationMessages = messages.navigation ?? {};
  const footerTitle = messages.footer?.title || "NicoTorDev Footer";
  const descriptionCopy =
    messages.footer?.description?.focus ||
    "Building calm, fast products with a human voice.";
  const opensInNewTab = messages.footer?.opensInNewTab ?? "opens in new tab";
  const translatedLinks = footerNavigation.links.map((link) => ({
    ...link,
    label:
      navigationMessages[link.key as keyof typeof navigationMessages] ||
      link.fallback,
  }));

  return (
    <footer
      className="relative flex flex-col font-sans antialiased bg-primary text-primary-foreground border-t border-primary-foreground/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:shadow-[0_-18px_48px_rgba(0,0,0,0.18)] bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.05),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.04),transparent_45%)]"
      aria-labelledby="footer-heading"
    >
      <FooterNewsletter messages={messages} />
      {/* Gradient Overlay for texture (optional) */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent to-foreground/5 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 pt-20">
        <h2 id="footer-heading" className="sr-only">
          {footerTitle}
        </h2>

        <div className="relative mx-auto max-w-6xl px-6 py-4 sm:py-6 lg:px-8">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-4 max-w-xs sm:max-w-sm">
              <Logo className="text-primary-foreground" />
              <p className="text-sm leading-6 text-primary-foreground/80">
                {descriptionCopy}
              </p>
              <div className="flex gap-4">
                {footerNavigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">
                      {item.name} ({opensInNewTab})
                    </span>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:items-end sm:pt-1">
              <nav aria-label="Footer">
                <ul className="flex flex-wrap gap-3 text-sm text-primary-foreground/80">
                  {translatedLinks.map((item) => (
                    <li key={item.key}>
                      <a
                        href={item.href}
                        className="hover:text-primary-foreground transition-colors"
                      >
                        {typeof item.label === "string" ? item.label : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                href="mailto:hello@nicotordev.com"
                className="text-sm font-medium text-primary-foreground hover:text-primary-foreground/90 transition-colors"
              >
                hello@nicotordev.com
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-primary-foreground/15 pt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <p className="text-xs leading-5 text-primary-foreground/70">
              &copy; {new Date().getFullYear()} NicotorDev.{" "}
              {messages.footer?.copyright || "All rights reserved."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
