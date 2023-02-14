import localFont from "@next/font/local";

export const circular = localFont({
  src: [
    {
      path: "../../public/fonts/CircularSpotifyText-Black.otf",
      weight: "900",
    },
    {
      path: "../../public/fonts/CircularSpotifyText-BlackItalic.otf",
      weight: "900",
    },
    {
      path: "../../public/fonts/CircularSpotifyText-Bold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/CircularSpotifyText-Book.otf",
      weight: "600",
    },
    {
      path: "../../public/fonts/CircularSpotifyText-BookItalic.otf",
      weight: "600",
    },
    {
      path: "../../public/fonts/CircularSpotifyText-Light.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/CircularSpotifyText-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/CircularSpotifyText-MediumItalic.otf",
      weight: "500",
    },
  ],
  variable: "--font-circular",
});
