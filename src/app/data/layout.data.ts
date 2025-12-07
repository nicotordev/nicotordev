import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export const footerNavigation = {
  links: [
    { key: "about", fallback: "About", href: "#about" },
    { key: "projects", fallback: "Projects", href: "#projects" },
    { key: "services", fallback: "Services", href: "#services" },
    { key: "contact", fallback: "Contact", href: "#contact" },
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
