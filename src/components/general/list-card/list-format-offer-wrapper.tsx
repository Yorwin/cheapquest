"use client"

import React, { useState, useEffect } from "react";
import { CldImage } from 'next-cloudinary';
import ListFormatContainer from "./list-format-offer-container";
import { listOffersWrapperProps } from "@/types/types";
import Loading from "@/components/general/list-card/list-format-offer-loading"

const ListFormatOffersWrapper = ({ index, gameTitle, offerImage, link, oldPrice, currentPrice, discountPercentage }: listOffersWrapperProps) => {

    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new window.Image();
        img.src = `${offerImage}`;
        img.onload = () => setImageLoaded(true);
    }, [offerImage])

    if (!imageLoaded) {
        return <Loading />
    }

    return (
        <ListFormatContainer
            key={index}
            index={index}
            link={link}
            offerImage={offerImage}
            gameTitle={gameTitle}
            oldPrice={oldPrice}
            currentPrice={currentPrice}
            discountPercentage={discountPercentage}
        >
            <CldImage
                src={`${offerImage}`}
                sizes="10vw"
                alt="Plataforma de juego"
                fill
                crop="fill"
                gravity="auto"
                style={{ objectFit: 'cover' }}
                deliveryType="fetch"
            />
        </ListFormatContainer>
    )

};

export default ListFormatOffersWrapper;