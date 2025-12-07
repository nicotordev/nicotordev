import { Github, Linkedin, Twitter } from "lucide-react";
import Logo from "../logo";

const navigation = {
  links: [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com/nicotordev", icon: Github },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/nicotordev",
      icon: Linkedin,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/nicotordev",
      icon: Twitter,
    },
  ],
};

export default function Footer() {
  return (
    <footer
      className="relative flex flex-col font-sans antialiased overflow-clip bg-primary text-primary-foreground border-t border-primary-foreground/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:shadow-[0_-18px_48px_rgba(0,0,0,0.18)] bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.05),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.04),transparent_45%)]"
      aria-labelledby="footer-heading"
    >
      {/* Gradient Overlay for texture (optional) */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-foreground/5 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <h2 id="footer-heading" className="sr-only">
          NicotorDev Footer
        </h2>

        <div className="relative mx-auto max-w-6xl px-6 py-12 sm:py-14 lg:px-8">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-4 max-w-xs sm:max-w-sm">
              <Logo className="text-primary-foreground" />
              <p className="text-sm leading-6 text-primary-foreground/80">
                Building calm, fast products with a human voice.
              </p>
              <div className="flex gap-4">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">
                      {item.name} (opens in a new tab)
                    </span>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:items-end sm:pt-1">
              <nav aria-label="Footer">
                <ul className="flex flex-wrap gap-3 text-sm text-primary-foreground/80">
                  {navigation.links.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="hover:text-primary-foreground transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                href="mailto:contact@nicotordev.com"
                className="text-sm font-medium text-primary-foreground hover:text-primary-foreground/90 transition-colors"
              >
                contact@nicotordev.com
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-primary-foreground/15 pt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <p className="text-xs leading-5 text-primary-foreground/70">
              &copy; {new Date().getFullYear()} NicotorDev. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
