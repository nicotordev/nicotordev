import ProjectCard from "../common/project-card";
import { staticProjects } from "../../app/data/projects";

export interface ProjectsSectionProps {
  translations: {
    section_title: string;
    section_subtitle: string;
  };
}

export default function ProjectsSection({
  translations,
}: ProjectsSectionProps) {
  // LOGICA DE DISTRIBUCIÓN:
  // Usamos filter con módulo (%) para repartir: 1, 2, 3, 1, 2, 3...
  // Esto balancea mejor visualmente las columnas que usar slice.
  const firstColumn = staticProjects.filter((_, i) => i % 3 === 0);
  const secondColumn = staticProjects.filter((_, i) => i % 3 === 1);
  const thirdColumn = staticProjects.filter((_, i) => i % 3 === 2);

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header de la sección */}
        <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            {translations.section_title}
          </h2>
          <p className="mt-2 text-lg/8 text-muted-foreground">
            {translations.section_subtitle}
          </p>
        </div>

        {/* Contenedor Grid
            - Móvil: 1 columna (grid-cols-1)
            - Desktop: 3 columnas (lg:grid-cols-3)
            - gap-8: Espacio horizontal y vertical entre elementos
        */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* COLUMNA 1: Alineación estándar (Arriba) */}
          <div className="flex flex-col gap-8">
            {firstColumn.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>

          {/* COLUMNA 2: Desplazada hacia abajo (pt-12 = 3rem/48px) */}
          <div className="flex flex-col gap-8 lg:pt-12">
            {secondColumn.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>

          {/* COLUMNA 3: Desplazada más abajo o intermedio (pt-24 = 6rem/96px) */}
          <div className="flex flex-col gap-8 lg:pt-24">
            {thirdColumn.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
