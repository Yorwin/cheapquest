import React from "react";
import styles from "@/styles/components/store-card.module.scss"

const StoreCard = () => {
    return (
        <div className={styles["store-card-container"]}>
            
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

            <div className={styles["prices-container"]}>
                <span className={styles["discount"]}>-30%</span>
                <div className={styles["prices"]}>
                    <del className={styles["old-price"]}>49,99€</del>
                    <span className={styles["new-price"]}>-30%</span>
                </div>
            </div>
        </div>
    )
};

export default StoreCard;