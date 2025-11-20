"use client";

import StackIcon from "tech-stack-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const TECH_STACK_TOP = [
  "typescript",
  "nextjs",
  "react",
  "nodejs",
  "tailwindcss",
  "postgresql",
  "openai",
  "github",
  "vercel",
  "prisma",
  "azure",
];

const TECH_STACK_BOTTOM = [
  "docker",
  "aws",
  "linux",
  "figma",
  "vscode",
  "npm",
  "css3",
  "html5",
  "git",
  "netlify",
  "sass",
  "firebase",
];

export default function HeroSectionTechStackCarousel() {
  return (
    <div className="w-full max-w-[100vw] overflow-hidden mx-auto px-4 pb-32 flex flex-col gap-4 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      {/* Top Carousel - Runs to Right */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 0, // Continuous flow
          disableOnInteraction: false,
          reverseDirection: true,
          pauseOnMouseEnter: false,
        }}
        speed={3000} // Smooth continuous speed
        breakpoints={{
          640: {
            slidesPerView: 6,
          },
          768: {
            slidesPerView: 8,
          },
          1024: {
            slidesPerView: 10,
          },
        }}
        className="w-full translate-x-8"
      >
        {TECH_STACK_TOP.map((tech) => (
          <SwiperSlide
            key={tech}
            className="flex justify-center items-center py-2"
          >
            <div className="flex justify-center items-center w-full h-full">
              <StackIcon
                name={tech}
                className="w-8 h-8 sm:w-10 sm:h-10 grayscale opacity-80 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-125 cursor-pointer"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Carousel - Runs to Left */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={3000}
        breakpoints={{
          640: {
            slidesPerView: 6,
          },
          768: {
            slidesPerView: 8,
          },
          1024: {
            slidesPerView: 10,
          },
        }}
        className="w-full -translate-x-8"
      >
        {TECH_STACK_BOTTOM.map((tech) => (
          <SwiperSlide
            key={tech}
            className="flex justify-center items-center py-2"
          >
            <div className="flex justify-center items-center w-full h-full">
              <StackIcon
                name={tech}
                className="w-8 h-8 sm:w-10 sm:h-10 grayscale opacity-80 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-125 cursor-pointer"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
