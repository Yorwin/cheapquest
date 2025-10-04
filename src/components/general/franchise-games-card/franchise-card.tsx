import React from "react";
import styles from "@/styles/components/franchise-card.module.scss"
import Image from "next/image";
import { StaticImageData } from "next/image";
import { createGameSlug } from "@/functions/functions";
import Link from "next/link";

interface FranchiseCardProps {
    gameTitle: string;
    releaseDate: string;
    currentPrice: string | null;
    discount: string | null;
    link: string;
    headerImage: string;
    webOffer: StaticImageData | string;
    hasOffer: boolean;
}

const FranchiseCard = ({
    gameTitle,
    releaseDate,
    currentPrice,
    discount,
    link,
    headerImage,
    webOffer,
    hasOffer
}: FranchiseCardProps) => {

    const linkToBeSet = createGameSlug(link);

    return (
        <div className={`${styles["franchise-card-container"]} mb-lg-3 mb-md-2 mb-sm-3`}>
            <div className={styles["franchise-card"]}>
                <div className={styles["image-container"]}>
                    <Link href={`/game-page/${linkToBeSet}`} className={styles["click-overlay"]} aria-label={`Ver ${gameTitle}`} ></Link>
                    <Image
                        className={`${styles["game-image"]} ${!hasOffer ? styles['no-offer-image'] : ''}`}
                        src={headerImage}
                        alt="Franchise Game Image"
                        sizes="40vw"
                        fill
                    />
                </div>
                <div className={`${styles["discount-and-store-container"]} ${!hasOffer ? styles['no-offer-badge'] : ''}`}>
                    {hasOffer ? (
                        <>
                            <span className={styles["discount"]}>{discount}</span>
                            {webOffer && (
                                <Image
                                    className={styles["store"]}
                                    src={webOffer}
                                    alt="Store Logo"
                                    width={30}
                                    height={30}
                                />
                            )}
                        </>
                    ) : (
                        <span className={styles['no-offer-text']}>Sin ofertas</span>
                    )}
                </div>
            </div>
            <div className={styles["game-info"]}>
                <div className={styles["info"]}>
                    <h3>{gameTitle}</h3>
                    <time className={styles["released-time"]} dateTime="2025-09-03T12:00:00Z">
                        Fecha de lanzamiento: {releaseDate}
                    </time>
                </div>
                {hasOffer && currentPrice && (
                    <div className={styles["price"]}>
                        <span className={styles["current-price"]}>{currentPrice}</span>
                    </div>
                )}
            </div>
        </div>
    )
};

export default FranchiseCard;