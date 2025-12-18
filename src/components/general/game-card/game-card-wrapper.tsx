"use client";

import { useState, useEffect } from "react";
import GameStandardContainer from "./game-card-server";
import { GameStandardControllerType } from "@/types/types";
import { CldImage } from 'next-cloudinary';
import GameCardLoading from "./game-card-loading";
import { defaultClasses } from "@/functions/classes";

const GameStandardWrapper = ({ gameImage, title, discount, oldPrice, currentPrice, webOffer, classes = defaultClasses }: GameStandardControllerType) => {
    const [imageIsLoaded, setIsImageLoaded] = useState(false);

    console.log(gameImage);

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
            discount={discount}
            oldPrice={oldPrice}
            currentPrice={currentPrice}
            webOffer={webOffer}
            classes={classes}
        >
            <CldImage
                src={`${gameImage}`}
                alt={title}
                fill
                sizes="30vw"
                crop="fill"
                gravity="auto"
                deliveryType="fetch"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </GameStandardContainer>
    )
};

export default GameStandardWrapper;