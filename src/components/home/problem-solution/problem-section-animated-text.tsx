"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function ProblemSectionAnimatedText() {
  const ref = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"], // Ajustado ligeramente para mejor visibilidad
  });

  // Usamos useSpring para suavizar el scroll. Esto elimina el "jitter" y da peso a la animación.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 20,
    restDelta: 0.001
  });

  // --- TRANSFORMACIONES ---
  // En lugar de una función matemática compleja, definimos los "momentos" clave en el array.
  // [Inicio, Entrada(Overshoot), Centro, Salida(Pre-bounce), Fin]
  
  // Opacidad: Entra rápido, se queda, se va rápido
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Escala: Empieza pequeño, hace overshoot a 1.2, se calma a 1, y luego se aplasta al salir
  const scale = useTransform(smoothProgress, 
    [0, 0.2, 0.5, 0.8, 1], 
    [0.5, 1.15, 1, 1.1, 0.5] // 1.15 es el "Back entry", 1.1 es el inicio del "Bounce exit"
  );

  // Y: Viene de abajo, sube un poco más de la cuenta (overshoot), se centra, y cae
  const y = useTransform(smoothProgress, 
    [0, 0.2, 0.5, 0.8, 1], 
    [100, -20, 0, -10, 100]
  );

  // Skew: El efecto de velocidad/inclinación
  const skewX = useTransform(smoothProgress, 
    [0, 0.2, 0.8, 1], 
    [-20, 0, 0, 20]
  );

  // Blur: Solo borroso al principio y al final
  const filter = useTransform(smoothProgress,
    [0, 0.2, 0.8, 1],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  // --- FONDO ---
  const bgScale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.5, 1.4, 1.2, 0.5]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 0.5, 0.3, 0]);

  // Efecto Glitch para el texto duplicado
  const glitchX = useTransform(smoothProgress, [0, 1], [-10, 10]);
  const glitchY = useTransform(smoothProgress, [0, 0.5, 1], [-5, 5, -5]);

  return (
    <motion.span
      ref={ref}
      className="relative inline-block px-6 py-3 font-mono font-black text-2xl md:text-4xl tracking-tighter text-secondary drop-shadow-2xl perspective-1000"
      style={{
        y,
        scale,
        skewX,
        opacity,
        filter,
      }}
    >
      {/* Fondo con glow */}
      <motion.span
        className="absolute inset-0 -z-10 rounded-md bg-secondary/20 border border-secondary/60 shadow-[0_0_30px_rgba(var(--secondary-rgb),0.4)] w-3/4 mx-auto top-1/2 -translate-y-1/2"
        style={{
          scale: bgScale,
          opacity: bgOpacity,
        }}
      />

      <span className="relative z-10">“cumplen tickets”</span>
    </motion.span>
  );
}