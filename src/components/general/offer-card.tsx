import React from "react";
import styles from "@/styles/components/offer-card.module.scss"
import Image from "next/image";
import store from "@/resources/stores/greenman.png"
import PC from "@/resources/platforms/pc.svg"

const OfferCard = () => {
    return (
        <section className={styles["offer-card"]}>
            <h3>Black Ops 6</h3>
            <div className={styles["offer-info-container"]}>
                <ul className={styles["offer-info"]}>
                    <li>
                        <span>Platf.</span>
                        <Image
                            src={PC}
                            alt="platform"
                            sizes="20vw"
                            className={styles["image"]}
                        />
                    </li>
                    <li>
                        <span>Oferta</span>
                        <Image
                            src={store}
                            alt="platform"
                            sizes="20vw"
                            className={styles["image"]}
                        />
                    </li>
                </ul>
            </div>
            <div className={styles["prices"]}>
                <div className={styles["old-discount-container"]}>
                    <span className={styles["old-price"]}>50€</span>
                    <span className={styles["discount"]}>-39%</span>
                </div>
                <span className={styles["current-price"]}>35,69€</span>
            </div>
            <button className={styles["offer-button"]}>
                Ir a la oferta
            </button>
        </section>
    )
};

export default OfferCard;