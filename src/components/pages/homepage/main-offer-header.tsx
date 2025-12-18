import styles from "@/styles/layout/homepage/main-offer-header.module.scss"
import Link from "next/link";
import { getMostPopularGame } from "@/utils/getGamesInfo";
import { getCurrency, formatPrice } from "@/lib/currencies";
import ErrorGameStandard from "@/components/general/error-loading-offers-fallback-container";
import { createGameSlug } from "@/functions/functions";
import MainOfferImage from "@/components/general/main-offer-image";

const MainOffer = async () => {
    try {
        const getGame = await getMostPopularGame();
        const currency = await getCurrency();

        if (!getGame || Array.isArray(getGame) || !getGame.name || !getGame.deal) {
            throw new Error("Datos del juego inválidos o incompletos");
        }

        const offerInfo = {
            gameName: getGame.name,
            gameImage: getGame.backgroundImage,
            discount: Math.floor(parseFloat(getGame.deal.savings)) + '%',
            currentPrice: formatPrice(Number(getGame.deal.salePrice), currency),
            link: createGameSlug(getGame.name),
        }

        return (
            <>
                <article id="main-offer" className={styles["main-offer-container"]}>
                    <Link href={`/game-page/${offerInfo.link}`} className={styles["click-overlay"]} aria-label={`Ver ${getGame.name}`} />
                    <MainOfferImage gameImage={offerInfo.gameImage} />
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