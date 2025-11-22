"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { staticProjects } from "@/app/data/projects";
import ProjectsTitleOverlay from "./projects-title-overlay";

const ProjectsCarousel = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="relative py-64 bg-primary text-foreground overflow-clip w-full h-fit">
      <Image
        width={1920}
        height={1080}
        src="/images/background/texture-1.webp"
        alt="Animated texture"
        className="h-full w-full object-cover z-1 absolute inset-0 mix-blend-multiply opacity-30"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-accent blur-[20px] rounded-full z-1"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[10%] -right-[10%] w-[60%] h-[60%] bg-accent blur-[20px] rounded-full z-1"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] bg-secondary blur-[20px] rounded-full z-1"
      />

      <ProjectsTitleOverlay
        className="absolute top-0 z-10"
        text="Projects I've Built"
      />
      <ProjectsTitleOverlay
        className="absolute bottom-0 right-0 rotate-180 z-10"
        text="Projects I've Built"
      />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute bottom-32 left-8 z-30"
      >
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            carouselApi?.scrollPrev();
          }}
          disabled={!canScrollPrev}
          className="disabled:pointer-events-auto bg-gray-900/30 backdrop-blur-md border-white/20 text-white hover:bg-gray-900/50 hover:text-white disabled:opacity-30 shadow-sm transition-all duration-300 rounded-full size-16"
        >
          <ArrowLeft className="size-8" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute top-32 right-8 z-30"
      >
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            carouselApi?.scrollNext();
          }}
          disabled={!canScrollNext}
          className="disabled:pointer-events-auto bg-gray-900/30 backdrop-blur-md border-white/20 text-white hover:bg-gray-900/50 hover:text-white disabled:opacity-30 shadow-sm transition-all duration-300 rounded-full size-16"
        >
          <ArrowRight className="size-8" />
        </Button>
      </motion.div>
      <div className="w-full max-w-full relative z-20">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="relative w-full max-w-full"
        >
          <CarouselContent className="w-full max-w-full -ml-4">
            {staticProjects.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 max-w-[450px]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="group flex flex-col justify-between h-full p-6 transition-all bg-gray-900/30 backdrop-blur-xl border border-white/20 hover:border-accent/50 hover:shadow-2xl hover:-translate-y-1 rounded-xl shadow-xl"
                >
                  <div>
                    <div className="aspect-3/2 flex overflow-x-clip rounded-2xl border border-border/20 bg-muted/50">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-500 group-hover:scale-105">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={1280}
                            height={720}
                            className="object-cover object-center w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 flex flex-col gap-3">
                    <div className="line-clamp-2 text-xl font-semibold md:text-2xl text-white tracking-tight">
                      {item.name}
                    </div>
                    <div className="text-white/70 line-clamp-2 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </div>
                    <div className="mt-auto pt-4 flex items-center text-sm font-medium text-white group-hover:text-accent transition-colors group/btn w-fit">
                      <span className="underline decoration-white/50 group-hover:decoration-accent underline-offset-4 transition-all">
                        View Project
                      </span>
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
