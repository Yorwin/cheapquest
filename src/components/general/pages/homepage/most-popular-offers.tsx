import React from "react";
import styles from "@/styles/layout/homepage/most-popular-offer.module.scss"
import Monitor from "@/resources/platforms/pc.svg"
import GameStandardContainer from "../../game-standard-container";
import Image from "next/image";
import { storeLogos } from "@/resources/stores_icons"
import { getMostPopularOffers } from "@/utils/getOffers";
import searchForStore from "@/utils/seachForStore";
import { getGameInfo } from "@/utils/getGamesInfo";
import currencyRateCalculator from "@/utils/convertCurrency";
import { Currency } from "@/types/types";

const MostPopularOffer = async () => {

    const Offers: any[] = await getMostPopularOffers();
    const listOfStores = await searchForStore();

    let maxIndex = 10;

    const listInfo = [];

    for (let i = 0; i <= maxIndex; i++) {

        const store = listOfStores.find((e: any) => e.storeID === Offers[i].storeID);
        const storeImage = storeLogos.find((e: any) => e.name === store.storeName);

        const getGame = await getGameInfo(Offers[i].title);

        const convertSalePrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, Offers[i].salePrice);
        const resultSalePrice = (convertSalePrice).toFixed(2);

        const convertRegularPrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, Offers[i].normalPrice);
        const resultRegularPrice = (convertRegularPrice).toFixed(2);

        const gameImage = getGame.results[0].background_image;

        listInfo.push({
            title: Offers[i].title,
            gameImage: gameImage,
            discount: `${Math.floor(Offers[i].savings)}%`,
            oldPrice: `${resultRegularPrice}€`,
            currentPrice: `${resultSalePrice}€`,
            webOffer: storeImage ? storeImage.image : store.images.icon,
            platform: Monitor,
        })
    }

    const mainOffer = listInfo.slice(0, 1);

    const mainOfferContainer = mainOffer.map((e, index) => (
        <GameStandardContainer
            key={index}
            title={e.title}
            gameImage={e.gameImage}
            platform={e.platform}
            discount={e.discount}
            oldPrice={e.oldPrice}
            currentPrice={e.currentPrice}
            webOffer={e.webOffer}
            classes={
                {
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
                }
            }
        />
    ));

    const firstCouple = listInfo.slice(1, 3);
    const secondCouple = listInfo.slice(3, 5);

    const secondaryOffersFirstContainer = firstCouple.map((e, index) => (
        <GameStandardContainer
            key={index}
            title={e.title}
            gameImage={e.gameImage}
            platform={e.platform}
            discount={e.discount}
            oldPrice={e.oldPrice}
            currentPrice={e.currentPrice}
            webOffer={e.webOffer}
            classes={
                {
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
                }
            }
        />
    ));

    const secondaryOffersSecondContainer = secondCouple.map((e, index) => (
        <GameStandardContainer
            key={index}
            title={e.title}
            gameImage={e.gameImage}
            platform={e.platform}
            discount={e.discount}
            oldPrice={e.oldPrice}
            currentPrice={e.currentPrice}
            webOffer={e.webOffer}
            classes={
                {
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
                }
            }
        />
    ));

    const justifyClasses = [
        "justify-content-start",
        "justify-content-center",
        "justify-content-end",
    ];

    const slicedROL = listInfo.slice(5);

    const groupedCategories = [];

    for (let i = 0; i < slicedROL.length; i += 3) {
        groupedCategories.push(slicedROL.slice(i, i + 3));
    }
    const listInfoContainer = groupedCategories.map((group) => {
        return group.map((e, index) => {
            return (
                <section className={`col-md-4 col-sm-12 p-0 mt-4 d-flex ${justifyClasses[index]}`} key={index}>
                    <article className={styles["rest-of-the-offers-container"]}>
                        <div className={styles["gameimage-container"]}>
                            <Image
                                src={e.gameImage}
                                sizes="50vw"
                                alt="Imágen de juego"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles["gameinfo-container"]}>
                            <div className={styles["platform"]}>
                                <div className={styles["secondary-icon-container"]}>
                                    <Image
                                        src={e.platform}
                                        sizes="50vw"
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <h4 className={styles["list-info-container-title"]}>{e.title}</h4>
                            </div>
                            <div className={styles["secondary-price-offerorigin-container"]}>
                                <div className={styles["offer-container"]}>
                                    <span className={styles["secondary-discount"]}>{e.discount}</span>
                                    <div className={styles["secondary-prices"]}>
                                        <span className={styles["secondary-last-price"]}>{e.oldPrice}</span>
                                        <span className={styles["secondary-current-price"]}>{e.currentPrice}</span>
                                    </div>
                                </div>
                                <div className={styles["secondary-web-offer"]}>
                                    <Image
                                        src={e.webOffer}
                                        sizes="50vw"
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            );
        });
    });



    return <>
        <section className={styles["most-popular-offer-container"]}>
            <h1 className={styles["title"]}>OFERTAS MÁS POPULARES</h1>
            <div className={styles["offers-container"]}>
                <div className={styles["first-row"]}>
                    {mainOfferContainer}

                    <div className={styles["pairs-container"]}>
                        <div className={styles["pair"]}>
                            {secondaryOffersFirstContainer}
                        </div>
                        <div className={styles["pair"]}>
                            {secondaryOffersSecondContainer}
                        </div>
                    </div>

                </div>

                <section className="container-fluid mb-5">
                    <div className="row">
                        {listInfoContainer}
                    </div>
                </section>

                {/* Ver más ofertas Botón */}

                <div className={styles["button-container"]}>
                    <button>
                        Ver más ofertas
                    </button>
                </div>
            </div>
        </section>
    </>
};

export default MostPopularOffer;