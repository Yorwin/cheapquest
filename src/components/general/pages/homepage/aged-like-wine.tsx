import React from "react";
import styles from "@/styles/layout/homepage/vertical-offers.module.module.scss"
import { getAgedLikeWineGames } from "@/utils/getOffers";
import searchForStore from "@/utils/seachForStore";
import { storeLogos } from "@/resources/stores_icons";
import { GameDealWithoutScore, StoreLogo } from "@/types/types";
import currencyRateCalculator from "@/utils/convertCurrency";
import { Currency } from "@/types/types";
import { getGameInfo } from "@/utils/getGamesInfo";
import VerticalGameCard from "../../vertical-game-container";

const inCaseOfError: GameDealWithoutScore[] = [{
    dealID: "error-deal-placeholder-id",
    dealRating: "0.0",
    gameID: "000000",
    internalName: "ERROR_GAME_NOT_FOUND",
    isOnSale: "0",
    lastChange: Date.now() / 1000,
    metacriticLink: "/game/error-placeholder/",
    metacriticScore: "0",
    normalPrice: "0.00",
    releaseDate: 0,
    salePrice: "0.00",
    savings: "0.000000",
    steamAppID: "0",
    steamRatingCount: "0",
    steamRatingPercent: "0",
    steamRatingText: "No Reviews",
    storeID: "1",
    thumb: "https://via.placeholder.com/120x45/666666/ffffff?text=No+Image",
    title: "Game Not Found - Error Placeholder"
}]

const AgedLikeWine = async () => {

    const listOfStores = await searchForStore();
    const AgedLikeWineGames = await getAgedLikeWineGames();

    const platforms = {
        PC: "bi bi-display",
        Xbox: "bi bi-xbox",
        PlayStation: "bi bi-playstation",
    }

    const agedLikeWine = [];

    for (let i = 0; i <= AgedLikeWineGames.length; i++) {

        const getInfo = await getGameInfo(AgedLikeWineGames[i] ? AgedLikeWineGames[i].title : "Resident Evil");

        const gameTitle = getInfo.results[0].name;
        const gameImage = getInfo.results[0].background_image;
        const discount = AgedLikeWineGames[i] ? AgedLikeWineGames[i].savings : inCaseOfError[0].savings;
        const price: number = AgedLikeWineGames[i] ? Number(AgedLikeWineGames[i].salePrice) : Number(inCaseOfError[0].salePrice);
        const regularPrice: number = AgedLikeWineGames[i] ? AgedLikeWineGames[i].normalPrice : Number(inCaseOfError[0].normalPrice);

        const convertRegularPrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, regularPrice);
        const resultRegularPrice = (convertRegularPrice).toFixed(2);

        const convertSalePrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, price);
        const resultPrice = (convertSalePrice).toFixed(2);

        const store = AgedLikeWineGames[i] ? listOfStores.find((e: GameDealWithoutScore) => e.storeID === AgedLikeWineGames[i].storeID) : inCaseOfError[0].storeID;
        const storeImage = storeLogos.find((e: StoreLogo) => e.name === store.storeName);
        const inCaseOfErrorImage = listOfStores[Number(inCaseOfError[0].storeID)];

        agedLikeWine.push({
            offerImage: gameImage,
            gameTitle: gameTitle,
            oldPrice: `${resultRegularPrice}€`,
            currentPrice: `${resultPrice}€`,
            discountPercentage: `${Number(discount).toFixed(0)}%`,
            platform: platforms.PC,
            page: storeImage ? storeImage.image : inCaseOfErrorImage,
        })
    }

    const agedLikeWineFirstRow = agedLikeWine.slice(0, 5).map((e, index) => {
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

    const agedLikeWineSecondRow = agedLikeWine.slice(5, 10).map((e, index) => {
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
        <section className={styles["aged-like-wine-offers-main-container"]}>
            <h1 className={styles["title"]}>ENVEJECIDOS COMO EL VINO...</h1>
            <div className={styles["container-fluid"]}>
                <div className="row row-cols-5 g-3 mb-4">
                    {agedLikeWineFirstRow}
                </div>
                <div className="row row-cols-5 g-3 mb-4">
                    {agedLikeWineSecondRow}
                </div>
            </div>
        </section>
    </>
};

export default AgedLikeWine;