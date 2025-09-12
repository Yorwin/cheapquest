import React from "react";
import './globals.scss'
import MainOffer from "@/components/pages/homepage/main-offer-header";
import MostPopularOffer from "@/components/pages/homepage/most-popular-offer/most-popular-offers";
import NewOffers from "@/components/pages/homepage/vertical-and-aged-containers/new-offers";
import AgedLikeWine from "@/components/pages/homepage/vertical-and-aged-containers/aged-like-wine";
import ListFormatOffers from "@/components/pages/homepage/list-format-offer/list-format-offer"
import Reviews from "@/components/pages/homepage/reviews"
import Categories from "@/components/pages/homepage/categories/categories";

const HomePage = async () => {
  return <>
    <MainOffer />
    <MostPopularOffer />
    {/* 
    <NewOffers />
    <AgedLikeWine />
    <ListFormatOffers />
    <Reviews />
    <Categories />
    */}
  </>
}

export default HomePage;