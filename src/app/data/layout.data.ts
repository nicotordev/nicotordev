import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export const footerNavigation = {
  links: [
    { key: "about", fallback: "About", href: "#about-section" },
    { key: "projects", fallback: "Projects", href: "#projects-section" },
    { key: "services", fallback: "Services", href: "#services-section" },
    { key: "contact", fallback: "Contact", href: "#contact-section" },
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
      name: "Instagram",
      href: "https://www.instagram.com/4cidkid",
      icon: Instagram,
    },
  ],
};
