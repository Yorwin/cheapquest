import React from "react";
import MainOffer from "@/components/general/pages/homepage/main-offer-header";
import MostPopularOffer from "@/components/general/pages/homepage/most-popular-offers";
import NewOffers from "@/components/general/pages/homepage/new-offers";
import AgedLikeWine from "@/components/general/pages/homepage/aged-like-wine";
import ListFormatOffers from "@/components/general/pages/homepage/list-format-offer"
import Reviews from "@/components/general/pages/reviews"
import Categories from "@/components/general/pages/homepage/categories";

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