import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all overflow-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:-translate-y-1 shadow-lg active:translate-y-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/95 focus-visible:outline-primary",
        destructive:
          "bg-destructive text-white hover:bg-destructive/95 focus-visible:outline-destructive dark:bg-destructive/80",
        outline:
          "border-2 bg-background/80 backdrop-blur-sm shadow-md hover:bg-accent/20 hover:text-accent-foreground hover:border-accent dark:bg-input/20 dark:border-input dark:hover:bg-input/40 dark:hover:border-input/70 focus-visible:outline-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:outline-secondary",
        ghost:
          "shadow-none hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus-visible:outline-accent",
        link: "text-primary underline-offset-4 hover:underline shadow-none hover:translate-y-0 focus-visible:outline-primary",
      },
      size: {
        default: "h-10 px-6 py-2.5 has-[>svg]:px-4",
        sm: "h-9 rounded-full gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-full px-8 text-base has-[>svg]:px-6",
        icon: "size-10",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Estilos específicos de blur para cada variante
const blurVariants: Record<string, string> = {
  default: "bg-primary/70",
  destructive: "bg-destructive/70",
  outline: "bg-accent/50",
  secondary: "bg-secondary/70",
  ghost: "bg-accent/60",
  link: "bg-transparent",
};

function Button({
  className,
  variant = "default",
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  // Para el variant link y ghost, no agregamos el efecto blur
  const shouldShowBlur = variant !== "link" && variant !== "ghost";

  // Si asChild=true, no podemos agregar spans internos porque Slot requiere un solo hijo
  if (asChild) {
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  // Modo normal (asChild=false) con todos los efectos
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {shouldShowBlur && (
        <span
          className={cn(
            "absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300",
            blurVariants[variant || "default"]
          )}
        />
      )}
      <span className="relative flex items-center gap-2">{children}</span>
    </Comp>
  );
}

export { Button, buttonVariants };
