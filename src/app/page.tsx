import React from "react";
import MainOffer from "@/components/general/pages/main-offer-header";
import MostPopularOffer from "@/components/general/pages/most-popular-offers";
import NewOffers from "@/components/general/pages/new-offers";
import AgedLikeWine from "@/components/general/pages/aged-like-wine";
import ListFormatOffers from "@/components/general/pages/list-format-offer"
import Reviews from "@/components/general/pages/reviews"
import Categories from "@/components/general/pages/categories";

const HomePage = () => {
  return (
    <>
      <MainOffer />
      <MostPopularOffer />
      <NewOffers />
      <AgedLikeWine />
      <ListFormatOffers />
      <Reviews />
      <Categories />
    </>
  )
}

export default HomePage;