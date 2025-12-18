'use client'

import { VerticalCardWrapperType } from "@/types/types";
import { useEffect, useState } from "react";
import Loading from "@/components/general/vertical-card/vertical-game-card-loading"
import VerticalGameCard from "@/components/general/vertical-card/vertical-game-container";
import { CldImage } from 'next-cloudinary';

const VerticalCardClasses = {
    mainGameCard: "vertical-card-container",
    iconContainer: "image-container",
    gameTitle: "game-title",
    priceOfferOriginContainer: "price-and-platform-container",
    prices: "prices-container",
    lastPrice: "regular-price",
    currentPrice: "current-price",
    webOffer: "web-offer",
}

const VerticalGameCardWrapper = ({ gameImage, platform, oldPrice, discount, title, currentPrice, webOffer }: VerticalCardWrapperType) => {

    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new window.Image();
        img.src = `${gameImage}`;
        img.onload = () => setImageLoaded(true);
    }, [gameImage]);

    if (!imageLoaded) {
        return <Loading classList={VerticalCardClasses} />
    }

    return (
        <VerticalGameCard
            platform={`${platform}`}
            oldPrice={oldPrice}
            discount={discount}
            title={title}
            currentPrice={currentPrice}
            webOffer={webOffer}>
            <CldImage
                src={gameImage as string}
                sizes="50vw"
                alt={`Imágen de ${title}`}
                fill
                crop="fill"
                gravity="auto"
                deliveryType="fetch"
                style={{ objectFit: 'cover' }}
            />
        </VerticalGameCard>
    )
};

export default VerticalGameCardWrapper;