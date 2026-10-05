import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AIVAN STUDIOS",
    short_name: "AIVAN",
    description: "Branding, estrategia y producción audiovisual con una sola dirección.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f3ef",
    theme_color: "#f4f3ef",
    lang: "es-EC",
  };
}
