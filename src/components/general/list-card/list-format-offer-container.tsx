import React from "react";
import styles from "@/styles/layout/homepage/list-format-offers.module.scss"
import Link from "next/link";
import { listOffersWrapperProps } from "@/types/types";

const ListFormatContainer = ({ index, gameTitle, link, oldPrice, currentPrice, discountPercentage, children }: listOffersWrapperProps) => {
    return <>
        <section className={styles["game-info-container"]}>
            <Link href={link} className={styles["enlace"]} />
            <div className={styles["offer-number-container"]}>
                <span className={styles["offer-number"]}>
                    {index + 1}
                </span>
            </div>
            <div className={styles["image-container"]}>
                {children}
            </div>
            <div className={styles["details"]}>
                <div className={styles["game-title-and-extra-info"]}>
                    <h3>{gameTitle}</h3>
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