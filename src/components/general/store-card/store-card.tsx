import React from "react";
import styles from "@/styles/components/store-card.module.scss"
import Image from "next/image";

/* Store Example Image */
import store from "@/resources/stores/fanatical.png"

const StoreCard = () => {
    return (
        <div className={styles["store-card-container"]}>

            <div className={styles["image-container"]}>
                <Image 
                    className={styles["image"]}
                    src={store}
                    alt="Store"
                    sizes="35vw"
                />
            </div>
            <div className={styles["offer-data"]}>

                {/* Offer Info */}

                <div className={styles["offer-info-container"]}>
                    <h3>Example Game</h3>
                    <div className={styles["offer-specs"]}>
                        <span>Steam</span>
                        <time className={styles["released-time"]} dateTime="2025-09-03T12:00:00Z">
                            <i className="bi bi-clock"></i>
                            <span>Hace 2 días</span>
                        </time>
                    </div>
                </div>

                {/* Prices Container */}

                <div className={styles["price-and-cta-container"]}>
                    <div className={styles["prices-container"]}>
                        <span className={styles["discount"]}>
                            <span>-30%</span>
                        </span>
                        <div className={styles["prices"]}>
                            <del className={styles["old-price"]}>49,99€</del>
                            <span className={styles["new-price"]}>29,99€</span>
                        </div>
                    </div>

                    {/* Go to the Offer Button */}
                    <button className={styles["action-button"]}>
                        Ir a la oferta
                    </button>
                </div>
            </div>
        </div>
    )
};

export default StoreCard;