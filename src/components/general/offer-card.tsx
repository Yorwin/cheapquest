import React from "react";
import styles from "@/styles/components/offer-card.module.scss"
import Image from "next/image";
import PC from "@/resources/platforms/pc.svg"
import { StoreLogo, bestOffer } from "@/types/types";

interface offerCardProps {
    offer: bestOffer,
    title: string,
}

const OfferCard = ({ title, offer }: offerCardProps) => {

    const storeImage = offer.store ? offer.store.image : null;

    return (
        <section className={styles["offer-card"]}>
            <h3>{title}</h3>
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
                    {storeImage &&
                        (<li>
                            <span>Oferta</span>
                            <Image
                                src={storeImage}
                                alt="platform"
                                sizes="20vw"
                                className={styles["image"]}
                            />
                        </li>
                        )}
                </ul>
            </div>
            <div className={styles["prices"]}>
                <div className={styles["old-discount-container"]}>
                    <span className={styles["old-price"]}>{offer.normalPrice}</span>
                    <span className={styles["discount"]}>{offer.discount}</span>
                </div>
                <span className={styles["current-price"]}>{offer.currentPrice}</span>
            </div>
            <button className={styles["offer-button"]}>
                Ir a la oferta
            </button>
        </section>
    )
};

export default OfferCard;