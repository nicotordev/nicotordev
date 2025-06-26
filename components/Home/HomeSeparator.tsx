'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { assets } from "@/app/assets"
import Image from "next/image"
import "swiper/css"

export default function HomeSeparator() {
    return (
        <div className="w-full py-16 bg-gradient-to-r from-background to-muted">
            <div className="px-4">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={2}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    speed={1000}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 60,
                        },
                        1280: {
                            slidesPerView: 8,
                            spaceBetween: 70,
                        },
                    }}
                    className="programming-icons-swiper"
                >
                    {Object.entries(assets.programmingIcons).map(([key, icon]) => (
                        <SwiperSlide key={key} className="flex justify-center items-center">
                            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-card hover:shadow-md border border-transparent hover:border-border transition-all duration-300 hover:scale-110 group">
                                <div className="w-10 h-10">
                                    <Image
                                        src={icon}
                                        alt={`${key} icon`}
                                        width={100}
                                        height={100}
                                        className="object-contain filter group-hover:drop-shadow-lg transition-all duration-300"
                                    />
                                </div>
                                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground capitalize transition-colors duration-300">
                                    {key.replace('Icon', '').replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}