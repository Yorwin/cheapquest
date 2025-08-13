import React from "react";
import { GameStandardContainerType } from "@/types/types";
import Image from "next/image";
import styles from "@/styles/layout/homepage/most-popular-offer.module.scss"

interface RestOfOffersProps {
    groupedCategories: GameStandardContainerType[][];
}

const justifyClasses = [
    "justify-content-start",
    "justify-content-center",
    "justify-content-end",
];

const RestOfOffers = ({ groupedCategories } : RestOfOffersProps) => {
    return groupedCategories.map((group: any) => {
        return group.map((e: any, index: number) => {
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
};

export default RestOfOffers;
