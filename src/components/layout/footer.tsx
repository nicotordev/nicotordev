import { footerNavigation } from "@/app/data/layout.data";
import type { Messages } from "@/types/i18n";
import { useMemo } from "react";
import Logo from "../logo";
import FooterNewsletter from "./footer-newsletter";

interface FooterProps {
  messages: Messages;
}

type NavMessages = NonNullable<Messages["navigation"]>;
type FooterLink = (typeof footerNavigation.links)[number];

export default function Footer({ messages }: FooterProps) {
  const navigationMessages: NavMessages = (messages.navigation ??
    {}) as NavMessages;

  const footerTitle = messages.footer?.title ?? "NicoTorDev Footer";
  const descriptionCopy =
    messages.footer?.description?.focus ??
    "Building calm, fast products with a human voice.";
  const opensInNewTab = messages.footer?.opensInNewTab ?? "opens in new tab";

  const translatedLinks = useMemo(() => {
    return footerNavigation.links.map((link: FooterLink) => {
      const maybeLabel = navigationMessages[link.key as keyof NavMessages];
      return {
        ...link,
        label: typeof maybeLabel === "string" ? maybeLabel : link.fallback,
      };
    });
  }, [navigationMessages]);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      className="relative mt-12 flex flex-col border-t border-primary-foreground/10 bg-primary font-sans text-primary-foreground antialiased shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:shadow-[0_-18px_48px_rgba(0,0,0,0.18)] sm:mt-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.05),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.04),transparent_45%)]"
      aria-labelledby="footer-heading"
    >
      <FooterNewsletter messages={messages} />

      {/* Gradient overlay texture */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-full bg-linear-to-b from-transparent to-foreground/5"
        aria-hidden="true"
      />

      <div className="relative z-10 pt-36">
        <h2 id="footer-heading" className="sr-only">
          {footerTitle}
        </h2>

        <div className="relative mx-auto max-w-7xl px-6 py-4 sm:py-6 lg:px-8">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xs space-y-4 sm:max-w-sm">
              <Logo className="text-primary-foreground" />

              <p className="text-sm leading-6 text-primary-foreground/80">
                {descriptionCopy}
              </p>

              <div className="flex gap-4">
                {footerNavigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-primary-foreground/80 transition-colors duration-200 hover:text-primary-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name} (${opensInNewTab})`}
                  >
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
                        className="transition-colors hover:text-primary-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <a
                href="mailto:hello@nicotordev.com"
                className="text-sm font-medium text-primary-foreground transition-colors hover:text-primary-foreground/90"
              >
                hello@nicotordev.com
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-primary-foreground/15 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <p
              className="text-xs leading-5 text-primary-foreground/70"
              suppressHydrationWarning
            >
              &copy; {year} NicotorDev.{" "}
              {messages.footer?.copyright ?? "All rights reserved."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
