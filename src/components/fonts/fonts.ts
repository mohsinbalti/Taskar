import localFont from "next/font/local";

// Define custom local fonts for different font weights of Metropolis
const metropolis = localFont({
  src: [
    { path: "../../../public/fonts/Metropolis-Regular.otf", weight: "400" },
    { path: "../../../public/fonts/Metropolis-Medium.otf", weight: "500" },
    { path: "../../../public/fonts/Metropolis-SemiBold.otf", weight: "600" },
    { path: "../../../public/fonts/Metropolis-Bold.otf", weight: "700" },
    { path: "../../../public/fonts/Metropolis-ExtraBold.otf", weight: "800" },
    {
      path: "../../../public/fonts/Metropolis-ExtraBoldItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
});

const clashDisplay = localFont({
  src: [{ path: "../../../public/fonts/ClashDisplay-Bold.otf", weight: "600" }],
});

const clashDisplay400 = localFont({
  src: [{ path: "../../../public/fonts/ClashDisplay-Bold.otf", weight: "400" }],
});
const clashDisplay500 = localFont({
  src: [{ path: "../../../public/fonts/ClashDisplay-Bold.otf", weight: "500" }],
});
const clashDisplay600 = localFont({
  src: [{ path: "../../../public/fonts/ClashDisplay-Bold.otf", weight: "600" }],
});
const clashDisplay700 = localFont({
  src: [{ path: "../../../public/fonts/ClashDisplay-Bold.otf", weight: "700" }],
});
const epilogue = localFont({
  src: [
    {
      path: "../../../public/fonts/Epilogue-VariableFont_wght.ttf",
      weight: "300",
    },
  ],
});

const epilogue400 = localFont({
  src: [
    {
      path: "../../../public/fonts/Epilogue-VariableFont_wght.ttf",
      weight: "400",
    },
  ],
});

const epilogue500 = localFont({
  src: [
    {
      path: "../../../public/fonts/Epilogue-VariableFont_wght.ttf",
      weight: "500",
    },
  ],
});
const epilogue600 = localFont({
  src: [
    {
      path: "../../../public/fonts/Epilogue-VariableFont_wght.ttf",
      weight: "600",
    },
  ],
});

const epilogue700 = localFont({
  src: [
    {
      path: "../../../public/fonts/Epilogue-VariableFont_wght.ttf",
      weight: "700",
    },
  ],
});

const hNeue400 = localFont({
  src: [
    {
      path: "../../../public/fonts/HelveticaNeueThin.otf",
      weight: "400",
    },
  ],
});
const hNeue500 = localFont({
  src: [
    {
      path: "../../../public/fonts/HelveticaNeueMedium.otf",
      weight: "500",
    },
  ],
});
const hNeue600 = localFont({
  src: [
    {
      path: "../../../public/fonts/HelveticaNeueBlack.otf",
      weight: "600",
    },
  ],
});
const hNeue700 = localFont({
  src: [
    {
      path: "../../../public/fonts/HelveticaNeueBold.otf",
      weight: "700",
    },
  ],
});

export {
  metropolis,
  clashDisplay,
  clashDisplay400,
  clashDisplay500,
  clashDisplay600,
  clashDisplay700,
  epilogue,
  epilogue500,
  epilogue600,
  epilogue400,
  epilogue700,
  hNeue400,
  hNeue500,
  hNeue600,
  hNeue700,
};
