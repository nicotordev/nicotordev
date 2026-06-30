"use client";

import { TECH_STACK_BOTTOM, TECH_STACK_TOP } from "@/app/data/hero";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HeroSectionTechStackCarouselPill from "./hero-section-tech-stack-carousel-pill";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSectionTechStackCarouselClient() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="relative isolate w-full overflow-x-clip px-2 sm:px-4 py-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex flex-col gap-4 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-4">
            {TECH_STACK_TOP.map((tech) => (
              <div key={tech} className="h-auto!">
                <HeroSectionTechStackCarouselPill tech={tech} />
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            {TECH_STACK_BOTTOM.map((tech) => (
              <div key={tech} className="h-auto!">
                <HeroSectionTechStackCarouselPill tech={tech} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate w-full overflow-x-clip px-2 sm:px-4 py-6">
      <div className="flex flex-col gap-4 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={14}
          slidesPerView={3.2}
          loop
          speed={2200}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 7,
            },
          }}
          className="w-full"
        >
          {TECH_STACK_TOP.map((tech) => (
            <SwiperSlide key={tech} className="h-auto!">
              <HeroSectionTechStackCarouselPill tech={tech} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={14}
          slidesPerView={3.2}
          loop
          speed={2000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 7,
            },
          }}
          className="w-full"
        >
          {TECH_STACK_BOTTOM.map((tech) => (
            <SwiperSlide key={tech} className="h-auto!">
              <HeroSectionTechStackCarouselPill tech={tech} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
