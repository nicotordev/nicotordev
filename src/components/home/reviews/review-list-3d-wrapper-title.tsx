"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useState } from "react";

interface ReviewList3DWrapperTitleProps {
  badgeLabel: string;
  heading: string;
  subtitle: string;
  buttonText: string;
}

export default function ReviewList3DWrapperTitle({
  badgeLabel,
  heading,
  subtitle,
  buttonText,
}: ReviewList3DWrapperTitleProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {isVisible ? (
        <motion.form
          key="title-form"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onSubmit={(e) => {
            e.preventDefault();
            setIsVisible(false);
          }}
          className={cn(
            "text-center mx-auto space-y-6 py-12 absolute flex flex-col items-center justify-center inset-0 z-30 bg-black/20 backdrop-blur-sm"
          )}
        >
          <Badge variant="secondary">{badgeLabel}</Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
          <Button type="submit">{buttonText}</Button>
        </motion.form>
      ) : (
        <motion.div
          key="floating-icon"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-8 right-8 z-40"
        >
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-lg h-12 w-12"
            onClick={() => setIsVisible(true)}
          >
            <Eye className="w-6 h-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
