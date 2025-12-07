"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { TECH_STACK_BOTTOM, TECH_STACK_TOP } from "@/app/data/hero";
import { useEffect, useState } from "react";
import HeroSectionTechStackCarouselPill from "./hero-section-tech-stack-carousel-pill";

export default function HeroSectionTechStackCarousel() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHasMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!hasMounted)
    return (
      <div className="relative isolate w-full overflow-x-clip px-2 sm:px-4 py-6">
        <div className="flex flex-col gap-4 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-wrap gap-3">
            {TECH_STACK_TOP.map((tech) => (
              <HeroSectionTechStackCarouselPill key={tech} tech={tech} />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {TECH_STACK_BOTTOM.map((tech) => (
              <HeroSectionTechStackCarouselPill key={tech} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    );

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
