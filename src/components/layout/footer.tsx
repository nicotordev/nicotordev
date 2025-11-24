import { Send, Youtube, Github, Linkedin, Twitter } from "lucide-react";
import Logo from "../logo";
import Image from "next/image";
import BackgroundWaves3D from "../backgrounds/background-waves";
import NoisyBackground from "../backgrounds/noisy-background";

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
      className="relative flex flex-col font-sans antialiased overflow-clip border-t-4 border-primary/80"
      aria-labelledby="footer-heading"
      style={{
        boxShadow:
          "0px -10px 20px rgba(0, 0, 0, 0.1), inset 0px 5px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <NoisyBackground />
      <BackgroundWaves3D className="-z-1" />
      <div
        className="absolute top-0 left-0 w-full h-full from-primary/70 to-background/50 bg-linear-to-t z-0"
        aria-hidden="true"
      />

      <div className="relative z-1">
        <h2 id="footer-heading" className="sr-only">
          NicotorDev Footer
        </h2>
        <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="relative xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <Logo />
              </div>
              <p className="text-sm leading-6 text-primary-foreground max-w-xs">
                Building modern interfaces with the most advanced color palette
                on the web.
              </p>
              <div className="flex space-x-6">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-primary-foreground hover:text-primary transition-colors duration-200"
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
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-base font-bold leading-6 text-foreground font-display">
                    Solutions
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {navigation.solutions.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-primary-foreground hover:text-primary transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-base font-bold leading-6 text-foreground font-display">
                    Support
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {navigation.support.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-primary-foreground hover:text-primary transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-base font-bold leading-6 text-foreground font-display">
                    Company
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {navigation.company.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-primary-foreground hover:text-primary transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-base font-bold leading-6 text-foreground font-display">
                    Legal
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-primary-foreground hover:text-primary transition-colors"
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
          <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-foreground font-display">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-sm leading-6 text-primary-foreground">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
            </div>
            <form className="mt-6 sm:flex sm:max-w-md lg:mt-0 gap-2">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-w-[260px]"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:mt-0 sm:shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2 group"
                >
                  Subscribe
                  <Send
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </form>
          </div>
          <div className="mt-8 border-t border-border pt-8 md:flex md:items-center md:justify-between">
            <p className="text-xs leading-5 text-primary-foreground">
              &copy; {new Date().getFullYear()} NicotorDev. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
