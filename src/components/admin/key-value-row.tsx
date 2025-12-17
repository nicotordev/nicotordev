"use client";

import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

export default function KeyValueRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="grid gap-1">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="break-all font-mono text-sm">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-primary"
            >
              {value}
            </a>
          ) : (
            value
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            await toast.promise(copyToClipboard(value), {
              loading: "Copying…",
              success: "Copied",
              error: "Failed to copy",
            });
          }}
        >
          Copy
        </Button>
      </div>
    </div>
  );
}

