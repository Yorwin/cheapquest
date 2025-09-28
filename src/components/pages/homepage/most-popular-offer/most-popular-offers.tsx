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
import ContentDistributionManager from "./content-distribution-manager";
import NoImageFound from "@/resources/no-image-found/no-image-found.webp";

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

            const convertSalePrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, Number(Offers[i].salePrice));
            const resultSalePrice = (convertSalePrice).toFixed(2);

            const convertRegularPrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, Number(Offers[i].normalPrice));
            const resultRegularPrice = (convertRegularPrice).toFixed(2);

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

                {/* Ofertas */}
                <ContentDistributionManager gameInfo={listInfo} />

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