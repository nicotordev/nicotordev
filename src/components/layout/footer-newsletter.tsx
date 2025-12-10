"use client";

import { BackgroundDecoration } from "@/components/backgrounds/background-decoration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Messages } from "@/types/i18n";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface FooterNewsletterProps {
  messages: Messages;
}

export default function FooterNewsletter({ messages }: FooterNewsletterProps) {
  // Safe access to nested translation keys
  const t = (key: string) => {
    // @ts-ignore - dynamic access
    return messages?.newsletter?.[key] || key;
  };

  return (
    <div className="absolute z-20 w-full px-4 inset-x-0 -translate-y-1/2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-auto relative overflow-hidden rounded-3xl bg-card border border-border/50 p-6 sm:p-10 max-w-5xl mx-auto shadow-2xl backdrop-blur-xl"
      >
        {/* Atmosphere Layer */}
        <BackgroundDecoration className="opacity-20 scale-125 -top-20" />
        <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-12 justify-between">
          <div className="text-center md:text-left max-w-lg shrink-0">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-balance text-card-foreground">
              {t("title")}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg text-balance">
              {t("description")}
            </p>
          </div>

          <form
            className="relative w-full max-w-md mx-auto md:mx-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex items-center">
              <Input
                type="email"
                placeholder={t("placeholder")}
                className="h-16 pl-6 pr-16 sm:pr-36 rounded-full bg-background/60 border-primary/20 shadow-inner focus:border-primary/50 focus:ring-primary/50 text-base sm:text-lg transition-all placeholder:text-muted-foreground/50"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-2 bottom-2 h-12 w-12 sm:w-auto sm:px-6 rounded-full shadow-lg shadow-primary/20 shrink-0"
              >
                <span className="hidden sm:inline mr-2">{t("button")}</span>
                <Send className="w-5 h-5" />
              </Button>
            </div>

            <p className="mt-3 text-center md:text-left lg:absolute lg:-bottom-8 lg:left-4 lg:mt-0 text-xs text-muted-foreground/60 w-full px-4">
              {t("disclaimer")}
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
