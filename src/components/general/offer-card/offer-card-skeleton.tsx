import React from "react";
import styles from "@/styles/components/offer-card.module.scss";

const OfferCardSkeleton = () => {
    return (
        <section className={styles["offer-card-loading"]}>
            <div className={styles["spinner"]}></div>
        </section>
    )
};

export default OfferCardSkeleton;