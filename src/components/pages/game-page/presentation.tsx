import React from "react";
import MainGameImage from "@/components/general/main-game-page";
import OfferCard from "@/components/general/offer-card";
import ImageCard from "@/components/general/image-card";
import styles from "@/styles/layout/gamepage/gamepage-cards-container.module.scss"

const Presentation = () => {
    return (
        <MainGameImage>
            <div className={styles["cards-container"]}>
                <ImageCard />
                <OfferCard />
            </div>
        </MainGameImage>
    )
};

export default Presentation;