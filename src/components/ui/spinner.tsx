"use client"

import { Loader2Icon } from "lucide-react"
import { useMessages } from "next-intl"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  const messages = useMessages();
  const loadingLabel =
    (messages as any)?.common?.a11y?.loading || "Loading";

  return (
    <Loader2Icon
      role="status"
      aria-label={loadingLabel}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
