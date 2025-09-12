import React from "react";
import styles from "@/styles/layout/homepage/vertical-offers.module.module.scss"
import { getAgedLikeWineGames } from "@/utils/getOffers";
import searchForStore from "@/utils/seachForStore";
import { storeLogos } from "@/resources/stores_icons";
import { GameDealWithoutScore, StoreLogo } from "@/types/types";
import currencyRateCalculator from "@/utils/convertCurrency";
import { Currency } from "@/types/types";
import { getGameInfo } from "@/utils/getGamesInfo";
import ErrorGameStandard, { inCaseOfError } from "@/components/general/error-loading-offers-fallback-container";
import ContentDistributionManager from "./content-distribution-manager";

const AgedLikeWine = async () => {
    try {
        const listOfStores = await searchForStore();
        const AgedLikeWineGames = await getAgedLikeWineGames();

        if (!AgedLikeWineGames) {
            throw new Error("Error al intentar obtener ofertas de juegos antiguos");
        }

        const platforms = {
            PC: "bi bi-display",
            Xbox: "bi bi-xbox",
            PlayStation: "bi bi-playstation",
        }

        const agedLikeWine = [];

        for (let i = 0; i <= AgedLikeWineGames.length - 1; i++) {

            const game = AgedLikeWineGames[i];
            if (!game) throw new Error("Juego no encontrado en la lista");

            const getInfo = await getGameInfo(AgedLikeWineGames[i].title);

            const gameTitle = AgedLikeWineGames[i].title;
            const gameImage = getInfo.results[0].background_image;
            const discount = AgedLikeWineGames[i].savings;
            const price: number = Number(AgedLikeWineGames[i].salePrice);
            const regularPrice: number = AgedLikeWineGames[i].normalPrice;

            const convertRegularPrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, regularPrice);
            const resultRegularPrice = (convertRegularPrice).toFixed(2);

            const convertSalePrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, price);
            const resultPrice = (convertSalePrice).toFixed(2);

            const store = listOfStores.find((e: GameDealWithoutScore) => e.storeID === AgedLikeWineGames[i].storeID);
            const storeImage = storeLogos.find((e: StoreLogo) => e.name === store.storeName);
            const inCaseOfErrorImage = listOfStores[Number(inCaseOfError[0].storeID)];

            agedLikeWine.push({
                gameImage: gameImage,
                title: gameTitle,
                oldPrice: `${resultRegularPrice}€`,
                currentPrice: `${resultPrice}€`,
                discount: `${Number(discount).toFixed(0)}%`,
                platform: platforms.PC,
                webOffer: storeImage ? storeImage.image : inCaseOfErrorImage,
            })
        }

        return <>
            <section className={styles["aged-like-wine-offers-main-container"]}>
                <h1 className={styles["title"]}>ENVEJECIDOS COMO EL VINO...</h1>
                <ContentDistributionManager gameInfo={agedLikeWine} />
            </section>
        </>

    } catch (error) {
        console.error(`Se ha producido un error al intentar cargar los juegos y las ofertas ${error}`);
        return <section className={styles["aged-like-wine-offers-main-container"]}>
            <ErrorGameStandard />
        </section>

    }
};

export default AgedLikeWine;