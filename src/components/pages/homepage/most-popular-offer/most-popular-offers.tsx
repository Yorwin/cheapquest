import React from "react";
import styles from "@/styles/layout/homepage/most-popular-offer.module.scss"
import Monitor from "@/resources/platforms/pc.svg"
import { storeLogos } from "@/resources/stores_icons"
import { getMostPopularOffers } from "@/utils/getOffers";
import searchForStore from "@/utils/seachForStore";
import { getGameInfo } from "@/utils/getGamesInfo";
import currencyRateCalculator from "@/utils/convertCurrency";
import { Currency, GameDeal } from "@/types/types";
import ErrorGameStandard from "@/components/general/error-loading-offers-fallback-container";
import ContentDistributionManager from "./content-distribution-manager";

/* Offers */
import MainOffer from "./components/mainOffer";
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


const MostPopularOffer = async () => {
    try {
        const Offers: GameDeal[] = await getMostPopularOffers();
        const listOfStores = await searchForStore();
        let maxIndex: number = 10;

        const listInfo = [];

        for (let i = 0; i <= maxIndex; i++) {

            const store = listOfStores.find((e: any) => e.storeID === Offers[i].storeID);
            const storeImage = storeLogos.find((e: any) => e.name === store.storeName);

            const getGame = await getGameInfo(Offers[i].title);

            const convertSalePrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, Number(Offers[i].salePrice));
            const resultSalePrice = (convertSalePrice).toFixed(2);

            const convertRegularPrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, Number(Offers[i].normalPrice));
            const resultRegularPrice = (convertRegularPrice).toFixed(2);

            const gameImage = getGame.results[0].background_image;

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

        const mainOffer = listInfo.slice(0, 1);
        const firstCouple = listInfo.slice(1, 3);
        const secondCouple = listInfo.slice(3, 5);

        const slicedROL = listInfo.slice(5);

        const groupedGames = [];

        for (let i = 0; i < slicedROL.length; i += 3) {
            groupedGames.push(slicedROL.slice(i, i + 3));
        }

        const Prueba = <ContentDistributionManager gameInfo={listInfo} />

        return <>

            {Prueba}
            {/* <section className={styles["most-popular-offer-container"]}>
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
                            <RestOfOffers groupedCategories={groupedGames} />
                        </div>
                    </section>

                    Ver más ofertas Botón 

            <div className={styles["button-container"]}>
                <button>
                    Ver más ofertas
                </button>
            </div>
        </div >
            </section > */}
        </>
    } catch (error) {
        console.error(`Se ha producido un error al intentar cargar los juegos y las ofertas ${error}`)
        return <section className={styles["most-popular-offer-container"]}>
            <ErrorGameStandard />
        </section>
    }
};

export default MostPopularOffer;