import React from "react";
import { Classes } from "@/types/types";
import styles from "@/styles/components/vertical-card-loading.module.scss"

interface VerticalCardLoading {
    classList: Classes,
}

const VerticalLoading = ({ classList }: VerticalCardLoading) => {
    return (
        <div className="col">
            <div className={`${styles[classList.mainGameCard]} ${styles["skeleton-card"]}`}>
                {/* Imagen / Icono */}
                <div className={`${styles[classList.iconContainer]} ${styles["skeleton-box"]}`} />

                <div className={styles["skeleton-content"]}>
                    {/* Título */}
                    <div className={`${styles[classList.gameTitle]} ${styles["skeleton-box"]} ${styles["skeleton-title"]}`} />

                    {/* Divisor Line */}

                    <div className={`${styles[classList.gameTitle]} ${styles["skeleton-box"]} ${styles["skeleton-divisor-line"]}`} />

                    {/* Precios */}

                    <div className={`${styles[classList.priceOfferOriginContainer]} ${styles["skeleton-prices"]}`}>

                        <div className={styles["offer-container"]}>
                            <div className={styles[classList.prices]}>
                                <div className={`${styles[classList.lastPrice]} ${styles["skeleton-box"]} ${styles["skeleton-price"]}`} />
                                <div className={`${styles[classList.currentPrice]} ${styles["skeleton-box"]} ${styles["skeleton-price-current"]}`} />
                            </div>
                        </div>

                        {/* Oferta web */}
                        <div className={`${styles[classList.webOffer]} ${styles["skeleton-box"]} ${styles["skeleton-offer"]}`} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default VerticalLoading;