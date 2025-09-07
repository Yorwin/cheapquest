import React from "react";
import styles from "@/styles/layout/homepage/vertical-offers.module.module.scss"
import { storeLogos } from "@/resources/stores_icons"
import { getNewDeals } from "@/utils/getOffers";
import { getGameInfo } from "@/utils/getGamesInfo";
import searchForStore from "@/utils/seachForStore";
import currencyRateCalculator from "@/utils/convertCurrency";
import { Currency } from "@/types/types";
import ErrorGameStandard from "@/components/general/error-loading-offers-fallback-container";
import ContentDistributionManager from "./content-distribution-manager";

const NewOffers = async () => {
    try {
        const newDeals = await getNewDeals();
        const listOfStores = await searchForStore();

        const platforms = {
            PC: "bi bi-display",
            Xbox: "bi bi-xbox",
            PlayStation: "bi bi-playstation",
        }

        const newOffers = [];

        for (let i = 0; i < newDeals.length; i++) {

            const store = listOfStores.find((e: any) => e.storeID === newDeals[i].storeID);
            const storeImage = storeLogos.find((e: any) => e.name === store.storeName);

            const gameInfo = await getGameInfo(newDeals[i].title);
            const result = gameInfo.results[0];

            const convertSalePrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, Number(newDeals[i].salePrice));
            const resultPrice = (convertSalePrice).toFixed(2);

            const convertRegularPrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, Number(newDeals[i].normalPrice));
            const resultRegularPrice = (convertRegularPrice).toFixed(2);

            newOffers.push({
                gameImage: result.background_image,
                title: newDeals[i].title,
                oldPrice: `${resultRegularPrice}€`,
                currentPrice: `${resultPrice}€`,
                discount: `${Number(newDeals[i].savings).toFixed(0)}%`,
                platform: platforms.PC,
                webOffer: storeImage ? storeImage.image : store.images.icon,
            })

        }

        return <>
            <section className={styles["new-offers-main-container"]}>
                <h1 className={styles["title"]}>NUEVAS OFERTAS</h1>
                <ContentDistributionManager gameInfo={newOffers} />
            </section>
        </>
    } catch (error) {
        console.error(`Se ha producido un error al intentar cargar los juegos y las ofertas ${error}`);
        return <section className={styles["new-offers-main-container"]}>
            <ErrorGameStandard />
        </section>
    }
};

export default NewOffers;