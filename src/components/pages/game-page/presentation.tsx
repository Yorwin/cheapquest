import React from "react";
import MainGameImage from "@/components/general/main-game-page";
import OfferCard from "@/components/general/offer-card";
import ImageCard from "@/components/general/image-card";
import styles from "@/styles/layout/gamepage/gamepage-cards-container.module.scss"

const Presentation = ({offerImageUrl, mainImage} : {offerImageUrl : string, mainImage: string}) => {
    return (
        <MainGameImage imageUrl={mainImage}>
            <div className={styles["cards-container"]}>
                <ImageCard imageUrl={offerImageUrl} />
                <OfferCard />
            </div>
        </MainGameImage>
    )
};

export default Presentation;