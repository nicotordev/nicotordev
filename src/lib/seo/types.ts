export type SeoMessages = {
  site: {
    name: string;
    url: string;
  };
  title: {
    default: string;
    template: string;
  };
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    imageAlt: string;
  };
  twitter: {
    title: string;
    description: string;
    creator: string;
  };
  person: {
    name: string;
    jobTitle: string;
    image: string;
    sameAs: string[];
    knowsAbout: string[];
  };
};

