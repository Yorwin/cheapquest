import React from "react";
import styles from "@/styles/layout/homepage/main-offer-header.module.scss"
import Image from "next/image";
import Link from "next/link";
import { Currency } from "@/types/types";
import { getMostPopularGame } from "@/utils/getGamesInfo";
import currencyRateCalculator from "@/utils/convertCurrency";
import ErrorGameStandard from "@/components/general/error-loading-offers-fallback-container";

const MainOffer = async () => {
    try {
        const getGame = await getMostPopularGame();

        if (!getGame || Array.isArray(getGame) || !getGame.name || !getGame.deal) {
            throw new Error("Datos del juego inválidos o incompletos");
        }

        console.log(getGame);

        const convertPrice = await currencyRateCalculator(Currency.Dollars, Currency.Euros, Number(getGame.deal.salePrice));
        const resultPrice = (convertPrice).toFixed(2);

        const offerInfo = {
            gameName: getGame.name,
            gameImage: getGame.backgroundImage,
            discount: Math.floor(parseFloat(getGame.deal.savings)) + '%',
            currentPrice: resultPrice + "€",
        }

        return (
            <>
                <article className={styles["main-offer-container"]}>
                    <Link href={`/game-page/${getGame.name}`} className={styles["click-overlay"]} aria-label={`Ver ${getGame.name}`} />
                    <Image
                        src={offerInfo.gameImage}
                        alt="Mejor oferta y más popular del momento"
                        className={styles["main-header-image"]}
                        width={1920}
                        height={1080}
                        sizes="100vw"
                        priority
                    />
                    <div className={styles["overlay"]}></div>
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
    } catch (error) {
        console.error("Error al intentar cargar la MainOffer");
        return <>
            <section className={styles["new-offers-main-container"]}>
                <ErrorGameStandard />
            </section>
        </>
    }
}

export default MainOffer;