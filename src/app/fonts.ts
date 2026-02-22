import localFont from "next/font/local";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      weight: "100 900", // variable font, rango de pesos
      style: "normal",
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

const sourceSerif4 = {
  variable: "--font-source-serif4",
  className: "",
} as const;

const firaCode = {
  variable: "--font-fira-code",
  className: "",
} as const;

// JetBrains Mono is loaded through @font-face in fonts.css
const jetBrainsMono = {
  variable: "--font-jetbrains-mono",
  className: "",
} as const;

const ibmPlexMono = localFont({
  src: [
    {
      path: "../../public/fonts/IBMPlexMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const fontdinerSwanky = {
  variable: "--font-fontdiner-swanky",
  className: "",
} as const;

const loveLight = {
  variable: "--font-love-light",
  className: "",
} as const;

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
  firaCode as localFiraCode, fontdinerSwanky as localFontdinerSwanky, ibmPlexMono as localIBMPlexMono, inter as localInter, jetBrainsMono as localJetBrainsMono, loveLight as localLoveLight,
  permanentMarker as localPermanentMarker, sora as localSora,
  sourceSerif4 as localSourceSerif4
};
