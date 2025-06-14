import Motion from "./Motion";
import Image from "next/image";
import { assets } from "@/app/assets";
import AnimatedBackgroundBlobs from "./AnimatedBackgroundBlobs";
import { Button, Dropdown, DropdownItem } from "flowbite-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <AnimatedBackgroundBlobs />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Profile Image with enhanced effects */}
          <Motion
            className="relative animate-float"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse wave-pulse" />
              <div className="relative w-full h-full glass dark:glass-dark rounded-full p-2 shadow-2xl">
                <Image
                  src={assets.logo}
                  alt="Nicolas Torres - Full Stack Developer"
                  width={150}
                  height={150}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </Motion>

          {/* Main Content */}
          <div className="space-y-6 max-w-4xl">
            {/* Main Heading with gradient text */}
            <Motion
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Hello, I&apos;m{" "}
                <span className="gradient-text animate-shimmer">
                  Nicolas Torres
                </span>
              </h1>
            </Motion>

            {/* Subtitle with enhanced styling */}
            <Motion
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                I&apos;m a passionate{" "}
                <span className="font-semibold gradient-text-secondary">
                  Full Stack Developer
                </span>{" "}
                with expertise in building modern web applications that deliver
                exceptional user experiences.
              </p>
            </Motion>

            {/* CTA Buttons with glass effect */}
            <Motion
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Motion
                motionElement="div"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button color="pink">About Me</Button>
              </Motion>

              <Motion
                motionElement="div"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Dropdown label="Download Resume" dismissOnClick={false}>
                  <DropdownItem>PDF</DropdownItem>
                  <DropdownItem>Word</DropdownItem>
                  <DropdownItem>CSV</DropdownItem>
                  <DropdownItem>JSON</DropdownItem>
                </Dropdown>
              </Motion>
            </Motion>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <Motion
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="scroll-indicator glass dark:glass-dark rounded-full p-2">
          <Motion
            motionElement="div"
            className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Motion
              motionElement="div"
              className="w-1 h-3 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full mt-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </Motion>
        </div>
      </Motion>
    </section>
  );
}
