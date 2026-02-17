"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useInView } from "react-intersection-observer";

import PsychedelicBackground from "@/components/backgrounds/psychedelic-background";
import NoiseOverlay from "@/components/common/noise-overlay";
import LeadMagnetContactFormMinimal, {
  LeadMagnetContactFormFull,
} from "@/components/glassmorphism/lead-magnet-contact-forms";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { Messages } from "@/types/i18n";

interface LeadMagnetProps {
  messages: Messages;
}

export default function LeadMagnet({ messages }: LeadMagnetProps) {
  // 1. Extracción segura de traducciones con valores por defecto
  const t = messages.leadMagnet;
  const a11y = messages.common?.a11y;

  const [isTestimonialVisible, setIsTestimonialVisible] = useState(true);
  const [keepFormMinimal, setKeepFormMinimal] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "-20% 0%",
    triggerOnce: true,
  });

  // Memorizamos labels para evitar re-calculos
  const labels = useMemo(
    () => ({
      section: a11y?.leadMagnetSection ?? "Lead Magnet Section",
      close: a11y?.closeTestimonial ?? "Close testimonial",
      show: a11y?.showTestimonial ?? "Show testimonial",
    }),
    [a11y],
  );

  return (
    <section
      aria-label={labels.section}
      className={cn(
        "relative overflow-hidden bg-primary bg-blend-overlay",
        "min-h-[80vh] py-16 sm:py-24 lg:py-32",
      )}
    >
      <PsychedelicBackground />
      <NoiseOverlay />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom cubic-bezier para suavidad
          className="relative w-full"
        >
          {/* Glass Container */}
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 backdrop-blur-2xl shadow-2xl">
            <div className="p-6 sm:p-10 lg:p-16">
              {/* Header */}
              <header className="mb-10 text-left sm:mb-12 sm:text-center">
                <Typography
                  as="h2"
                  className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                >
                  {t?.title}{" "}
                  <span className="text-primary font-extrabold capitalize animate-gradient">
                    {t?.titleHighlight}
                  </span>
                </Typography>
                <Typography className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">
                  {t?.subtitle}
                </Typography>
              </header>

              <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
                {/* Lado Izquierdo: Formulario */}
                <div className="flex-1">
                  <div className="mb-6 flex items-center justify-end gap-3">
                    <Label
                      htmlFor="mode-switch"
                      className="flex cursor-pointer items-center gap-2 text-xs font-medium opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {keepFormMinimal
                        ? "✉️ " + (t?.form?.toggleMinimal || "Quick")
                        : "📋 " + (t?.form?.toggleFull || "Full")}
                    </Label>
                    <Switch
                      id="mode-switch"
                      checked={keepFormMinimal}
                      onCheckedChange={setKeepFormMinimal}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>

                  <motion.div layout className="min-h-[400px]">
                    <AnimatePresence mode="wait" initial={false}>
                      {keepFormMinimal ? (
                        <motion.div
                          key="minimal"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                        >
                          <LeadMagnetContactFormMinimal
                            translations={t?.form}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="full"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                        >
                          <LeadMagnetContactFormFull translations={t?.form} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Lado Derecho: Testimonial */}
                <aside className="lg:w-80">
                  <AnimatePresence mode="popLayout">
                    {isTestimonialVisible ? (
                      <motion.div
                        key="testimonial-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative rounded-2xl border border-white/10 bg-background/40 p-6 backdrop-blur-md"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:bg-white/10"
                          onClick={() => setIsTestimonialVisible(false)}
                          aria-label={labels.close}
                        >
                          <X className="h-4 w-4" />
                        </Button>

                        <blockquote className="text-sm italic leading-relaxed text-foreground/90">
                          &quot;{t?.testimonial?.quote}{" "}
                          <span className="font-semibold text-primary">
                            {t?.testimonial?.company}
                          </span>
                          {t?.testimonial?.quoteEnd}&quot;
                        </blockquote>

                        <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                          <div className="flex size-9 flex-none items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                            GS
                          </div>
                          <div className="overflow-hidden">
                            <p className="truncate text-sm font-semibold">
                              {t?.testimonial?.author}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {t?.testimonial?.role}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="testimonial-trigger"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center lg:justify-end"
                      >
                        <Button
                          variant="outline"
                          onClick={() => setIsTestimonialVisible(true)}
                          className="rounded-full border-primary/20 bg-background/40 hover:bg-primary/10"
                          aria-label={labels.show}
                        >
                          <span className="text-xs font-bold text-primary">
                            GS
                          </span>
                          <span className="ml-2 text-xs">Ver Testimonio</span>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </aside>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
