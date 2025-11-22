import Image from "next/image";
import { solutionSectionSolutions } from "@/app/data/home";
import SolutionSectionTitles from "./solution-section-titles";
import SolutionSectionVideo from "./solution-section-video";

export default function SolutionSection() {
  return (
    <div className="relative pb-24 pt-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-2 flex items-stretch justify-between">
          {/* Left Column: Content */}
          <div className="w-1/2 flex flex-col justify-center pr-12 order-2 lg:order-1">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <div className="max-w-2xl">
                {/* Título más impactante */}
                <h2 className="text-6xl font-display font-bold tracking-tight text-foreground leading-tight text-left min-h-48 flex flex-col justify-center items-start">
                  <b className="text-2xl text-foreground">Ingeniería de Software con</b>
                  <SolutionSectionTitles />
                </h2>
                <p className="mt-4 text-xl leading-9 text-muted-foreground">
                  Más allá de escribir líneas de código,{" "}
                  <b className="font-semibold text-foreground">
                    construyo activos digitales.{" "}
                  </b>
                  Mi enfoque combina{" "}
                  <b className="font-semibold text-foreground">
                    excelencia técnica
                  </b>{" "}
                  con{" "}
                  <b className="font-semibold text-foreground">
                    visión de negocio
                  </b>{" "}
                  para{" "}
                  <b className="font-semibold text-primary">
                    entregar resultados que perduran
                  </b>
                  .
                </p>
                <aside className="italic text-3xl text-muted-foreground font-light mt-2 mb-4">
                  Cómo transformo tu proyecto:
                </aside>
              </div>

              <dl className="space-y-5">
                {solutionSectionSolutions.map((solution) => (
                  <div key={solution.name} className="relative pl-12">
                    <dt className="text-base font-semibold leading-7 text-foreground">
                      <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-md">
                        <solution.icon
                          className="h-5 w-5 text-primary-foreground"
                          aria-hidden="true"
                        />
                      </div>
                      {solution.name}
                    </dt>
                    <dd className="text-sm leading-7 text-muted-foreground">
                      {solution.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="relative flex w-1/2 order-1 lg:order-2 mt-8 lg:mt-0 justify-center lg:justify-end">
            {/* Contenedor principal con aspect-ratio para evitar saltos de layout (CLS) */}
            <div className="relative w-full h-full group">
              {/* Sombra decorativa: Ajustada para que no se corte */}
              <div className="absolute -inset-1 translate-x-4 translate-y-4 rounded-2xl bg-primary/20 blur-3xl -z-10" />

              <div className="relative h-full w-full">
                {/* VIDEO: Añadido playsInline y pointer-events-none */}
                <SolutionSectionVideo />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
