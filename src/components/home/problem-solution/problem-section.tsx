import { problemSectionProblems } from "@/app/data/home";
import ProblemSectionAnimatedText from "./problem-section-animated-text";

export default function ProblemSection() {
  return (
    <div className="pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tight text-foreground leading-tight text-center">
            ¿Cansado de desarrolladores que solo{" "}
            <span className="relative inline-block mx-1">
              {/* Fondo con Blur y Borde Brillante */}

              {/* Texto Principal */}
              <ProblemSectionAnimatedText />
            </span>
            ?
          </h2>

          <p className="mt-4 text-xl leading-9 text-muted-foreground text-center">
            Necesitas un{" "}
            <span className="font-semibold text-foreground">
              ingeniero de verdad
            </span>
            , no un robot. Alguien que entienda tu negocio,
            <br /> piense como dueño y entregue código que de verdad mueva la
            aguja.
            <br />
          </p>
          <aside className="italic text-3xl text-muted-foreground font-light mt-2">
            Problemas más comunes que veo en equipos de desarrollo:
          </aside>
        </div>
        <div className="mx-auto mt-8 max-w-5xl sm:mt-12 lg:mt-16 lg:max-w-7xl">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16">
            {problemSectionProblems.map((problem) => (
              <div key={problem.name} className="relative pl-12">
                <dt className="text-base font-semibold leading-7 text-secondary">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary shadow-md">
                    <problem.icon
                      className="h-5 w-5 text-secondary-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  {problem.name}
                </dt>
                <dd className="text-sm leading-7 text-muted-foreground">
                  {problem.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
