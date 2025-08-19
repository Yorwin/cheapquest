"use client"

import React, { useState, useEffect } from "react";
import OffersItem from "./listOfOffersItem"
import { GameStandardContainerType } from "@/types/types";
import Loading from "@/components/general/game-card/game-card-loading";
import Image from "next/image";

const ListOfOffersWrapper = ({ gameImage, title, platform, discount, oldPrice, currentPrice, webOffer }: GameStandardContainerType) => {

    const [imageIsLoaded, setIsImageLoaded] = useState(false);

    const classes = {
        mainGameCard: "rest-of-the-offers-container",
        iconContainer: "gameimage-container",
        gameTitle: "list-info-container-title",
        priceOfferOriginContainer: "secondary-price-offerorigin-container",
        discount: "secondary-discount",
        prices: "secondary-prices",
        lastPrice: "secondary-last-price",
        currentPrice: "secondary-current-price",
        webOffer: "secondary-web-offer",
    };

    useEffect(() => {
        const img = new window.Image();
        img.src = `${gameImage}`;
        img.onload = () => setIsImageLoaded(true);
    }, [gameImage]);

    if (!imageIsLoaded) {
        return <Loading classList={classes}></Loading>;
    }

    return (
        <OffersItem
            title={title}
            gameImage={gameImage}
            platform={platform}
            discount={discount}
            oldPrice={oldPrice}
            currentPrice={currentPrice}
            webOffer={webOffer}
        >
            <Image
                src={gameImage}
                alt={title}
                sizes="30vw"
                fill
                style={{ objectFit: "cover" }} />
        </OffersItem>
    )
};

export default ListOfOffersWrapper;