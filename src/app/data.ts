export type NavigationT = {
  home: string;
  about: string;
  projects: string;
  blog: string;
  contact: string;
};
export const navigationItems = (navigationT: NavigationT) => [
  { name: navigationT.home, href: "#home" },
  { name: navigationT.about, href: "#about" },
  { name: navigationT.projects, href: "#projects" },
  { name: navigationT.blog, href: "#blog" },
  { name: navigationT.contact, href: "#contact" },
];
