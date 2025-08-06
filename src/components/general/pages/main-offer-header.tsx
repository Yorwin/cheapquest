import React from "react";
import styles from "@/styles/layout/homepage/main-offer-header.module.scss"
import Image from "next/image";
import Link from "next/link";
import { Currency } from "@/types/types";
import { getMostPopularGame } from "@/utils/getGamesInfo";
import { getMostPopularGameOffer } from "@/utils/getOffers";
import currencyRateCalculator from "@/utils/convertCurrency";

const MainOffer = async () => {

    const getGame = await getMostPopularGame(); 
    const getOffer = await getMostPopularGameOffer(getGame.game);

    const bestDeal = getOffer.deals.reduce((best: any, current: any) => {
        return parseFloat(current.price) < parseFloat(best.price) ? current : best;
    });

    const convertPrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, bestDeal.price);
    const resultPrice = (convertPrice).toFixed(2);

    const offerInfo = {
        gameName: getOffer.info.title,
        gameImage: getGame.backgroundImage,
        discount: Math.floor(parseFloat(bestDeal.savings)) + '%',
        currentPrice: resultPrice + "€",
    }

    return (
        <>
            <article className={styles["main-offer-container"]}>
                <Link href="/producto/black-ops-6" className={styles["click-overlay"]} aria-label="Ver Black Ops 6" />
                <Image
                    src={offerInfo.gameImage}
                    alt="Mejor oferta y más popular del momento"
                    className={styles["main-header-image"]}
                    width={1920}
                    height={1080}
                    style={{ width: "100%", height: "100%" }}
                />
                <section className={styles["offer"]}>
                    <h1 className={styles["offer-title"]}>{offerInfo.gameName}</h1>
                    <div className={styles["price-container"]}>
                        <span className={styles["discount"]}>{offerInfo.discount}</span>
                        <span className={styles["current-price"]}>{offerInfo.currentPrice}</span>
                    </div>
                </section>
            </article>
        </>
    )
}

export default MainOffer;