import React from "react";
import MainGameImage from "@/components/general/main-game-page";
import OfferCard from "@/components/general/offer-card";
import ImageCard from "@/components/general/image-card";
import styles from "@/styles/layout/gamepage/gamepage-cards-container.module.scss"
import { StoreLogo } from "@/types/types";
import { bestOffer } from "@/types/types";

interface PresentationProps {
    title: string,
    offerImageUrl: string,
    mainImage: string,
    offer: bestOffer,
}

const Presentation = ({ title, offerImageUrl, mainImage, offer }: PresentationProps) => {
    return (
        <MainGameImage imageUrl={mainImage}>
            <div className={styles["cards-container"]}>
                <ImageCard imageUrl={offerImageUrl} />
                <OfferCard title={title} offer={offer} />
            </div>
        </MainGameImage>
    )
};

export default Presentation;