import React from "react";
import styles from "@/styles/layout/homepage/list-format-offers.module.scss"
import Image from "next/image";
import image from "@/resources/offer-img/images.jpeg"
import Link from "next/link";

const ListFormatOffers = () => {

    const bestOffersByPercentage = [
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
    ];

    const historicalLows = [
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            gameDescription: "Standard Edition",
            oldPrice: "39,99",
            currentPrice: "26,99",
            discountPercentage: "37%",
        },
    ];

    const bestOffersByPercentageContainer = bestOffersByPercentage.map((e, index) => {
        return (
            <section className={styles["game-info-container"]}>
                <Link href={"#"} className={styles["enlace"]} />
                <div className={styles["offer-number-container"]}>
                    <span className={styles["offer-number"]}>
                        {index + 1}
                    </span>
                </div>
                <div className={styles["image-container"]}>
                    <Image
                        src={e.offerImage}
                        alt="Plataforma de juego"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className={styles["details"]}>
                    <div className={styles["game-title-and-extra-info"]}>
                        <h3>{e.gameTitle}</h3>
                        <p>{e.gameDescription}</p>
                    </div>
                    <div className={styles["prices"]}>
                        <div className={styles["prices-container"]}>
                            <del className={styles["old-price"]}>{e.oldPrice}</del>
                            <span className={styles["current-price"]}>{e.currentPrice}</span>
                        </div>
                        <div className={styles["discount-container"]}>
                            <span>{e.discountPercentage}</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    });

    const historicalLowsContainer = historicalLows.map((e, index) => {
        return (
            <section className={styles["game-info-container"]}>
                <Link href={"#"} className={styles["enlace"]} />
                <div className={styles["offer-number-container"]}>
                    <span className={styles["offer-number"]}>
                        {index + 1}
                    </span>
                </div>
                <div className={styles["image-container"]}>
                    <Image
                        src={e.offerImage}
                        alt="Plataforma de juego"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className={styles["details"]}>
                    <div className={styles["game-title-and-extra-info"]}>
                        <h3>{e.gameTitle}</h3>
                        <p>{e.gameDescription}</p>
                    </div>
                    <div className={styles["prices"]}>
                        <div className={styles["prices-container"]}>
                            <del className={styles["old-price"]}>{e.oldPrice}</del>
                            <span className={styles["current-price"]}>{e.currentPrice}</span>
                        </div>
                        <div className={styles["discount-container"]}>
                            <span>{e.discountPercentage}</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    });

    return <>
        <section className={styles["list-format-offers-container"]}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <h1 className={styles["title"]}>MEJORES OFERTAS POR %</h1>
                        <article className={styles["list-offer-format-container"]}>
                            {bestOffersByPercentageContainer}
                        </article>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <h1 className={styles["title"]}>BAJOS HISTORICOS</h1>
                        <article className={styles["list-offer-format-container"]}>
                            {historicalLowsContainer}
                        </article>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default ListFormatOffers;