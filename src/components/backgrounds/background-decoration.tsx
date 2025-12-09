import { cn } from "@/lib/utils";

interface BackgroundDecorationProps {
  className?: string;
  shapeClassName?: string;
}

export function BackgroundDecoration({
  className,
  shapeClassName,
}: BackgroundDecorationProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-x-0 -top-40 z-10 transform-gpu overflow-x-clip blur-3xl sm:-top-80 pointer-events-none",
        className
      )}
    >
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
        className={cn(
          "relative left-[calc(50%-11rem)] -translate-x-1/2",
          "aspect-1155/678 w-144.5 rotate-30",
          "bg-linear-to-tr from-accent to-primary opacity-80",
          "sm:left-[calc(50%-30rem)] sm:w-288.75",
          shapeClassName
        )}
      />
    </div>
  );
}
