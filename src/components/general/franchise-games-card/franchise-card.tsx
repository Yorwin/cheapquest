import React from "react";
import styles from "@/styles/components/franchise-card.module.scss"
import Image from "next/image";

/* Image */
import Image1 from "@/resources/offer-img/image.jpg"
import store from "@/resources/stores/fanatical.png"

const FranchiseCard = () => {
    return (
        <div className={`${styles["franchise-card-container"]} col-lg-4 col-md-6 col-sm-12 mb-lg-3 mb-md-2 mb-sm-3`}>
            <div className={styles["franchise-card"]}>
                <div className={styles["image-container"]}>
                    <Image
                        className={styles["game-image"]}
                        src={Image1}
                        alt="Franchise Game Image"
                        sizes="40vw"
                        fill
                    />
                </div>
                <div className={styles["discount-and-store-container"]}>
                    <span className={styles["discount"]}>35%</span>
                    <Image
                        className={styles["store"]}
                        src={store}
                        alt="Franchise Game Image"
                        sizes="30vw"
                    />
                </div>
            </div>
            <div className={styles["game-info"]}>
                <div className={styles["info"]}>
                    <h3>Example Game</h3>
                    <time className={styles["released-time"]} dateTime="2025-09-03T12:00:00Z">
                        Fecha de lanzamiento: DD/MM/YY
                    </time>
                </div>
                <div className={styles["price"]}>
                    <span className={styles["current-price"]}>19,99€</span>
                </div>
            </div>
        </div>
    )
};

export default FranchiseCard;