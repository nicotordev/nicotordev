import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-14 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <Skeleton className="h-7 w-32 rounded-full" />
        <Skeleton className="h-16 w-full max-w-3xl" />
        <Skeleton className="h-6 w-full max-w-2xl" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>

      <Skeleton className="aspect-[16/9] w-full rounded-[var(--radius-dialog)]" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="rounded-[var(--radius-card)] py-0">
            <CardContent className="space-y-2 p-5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
