"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SolutionSectionVideo() {
  const [videoError, setVideoError] = useState(false);
  return (
    <>
      <video
        className="h-full w-full object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline // CRITICO para iOS
        preload="auto" // Ayuda a que el hover sea instantáneo
        onError={() => setVideoError(true)}
      >
        <source
          src="/videos/Cyberpunk-Animation-Loop-Generation_4k.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* IMAGEN: Añadido priority, sizes y efecto de opacidad inversa */}
      <div
        className={cn(
          "relative h-full w-full transition-all duration-700 group-hover:scale-105",
          videoError ? "hidden" : "block"
        )}
      >
        <Image
          src="/illustrations/me-the-right-way.webp"
          alt="Ilustración representando la metodología correcta"
          fill // Usar fill es mejor para contenedores responsivos que width/height fijos
          sizes="(max-width: 768px) 100vw, 50vw"
          priority // Importante si está en la parte superior de la página
          className="object-cover transition-opacity duration-700 group-hover:opacity-0" // La imagen se desvanece cuando entra el video
        />
      </div>
    </>
  );
}
