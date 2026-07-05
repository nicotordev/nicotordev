import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

export const footerNavigation = {
  links: [
    { key: "about", fallback: "About", href: "/about" },
    { key: "projects", fallback: "Projects", href: "/projects" },
    { key: "services", fallback: "Services", href: "/services" },
    { key: "contact", fallback: "Contact", href: "/contact" },
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/nicotordev",
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/nicotordev",
      icon: FaLinkedin,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/nicotordev",
      icon: FaXTwitter,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/nicotordev",
      icon: FaInstagram,
    },
  ],
} as const;
