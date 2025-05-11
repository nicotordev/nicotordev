'use client';
import { assets } from '@assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';

export default function HomeCarousel() {
  const techIcons = Object.values(assets);

  return (
    <Swiper
      modules={[Autoplay, EffectCoverflow]}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop
      slidesPerView={5}
      centeredSlides={true}
      spaceBetween={30}
      effect="coverflow"
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      className="w-full py-10 h-36"
    >
      {techIcons.map((icon, index) => (
        <SwiperSlide key={index} className="transition-all duration-300">
          {({ isActive }) => (
            <div
              className={`flex justify-center items-center h-full ${
                isActive ? 'opacity-100 scale-150' : 'opacity-40'
              } transition-all duration-300`}
            >
              <Image
                src={icon}
                alt={`Technology icon ${index}`}
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
