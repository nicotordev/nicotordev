"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function LeadMagnetGift() {
  const [isGiftVisible, setIsGiftVisible] = useState(true);

  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full transition-all duration-500 ease-in-out flex items-center justify-center pointer-events-none",
        isGiftVisible
          ? "scale-100 z-50 backdrop-blur-sm"
          : "opacity-0 scale-0 -z-10"
      )}
    >
      {/* Backdrop Blur Layer */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-primary opacity-30 blur-xl" />

      {/* Content Layer */}
      <div className="relative z-10 pointer-events-auto">
        <h2 className="text-4xl font-black text-background text-center px-8 font-ibm-plex-mono">
          Regalo Secreto Desbloqueado
        </h2>
        <p className="text-xl text-background text-center mt-4 px-8 leading-relaxed font-semibold">
          Pulsa el <b>botón</b> para revelar <b className="text-primary">tu regalo secreto(solo para ti).</b> <b className="text-secondary">¡Pero ten cuidado!</b>{" "}
          Podría ser una <b className="text-destructive">TRAMPA MORTAL</b>...
        </p>
      </div>
    </div>
  );
}
