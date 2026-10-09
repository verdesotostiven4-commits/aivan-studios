import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./cinematic-hero.css";
import "./portfolio-services.css";
import "./aivan-refinements.css";
import "./aivan-orbital.css";
import "./aivan-orbital-original.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aivan-studios.vercel.app"),
  title: {
    default: "AIVAN STUDIOS — Dirección creativa para marcas que quieren crecer",
    template: "%s — AIVAN STUDIOS",
  },
  description:
    "Estudio creativo de Galápagos que une branding, estrategia de marketing y producción audiovisual para construir marcas con dirección.",
  keywords: ["AIVAN Studios", "branding Galápagos", "marketing Galápagos", "producción audiovisual", "estudio creativo"],
  alternates: { canonical: "/" },
  authors: [{ name: "AIVAN STUDIOS" }],
  creator: "AIVAN STUDIOS",
  publisher: "AIVAN STUDIOS",
  category: "Creative studio",
  openGraph: {
    title: "AIVAN STUDIOS",
    description: "Branding, estrategia y producción audiovisual con una sola dirección.",
    type: "website",
    locale: "es_EC",
    siteName: "AIVAN STUDIOS",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "AIVAN STUDIOS",
    description: "Branding, estrategia y producción audiovisual con una sola dirección.",
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f4f3ef",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#main-content">Saltar al contenido</a>
        {children}
      </body>
    </html>
  );
}
