"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Configuration for randomized wave settings
 */
interface WaveRandomSettings {
  /** Opacity range for the wave animation [min, max] */
  opacity: [number, number];
  /** Rotation range in degrees [min, max] */
  rotation: [number, number];
  /** Animation duration in seconds */
  duration: number;
}

export interface BackgroundWavesProps {
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Enable/disable random opacity animation (default: true) */
  enableOpacityAnimation?: boolean;
  /** Enable/disable subtle rotation (default: true) */
  enableRotation?: boolean;
  /** Custom random settings for wave behavior */
  randomSettings?: Partial<WaveRandomSettings>;
}

/**
 * BackgroundWaves3D - An advanced animated background component with parallax effect
 *
 * Features:
 * - Mouse-following parallax animation with spring physics
 * - Random opacity pulsing for organic feel
 * - Subtle rotation for depth
 * - Color shifting effects
 * - High-quality image rendering
 * - Performance optimized with useMemo
 */
export default function BackgroundWaves3D({
  className,
  enableOpacityAnimation = true,
  enableRotation = true,
  randomSettings,
}: BackgroundWavesProps) {
  // Default random settings with user overrides
  const settings: WaveRandomSettings = useMemo(
    () => ({
      opacity: randomSettings?.opacity || [0.5, 0.7],
      rotation: randomSettings?.rotation || [-1, 1],
      duration: randomSettings?.duration || 8,
    }),
    [randomSettings]
  );

  // Randomized values generated on mount
  const [randomValues] = useState(() => ({
    opacityStart: settings.opacity[0],
    opacityEnd: settings.opacity[1],
    rotation:
      settings.rotation[0] +
      Math.random() * (settings.rotation[1] - settings.rotation[0]),
    duration: settings.duration + Math.random() * 4, // Add 0-4s variance
    hueRotate: Math.random() * 10 - 5, // -5 to 5 degrees
  }));

  // 1. Valores de movimiento crudos (sin suavizado)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Configuración de física para suavizar el movimiento (Spring)
  // stiffness bajo y damping alto crean una sensación de "agua" o flotación
  const springConfig = useMemo(
    () => ({
      damping: 50,
      stiffness: 100,
    }),
    []
  );

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // 3. Transformamos la posición del mouse en píxeles de desplazamiento
  // Ajusta los valores para decidir qué tanto se mueve la imagen
  const translateX = useTransform(springX, [-0.5, 0.5], ["-25px", "25px"]);
  const translateY = useTransform(springY, [-0.5, 0.5], ["-15px", "15px"]);

  // Subtle rotation based on mouse position (always call hook, conditionally use value)
  const rotateValue = useTransform(
    springX,
    [-0.5, 0.5],
    [randomValues.rotation * -1, randomValues.rotation]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Obtenemos las dimensiones de la ventana
      const { innerWidth, innerHeight } = window;

      // Calculamos la posición del mouse relativa al centro (de -0.5 a 0.5)
      const xPct = e.clientX / innerWidth - 0.5;
      const yPct = e.clientY / innerHeight - 0.5;

      // Actualizamos los valores de movimiento
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 w-full h-full overflow-hidden",
        className
      )}
    >
      <motion.div
        // 4. Aplicamos los valores suavizados al estilo
        style={{
          x: translateX,
          y: translateY,
          ...(enableRotation && { rotate: rotateValue }),
          scale: 1.1, // Hacemos zoom para que no se vean bordes blancos al mover
        }}
        // 5. Animación de opacidad aleatoria para efecto orgánico
        {...(enableOpacityAnimation && {
          animate: {
            opacity: [
              randomValues.opacityStart,
              randomValues.opacityEnd,
              randomValues.opacityStart,
            ],
          },
          transition: {
            duration: randomValues.duration,
            repeat: Infinity,
            ease: "easeInOut",
          },
        })}
        className="relative w-full h-full z-1 blur-xs"
      >
        <Image
          src="/images/background/bg-waves.webp"
          alt="Background waves"
          fill
          priority
          quality={100}
          className="object-cover pointer-events-none"
          style={{
            filter: `brightness(0.65) saturate(1.25) hue-rotate(${randomValues.hueRotate}deg)`,
          }}
        />
      {/* Fades (Superpuestos estáticos para que no se muevan con la imagen) */}
      <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-primary/70 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-primary/70 to-transparent pointer-events-none z-10" />
      </motion.div>


    </div>
  );
}
