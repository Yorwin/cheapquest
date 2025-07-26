import React from "react";
import styles from "@/styles/layout/homepage/list-format-offers.module.scss"
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Props {
    index: number,
    offerImage: StaticImageData,
    gameTitle: string,
    link : string,
    gameDescription: string,
    oldPrice: string,
    currentPrice: string,
    discountPercentage: string
}

const ListFormatContainer = ({ index, offerImage, gameTitle, link, gameDescription, oldPrice, currentPrice, discountPercentage }: Props) => {
    return <>
        <section className={styles["game-info-container"]}>
            <Link href={link} className={styles["enlace"]} />
            <div className={styles["offer-number-container"]}>
                <span className={styles["offer-number"]}>
                    {index + 1}
                </span>
            </div>
            <div className={styles["image-container"]}>
                <Image
                    src={offerImage}
                    alt="Plataforma de juego"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className={styles["details"]}>
                <div className={styles["game-title-and-extra-info"]}>
                    <h3>{gameTitle}</h3>
                    <p>{gameDescription}</p>
                </div>
                <div className={styles["prices"]}>
                    <div className={styles["prices-container"]}>
                        <del className={styles["old-price"]}>{oldPrice}</del>
                        <span className={styles["current-price"]}>{currentPrice}</span>
                    </div>
                    <div className={styles["discount-container"]}>
                        <span>{discountPercentage}</span>
                    </div>
                </div>
            </div>
        </section>
    </>
};

export default ListFormatContainer;