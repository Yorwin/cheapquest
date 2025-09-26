import React from "react";
import styles from "@/styles/components/offer-card.module.scss"
import Image from "next/image";
import Link from "next/link";
import { bestOffer } from "@/types/types";

interface offerCardProps {
    offer: bestOffer,
    title: string,
}

const OfferCard = ({ title, offer }: offerCardProps) => {

    const storeImage = offer.store ? offer.store.image : null;
    const storeName = offer.store ? offer.store.name : null;

    return (
        <section className={styles["offer-card"]}>
            <h3>{title}</h3>
            <div className={styles["offer-info-container"]}>
                {(storeImage &&
                    <div className={styles["offer-info"]}>
                        <Image
                            src={storeImage}
                            alt={`Best offer for ${title} provided by ${storeName}`}
                            sizes="20vw"
                            fill
                            className={styles["image"]}
                        />
                    </div>
                )}
            </div>
            <div className={styles["prices"]}>
                <div className={styles["old-discount-container"]}>
                    <span className={styles["old-price"]}>{offer.normalPrice}</span>
                    <span className={styles["discount"]}>{offer.discount}</span>
                </div>
                <span className={styles["current-price"]}>{offer.currentPrice}</span>
            </div>
            <Link
                href={`${offer.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["offer-button"]}
            >
                Ir a la oferta
            </Link>
        </section>
    )
};

export default OfferCard;