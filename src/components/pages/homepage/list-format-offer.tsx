import React from "react";
import styles from "@/styles/layout/homepage/list-format-offers.module.scss"
import Image from "@/resources/offer-img/image.jpg"
import ListFormatContainer from "../../list-format-offer-container";
import { offersByPercentage, historicLows } from "@/utils/getOffers";
import ErrorGameStandard from "@/components/error-loading-offers-fallback-container";

const ListFormatOffers = async () => {
    try {
        const offers = await offersByPercentage();

        const bestOffersByPercentage = offers.map(offer => {
            if (offer) {
                return {
                    offerImage: offer.background_image,
                    gameTitle: offer.title,
                    gameDescription: "Example Game",
                    oldPrice: `${offer.normalPrice}€`,
                    currentPrice: `${offer.salePrice}€`,
                    discountPercentage: `${Number(offer.savings).toFixed(0)}%`
                };
            } else {
                return {
                    offerImage: Image,
                    gameTitle: "Example Game",
                    gameDescription: "Example Game",
                    oldPrice: `10,99€`,
                    currentPrice: `10,99€`,
                    discountPercentage: `45%`
                };
            }
        })

        const historical = await historicLows();

        const historicalLows = historical.map((e) => {
            if (e) {
                return {
                    offerImage: e.background_image,
                    gameTitle: e.title,
                    gameDescription: "Example Game",
                    oldPrice: `${e.bestDeal.retailPrice}€`,
                    currentPrice: `${e.bestDeal.price}€`,
                    discountPercentage: `${Number(e.bestDeal.savings).toFixed(0)}%`
                }
            } else {
                return {
                    offerImage: Image,
                    gameTitle: "Example Game",
                    gameDescription: "Example Game",
                    oldPrice: `10,99€`,
                    currentPrice: `10,99€`,
                    discountPercentage: `45%`
                }
            }
        });

        const bestOffersByPercentageContainer = bestOffersByPercentage.map((e, index) => {
            return (
                <ListFormatContainer
                    key={index}
                    index={index}
                    link="#"
                    offerImage={e.offerImage}
                    gameTitle={e.gameTitle}
                    oldPrice={e.oldPrice}
                    currentPrice={e.currentPrice}
                    discountPercentage={e.discountPercentage}
                />
            );
        });

        const historicalLowsContainer = historicalLows.map((e, index) => {
            return (
                <ListFormatContainer
                    key={index}
                    index={index}
                    link="#"
                    offerImage={e.offerImage}
                    gameTitle={e.gameTitle}
                    oldPrice={e.oldPrice}
                    currentPrice={e.currentPrice}
                    discountPercentage={e.discountPercentage}
                />
            );
        });

        return <>
            <section className={styles["list-format-offers-container"]}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <h1 className={styles["title"]}>MEJORES OFERTAS POR %</h1>
                            <article className={styles["list-offer-format-container"]}>
                                {bestOffersByPercentageContainer}
                            </article>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <h1 className={styles["title"]}>BAJOS HISTORICOS</h1>
                            <article className={styles["list-offer-format-container"]}>
                                {historicalLowsContainer}
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </>
    } catch (error) {
        console.error(`Se ha producido un error al intentar cargar los juegos y las ofertas ${error}`);
        return <>
            <section className={styles["list-format-offers-container"]}>
                <ErrorGameStandard />
            </section>
        </>
    }
}

export default ListFormatOffers;