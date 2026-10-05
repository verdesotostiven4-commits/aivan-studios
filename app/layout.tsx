import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "AIVAN STUDIOS — Dirección creativa para marcas que quieren crecer",
    template: "%s — AIVAN STUDIOS",
  },
  description:
    "Estudio creativo de Galápagos que une branding, estrategia de marketing y producción audiovisual para construir marcas con dirección.",
  keywords: ["AIVAN Studios", "branding Galápagos", "marketing Galápagos", "producción audiovisual", "estudio creativo"],
  openGraph: {
    title: "AIVAN STUDIOS",
    description: "Branding, estrategia y producción audiovisual con una sola dirección.",
    type: "website",
    locale: "es_EC",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f3ef",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
