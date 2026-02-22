import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Morphine Equivalence Calculator",
    short_name: "MECtool",
    description:
      "Calculate morphine equivalence doses for opioid medications.",
    start_url: "/",
    display: "standalone",
    background_color: "#eefcff",
    theme_color: "#005f73",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
