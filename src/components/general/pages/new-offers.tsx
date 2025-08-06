import React from "react";
import styles from "@/styles/layout/homepage/vertical-offers.module.module.scss"
import { storeLogos } from "@/resources/stores_icons"
import { getNewDeals } from "@/utils/getOffers";
import getGameInfo from "@/utils/getGamesInfo";
import searchForStore from "@/utils/seachForStore";
import currencyRateCalculator from "@/utils/convertCurrency";
import { Currency } from "@/types/types";
import VerticalGameCard from "../vertical-game-container";

const NewOffers = async () => {

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
            offerImage: result.background_image,
            gameTitle: result.name,
            oldPrice: `${resultRegularPrice}€`,
            currentPrice: `${resultPrice}€`,
            discountPercentage: `${Number(newDeals[i].savings).toFixed(0)}%`,
            platform: platforms.PC,
            page: storeImage ? storeImage.image : store.images.icon,
        })

    }

    const newOffersContainerFirstRow = newOffers.slice(0, 5).map((e, index) => {
        return (
            <VerticalGameCard
                key={index}
                gameImage={e.offerImage}
                oldPrice={e.oldPrice}
                platform={e.platform}
                discount={e.discountPercentage}
                title={e.gameTitle}
                currentPrice={e.currentPrice}
                webOffer={e.page}
            />
        )
    });

    const newOffersContainerSecondRow = newOffers.slice(5, 10).map((e, index) => {
        return (
            <VerticalGameCard
                key={index}
                gameImage={e.offerImage}
                oldPrice={e.oldPrice}
                platform={e.platform}
                discount={e.discountPercentage}
                title={e.gameTitle}
                currentPrice={e.currentPrice}
                webOffer={e.page}
            />
        )
    });

    return <>
        <section className={styles["new-offers-main-container"]}>
            <h1 className={styles["title"]}>NUEVAS OFERTAS</h1>
            <div className={styles["container-fluid"]}>
                <div className="row row-cols-5 g-3 mb-4">
                    {newOffersContainerFirstRow}
                </div>

                <div className="row row-cols-5 g-3 mb-4">
                    {newOffersContainerSecondRow}
                </div>
            </div>
        </section>
    </>
};

export default NewOffers;