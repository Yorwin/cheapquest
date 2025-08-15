"use client"

import React, { useState, useEffect } from "react";
import OffersItem from "./listOfOffersItem"
import { GameStandardContainerType } from "@/types/types";
import Image from "next/image";

const ListOfOffersWrapper = ({ gameImage, title, platform, discount, oldPrice, currentPrice, webOffer }: GameStandardContainerType) => {

    const [imageIsLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const img = new window.Image();
        img.src = `${gameImage}`;
        img.onload = () => setIsImageLoaded(true);
    }, [gameImage]);

    if (!imageIsLoaded) {
        return <div>Cargando imagen...</div>;
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
            <Image src={gameImage} alt={title} fill style={{ objectFit: "cover" }} />
        </OffersItem>
    )
};

export default ListOfOffersWrapper;