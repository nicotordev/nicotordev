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

export {
  inter as localInter,
  sora as localSora,
  sourceSerif4 as localSourceSerif4,
  firaCode as localFiraCode,
};
