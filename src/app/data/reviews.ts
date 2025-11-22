export interface Review {
  clientImage: string;
  title: string;
  rating: number | null;
  dates: string;
  feedback: string | null;
  amount: number;
  paymentType: string;
  hours: number | null;
  hourlyRate: number | null;
}

export const reviews: Review[] = [
  {
    clientImage: "/images/profile-pics/1.webp",
    title:
      "Full-stack developer (React / NextJs / Tailwind) to build a dashboard page",
    rating: null,
    dates: "Nov 6, 2023 - Jan 11, 2024",
    feedback: null,
    amount: 800,
    paymentType: "Fixed price",
    hours: null,
    hourlyRate: null,
  },
  {
    clientImage: "/images/profile-pics/2.webp",
    title:
      "Frontend Specialist for a Marketplace (Next.js) - Ongoing Project 95% Ready (Bugs+Small Tickets)",
    rating: 5.0,
    dates: "Nov 16, 2023 - Jan 3, 2024",
    feedback:
      "Nicolas was a great hire - very determined, motivated with an eye for detail. Even though he is young he brings everything you need to get the job done.",
    amount: 2901.87,
    paymentType: "Hourly",
    hours: 313,
    hourlyRate: 8.99,
  },
  {
    clientImage: "/images/profile-pics/3.webp",
    title: "CMS fix static pages",
    rating: 5.0,
    dates: "Nov 17, 2023 - Nov 18, 2023",
    feedback:
      "Nicolas works very fast, he proposed a much better solution for the issue that needed to be resolved. A few extra tweaks were done without any questions. I am always satisfied.",
    amount: 60,
    paymentType: "Fixed price",
    hours: null,
    hourlyRate: null,
  },
  {
    clientImage: "/images/profile-pics/4.webp",
    title: "DevOps Engineer with Expertise in Next.js, Nginx, and Automation",
    rating: 5.0,
    dates: "Nov 2, 2023 - Nov 16, 2023",
    feedback:
      "Nicolas did a 3 day job in just 12 hours. All requirements met and some extra jobs as well. Always a pleasure to work with Nicolas! Gracias",
    amount: 65,
    paymentType: "Fixed price",
    hours: null,
    hourlyRate: null,
  },
  {
    clientImage: "/images/profile-pics/5.webp",
    title: "Fileserver milestone 2",
    rating: 5.0,
    dates: "Sep 6, 2023 - Sep 13, 2023",
    feedback:
      "Nicolas helped me to refine the fileserver upload functionalities and implemented it in an existing function. He was willing to help me with things outside scope.",
    amount: 150,
    paymentType: "Fixed price",
    hours: null,
    hourlyRate: null,
  },
  {
    clientImage: "/images/profile-pics/6.webp",
    title: "Ubuntu DO fileserver with drag and drop",
    rating: 5.0,
    dates: "Aug 25, 2023 - Sep 1, 2023",
    feedback:
      "Nicolas has created a drag and drop fileserver functionality and helped me when I needed it. He is fast and knowledgeable, willing to go the extra mile.",
    amount: 80,
    paymentType: "Fixed price",
    hours: null,
    hourlyRate: null,
  },
  {
    clientImage: "/images/profile-pics/7.webp",
    title: "Crypto screener using React js",
    rating: 4.7,
    dates: "Aug 24, 2023 - Aug 24, 2023",
    feedback:
      "Nicolas is an outstanding freelancer whose technical prowess is matched only by his commitment to excellence. With a tight deadline, he ensured full functionality.",
    amount: 800,
    paymentType: "Fixed price",
    hours: null,
    hourlyRate: null,
  },
  {
    clientImage: "/images/profile-pics/8.webp",
    title:
      "Quick10x: Real-Time Crypto Analytics SaaS Platform — Need help with setting up Nodemailer JS",
    rating: 5.0,
    dates: "Aug 3, 2023 - Aug 3, 2023",
    feedback:
      "Very punctual, on task and project delivered within the expected timeframe. Thanks so much!",
    amount: 20,
    paymentType: "Fixed price",
    hours: null,
    hourlyRate: null,
  },
  {
    clientImage: "/images/profile-pics/9.webp",
    title: "Full-Stack Developer Needed for Legal Compliance MVP",
    rating: 5.0,
    dates: "Jun 29, 2025 - Nov 15, 2025",
    feedback:
      "Nicolas has been excellent to work with. He understands complex concepts quickly and converts them into intuitive and functional solutions.",
    amount: 3346.5,
    paymentType: "Hourly",
    hours: 146,
    hourlyRate: 23,
  },
  {
    clientImage: "/images/profile-pics/10.webp",
    title: "Front End Developer - Shadcn Admin Kit",
    rating: 5.0,
    dates: "Jun 28, 2025 - Sep 8, 2025",
    feedback: null,
    amount: 1081,
    paymentType: "Hourly",
    hours: 47,
    hourlyRate: 23,
  },
  {
    clientImage: "/images/profile-pics/11.webp",
    title: "Convert a 1 page figma into html",
    rating: null,
    dates: "Jun 28, 2025 - Sep 8, 2025",
    feedback: null,
    amount: 100,
    paymentType: "Fixed price",
    hours: null,
    hourlyRate: null,
  },
  {
    clientImage: "/images/profile-pics/12.webp",
    title:
      "Quick Fix: Clerk Authentication & Neon Database Setup in Existing Wine Platform",
    rating: null,
    dates: "Jun 30, 2025 - Sep 8, 2025",
    feedback: null,
    amount: 200,
    paymentType: "Fixed price",
    hours: null,
    hourlyRate: null,
  },
  {
    clientImage: "/images/profile-pics/13.webp",
    title: "Expert .NextJS developer needed for backend restructuring",
    rating: 5.0,
    dates: "Jun 29, 2025 - Jul 3, 2025",
    feedback: null,
    amount: 50,
    paymentType: "Fixed price",
    hours: null,
    hourlyRate: null,
  },
  {
    clientImage: "/images/profile-pics/14.webp",
    title: "Full stack web engineer",
    rating: 5.0,
    dates: "Oct 7, 2024 - Oct 28, 2024",
    feedback: null,
    amount: 792.5,
    paymentType: "Hourly",
    hours: 53,
    hourlyRate: 15,
  },
  {
    clientImage: "/images/profile-pics/15.webp",
    title:
      "Frontend Specialist for a Marketplace (Next.js) — Long Ongoing Project",
    rating: 5.0,
    dates: "Jan 3, 2024 - Sep 30, 2024",
    feedback:
      "We hired Nicolas for bug-fixing, but soon realised he's incredibly talented and grasps tasks ultra-fast. We extended him into a much longer project.",
    amount: 14200,
    paymentType: "Fixed price",
    hours: null,
    hourlyRate: null,
  },
  {
    clientImage: "/images/profile-pics/16.webp",
    title: "Full Stack Engineer - Applied AI Systems",
    rating: 5.0,
    dates: "Jan 22, 2024 - Sep 28, 2024",
    feedback:
      "Nicolas is a great engineer, brings great energy and enthusiasm. Highly recommended.",
    amount: 2933.02,
    paymentType: "Hourly",
    hours: 210,
    hourlyRate: 14,
  },
  {
    clientImage: "/images/profile-pics/17.webp",
    title: "React & Node Dev Needed (Web App: Node, React, MUI & MySQL)",
    rating: null,
    dates: "Nov 12, 2023 - Mar 28, 2024",
    feedback: null,
    amount: 77.91,
    paymentType: "Hourly",
    hours: 9,
    hourlyRate: 8.99,
  },
  {
    clientImage: "/images/profile-pics/18.webp",
    title: "Recreate Website in React",
    rating: 5.0,
    dates: "Jan 2, 2024 - Feb 8, 2024",
    feedback:
      "It was an absolute pleasure working with Nicolas. Very responsive, great code, continuous support.",
    amount: 265.79,
    paymentType: "Hourly",
    hours: 22,
    hourlyRate: 11.99,
  },
];

export const firstRow = reviews.slice(0, reviews.length / 2);
export const secondRow = reviews.slice(reviews.length / 2);
export const thirdRow = reviews.slice(0, reviews.length / 2);
export const fourthRow = reviews.slice(reviews.length / 2);
