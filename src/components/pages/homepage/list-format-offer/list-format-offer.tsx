import React from "react";
import styles from "@/styles/layout/homepage/list-format-offers.module.scss"
import Image from "@/resources/offer-img/image.jpg"
import { offersByPercentage, historicalLows } from "@/utils/getOffers";
import ErrorGameStandard from "@/components/general/error-loading-offers-fallback-container";
import ContentDistributionManager from "./content-distribution-manager";
import NoImageFound from "@/resources/no-image-found/no-image-found.webp";

const ListFormatOffers = async () => {
    try {
        const offers = await offersByPercentage();

        const bestOffersByPercentage = offers.map(offer => {
            if (offer) {
                return {
                    offerImage: offer.background_image !== null ? offer.background_image : NoImageFound.src,
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

        const historical = await historicalLows();

        const historicalLowsOffers = historical.map((offer) => {
            if (offer) {
                return {
                    offerImage: offer.background_image !== null ? offer.background_image : NoImageFound.src,
                    gameTitle: offer.title,
                    gameDescription: "Example Game",
                    oldPrice: `${offer.bestDeal.retailPrice}€`,
                    currentPrice: `${offer.bestDeal.price}€`,
                    discountPercentage: `${Number(offer.bestDeal.savings).toFixed(0)}%`
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

        return <>
            <section id="historical-and-percentage-offers" className={styles["list-format-offers-container"]}>
                <ContentDistributionManager offersByPercentage={bestOffersByPercentage} historicLowsOffers={historicalLowsOffers}></ContentDistributionManager>
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