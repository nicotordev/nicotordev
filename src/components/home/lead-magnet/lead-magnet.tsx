"use client";
import PsychedelicBackground from "@/components/backgrounds/psychedelic-background";
import NoiseOverlay from "@/components/common/noise-overlay";
import LeadMagnetContactFormMinimal, {
  LeadMagnetContactFormFull,
} from "@/components/glassmorphism/lead-magnet-contact-forms";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

import type { Messages } from "@/types/i18n";

export default function LeadMagnet({ messages }: { messages: Messages }) {
  const t = messages.leadMagnet as any;
  const accessibility = (messages.common as any)?.a11y ?? {};

  const sectionLabel = accessibility.leadMagnetSection || "Lead Magnet Section";
  const closeTestimonialLabel =
    accessibility.closeTestimonial || "Close testimonial";
  const showTestimonialLabel =
    accessibility.showTestimonial || "Show testimonial";

  const { ref } = useInView({
    threshold: 0.1,
    rootMargin: "-20% 0%",
  });
  const [isTestimonialVisible, setIsTestimonialVisible] = useState(true);
  const [keepFormMinimal, setKeepFormMinimal] = useState(false);

  return (
    <section
      className={cn(
        "overflow-hidden bg-primary bg-blend-overlay min-h-[80vh] py-16 sm:py-24 lg:py-32",
        "relative"
      )}
      style={{ transform: "translateZ(100%)" }}
      aria-label={sectionLabel}
    >
      {/* --- Background Layer --- */}
      <PsychedelicBackground />

      {/* --- Noise Overlay --- */}
      <NoiseOverlay />

      {/* --- Content Layer --- */}
      <div className="relative z-10 mx-auto w-full max-w-7xl h-full flex items-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full relative"
          ref={ref}
        >
          {/* Glassmorphism Container */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-card/30 backdrop-blur-2xl border border-border/50 -z-10 shadow-2xl" />

            <div className="p-6 sm:p-10 lg:p-16">
              <div className="text-left sm:text-center mb-10 sm:mb-12">
                <Typography
                  as="h2"
                  role="headline"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground gradient-text"
                >
                  {t?.title}{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary/40 animate-gradient">
                    {t?.titleHighlight}
                  </span>
                </Typography>
                <Typography
                  role="body"
                  className="mt-4 text-base sm:text-lg leading-8 text-muted-foreground"
                >
                  {t?.subtitle}
                </Typography>
              </div>

              <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                {/* FORM SECTION */}
                <motion.div layout className="flex-1 relative">
                  {/* Toggle Switch for Minimal Mode */}
                  <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 mb-4">
                    <div className="flex items-center space-x-2 bg-background/20 px-3 py-1.5 rounded-full border border-border/30 backdrop-blur-sm">
                      <Label
                        htmlFor="mode-switch"
                        className="text-xs font-medium cursor-pointer mr-2"
                      >
                        {keepFormMinimal ? (
                          <>
                            <span className="mr-1" aria-hidden="true">
                              ✉️
                            </span>{" "}
                            {t?.form?.toggleMinimal || "Quick Message"}
                          </>
                        ) : (
                          <>
                            <span className="mr-1" aria-hidden="true">
                              📋
                            </span>{" "}
                            {t?.form?.toggleFull || "Full Form"}
                          </>
                        )}
                      </Label>
                      <Switch
                        id="mode-switch"
                        checked={keepFormMinimal}
                        onCheckedChange={setKeepFormMinimal}
                        className="scale-75 data-[state=checked]:bg-primary"
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {keepFormMinimal ? (
                      /* MINIMAL FORM - Single Textarea */
                      <LeadMagnetContactFormMinimal
                        key="minimal"
                        translations={t?.form}
                      />
                    ) : (
                      /* FULL FORM - Individual Fields */
                      <LeadMagnetContactFormFull
                        key="full"
                        translations={t?.form}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* TESTIMONIAL SECTION */}
                <div className="relative w-full lg:w-auto mt-4 lg:mt-0 flex justify-center lg:block">
                  <AnimatePresence mode="popLayout">
                    {isTestimonialVisible ? (
                      <motion.aside
                        key="testimonial-card"
                        layout
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          x: 20,
                          transition: { duration: 0.3 },
                        }}
                        className="w-full lg:w-80 h-full"
                      >
                        <figure className="relative h-full flex flex-col justify-between p-8 rounded-2xl bg-background/40 border border-white/10 backdrop-blur-md">
                          {/* Close Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 hover:bg-white/10 text-muted-foreground"
                            onClick={() => setIsTestimonialVisible(false)}
                            aria-label={closeTestimonialLabel}
                          >
                            <X className="w-4 h-4" aria-hidden="true" />
                          </Button>

                          <blockquote className="text-sm leading-relaxed text-foreground/90">
                            &quot;{t?.testimonial?.quote}{" "}
                            <strong className="text-blue-400">
                              {t?.testimonial?.company}
                            </strong>
                            {t?.testimonial?.quoteEnd}&quot;
                          </blockquote>

                          <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-4">
                            <div className="size-10 flex-none rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
                              GS
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-foreground">
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
                          onClick={() => setIsTestimonialVisible(true)}
                          className="rounded-full bg-background/60 border-primary/30 hover:bg-primary/20 px-4 py-2 min-w-12"
                          aria-label={showTestimonialLabel}
                        >
                          <span className="font-bold text-primary text-xs">
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
