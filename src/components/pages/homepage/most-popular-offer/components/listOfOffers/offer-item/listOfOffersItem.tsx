import React from "react";
import styles from "@/styles/layout/homepage/most-popular-offer.module.scss"
import Image from "next/image";
import { GameStandardControllerType } from "@/types/types";

const defaultClasses = {
    mainGameCard: "default-main-game-card",
    iconContainer: "default-icon-container",
    priceOfferOriginContainer: "default-price-offerorigin-container",
    offerContainer: "default-offer-container",
    discount: "default-discount",
    prices: "default-prices",
    lastPrice: "default-last-price",
    currentPrice: "default-current-price",
    webOffer: "default-web-offer",
    gameTitle: "default-game-title",
};

const OfferContainer = ({ gameImage, title, platform, discount, oldPrice, currentPrice, webOffer, children }: GameStandardControllerType) => {
    return <article className={styles["rest-of-the-offers-container"]}>
        <div className={styles["gameimage-container"]}>
            
            {children}

            {/* <Image
                src={gameImage}
                sizes="50vw"
                alt="Imágen de juego"
                fill
                style={{ objectFit: 'cover' }}
            />*/}
        </div>
        <div className={styles["gameinfo-container"]}>
            <div className={styles["platform"]}>
                <div className={styles["secondary-icon-container"]}>
                    <Image
                        src={platform}
                        sizes="50vw"
                        alt="Plataforma de juego"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <h4 className={styles["list-info-container-title"]}>{title}</h4>
            </div>
            <div className={styles["secondary-price-offerorigin-container"]}>
                <div className={styles["offer-container"]}>
                    <span className={styles["secondary-discount"]}>{discount}</span>
                    <div className={styles["secondary-prices"]}>
                        <span className={styles["secondary-last-price"]}>{oldPrice}</span>
                        <span className={styles["secondary-current-price"]}>{currentPrice}</span>
                    </div>
                </div>
                <div className={styles["secondary-web-offer"]}>
                    <Image
                        src={webOffer}
                        sizes="50vw"
                        alt="Plataforma de juego"
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
        </div>
    </article>
};

export default OfferContainer;