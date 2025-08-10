import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import styles from "@/styles/layout/homepage/most-popular-offer.module.scss"

interface GameStandardContainer {
    gameImage: StaticImageData,
    title: string,
    platform: StaticImageData,
    discount: string,
    oldPrice: string,
    currentPrice: string,
    webOffer: StaticImageData | string,
    classes: Classes,
}

interface Classes {
    [name: string]: string,
}

const GameStandardContainer = ({ gameImage, title, platform, discount, oldPrice, currentPrice, webOffer, classes }: GameStandardContainer) => {
    return (
        <article className={styles[classes.mainGameCard]}>
            <Link href="/producto/black-ops-6" className={styles["click-overlay"]} aria-label="Ver Black Ops 6" />
            <div className={styles["gameimage-container"]}>
                <Image
                    src={gameImage}
                    sizes="50vw"
                    alt="Imágen de juego"
                    fill
                    style={{ objectFit: 'cover' }}
                />
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
                    <h4 className={styles[classes.gameTitle]}>{title}</h4>
                </div>
                <div className={styles[classes.priceOfferOriginContainer]}>
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
                            sizes="50vw"
                            alt="Plataforma de juego"
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>
        </article>
    )
};

export default GameStandardContainer;