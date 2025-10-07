import React from "react";
import styles from "@/styles/layout/gamepage/gamepage-cards-container.module.scss"
import { Suspense } from "react";

/* Components */
import MainGameImage from "@/components/general/main-game-page";
import OfferCard from "@/components/general/offer-card";
import ImageCard from "@/components/general/image-card";

const Presentation = ({ gameName }: { gameName: string }) => {
    return (
        <MainGameImage gameName={gameName}>
            <div className={styles["cards-container"]}>
                <ImageCard gameName={gameName} />
                <Suspense fallback={<div>Cargando...</div>}>
                    <OfferCard gameName={gameName} />
                </Suspense>
            </div>
        </MainGameImage>
    )
};

export default Presentation;