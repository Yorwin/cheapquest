import React from "react";
import MainOffer from "@/components/general/pages/main-offer-header";
import MostPopularOffer from "@/components/general/pages/most-popular-offers";
import NewOffers from "@/components/general/pages/new-offers";

const HomePage = () => {
  return (
    <>
      <MainOffer />
      <MostPopularOffer />
      <NewOffers />
    </>
  )
}

export default HomePage;