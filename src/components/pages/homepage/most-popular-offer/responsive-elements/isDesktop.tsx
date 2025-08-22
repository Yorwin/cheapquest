import React from "react";
import styles from "@/styles/layout/homepage/most-popular-offer.module.scss"
import { responsiveDesktopDesignProps } from "@/types/types";

/* Kind of Offers */
import MainOffer from "@/components/pages/homepage/most-popular-offer/components/mainOffer";
import SecondaryOffers from "../components/secondaryOffers";
import RestOfOffers from "../components/listOfOffers/listOfOffers";

const IsDesktop = ({ gameInfo, mainClasses, secondaryClasses, width }: responsiveDesktopDesignProps) => {

    const mainOffer = gameInfo.slice(0, 1);
    const firstCouple = gameInfo.slice(1, 3);
    const secondCouple = gameInfo.slice(3, 5);

    const slicedROL = gameInfo.slice(5);

    const groupedGames = [];

    for (let i = 0; i < slicedROL.length; i += 3) {
        groupedGames.push(slicedROL.slice(i, i + 3));
    }

    return (
        <section className={styles["offers-container"]}>
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
                <div className={styles["pairs-container"]}>
                    <div className={styles["pair"]}>
                        <SecondaryOffers
                            data={{
                                games: firstCouple,
                                classes: secondaryClasses
                            }}
                        />
                    </div>
                    <div className={styles["pair"]}>
                        <SecondaryOffers
                            data={{
                                games: secondCouple,
                                classes: secondaryClasses
                            }}
                        />
                    </div>
                </div>
            </div>

            <section className="container-fluid mb-5">
                <div className="row">
                    <RestOfOffers groupedCategories={groupedGames} resolution={width} />
                </div>
            </section>
        </section>
    )
};

export default IsDesktop;