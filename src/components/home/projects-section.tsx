import ProjectCard from "../common/project-card";
import { featuredProjects, featuredProject } from "../../app/data/projects";
import Image from "next/image";

export interface ProjectsSectionProps {
  translations: {
    section_title: string;
    section_subtitle: string;
  };
}

export default function ProjectsSection({
  translations,
}: ProjectsSectionProps) {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            {translations.section_title}
          </h2>
          <p className="mt-2 text-lg/8 text-muted-foreground">
            {translations.section_subtitle}
          </p>
        </div>

        <div className="bg-card pb-24 sm:pb-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:gap-y-16 lg:grid-cols-2 lg:px-8">
            {/* --- FEATURED PROJECT --- */}
            <article className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-lg">
              <Image
                src={featuredProject.image}
                alt={featuredProject.assets?.[0]?.alt || featuredProject.name}
                className="w-full rounded-xl mb-6"
                width={600}
                height={400}
              />

              <h2
                id="featured-project"
                className="mt-4 text-3xl font-display font-semibold tracking-tight text-pretty text-foreground sm:text-4xl"
              >
                {featuredProject.name}
              </h2>

              <p className="mt-4 text-lg/8 text-muted-foreground">
                {featuredProject.description}
              </p>

              {featuredProject.link && (
                <div className="mt-4 flex">
                  <a
                    href={featuredProject.link}
                    aria-describedby="featured-project"
                    className="text-sm/6 font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    {featuredProject.linkText || "View project"}{" "}
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              )}
            </article>

            {/* --- STATIC PROJECTS LIST --- */}
            <div className="mx-auto w-full max-w-2xl border-t border-border pt-12 sm:pt-16 lg:mx-0 lg:max-w-none lg:border-t-0 lg:pt-0">
              <div className="-my-12 divide-y divide-border">
                {featuredProjects.map((proj) => (
                  <article key={proj.id} className="py-12">
                    <div className="group relative max-w-xl">
                      <h2 className="text-lg font-display font-semibold text-foreground group-hover:text-muted-foreground transition-colors">
                        <a href={proj.link || "#"}>
                          <span className="absolute inset-0" />
                          {proj.name}
                        </a>
                      </h2>

                      <p className="mt-4 text-sm/6 text-muted-foreground">
                        {proj.description}
                      </p>
                    </div>

                    {proj.assets?.[0] && (
                      <Image
                        src={proj.assets[0].url}
                        alt={proj.assets[0].alt || proj.name}
                        className="mt-4 w-40 rounded-lg"
                        width={500}
                        height={300}
                      />
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
