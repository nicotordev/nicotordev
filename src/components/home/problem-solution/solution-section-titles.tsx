"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SolutionSectionTitlesProps {
  titles: string[];
}

export default function SolutionSectionTitles({
  titles,
}: SolutionSectionTitlesProps) {
  const safeTitles = titles.length ? titles : [""];

  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomIndex((prevIndex) => (prevIndex + 1) % safeTitles.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [safeTitles.length]);

  const formatTitle = (title: string) => {
    const words = title.split(" ");
    if (words.length <= 1) return title;

    const firstPart = words.slice(0, 1).join(" ");
    const secondPart = words.slice(1).join(" ");

    return (
      <>
        {firstPart}
        <br />
        {secondPart}
      </>
    );
  };

  return (
    <span className="text-primary relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={randomIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {formatTitle(safeTitles[randomIndex] || "")}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
