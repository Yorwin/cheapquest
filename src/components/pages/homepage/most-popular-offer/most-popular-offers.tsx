import React from "react";
import styles from "@/styles/layout/homepage/most-popular-offer.module.scss"
import Monitor from "@/resources/platforms/pc.svg"
import { storeLogos } from "@/resources/stores_icons"
import { getMostPopularOffers } from "@/utils/getOffers";
import searchForStore from "@/utils/seachForStore";
import { getGameInfo } from "@/utils/getGamesInfo";
import currencyRateCalculator from "@/utils/convertCurrency";
import { Currency } from "@/types/types";
import ErrorGameStandard from "@/components/general/error-loading-offers-fallback-container";
import NoImageFound from "@/resources/no-image-found/no-image-found.webp";
import GameStandardWrapper from "@/components/general/game-card/game-card-wrapper";
import { mainClasses, secondaryClasses } from "@/functions/classes";

const MostPopularOffer = async () => {
    try {
        const Offers = await getMostPopularOffers();
        const listOfStores = await searchForStore();
        let maxIndex: number = 10;

        if (!Offers) {
            throw new Error("Error al intentar cargar las ofertas más populares");
        }

        const listInfo = [];

        for (let i = 0; i <= maxIndex; i++) {

            const store = listOfStores.find((e: any) => e.storeID === Offers[i].storeID);
            const storeImage = storeLogos.find((e: any) => e.name === store.storeName);

            const getGame = await getGameInfo(Offers[i].title);

            const resultSalePrice = (Number(Offers[i].salePrice)).toFixed(2);
            const resultRegularPrice = (Number(Offers[i].normalPrice)).toFixed(2);
            const gameImage = getGame.results[0].background_image !== null ? getGame.results[0].background_image : NoImageFound.src;

            listInfo.push({
                title: Offers[i].title,
                gameImage: gameImage,
                discount: `${Math.floor(Number(Offers[i].savings))}%`,
                oldPrice: `${resultRegularPrice}€`,
                currentPrice: `${resultSalePrice}€`,
                webOffer: storeImage ? storeImage.image : store.images.icon,
                platform: Monitor,
            })
        }

        return <>
            <section id="most-popular-offers" className={styles["most-popular-offer-container"]}>
                <h1 className={styles["title"]}>OFERTAS MÁS POPULARES</h1>

                <div className="container-fluid p-0 mb-4">
                    <div className="row mb-lg-4">
                        <div className="col-lg-6 col-sm-12 col-sm-12 mb-4 mb-lg-0">
                            <GameStandardWrapper
                                gameImage={listInfo[0].gameImage}
                                title={listInfo[0].title}
                                discount={listInfo[0].discount}
                                oldPrice={listInfo[0].oldPrice}
                                currentPrice={listInfo[0].currentPrice}
                                webOffer={listInfo[0].webOffer}
                                classes={mainClasses}
                            />
                        </div>
                        <div className="col-lg-6 col-sm-12 col-sm-12">
                            <div className={`row mb-md-4 mb-lg-0 ${styles["secondary-container"]}`}>
                                <div className="col-lg-6 col-md-6 col-sm-12 pb-lg-2 mb-4 mb-lg-0">
                                    <GameStandardWrapper
                                        gameImage={listInfo[1].gameImage}
                                        title={listInfo[1].title}
                                        discount={listInfo[1].discount}
                                        oldPrice={listInfo[1].oldPrice}
                                        currentPrice={listInfo[1].currentPrice}
                                        webOffer={listInfo[1].webOffer}
                                        classes={secondaryClasses}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 pb-lg-2 mb-4 mb-lg-0">
                                    <GameStandardWrapper
                                        gameImage={listInfo[2].gameImage}
                                        title={listInfo[2].title}
                                        discount={listInfo[2].discount}
                                        oldPrice={listInfo[2].oldPrice}
                                        currentPrice={listInfo[2].currentPrice}
                                        webOffer={listInfo[2].webOffer}
                                        classes={secondaryClasses}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 pt-lg-2 mb-4 mb-lg-0">
                                    <GameStandardWrapper
                                        gameImage={listInfo[3].gameImage}
                                        title={listInfo[3].title}
                                        discount={listInfo[3].discount}
                                        oldPrice={listInfo[3].oldPrice}
                                        currentPrice={listInfo[3].currentPrice}
                                        webOffer={listInfo[3].webOffer}
                                        classes={secondaryClasses}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 pt-lg-2 mb-4 mb-lg-0">
                                    <GameStandardWrapper
                                        gameImage={listInfo[4].gameImage}
                                        title={listInfo[4].title}
                                        discount={listInfo[4].discount}
                                        oldPrice={listInfo[4].oldPrice}
                                        currentPrice={listInfo[4].currentPrice}
                                        webOffer={listInfo[4].webOffer}
                                        classes={secondaryClasses}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row d-flex g-4">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <GameStandardWrapper
                                gameImage={listInfo[5].gameImage}
                                title={listInfo[5].title}
                                discount={listInfo[5].discount}
                                oldPrice={listInfo[5].oldPrice}
                                currentPrice={listInfo[5].currentPrice}
                                webOffer={listInfo[5].webOffer}
                                classes={mainClasses}
                            />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <GameStandardWrapper
                                gameImage={listInfo[6].gameImage}
                                title={listInfo[6].title}
                                discount={listInfo[6].discount}
                                oldPrice={listInfo[6].oldPrice}
                                currentPrice={listInfo[6].currentPrice}
                                webOffer={listInfo[6].webOffer}
                                classes={mainClasses}
                            />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <GameStandardWrapper
                                gameImage={listInfo[7].gameImage}
                                title={listInfo[7].title}
                                discount={listInfo[7].discount}
                                oldPrice={listInfo[7].oldPrice}
                                currentPrice={listInfo[7].currentPrice}
                                webOffer={listInfo[7].webOffer}
                                classes={mainClasses}
                            />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <GameStandardWrapper
                                gameImage={listInfo[8].gameImage}
                                title={listInfo[8].title}
                                discount={listInfo[8].discount}
                                oldPrice={listInfo[8].oldPrice}
                                currentPrice={listInfo[8].currentPrice}
                                webOffer={listInfo[8].webOffer}
                                classes={mainClasses}
                            />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <GameStandardWrapper
                                gameImage={listInfo[9].gameImage}
                                title={listInfo[9].title}
                                discount={listInfo[9].discount}
                                oldPrice={listInfo[9].oldPrice}
                                currentPrice={listInfo[9].currentPrice}
                                webOffer={listInfo[9].webOffer}
                                classes={mainClasses}
                            />
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <GameStandardWrapper
                                gameImage={listInfo[10].gameImage}
                                title={listInfo[10].title}
                                discount={listInfo[10].discount}
                                oldPrice={listInfo[10].oldPrice}
                                currentPrice={listInfo[10].currentPrice}
                                webOffer={listInfo[10].webOffer}
                                classes={mainClasses}
                            />
                        </div>
                    </div>
                </div>

                {/* Ver más ofertas Botón */}
                <div className={styles["button-container"]}>
                    <button>
                        Ver más ofertas
                    </button>
                </div>
            </section>
        </>
    } catch (error) {
        console.error(`Se ha producido un error al intentar cargar los juegos y las ofertas ${error}`)
        return <section className={styles["most-popular-offer-container"]}>
            <ErrorGameStandard />
        </section>
    }
};

export default MostPopularOffer;