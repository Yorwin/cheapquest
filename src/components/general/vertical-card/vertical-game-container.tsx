import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/layout/homepage/vertical-offers.module.module.scss"
import { VerticalCardContainerType } from "@/types/types";

const VerticalGameCard = ({ platform, oldPrice, discount, title, currentPrice, webOffer, children }: VerticalCardContainerType) => {
    return (
        <div className={styles["vertical-card-container"]}>
            <Link href="/game-page/black-ops-6" className={styles["click-overlay"]} aria-label="Ver Black Ops 6" />
            <div className={styles["image-container"]}>
                {children}
                <div className={styles["platform-discount-container"]}>
                    <i className={platform}></i>
                    <span className={styles["discount"]}>{discount}</span>
                </div>
            </div>
            <div className={styles["info-container"]}>
                <h3 className={styles["game-title"]} title={title}>{title}</h3>
                <div className={styles["divisor-line-container"]}>
                    <div className={styles["divisor-line"]}></div>
                </div>
                <div className={styles["price-and-platform-container"]}>
                    <div className={styles["prices-container"]}>
                        <span className={styles["current-price"]}>{currentPrice}</span>
                        <span className={styles["regular-price"]}>{oldPrice}</span>
                    </div>
                    <div className={styles["web-offer"]}>
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
        </div>
    )
};

export default VerticalGameCard;