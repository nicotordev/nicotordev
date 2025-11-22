import { useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";

export type SoundType = "intro1" | "intro2" | "notification" | "success";

export function useLeadMagnetSound() {
  const soundsRef = useRef<Record<SoundType, Howl> | null>(null);

  useEffect(() => {
    soundsRef.current = {
      intro1: new Howl({
        src: ["/sounds/intro-sound-1.mp3"],
        preload: true,
        volume: 0.7,
        html5: false,
      }),
      intro2: new Howl({
        src: ["/sounds/intro-sound-2.mp3"],
        preload: true,
        volume: 0.7,
        html5: false,
      }),
      notification: new Howl({
        src: ["/sounds/new-notification.mp3"],
        preload: true,
        volume: 0.6,
        html5: false,
      }),
      success: new Howl({
        src: ["/sounds/success.mp3"],
        preload: true,
        volume: 0.8,
        html5: false,
      }),
    };

    return () => {
      if (soundsRef.current) {
        Object.values(soundsRef.current).forEach((sound) => sound.unload());
      }
    };
  }, []);

  const playSound = useCallback((soundType: SoundType) => {
    if (!soundsRef.current) return;
    const sound = soundsRef.current[soundType];
    if (sound) {
      // Stop if already playing to avoid overlap if needed, or just play
      // sound.stop();
      sound.play();
    }
  }, []);

  return { playSound };
}
