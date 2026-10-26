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
  
      <ProblemSection messages={problemMessages} />
      <SolutionSection
        messages={solutionMessages}
        commonMessages={commonMessages}
      />
    </section>
  );
}
