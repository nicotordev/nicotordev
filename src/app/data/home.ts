import {
  // Problemas (Iconos de alerta/negativos)
  AlertTriangle, // Para código peligroso
  Bot, // Para falta de pensamiento crítico (trabajo robótico)
  Hourglass, // Para tiempo perdido
  ShieldAlert, // Para falta de seguridad/responsabilidad

  // Soluciones (Iconos positivos/acción)
  Braces, // Código estructurado
  Lightbulb, // Ideas y visión
  ShieldCheck, // Seguridad garantizada
  MessageSquare, // Comunicación fluida
} from "lucide-react";

export const problemSectionProblems = [
  {
    name: "Deuda Técnica (Código Espagueti)",
    description:
      "Sistemas frágiles donde corregir un error crea tres nuevos. Escalar se vuelve costoso y arriesgado.",
    icon: AlertTriangle,
  },
  {
    name: "Ejecutores sin Visión",
    description:
      "Desarrolladores que actúan como robots: esperan órdenes exactas y no advierten sobre errores de UX o negocio.",
    icon: Bot,
  },
  {
    name: "Plazos Fantasma",
    description:
      "Estimaciones que nunca se cumplen. Los tickets se arrastran semana tras semana sin una fecha de entrega real.",
    icon: Hourglass,
  },
  {
    name: "Excusas, no Resultados",
    description:
      "La clásica mentalidad de 'en mi máquina funciona'. Cuando hay fuego en producción, nadie toma el control.",
    icon: ShieldAlert,
  },
];

export const solutionSectionSolutions = [
  {
    name: "Arquitectura Escalable",
    description:
      "Escribo código limpio, modular y documentado. Tu proyecto será fácil de mantener hoy y de escalar mañana.",
    icon: Braces,
  },
  {
    name: "Socio de Producto",
    description:
      "No solo pico código; entiendo tu negocio. Propongo mejoras estratégicas para maximizar el valor del producto.",
    icon: Lightbulb,
  },
  {
    name: "Ownership Total",
    description:
      "Trato tu proyecto como si fuera mío. Si surge un problema, asumo la responsabilidad y lidero la solución hasta el final.",
    icon: ShieldCheck,
  },
  {
    name: "Transparencia Radical",
    description:
      "Sin tecnicismos confusos. Mantengo una comunicación constante para que siempre sepas el estado real del desarrollo.",
    icon: MessageSquare,
  },
];

export const solutionSectionSolutionTitles = [
  "Mentalidad de Producto",
  "Visión de Negocio",
  "Enfoque en Resultados",
  "Comunicación Clara",
  "Transparencia Radical",
  "Ownership Total",
  "Arquitectura Escalable",
  "Código Limpio y Modular",
  "Propuestas Estratégicas",
  "Liderazgo en Soluciones",
  "Valor Sostenible",
  "Excelencia Técnica",
  "Calidad Garantizada",
  "Mantenimiento Sencillo",
  "Escalabilidad Futura",
  "Innovación Constante",
  "Mejora Continua",
  "Eficiencia Óptima",
  "Resultados Medibles",
  "Impacto Duradero",
  "Satisfacción del Usuario",
];

interface RegulexMilestone {
  id: string;
  title: string;
  description: string;
  image: string;
  deliverables: string[];
  rules?: string[];
}

interface RegulexCaseStudy {
  projectName: string;
  tagline: string;
  description: string;
  techStack: {
    frontend: string;
    backend: string;
    deployment: string;
    ai: string;
  };
  milestones: RegulexMilestone[];
  features: string[];
  security: string[];
  kpis: string[];
}

export const regulexCaseStudy: RegulexCaseStudy = {
  projectName: "Regulex",
  tagline: "Designed by lawyers. Powered by AI. Built for compliance.",
  description:
    "A secure, AI-powered tool that analyses legal contracts to detect, validate and update legislative references in real-time. Built with Next.js and deployed on Railway for Australian law firms, in-house teams and contract managers.",
  techStack: {
    frontend: "Next.js with TypeScript",
    backend: "Node.js API",
    deployment: "Railway",
    ai: "OpenAI API with zero data retention",
  },
  milestones: [
    {
      id: "milestone-1",
      title: "UI/UX Build & Platform Setup",
      description:
        "Established the core web-based infrastructure including landing page, login area, secure document upload system and dual-pane user interface.",
      deliverables: [
        "Left-side document viewer pane for PDF/DOCX upload and preview",
        "Right-side review pane for legislative flags and AI commentary",
        "Pane navigation with click-to-jump between issues",
        "Document highlighting for rule-based overlays",
        "Secure browser-based platform with modern UI inspired by DocuSign and Definely",
        "End-to-end encryption for document upload (in transit and at rest)",
        "OCR-enabled for scanned PDFs",
        "30-day document retention system",
      ],
      image: "/images/projects/regulex/dashboard-1.webp",
    },
    {
      id: "milestone-2",
      title: "Legislative Reference & Jurisdiction Engine",
      description:
        "Implemented core engine to detect legislative references, validate their existence, and verify correct jurisdiction application.",
      deliverables: [
        "Automatic detection of legislative references in contracts",
        "Validation of reference accuracy and format",
        "Jurisdiction verification and suggestions",
        "AI-drafted clause suggestions with tone matching",
        "Color-coded flags for quick issue identification",
        "One-click copy functionality for suggested fixes",
      ],
      image: "/images/projects/regulex/dashboard-2.webp",
    },
    {
      id: "milestone-3",
      title: "Legislative Currency & Reform Tracker",
      description:
        "Enabled verification of legislative currency and detection of recent or upcoming legal reforms.",
      deliverables: [
        "Real-time verification of legislative currency",
        "Detection of repealed, renamed or amended legislation",
        "Updated legislative information and versions",
        "Bill and Amendment Act tracking",
        "AI-generated reform impact summaries",
        "Clause suggestions incorporating updated requirements",
        "Source links and reform descriptions",
      ],
      image: "/images/projects/regulex/dashboard-3.webp",
    },
    {
      id: "milestone-4",
      title: "Defined Term Expansion & Drafting Refinement",
      description:
        "Enhanced capability to intelligently expand legislative terms and suggest improved drafting for future legislative accuracy.",
      deliverables: [
        "Intelligent detection of defined legislative terms",
        "Comprehensive analysis of embedded references",
        "Advanced flagging for complex definitions",
        "Editable clause suggestions with copy-to-clipboard",
        "Toggle between clause view and expanded term view",
        "Tone and formatting alignment",
      ],
      image: "/images/projects/regulex/dashboard-4.webp",
    },
  ],
  features: [
    "Instantly review every legislative reference in contracts",
    "Flag outdated laws, jurisdiction errors and reforms",
    "Generate contract-ready clauses matching original tone and style",
    "End-to-end secure document upload and analysis",
    "Legislative analysis and reform tracking across Australian jurisdictions",
    "Downloadable audit reports and clause suggestions",
    "OCR support for scanned PDF documents",
    "Multi-jurisdiction support (Federal, VIC, NSW, QLD)",
  ],
  security: [
    "End-to-end encryption (in transit and at rest)",
    "30-day document retention (user-deletable)",
    "60-day report retention",
    "OpenAI API with zero data retention policy",
    "Secure scraping of public legislative databases",
    "Encrypted cached data storage",
  ],
  kpis: [
    "98%+ accuracy in detecting legislative references",
    "Sub-2 second clause analysis and flagging",
    "Scalable to 200+ page contracts with large attachments",
    "Support for PDF and DOCX formats with OCR",
  ],
};
