import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Youtube, Github, Linkedin, Twitter } from "lucide-react";
import Logo from "../logo";

const navigation = {
  main: [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
  ],
  projects: [
    { name: "My Work", href: "#projects" },
    { name: "GitHub", href: "https://github.com/nicotordev" },
  ],
  solutions: [
    { name: "Web Development", href: "#" },
    { name: "Mobile Development", href: "#" },
    { name: "UI/UX Design", href: "#" },
    { name: "Consulting", href: "#" },
  ],
  support: [
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Status", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
  contact: [
    { name: "Email", href: "mailto:contact@nicotordev.com" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/nicotordev" },
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
    {
      name: "YouTube",
      href: "https://youtube.com/@nicotordev",
      icon: Youtube,
    },
  ],
};

export default function Footer() {
  return (
    <footer
      className="relative flex flex-col font-sans antialiased overflow-clip bg-primary text-primary-foreground"
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

        <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="relative xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Logo + Description + Social */}
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                {/* Assuming Logo accepts a className or color prop to make it white */}
                <Logo className="text-primary-foreground" />
              </div>

              <p className="text-sm leading-6 text-primary-foreground/90 max-w-xs">
                Building modern interfaces, crafting seamless digital
                experiences.
              </p>

              <div className="flex space-x-6">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 hover:scale-110 transform"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">
                      {item.name} (opens in a new tab)
                    </span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {/* Solutions */}
                <div>
                  {/* FIXED: text-foreground (dark) -> text-primary-foreground (light) */}
                  <h3 className="text-base font-bold leading-6 text-primary-foreground font-display">
                    Solutions
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {navigation.solutions.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support */}
                <div className="mt-10 md:mt-0">
                  <h3 className="text-base font-bold leading-6 text-primary-foreground font-display">
                    Support
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {navigation.support.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-8">
                {/* Company */}
                <div>
                  <h3 className="text-base font-bold leading-6 text-primary-foreground font-display">
                    Company
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {navigation.company.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal */}
                <div className="mt-10 md:mt-0">
                  <h3 className="text-base font-bold leading-6 text-primary-foreground font-display">
                    Legal
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-16 border-t border-primary-foreground/20 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-primary-foreground font-display">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/80">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
            </div>

            <form className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row items-center">
              <Input
                id="email-address"
                type="email"
                required
                placeholder="Enter your email"
                // FIXED: Using white text (primary-foreground) inside the input
                className="h-12 rounded-xl border-foreground bg-background px-4 text-foreground backdrop-blur-md placeholder:text-foreground/50 focus:bg-secondary-foreground focus-visible:ring-secondary-foreground focus-visible:ring-offset-secondary transition-all duration-300"
              />
              {/* FIXED: Inverted button colors (White background, Pink text) so it pops */}
              <Button
                type="submit"
                className="h-12 w-full sm:w-auto rounded-xl bg-primary-foreground text-primary hover:bg-background font-bold shadow-lg"
              >
                Subscribe
                <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 border-t border-primary-foreground/20 pt-8 md:flex md:items-center md:justify-between">
            <p className="text-xs leading-5 text-primary-foreground/70">
              &copy; {new Date().getFullYear()} NicotorDev. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
