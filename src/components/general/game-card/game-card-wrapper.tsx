"use client";

import { useState, useEffect } from "react";
import GameStandardContainer from "./game-card-server";
import { GameStandardContainerType, GameStandardControllerType } from "@/types/types";
import Image from "next/image";
import GameCardLoading from "./game-card-loading";

const defaultClasses = {
    mainGameCard: "default-main-game-card",
    iconContainer: "default-icon-container",
    priceOfferOriginContainer: "default-price-offerorigin-container",
    offerContainer: "default-offer-container",
    discount: "default-discount",
    prices: "default-prices",
    lastPrice: "default-last-price",
    currentPrice: "default-current-price",
    webOffer: "default-web-offer",
    gameTitle: "default-game-title",
};

const GameStandardWrapper = ({ gameImage, title, platform, discount, oldPrice, currentPrice, webOffer, classes = defaultClasses }: GameStandardControllerType) => {
    const [imageIsLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const img = new window.Image();
        img.src = `${gameImage}`;
        img.onload = () => setIsImageLoaded(true);
    }, [gameImage]);

    if (!imageIsLoaded) {
        return <GameCardLoading classList={classes} />;
    }

    return (
        <GameStandardContainer
            title={title}
            gameImage={gameImage}
            platform={platform}
            discount={discount}
            oldPrice={oldPrice}
            currentPrice={currentPrice}
            webOffer={webOffer}
            classes={classes}
        >
            <Image
                src={gameImage}
                alt={title}
                fill
                sizes="30vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </GameStandardContainer>
    )
};

export default GameStandardWrapper;