import React from "react";
import './globals.scss'
import MainOffer from "@/components/pages/homepage/main-offer-header";
import MostPopularOffer from "@/components/pages/homepage/most-popular-offer/most-popular-offers";
import NewOffers from "@/components/pages/homepage/vertical-and-aged-containers/new-offers";
import AgedLikeWine from "@/components/pages/homepage/vertical-and-aged-containers/aged-like-wine";
import ListFormatOffers from "@/components/pages/homepage/list-format-offer/list-format-offer"
//import Reviews from "@/components/pages/homepage/reviews"
import Categories from "@/components/pages/homepage/categories/categories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CheapQuest - Ofertas y Precios de Videojuegos en Tiendas Oficiales",
  description: "Descubre las mejores ofertas y precios de videojuegos en tiendas oficiales. Compara descuentos, sigue rebajas y consigue tus juegos favoritos al mejor precio.",
  keywords: "ofertas videojuegos, descuentos steam, precios juegos, rebajas videojuegos, tiendas oficiales, juegos baratos",
  robots: "index, follow",
  openGraph: {
    title: "CheapQuest - Ofertas de Videojuegos en Tiendas Oficiales",
    description: "Compara precios y encuentra las mejores ofertas de videojuegos en tiendas oficiales.",
    type: "website",
    url: "https://cheapquest.com/",
    images: [
      {
        url: "https://cheapquest.com/preview.png",
        width: 1200,
        height: 630,
        alt: "CheapQuest - Ofertas de Videojuegos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CheapQuest - Ofertas de Videojuegos en Tiendas Oficiales",
    description: "Compara precios y encuentra las mejores ofertas de videojuegos en tiendas oficiales.",
    images: ["https://cheapquest.com/preview.png"],
  },
};

const HomePage = async () => {
  return <>
    <MainOffer />
    <MostPopularOffer />
    <NewOffers />
    <AgedLikeWine />
    <ListFormatOffers />
    {/* <Reviews /> */}
    <Categories />
  </>
}

export default HomePage;