import React from "react";
import Head from "next/head";

/* Global Styles */
import "@/app/globals.scss";

/* Fonts */
import { gontSerrat, timeLess } from "@/lib/fonts";

/* Bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

/* Layout */
import Header from "@/layout/header/header"
import Footer from "@/layout/footer/footer"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CheapQuest - Ofertas y Precios de Videojuegos en Tiendas Oficiales",
  description:
    "Descubre las mejores ofertas y precios de videojuegos en tiendas oficiales. Compara descuentos, sigue rebajas y consigue tus juegos favoritos al mejor precio con CheapQuest.",
  keywords:
    "ofertas videojuegos, descuentos steam, precios juegos, rebajas videojuegos, tiendas oficiales, juegos baratos, cheapquest",
  openGraph: {
    title: "CheapQuest - Ofertas de Videojuegos en Tiendas Oficiales",
    description:
      "Compara precios y encuentra las mejores ofertas de videojuegos en tiendas oficiales. Ahorra en tus juegos favoritos.",
    url: "https://www.tu-dominio.com/",
    type: "website",
    images: [
      {
        url: "https://www.tu-dominio.com/preview.jpg",
        width: 1200,
        height: 630,
        alt: "CheapQuest portada",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" }
    ],
    other: [
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" }, // Android/Chrome
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" }, // Android/Chrome
      { url: "/site.webmanifest", type: "application/manifest+json" } // Progressive Web App
    ]
  }
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <body className={`${gontSerrat.variable} ${timeLess.variable}`}>
        <header className="header">
          <Header />
        </header>
        <main className="contenedor-principal">
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;