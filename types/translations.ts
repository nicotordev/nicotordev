export type Translations = {
  hero: {
    greeting: string;
    name: string;
    title: string;
    title_backend: string;
    title_frontend: string;
    description: string;
    cta: {
      about: string;
      resume: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    role: {
      current: string;
      position: string;
      mode: string;
      modeDetails: string;
    };
    metrics: {
      title: string;
      subtitle: string;
      hours: string;
      earnings: string;
      total_earnings_short: string;
      total_earnings: string;
      success: string;
      salary: string;
      experienceValue: string;
      experience: string;
      complete: string;
    };
    specialties: {
      title: string;
      description: string;
    };
    stack: {
      title: string;
      description: string;
    };
    methodology: {
      title: string;
      title_frontend: string;
      title_backend: string;
      title_styling: string;
      description: string;
      client_first: string;
      results_driven: string;
    };
    workStyle: {
      title: string;
      description: string;
    };
    projects: {
      title: string;
      subtitle: string;
      seguidoress: string;
      spiritory: string;
      quick10x: string;
      spiritory_impact: string;
      quick10x_impact: string;
      seguidoress_impact: string;
      spiritory_ct: string;
      quick10x_ct: string;
      seguidoress_ct: string;
    };
    personal: {
      title: string;
      description: string;
    };
    cta: {
      title: string;
      description: string;
      contact: string;
      alternative: string;
      modal: {
        title: string;
        description: string;
        personal: {
          title: string;
          name: {
            label: string;
            placeholder: string;
          };
          email: {
            label: string;
            placeholder: string;
          };
          company: {
            label: string;
            placeholder: string;
          };
        };
        project: {
          title: string;
          type: {
            label: string;
            placeholder: string;
            options: {
              'web-development': string;
              'mobile-app': string;
              'e-commerce': string;
              'saas-platform': string;
              portfolio: string;
              consulting: string;
              other: string;
            };
          };
          budget: {
            label: string;
            options: {
              'under-5k': string;
              '5k-15k': string;
              '15k-30k': string;
              '30k-50k': string;
              '50k+': string;
            };
          };
          timeline: {
            label: string;
            placeholder: string;
            asap: string;
            '1-month': string;
            '1-3-months': string;
            '3-6-months': string;
            '6-months+': string;
          };
          priority: {
            label: string;
            options: {
              design: string;
              performance: string;
              functionality: string;
              seo: string;
              'user-experience': string;
            };
          };
        };
        message: {
          title: string;
          description: {
            label: string;
            placeholder: string;
          };
          contact: {
            label: string;
            email: string;
            phone: string;
            video: string;
            send: string;
            sending: string;
            cancel: string;
            success: string;
            error: string;
          };
        };
        validation: {
          name: {
            min: string;
            max: string;
            format: string;
          };
          email: {
            invalid: string;
            required: string;
          };
          company: {
            required: string;
            max: string;
          };
          projectType: {
            required: string;
          };
          budget: {
            required: string;
          };
          timeline: {
            required: string;
          };
          priority: {
            required: string;
          };
          message: {
            min: string;
            max: string;
          };
          contactPreference: {
            required: string;
          };
        };
        success: {
          title: string;
          description: string;
        };
      };
    };
    testimonial: {
      title: string;
      quote: string;
      author: string;
    };
    certifications: {
      title: string;
      postgresql: string;
      java: string;
    };
  };
  navigation: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    language: string;
    theme: string;
  };
  common: {
    loading: string;
    error: string;
    currency: string;
    locale: string;
  };
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
  NotFound: {
    title: string;
    description: string;
    goHome: string;
  };
  theme: {
    toggle: string;
    light: string;
    dark: string;
    system: string;
  };
  resume: {
    pdf: string;
    pptx: string;
    csv: string;
    json: string;
  };
  es: string;
  en: string;
  de: string;
  'es-cl': string;
  'es-es': string;
  'en-gb': string;
};


