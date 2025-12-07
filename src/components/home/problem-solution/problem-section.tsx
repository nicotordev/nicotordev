import { problemSectionProblems } from "@/app/data/home";
import { getMessages } from "next-intl/server";

export default async function ProblemSection() {
  const messages = await getMessages();
  const t = messages.problemSolution?.problem as any;

  const problemsWithTranslations = [
    { ...problemSectionProblems[0], ...t.problems.technicalDebt },
    { ...problemSectionProblems[1], ...t.problems.noVision },
    { ...problemSectionProblems[2], ...t.problems.ghostDeadlines },
    { ...problemSectionProblems[3], ...t.problems.excuses },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
      <div className="mx-auto lg:max-w-3xl lg:text-center">
        <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight lg:text-center">
          <span className="relative inline-block mx-1 text-foreground">
            {t.title} <b>{t.titleBold}</b>?
          </span>
        </h2>

        <p className="mt-4 text-xl leading-9 text-muted-foreground lg:text-center">
          {t.subtitle}{" "}
          <span className="font-semibold text-foreground">
            {t.subtitleHighlight}
          </span>
          {t.subtitleEnd}
          <br />
        </p>
        <aside className="italic text-3xl text-muted-foreground font-light mt-2">
          {t.sectionTitle}
        </aside>
      </div>
      <div className="mx-auto mt-8 max-w-5xl sm:mt-12 lg:mt-16 lg:max-w-6xl">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16">
          {problemsWithTranslations.map((problem, index) => {
            const IconComponent = problemSectionProblems[index]?.icon;
            return (
              <div key={problem.name} className="relative pl-12">
                <dt className="text-base font-semibold leading-7 text-secondary">
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary shadow-md">
                    {IconComponent ? (
                      <IconComponent
                        className="h-5 w-5 text-secondary-foreground"
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="h-5 w-5 bg-secondary-foreground rounded-full" />
                    )}
                  </div>
                  {problem.name}
                </dt>
                <dd className="text-sm leading-7 text-muted-foreground">
                  {problem.description}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
