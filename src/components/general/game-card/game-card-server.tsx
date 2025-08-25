import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/layout/homepage/most-popular-offer.module.scss"
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

const GameStandardContainer = ({ title, platform, discount, oldPrice, currentPrice, webOffer, classes = defaultClasses, children }: GameStandardControllerType) => {
    return <article className={styles[classes.mainGameCard]}>
        <Link href="/producto/black-ops-6" className={styles["click-overlay"]} aria-label="Ver Black Ops 6" />
        <div className={styles["gameimage-container"]}>
            {children}
        </div>
        <div className={styles["gameinfo-container"]}>
            <div className={styles["platform"]}>
                <div className={styles[classes.iconContainer]}>
                    <Image
                        src={platform}
                        sizes="50vw"
                        alt="Plataforma de juego"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <h3 className={styles[classes.gameTitle]} title={title}>{title}</h3>
            </div>
            <div className={styles[classes.priceOfferOriginContainer]}>
                <div className={styles["content-container"]}>
                    <div className={styles["offer-container"]}>
                        <span className={styles[classes.discount]}>{discount}</span>
                        <div className={styles[classes.prices]}>
                            <span className={styles[classes.lastPrice]}>{oldPrice}</span>
                            <span className={styles[classes.currentPrice]}>{currentPrice}</span>
                        </div>
                    </div>
                    <div className={styles[classes.webOffer]}>
                        <Image
                            src={webOffer}
                            sizes="25vw"
                            alt="Plataforma de juego"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </article>
};

export default GameStandardContainer;