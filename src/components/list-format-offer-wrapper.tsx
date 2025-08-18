"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ListFormatContainer from "./list-format-offer-container";
import { listFormatOfferProps } from "@/types/types";
import Loading from "@/components/list-format-offer-loading"

const ListFormatOffersWrapper = ({ index, gameTitle, offerImage, link, oldPrice, currentPrice, discountPercentage }: listFormatOfferProps) => {

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
            <Image
                src={offerImage}
                sizes="50vw"
                alt="Plataforma de juego"
                fill
                style={{ objectFit: 'cover' }}
            />
        </ListFormatContainer>
    )

};

export default ListFormatOffersWrapper;