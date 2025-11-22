import localFont from "next/font/local";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      weight: "100 900", // variable font, rango de pesos
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter-Italic-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const sora = localFont({
  src: [
    {
      path: "../../public/fonts/Sora-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-sora",
  display: "swap",
});

const sourceSerif4 = localFont({
  src: [
    {
      path: "../../public/fonts/SourceSerif4-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/SourceSerif4-Italic-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-source-serif4",
  display: "swap",
});

const firaCode = localFont({
  src: [
    {
      path: "../../public/fonts/FiraCode-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-fira-code",
  display: "swap",
});

// JetBrains Mono is loaded through @font-face in fonts.css
const jetBrainsMono = {
  variable: "--font-jetbrains-mono",
  className: "",
} as const;

const ibmPlexMono = localFont({
  src: [
    {
      path: "../../public/fonts/IBMPlexMono-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexMono-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/IBMPlexMono-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexMono-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/IBMPlexMono-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexMono-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/IBMPlexMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/IBMPlexMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexMono-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/IBMPlexMono-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexMono-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/IBMPlexMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexMono-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const fontdinerSwanky = localFont({
  src: [
    {
      path: "../../public/fonts/FontdinerSwanky-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-fontdiner-swanky",
  display: "swap",
});

const loveLight = localFont({
  src: [
    {
      path: "../../public/fonts/LoveLight-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-love-light",
  display: "swap",
});

const permanentMarker = localFont({
  src: [
    {
      path: "../../public/fonts/PermanentMarker-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-permanent-marker",
  display: "swap",
});

export {
  inter as localInter,
  sora as localSora,
  sourceSerif4 as localSourceSerif4,
  firaCode as localFiraCode,
  jetBrainsMono as localJetBrainsMono,
  ibmPlexMono as localIBMPlexMono,
  fontdinerSwanky as localFontdinerSwanky,
  loveLight as localLoveLight,
  permanentMarker as localPermanentMarker,
};
