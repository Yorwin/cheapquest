import React from "react";
import styles from "@/styles/layout/homepage/most-popular-offer.module.scss"
import { responsiveTabletDesignProps } from "@/types/types";

/* Kind of Offers */
import MainOffer from "@/components/pages/homepage/most-popular-offer/components/mainOffer";
import RestOfOffers from "../components/listOfOffers/listOfOffers";

const IsTablet = ({ gameInfo, mainClasses, width }: responsiveTabletDesignProps) => {

    const mainOffer = gameInfo.slice(0, 2);
    const slicedROL = gameInfo.slice(2);

    const groupedGames = [];

    for (let i = 0; i < slicedROL.length; i += 3) {
        groupedGames.push(slicedROL.slice(i, i + 3));
    }


    return (
        <div className={styles["offers-container"]}>
            <div className={styles["first-row"]}>
                <MainOffer
                    title={mainOffer[0].title}
                    gameImage={mainOffer[0].gameImage}
                    platform={mainOffer[0].platform}
                    discount={mainOffer[0].discount}
                    oldPrice={mainOffer[0].oldPrice}
                    currentPrice={mainOffer[0].currentPrice}
                    webOffer={mainOffer[0].webOffer}
                    classes={mainClasses}
                />
                <MainOffer
                    title={mainOffer[1].title}
                    gameImage={mainOffer[1].gameImage}
                    platform={mainOffer[1].platform}
                    discount={mainOffer[1].discount}
                    oldPrice={mainOffer[1].oldPrice}
                    currentPrice={mainOffer[1].currentPrice}
                    webOffer={mainOffer[1].webOffer}
                    classes={mainClasses}
                />
            </div>

            <section className="container-fluid mb-5">
                <div className="row">
                    <RestOfOffers groupedCategories={groupedGames} resolution={width} />
                </div>
            </section>
        </div>
    )
};

export default IsTablet;