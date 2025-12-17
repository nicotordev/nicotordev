import { cn } from "@/lib/utils";
import type { Messages } from "@/types/i18n";
import ProblemSection from "./problem-section";
import SolutionSection from "./solution-section";

type BackgroundShapeProps = {
  containerClassName: string;
  shapeClassName: string;
  clipPath: string;
};

function BackgroundShape({
  containerClassName,
  shapeClassName,
  clipPath,
}: BackgroundShapeProps) {
  return (
    <div aria-hidden="true" className={containerClassName}>
      <div style={{ clipPath }} className={shapeClassName} />
    </div>
  );
}

export default function ProblemSolutionSection({
  messages,
}: {
  messages: Messages;
}) {
  const problemMessages = messages.problemSolution?.problem;
  const solutionMessages = messages.problemSolution?.solution;
  const commonMessages = messages.common;

  return (
    <section id="problem-solution" className="relative z-10 py-32 sm:pb-42">
      <BackgroundShape
        containerClassName="absolute inset-x-0 top-20 -z-10 transform-gpu overflow-x-clip blur-3xl sm:top-40"
        clipPath="polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        shapeClassName={cn(
          "relative left-[calc(50%-15rem)] -translate-x-1/2",
          "aspect-1155/678 w-96 rotate-45",
          "bg-linear-to-tr from-accent to-secondary opacity-30",
          "sm:left-[calc(50%-25rem)] sm:w-3xl"
        )}
      />

      <BackgroundShape
        containerClassName="absolute inset-x-0 top-20 -z-10 transform-gpu overflow-x-clip blur-3xl sm:top-40"
        clipPath="polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        shapeClassName={cn(
          "relative right-[calc(50%-15rem)] translate-x-1/2",
          "aspect-1155/678 w-96 -rotate-135",
          "bg-linear-to-bl from-secondary to-accent opacity-30",
          "sm:right-[calc(50%-25rem)] sm:w-3xl"
        )}
      />

      <BackgroundShape
        containerClassName="absolute top-20 right-0 -z-10 transform-gpu overflow-x-clip blur-2xl sm:top-40"
        clipPath="polygon(63.1% 29.5%, 89.7% 45.5%, 72.4% 82.2%, 45.1% 97.1%, 21.3% 73.4%, 0.2% 49.8%, 18.9% 24.5%, 39.7% 0.5%, 63.1% 29.5%)"
        shapeClassName={cn(
          "relative left-[calc(50%+8rem)] -translate-x-1/2",
          "aspect-square w-72 -rotate-12",
          "bg-linear-to-br from-accent to-primary opacity-30",
          "sm:left-[calc(50%+20rem)] sm:w-xl"
        )}
      />

      <BackgroundShape
        containerClassName="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-x-clip blur-3xl sm:top-[calc(100%-30rem)]"
        clipPath="polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        shapeClassName={cn(
          "relative left-[calc(50%+5rem)] -translate-x-1/2",
          "aspect-1155/678 w-lg rotate-180",
          "bg-linear-to-tl from-primary to-accent opacity-30",
          "sm:left-[calc(50%+32rem)] sm:w-5xl"
        )}
      />

      <BackgroundShape
        containerClassName="absolute inset-x-0 top-1/2 -z-10 transform-gpu overflow-x-clip blur-3xl"
        clipPath="polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)"
        shapeClassName={cn(
          "relative left-[calc(50%-20rem)] -translate-x-1/2",
          "aspect-square w-56 rotate-90",
          "bg-linear-to-r from-accent to-primary opacity-30",
          "sm:left-[calc(50%-40rem)] sm:w-md"
        )}
      />

      <ProblemSection messages={problemMessages} />
      <SolutionSection
        messages={solutionMessages}
        commonMessages={commonMessages}
      />
    </section>
  );
}