export const defaultTranslations: Translations = {
  hero: {
    greeting: "Hi, I'm 👋",
    name: "Nicolas Torres",
    title: "Full Stack Developer 🚀",
    description: "I'm a passionate Full Stack Developer with experience building modern web applications that deliver an awesome user experience. 💪✨",
    cta: {
      about: "About me 🤓",
      resume: "Download Resume 📄"
    },
    title_backend: "Backend & Database 🗄️",
    title_frontend: "Frontend Mastery 🎨"
  },
  about: {
    title: "About me 😎",
    subtitle: "Full-Stack Developer TypeScript-First 🚀💥",
    description: "I build web products from start to finish with Node.js + Express on the server and Next.js 14 on the frontend, always prioritizing TypeScript and a smooth user experience. 🔥💻",
    role: {
      current: "Current role 💼",
      position: "Full-Stack Developer at spiritory GmbH 🏢",
      mode: "Work mode 🌍",
      modeDetails: "100% remote · Upwork Top Rated ⭐"
    },
    metrics: {
      title: "Performance Metrics",
      subtitle: "Real results that speak for themselves",
      hours: "Hours worked ⏰",
      earnings: "Earnings 💰",
      total_earnings_short: "Total Earnings 💎",
      total_earnings: "Total Earnings 💸",
      success: "Success rate 📈",
      salary: "Salary 💵",
      experienceValue: "2 years of experience 🎯",
      experience: "Experience 🏆",
      complete: "complete"
    },
    specialties: {
      title: "My Superpowers 🦸‍♂️",
      description: "Turning ideas into digital experiences that captivate ✨🎨"
    },
    stack: {
      title: "My Stack 💻",
      description: "I use the following technologies to create my projects:"
    },
    methodology: {
      title: "Methodology 🧠",
      title_frontend: "Frontend Mastery 🎨",
      title_backend: "Backend & Database 🗄️",
      title_styling: "Styling & UI 💅",
      description: "Lightweight agile practice: atomic commits, small PRs, CI/CD with GitHub Actions, living documentation in MD and fast cycles of «ship → learn → improve». 🔄⚡",
      client_first: "Client-First",
      results_driven: "Results-Driven"
    },
    workStyle: {
      title: "How I work 🤝",
      description: "Always with humor and respect; I contribute useful ideas, communicate smoothly in EN/ES and keep the team aligned. 😄🌟"
    },
    projects: {
      title: "Key projects 🚀",
      subtitle: "Solutions that have generated real impact 💥",
      seguidoress: "SMM platform created 100% by me 🔥",
      spiritory: "Premium spirits e-commerce; full-stack maintenance and new features 🥃✨",
      quick10x: "Real-time crypto screener with subscriptions and admin panel ₿📊",
      spiritory_impact: "Europe's largest whisky trading platform and soon the world! 🌍🥃",
      quick10x_impact: "Real-time crypto screener with subscriptions and admin panel 📈💎",
      seguidoress_impact: "96 users, $114 USD approx. total 💰🎉",
      spiritory_ct: "Visit Spiritory 👀",
      quick10x_ct: "Visit Quick10x 🚀",
      seguidoress_ct: "Visit Seguidoress 💥"
    },
    personal: {
      title: "A bit more about me 🤠",
      description: "Outside of code, I record videos for YouTube, launch SaaS side-projects and share dev tips on social media. Programming is my number one hobby. 📺🎮💻"
    },
    cta: {
      title: "Ready to create something amazing? 🚀✨",
      description: "Let's work together to turn your vision into a digital reality that stands out. 🎯💫",
      contact: "Let's talk 💬",
      alternative: "Or connect with me on LinkedIn 🔗",
      modal: {
        title: "Let's talk about your project! 🚀",
        description: "Tell me about your vision and let's create something amazing together ✨",
        personal: {
          title: "Personal Information",
          name: {
            label: "Name",
            placeholder: "Your full name"
          },
          email: {
            label: "Email",
            placeholder: "you@email.com"
          },
          company: {
            label: "Company",
            placeholder: "Your company name"
          }
        },
        project: {
          title: "Project Details",
          type: {
            label: "Project Type",
            placeholder: "Select project type",
            options: {
              "web-development": "Web Development",
              "mobile-app": "Mobile App",
              "e-commerce": "E-commerce",
              "saas-platform": "SaaS Platform",
              portfolio: "Portfolio",
              consulting: "Consulting",
              other: "Other"
            }
          },
          budget: {
            label: "Budget",
            options: {
              "under-5k": "Under $5,000",
              "5k-15k": "$5,000 - $15,000",
              "15k-30k": "$15,000 - $30,000",
              "30k-50k": "$30,000 - $50,000",
              "50k+": "Over $50,000"
            }
          },
          timeline: {
            label: "Timeline",
            placeholder: "When do you need the project?",
            asap: "ASAP",
            "1-month": "1 month",
            "1-3-months": "1-3 months",
            "3-6-months": "3-6 months",
            "6-months+": "6+ months"
          },
          priority: {
            label: "Main Priority",
            options: {
              design: "Design",
              performance: "Performance",
              functionality: "Functionality",
              seo: "SEO",
              "user-experience": "User Experience"
            }
          }
        },
        message: {
          title: "Message and Contact",
          description: {
            label: "Project Description",
            placeholder: "Tell me more about your project, goals and specific requirements..."
          },
          contact: {
            label: "Contact Preference",
            email: "Email",
            phone: "Phone",
            video: "Video Call",
            send: "Send Message",
            sending: "Sending...",
            cancel: "Cancel",
            success: "Message sent successfully!",
            error: "Error sending message. Please try again."
          }
        },
        validation: {
          name: {
            min: "Name must be at least 2 characters",
            max: "Name cannot exceed 50 characters",
            format: "Name can only contain letters and spaces"
          },
          email: {
            invalid: "Please enter a valid email",
            required: "Email is required"
          },
          company: {
            required: "Company name is required",
            max: "Company name cannot exceed 100 characters"
          },
          projectType: {
            required: "Please select a project type"
          },
          budget: {
            required: "Please select a budget range"
          },
          timeline: {
            required: "Please select a timeline"
          },
          priority: {
            required: "Please select a main priority"
          },
          message: {
            min: "Message must be at least 20 characters",
            max: "Message cannot exceed 1000 characters"
          },
          contactPreference: {
            required: "Please select a contact preference"
          }
        },
        success: {
          title: "Message Sent! 🎉",
          description: "Thanks for reaching out. I'll get back to you soon to discuss your project."
        }
      }
    },
    testimonial: {
      title: "Featured testimonial 🌟",
      quote: "Nicolas is an exceptional developer with a deep understanding of modern web technologies. His ability to solve complex problems and deliver high-quality code is impressive. 🔥💪",
      author: "Client at spiritory GmbH 👤"
    },
    certifications: {
      title: "Relevant certifications 🏆",
      postgresql: "PostgreSQL Certification - Advanced Database Development 🗄️",
      java: "Java SE Certification - Object-Oriented Programming ☕"
    }
  },
  navigation: {
    home: "Home 🏠",
    about: "About 👤",
    projects: "Projects 🚀",
    contact: "Contact 📞",
    language: "Language 🌍",
    theme: "Theme 🎨"
  },
  common: {
    loading: "Loading... ⏳",
    error: "An error occurred 😱💥",
    currency: "USD 💵",
    locale: "en-US"
  },
  metadata: {
    title: "NicoTordev - Personal Site 🚀",
    description: "Welcome to my personal site where I share my thoughts, projects and experiences as a developer. 💻✨",
    keywords: "Personal site, Blog, Developer, TypeScript, React, Next.js, Node.js, JavaScript, Web development, Tech blog, Software development"
  },
  NotFound: {
    title: "Page not found 🤔💀",
    description: "Sorry, the page you're looking for doesn't exist or has been moved. 🕳️",
    goHome: "Go home 🏠"
  },
  theme: {
    toggle: "Toggle theme 🔄",
    light: "Light ☀️",
    dark: "Dark 🌙",
    system: "System 🖥️"
  },
  resume: {
    pdf: "PDF",
    pptx: "PPTX",
    csv: "CSV",
    json: "JSON"
  },
  es: "es",
  en: "en",
  de: "de",
  "es-cl": "es-cl",
  "es-es": "es-es",
  "en-gb": "en-gb"
}