import React from "react";
import styles from "@/styles/layout/homepage/list-format-offers.module.scss"
import Image from "next/image";
import image from "@/resources/offer-img/images.jpeg"
import Link from "next/link";
import ListFormatContainer from "../list-format-offer-container";

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
            <ListFormatContainer
                key={index}
                index={index}
                link="#"
                offerImage={e.offerImage}
                gameTitle={e.gameTitle}
                gameDescription={e.gameDescription}
                oldPrice={e.oldPrice}
                currentPrice={e.currentPrice}
                discountPercentage={e.discountPercentage}
            />
        );
    });

    const historicalLowsContainer = historicalLows.map((e, index) => {
        return (
            <ListFormatContainer
                key={index}
                index={index}
                link="#"
                offerImage={e.offerImage}
                gameTitle={e.gameTitle}
                gameDescription={e.gameDescription}
                oldPrice={e.oldPrice}
                currentPrice={e.currentPrice}
                discountPercentage={e.discountPercentage}
            />
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