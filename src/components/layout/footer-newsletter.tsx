"use client";

import { subscribeToNewsletterAction } from "@/app/actions/newsletter.actions";
import { BackgroundDecoration } from "@/components/backgrounds/background-decoration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { Messages } from "@/types/i18n";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface FooterNewsletterProps {
  messages: Messages;
}

export default function FooterNewsletter({ messages }: FooterNewsletterProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Safe access to nested translation keys
  const t = (
    key: "title" | "description" | "placeholder" | "button" | "disclaimer",
  ) => {
    return messages?.newsletter?.[key] || key;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error(messages?.leadMagnet?.form?.errors?.email_invalid || "Invalid email");
      return;
    }

    setLoading(true);
    try {
      const result = await subscribeToNewsletterAction(email.trim());
      if (result.success) {
        toast.success(messages?.leadMagnet?.form?.successMessage || "Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(result.error || "Failed to subscribe");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center absolute z-20 w-full inset-x-0 -translate-y-1/2 mx-auto px-4 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-auto relative overflow-hidden rounded-3xl bg-card border border-border/50 w-full p-6 lg:p-8 shadow-2xl backdrop-blur-xl"
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
            onSubmit={handleSubmit}
          >
            <div className="relative flex items-center">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                disabled={loading}
                className="h-16 pl-6 pr-16 sm:pr-36 rounded-full bg-background/60 border-primary/20 shadow-inner focus:border-primary/50 focus:ring-primary/50 text-base sm:text-lg transition-all placeholder:text-muted-foreground/50"
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading}
                aria-label={t("button")}
                className="absolute right-2 top-2 bottom-2 h-12 w-12 sm:w-auto sm:px-6 rounded-full shadow-lg shadow-primary/20 shrink-0"
              >
                {loading ? (
                  <Spinner className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <>
                    <span className="hidden sm:inline mr-2">{t("button")}</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
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
