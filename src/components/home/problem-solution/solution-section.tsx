import { solutionSectionSolutions } from "@/app/data/home";
import type { Messages } from "@/types/i18n";
import SolutionSectionTitles from "./solution-section-titles";
import SolutionSectionVideo from "./solution-section-video";

interface SolutionSectionProps {
  messages: Messages["problemSolution"]["solution"];
  commonMessages: Messages["common"];
}

export default function SolutionSection({
  messages,
  commonMessages,
}: SolutionSectionProps) {
  const t = messages ?? {};

  const solutionsWithTranslations = [
    { ...solutionSectionSolutions[0], ...t.solutions?.scalableArchitecture },
    { ...solutionSectionSolutions[1], ...t.solutions?.productPartner },
    { ...solutionSectionSolutions[2], ...t.solutions?.totalOwnership },
    { ...solutionSectionSolutions[3], ...t.solutions?.radicalTransparency },
  ];

  return (
    <div className="relative pb-24 pt-12">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mt-2 flex lg:flex-row flex-col items-stretch justify-between">
          {/* Left Column: Content */}
          <div className="lg:w-1/2 flex flex-col justify-center pr-0 lg:pr-12 order-2 lg:order-1">
            <div className="mx-auto lg:mx-0 w-full">
              {/* Title */}
              <h2 className="text-5xl sm:text-6xl font-display font-bold tracking-tight text-foreground leading-tight text-left min-h-48 flex flex-col justify-center items-start">
                <b className="text-2xl text-foreground">
                  {t.titlePrefix || "Software engineering with"}
                </b>
                <SolutionSectionTitles titles={t.rotatingTitles || []} />
              </h2>
              <p className="mt-4 text-lg sm:text-xl leading-8 sm:leading-9 text-muted-foreground text-left">
                {t.subtitle || "Beyond writing code,"}{" "}
                <b className="font-semibold text-foreground">
                  {t.subtitleBold1 || "I build digital assets."}{" "}
                </b>
                {t.subtitleText || "My approach combines"}{" "}
                <b className="font-semibold text-foreground">
                  {t.subtitleBold2 || "technical excellence"}
                </b>{" "}
                {t.subtitleWith || "with"}{" "}
                <b className="font-semibold text-foreground">
                  {t.subtitleBold3 || "business vision"}
                </b>{" "}
                {t.subtitleTo || "to"}{" "}
                <b className="font-semibold text-primary">
                  {t.subtitleBold4 || "deliver lasting results"}
                </b>
                .
              </p>
              <aside className="italic text-2xl sm:text-3xl text-muted-foreground font-light mt-2 mb-4 text-left">
                {t.sectionTitle || "How I transform your project:"}
              </aside>

              <dl className="space-y-5">
                {solutionsWithTranslations.map((solution, index) => {
                  const IconComponent =
                    solutionSectionSolutions[index]?.icon || null;
                  return (
                    <div key={solution.name} className="relative pl-12">
                      <dt className="text-base font-semibold leading-7 text-foreground">
                        <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-md">
                          {IconComponent ? (
                            <IconComponent
                              className="h-5 w-5 text-primary-foreground"
                              aria-hidden="true"
                            />
                          ) : (
                            <span className="h-5 w-5 bg-primary-foreground rounded-full" />
                          )}
                        </div>
                        {solution.name}
                      </dt>
                      <dd className="text-sm leading-7 text-muted-foreground">
                        {solution.description}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>

          <div className="relative flex lg:w-1/2 order-1 lg:order-2 mt-8 lg:mt-0 justify-center lg:justify-end">
            {/* Contenedor principal con aspect-ratio para evitar saltos de layout (CLS) */}
            <div className="relative w-full h-full group">
              {/* Sombra decorativa: Ajustada para que no se corte */}
              <div className="absolute -inset-1 translate-x-4 translate-y-4 rounded-2xl bg-primary/20 blur-3xl -z-10" />

              <div className="relative h-full w-full">
                {/* VIDEO: Añadido playsInline y pointer-events-none */}
                <SolutionSectionVideo commonMessages={commonMessages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
