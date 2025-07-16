import React from "react";
import styles from "@/styles/layout/homepage/most-popular-offer.module.scss"
import gameImage from "@/resources/offer-img/image.jpg"
import Image from "next/image";


const MostPopularOffer = () => {
    return <>
        <section className={styles["most-popular-offer-container"]}>
            <h1 className={styles["title"]}>OFERTAS MÁS POPULARES</h1>

            <div className={styles["offers-container"]}>
                <div className={styles["main-gamecard-offer"]}>
                    <div className={styles["gameimage-container"]}>
                        <Image
                            src={gameImage}
                            alt="Imágen de juego"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles["gameinfo-container"]}>
                        
                    </div>
                </div>
            </div>
        </section>
    </>
};

export default MostPopularOffer;