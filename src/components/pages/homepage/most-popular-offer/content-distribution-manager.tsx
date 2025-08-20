"use client"

import React from "react";
import useWindowWidth from "@/functions/hooks/useWindowWidth";
import styles from "@/styles/layout/homepage/most-popular-offer.module.scss"
import { GameStandardContainerType } from "@/types/types";

/* Kind of Offers */

import MainOffer from "@/components/pages/homepage/most-popular-offer/components/mainOffer";
import SecondaryOffers from "./components/secondaryOffers";
import RestOfOffers from "./components/listOfOffers/listOfOffers";

const mainClasses = {
    mainGameCard: "main-gamecard-offer",
    iconContainer: "icon-container",
    priceOfferOriginContainer: "price-offerorigin-container",
    offerContainer: "offer-container",
    discount: "discount",
    prices: "prices",
    lastPrice: "last-price",
    currentPrice: "current-price",
    webOffer: "web-offer",
    gameTitle: "main-game-title",
};

const secondaryClasses = {
    mainGameCard: "secondary-gamecard-offer",
    iconContainer: "secondary-icon-container",
    priceOfferOriginContainer: "secondary-price-offerorigin-container",
    offerContainer: "offer-container",
    discount: "secondary-discount",
    prices: "secondary-prices",
    lastPrice: "secondary-last-price",
    currentPrice: "secondary-current-price",
    webOffer: "secondary-web-offer",
    gameTitle: "secondary-game-title",
};

interface gameInfo {
    gameInfo: GameStandardContainerType[];
}

const ContentDistributionManager = ({ gameInfo }: gameInfo) => {

    const width = useWindowWidth();

    if (width > 992) {

        const mainOffer = gameInfo.slice(0, 1);
        const firstCouple = gameInfo.slice(1, 3);
        const secondCouple = gameInfo.slice(3, 5);

        const slicedROL = gameInfo.slice(5);

        const groupedGames = [];

        for (let i = 0; i < slicedROL.length; i += 3) {
            groupedGames.push(slicedROL.slice(i, i + 3));
        }

        return (
            <>
                <section className={styles["most-popular-offer-container"]}>
                    <h1 className={styles["title"]}>OFERTAS MÁS POPULARES</h1>
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

                        {/* Ver más ofertas Botón */}

                        <div className={styles["button-container"]}>
                            <button>
                                Ver más ofertas
                            </button>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    if (width <= 992 && width > 768) {

        const mainOffer = gameInfo.slice(0, 2);
        const slicedROL = gameInfo.slice(2);

        const groupedGames = [];

        for (let i = 0; i < slicedROL.length; i += 3) {
            groupedGames.push(slicedROL.slice(i, i + 3));
        }

        return <>
            <section className={styles["most-popular-offer-container"]}>
                <h1 className={styles["title"]}>OFERTAS MÁS POPULARES</h1>
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

                    {/* Ver más ofertas Botón */}

                    <div className={styles["button-container"]}>
                        <button>
                            Ver más ofertas
                        </button>
                    </div>
                </div>
            </section>
        </>
    }

    if (width < 768) {

        const bigOffer: GameStandardContainerType = gameInfo[0];
        const slicedROL = gameInfo.slice(2, 10);
        const secondBigOffer: GameStandardContainerType = gameInfo[10];

        const groupedGames = [];

        for (let i = 0; i < slicedROL.length; i += 2) {
            groupedGames.push(slicedROL.slice(i, i + 2));
        }

        return <>
            <section className={styles["most-popular-offer-container"]}>
                <h1 className={styles["title"]}>OFERTAS MÁS POPULARES</h1>

                <div className={styles["offers-container"]}>

                    <div className={styles["first-row"]}>
                        <MainOffer
                            title={bigOffer.title}
                            gameImage={bigOffer.gameImage}
                            platform={bigOffer.platform}
                            discount={bigOffer.discount}
                            oldPrice={bigOffer.oldPrice}
                            currentPrice={bigOffer.currentPrice}
                            webOffer={bigOffer.webOffer}
                            classes={mainClasses}
                        />
                    </div>

                    <section className="container-fluid mb-5">
                        <div className="row">
                            <RestOfOffers groupedCategories={groupedGames} resolution={width} />
                        </div>
                    </section>

                    <div className={styles["first-row"]}>
                        <MainOffer
                            title={secondBigOffer.title}
                            gameImage={secondBigOffer.gameImage}
                            platform={secondBigOffer.platform}
                            discount={secondBigOffer.discount}
                            oldPrice={secondBigOffer.oldPrice}
                            currentPrice={secondBigOffer.currentPrice}
                            webOffer={secondBigOffer.webOffer}
                            classes={mainClasses}
                        />
                    </div>

                    {/* Ver más ofertas Botón */}

                    <div className={styles["button-container"]}>
                        <button>
                            Ver más ofertas
                        </button>
                    </div>
                </div>
            </section>
        </>
    }
};

export default ContentDistributionManager;