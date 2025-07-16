import React from "react";
import styles from "@/styles/layout/homepage/main-offer-header.module.scss"
import MainImg from "@/resources/main-offer/image.webp";
import Image from "next/image";
import Link from "next/link";

const MainOffer = () => {
    return (
        <>
            <article className={styles["main-offer-container"]}>
                <Link href="/producto/black-ops-6" className={styles["click-overlay"]} aria-label="Ver Black Ops 6" />
                <Image src={MainImg} className={styles["main-header-image"]} alt="Mejor oferta y más popular del momento" />
                <section className={styles["offer"]}>
                    <h1 className={styles["offer-title"]}>BLACK OPS 6</h1>
                    <div className={styles["price-container"]}>
                        <span className={styles["discount"]}>-35%</span>
                        <span className={styles["current-price"]}>34,99€</span>
                    </div>
                </section>
            </article>
        </>
    )
}

export default MainOffer;