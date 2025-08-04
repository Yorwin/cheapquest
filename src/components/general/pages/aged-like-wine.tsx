import React from "react";
import styles from "@/styles/layout/homepage/vertical-offers.module.module.scss"
import Image from "next/image";
import offerImage from "@/resources/offer-img/image.jpg"
import { searchOffers } from "@/utils/getMostPopularOffers";
import { getAgedLikeWineGames } from "@/utils/getMostPopularGame";
import searchForStore from "@/utils/seachForStore";
import { filterUniqueGames } from "@/functions/functions";
import { storeLogos } from "@/resources/stores_icons";
import NoData from "@/resources/no-data-found/error-404.jpg"
import { GameDealWithoutScore, StoreLogo } from "@/types/types";
import currencyRateCalculator from "@/utils/convertCurrency";
import { Currency } from "@/types/types";

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

    const filteredAgedLikeWineGames = filterUniqueGames(AgedLikeWineGames).slice(0, 10);

    const platforms = {
        PC: "bi bi-display",
        Xbox: "bi bi-xbox",
        PlayStation: "bi bi-playstation",
    }

    const agedLikeWine = [];

    for (let i = 0; i <= filteredAgedLikeWineGames.length; i++) {

        const selectedElement = filteredAgedLikeWineGames[i] ? filteredAgedLikeWineGames[i].name : "";
        const search = filteredAgedLikeWineGames[i] ? await searchOffers(selectedElement) : inCaseOfError;

        const bestDeal = search.reduce((best: GameDealWithoutScore, current: GameDealWithoutScore) => {
            const bestSavings = parseFloat(best.savings);
            const currentSavings = parseFloat(current.savings);

            return currentSavings > bestSavings ? current : best;
        });

        const convertSalePrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, bestDeal.salePrice);
        const resultPrice = (convertSalePrice).toFixed(2);

        const store = listOfStores.find((e: GameDealWithoutScore) => e.storeID === bestDeal.storeID);
        const storeImage = storeLogos.find((e: StoreLogo) => e.name === store.storeName);

        agedLikeWine.push({
            offerImage: filteredAgedLikeWineGames[i] ? filteredAgedLikeWineGames[i].background_image : NoData,
            gameTitle: filteredAgedLikeWineGames[i] ? filteredAgedLikeWineGames[i].name : bestDeal.title,
            currentPrice: `${resultPrice}€`,
            discountPercentage: `${Number(bestDeal.savings).toFixed(0)}%`,
            platform: platforms.PC,
            page: storeImage ? storeImage.image : store.images.icon,
        })
    }

    const agedLikeWineFirstRow = agedLikeWine.slice(0, 5).map((e, index) => {
        return (
            <div className="col" key={index}>
                <div className={styles["vertical-card-container"]}>
                    <div className={styles["image-container"]}>
                        <Image
                            src={e.offerImage ? e.offerImage : offerImage}
                            alt="Plataforma de juego"
                            sizes="50vw"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <div className={styles["platform-discount-container"]}>
                            <i className={e.platform}></i>
                            <span className={styles["discount"]}>{e.discountPercentage}</span>
                        </div>
                    </div>
                    <div className={styles["info-container"]}>
                        <h3 className={styles["game-title"]}>{e.gameTitle}</h3>
                        <div className={styles["divisor-line-container"]}>
                            <div className={styles["divisor-line"]}></div>
                        </div>
                        <div className={styles["price-and-platform-container"]}>
                            <span className={styles["current-price"]}>{e.currentPrice}</span>

                            <div className={styles["web-offer"]}>
                                <Image
                                    src={e.page}
                                    sizes="50vw"
                                    alt="Plataforma de juego"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    const agedLikeWineSecondRow = agedLikeWine.slice(5, 10).map((e, index) => {
        return (
            <div className="col" key={index}>
                <div className={styles["vertical-card-container"]}>
                    <div className={styles["image-container"]}>
                        <Image
                            src={e.offerImage ? e.offerImage : offerImage}
                            sizes="50vw"
                            alt="Plataforma de juego"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <div className={styles["platform-discount-container"]}>
                            <i className={e.platform}></i>
                            <span className={styles["discount"]}>{e.discountPercentage}</span>
                        </div>
                    </div>
                    <div className={styles["info-container"]}>
                        <h3 className={styles["game-title"]}>{e.gameTitle}</h3>
                        <div className={styles["divisor-line-container"]}>
                            <div className={styles["divisor-line"]}></div>
                        </div>
                        <div className={styles["price-and-platform-container"]}>
                            <span className={styles["current-price"]}>{e.currentPrice}</span>

                            <div className={styles["web-offer"]}>
                                <Image
                                    src={e.page}
                                    sizes="50vw"
                                    alt="Plataforma de juego"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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