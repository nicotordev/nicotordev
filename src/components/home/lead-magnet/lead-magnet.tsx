"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {  useState } from "react";
import LeadMagnetContactFormMinimal, {
  LeadMagnetContactFormFull,
} from "@/components/glassmorphism/lead-magnet-contact-forms";
import NoiseOverlay from "@/components/common/noise-overlay";
import PsychedelicBackground from "@/components/backgrounds/psychedelic-background";
import LeadMagnetGift from "./lead-magnet-gift";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import LeadMagnetGiftDialog from "./lead-magnet-gift-dialog";
import { useMessages } from "next-intl";

export default function LeadMagnet() {
  const messages = useMessages();
  const t = messages.leadMagnet as any;
  const accessibility = (messages.common as any)?.a11y ?? {};

  const sectionLabel =
    accessibility.leadMagnetSection || "Lead Magnet Section";
  const closeTestimonialLabel =
    accessibility.closeTestimonial || "Close testimonial";
  const showTestimonialLabel =
    accessibility.showTestimonial || "Show testimonial";

  const [optionSelected, setOptionSelected] = useState<"GIFT" | "FORM" | null>(
    null
  );
  const { ref, inView: isContactFormInView } = useInView({
    threshold: 0.1,
    rootMargin: "-20% 0%",
  });
  const [isTestimonialVisible, setIsTestimonialVisible] = useState(true);
  const [keepFormMinimal, setKeepFormMinimal] = useState(false);

  return (
    <section
      className={cn(
        "overflow-hidden bg-primary bg-blend-overlay min-h-[80vh] py-24 sm:py-32",
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
      <div className="relative z-10 mx-auto max-w-7xl h-full flex items-center">
        <LeadMagnetGift
          show={isContactFormInView && optionSelected === null}
          setOptionSelected={setOptionSelected}
          translations={t?.gift?.experience}
        />

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

            <div className="p-8 sm:p-12 lg:p-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground gradient-text">
                  {t?.title}{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary/40 animate-gradient">
                    {t?.titleHighlight}
                  </span>
                </h2>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  {t?.subtitle}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-12">
                {/* FORM SECTION */}
                <motion.div layout className="flex-1 relative">
                  {/* Toggle Button for Minimal Mode */}
                  <div className="flex justify-end mb-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setKeepFormMinimal(!keepFormMinimal)}
                      className="text-xs bg-background/20 hover:bg-background/30 border border-border/30"
                    >
                      {keepFormMinimal ? (
                        <>
                          <span className="mr-1" aria-hidden="true">
                            📋
                          </span>{" "}
                          {t?.form?.toggleFull || "Full Form"}
                        </>
                      ) : (
                        <>
                          <span className="mr-1" aria-hidden="true">
                            ✉️
                          </span>{" "}
                          {t?.form?.toggleMinimal || "Quick Message"}
                        </>
                      )}
                    </Button>
                  </div>

                  <AnimatePresence mode="wait">
                    {optionSelected === "FORM" ? (
                      <>
                        {keepFormMinimal ? (
                          /* MINIMAL FORM - Single Textarea */
                          <LeadMagnetContactFormMinimal translations={t?.form} />
                        ) : (
                          /* FULL FORM - Individual Fields */
                          <LeadMagnetContactFormFull translations={t?.form} />
                        )}
                      </>
                    ) : optionSelected === "GIFT" ? (
                      <LeadMagnetGiftDialog
                        open={optionSelected === "GIFT"}
                        onOpenChange={setOptionSelected}
                        translations={t?.giftDialog}
                      />
                    ) : null}
                  </AnimatePresence>
                </motion.div>

                {/* TESTIMONIAL SECTION */}
                <div className="relative lg:w-auto">
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
                        className="lg:w-80 h-full"
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
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute top-0 right-0 lg:relative"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setIsTestimonialVisible(true)}
                          className="rounded-full bg-background/40 border-primary/30 hover:bg-primary/20 w-12 h-12"
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
