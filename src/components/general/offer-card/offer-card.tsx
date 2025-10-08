import React from "react";
import styles from "@/styles/components/offer-card.module.scss"
import { getGameOffers, getGameData, getGameId } from "@/utils/getGamesInfo";
import NoOffersFound from "@/resources/error-image/no-offer-found.svg";
import Image from "next/image";
import Link from "next/link";

const OfferCard = async ({ gameName }: { gameName: string }) => {

    const offers = await getGameOffers(gameName);
    const id = await getGameId(gameName);
    const gameData = id && await getGameData(id);

    let titleOffer;
    let gameTitle;
    let normalPrice;
    let discount;
    let currentPrice;
    let url;

    let storeImage;
    let storeName;

    if (offers) {
        /* Title */
        titleOffer = offers.bestOffer.gameTitle;

        /* Prices */
        discount = offers.bestOffer.discount;
        normalPrice = offers.bestOffer.normalPrice;
        currentPrice = offers.bestOffer.currentPrice;

        /* Stores */
        storeImage = offers.bestOffer.store ? offers.bestOffer.store?.image : null;
        storeName = offers.bestOffer.store ? offers.bestOffer.store?.name : null;

        /* Url */
        url = offers.bestOffer.url;
    }

    if (gameData) {
        gameTitle = gameData.title;
    }

    if (!offers?.bestOffer) return (
        <section className={styles["offer-card"]}>
            <h3> {gameTitle ? gameTitle : titleOffer}</h3>
            <div className={styles["no-offer-found"]}>
                <Image
                    src={NoOffersFound}
                    alt={`No offers found for ${gameTitle ? gameTitle : titleOffer}`}
                    sizes="20vw"
                    fill
                    className={styles["image"]}
                />
            </div>
            <h3>No tenemos ofertas disponibles</h3>
        </section>
    )

    if (offers.bestOffer) return (
        <section className={styles["offer-card"]}>
            <h3>{gameTitle ? gameTitle : titleOffer}</h3>
            <div className={styles["offer-info-container"]}>
                {(storeImage &&
                    <div className={styles["offer-info"]}>
                        <Image
                            src={storeImage}
                            alt={`Best offer for ${gameTitle ? gameTitle : titleOffer} provided by ${storeName}`}
                            sizes="20vw"
                            fill
                            className={styles["image"]}
                        />
                    </div>
                )}
            </div>
            <div className={styles["prices"]}>
                <div className={styles["old-discount-container"]}>
                    <span className={styles["old-price"]}>{normalPrice}</span>
                    <span className={styles["discount"]}>{discount}</span>
                </div>
                <span className={styles["current-price"]}>{currentPrice}</span>
            </div>
            <Link
                href={`${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["offer-button"]}
            >
                Ir a la oferta
            </Link>
        </section>
    )
};

export default OfferCard;