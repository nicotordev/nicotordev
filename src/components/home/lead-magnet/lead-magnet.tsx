"use client";

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
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

type LeadMagnetMessages = NonNullable<Messages["leadMagnet"]>;
type A11yMessages = NonNullable<Messages["common"]>["a11y"];

export default function LeadMagnet({ messages }: { messages: Messages }) {
  const t: LeadMagnetMessages | undefined = messages.leadMagnet;
  const a11y: A11yMessages | undefined = messages.common?.a11y;

  const sectionLabel = a11y?.leadMagnetSection ?? "Lead Magnet Section";
  const closeTestimonialLabel = a11y?.closeTestimonial ?? "Close testimonial";
  const showTestimonialLabel = a11y?.showTestimonial ?? "Show testimonial";

  const { ref } = useInView({
    threshold: 0.1,
    rootMargin: "-20% 0%",
    triggerOnce: true,
  });

  const [isTestimonialVisible, setIsTestimonialVisible] =
    useState<boolean>(true);
  const [keepFormMinimal, setKeepFormMinimal] = useState<boolean>(false);

  return (
    <section
      aria-label={sectionLabel}
      className={cn(
        "relative overflow-hidden bg-primary bg-blend-overlay",
        "min-h-[80vh] py-16 sm:py-24 lg:py-32"
      )}
    >
      {/* Background layers */}
      <PsychedelicBackground />
      <NoiseOverlay />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full"
        >
          {/* Glass container */}
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 -z-10 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-2xl shadow-2xl" />

            <div className="p-6 sm:p-10 lg:p-16">
              {/* Header */}
              <div className="mb-10 text-left sm:mb-12 sm:text-center">
                <Typography
                  as="h2"
                  role="headline"
                  className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl gradient-text"
                >
                  {t?.title}{" "}
                  <span className="bg-linear-to-r from-primary to-secondary/40 bg-clip-text text-transparent animate-gradient">
                    {t?.titleHighlight}
                  </span>
                </Typography>

                <Typography
                  role="body"
                  className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg"
                >
                  {t?.subtitle}
                </Typography>
              </div>

              <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
                {/* Form */}
                <motion.div layout className="relative flex-1">
                  {/* Toggle */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                    <div className="flex items-center gap-2 rounded-full border border-border/30 bg-background/20 px-3 py-1.5 backdrop-blur-sm">
                      <Label
                        htmlFor="mode-switch"
                        className="cursor-pointer text-xs font-medium"
                      >
                        {keepFormMinimal ? (
                          <>
                            <span aria-hidden className="mr-1">
                              ✉️
                            </span>
                            {t?.form?.toggleMinimal ?? "Quick Message"}
                          </>
                        ) : (
                          <>
                            <span aria-hidden className="mr-1">
                              📋
                            </span>
                            {t?.form?.toggleFull ?? "Full Form"}
                          </>
                        )}
                      </Label>

                      <Switch
                        id="mode-switch"
                        checked={keepFormMinimal}
                        onCheckedChange={setKeepFormMinimal}
                        className="scale-75 data-[state=checked]:bg-primary"
                        aria-checked={keepFormMinimal}
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {keepFormMinimal ? (
                      <LeadMagnetContactFormMinimal
                        key="minimal"
                        translations={t?.form}
                      />
                    ) : (
                      <LeadMagnetContactFormFull
                        key="full"
                        translations={t?.form}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Testimonial */}
                <div className="relative mt-4 flex w-full justify-center lg:mt-0 lg:w-auto lg:block">
                  <AnimatePresence mode="popLayout">
                    {isTestimonialVisible ? (
                      <motion.aside
                        key="testimonial"
                        layout
                        initial={{ opacity: 0, scale: 0.92, x: 16 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.92, x: 16 }}
                        className="w-full lg:w-80"
                      >
                        <figure className="relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-background/40 p-8 backdrop-blur-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 text-muted-foreground hover:bg-white/10"
                            aria-label={closeTestimonialLabel}
                            onClick={() => setIsTestimonialVisible(false)}
                          >
                            <X className="h-4 w-4" aria-hidden />
                          </Button>

                          <blockquote className="text-sm leading-relaxed text-foreground/90">
                            &quot;{t?.testimonial?.quote}{" "}
                            <strong className="text-blue-400">
                              {t?.testimonial?.company}
                            </strong>
                            {t?.testimonial?.quoteEnd}&quot;
                          </blockquote>

                          <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-4">
                            <div className="flex size-10 flex-none items-center justify-center rounded-full border border-primary/30 bg-primary/20 text-sm font-bold text-primary">
                              GS
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-foreground">
                                {t?.testimonial?.author}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {t?.testimonial?.role}
                              </div>
                            </div>
                          </figcaption>
                        </figure>
                      </motion.aside>
                    ) : (
                      <motion.div
                        key="testimonial-trigger"
                        initial={{ opacity: 0, scale: 0.9, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 6 }}
                        className="flex justify-center lg:justify-end"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          aria-label={showTestimonialLabel}
                          onClick={() => setIsTestimonialVisible(true)}
                          className="min-w-12 rounded-full border-primary/30 bg-background/60 px-4 py-2 hover:bg-primary/20"
                        >
                          <span className="text-xs font-bold text-primary">
                            GS
                          </span>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
