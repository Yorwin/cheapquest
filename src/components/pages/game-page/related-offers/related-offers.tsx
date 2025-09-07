import React from "react";
import styles from "@/styles/layout/gamepage/related-offers.module.scss"
import ContentDistributionManager from "./content-distribution-manager";

/* Example Values */

import platform from "@/resources/platforms/pc.svg"
import store from "@/resources/stores/greenman.png"

const RelatedOffers = () => {

    const exampleValues = [{
        gameImage: "https://media.rawg.io/media/games/7b7/7b7f740c7f21ca6028cfc420c3f79a76.jpg",
        title: "Example Game",
        platform: platform,
        discount: "39%",
        oldPrice: "29,99€",
        currentPrice: "10,99€",
        webOffer: store
    },
    {
        gameImage: "https://media.rawg.io/media/games/7b7/7b7f740c7f21ca6028cfc420c3f79a76.jpg",
        title: "Example Game",
        platform: platform,
        discount: "39%",
        oldPrice: "29,99€",
        currentPrice: "10,99€",
        webOffer: store
    },
    {
        gameImage: "https://media.rawg.io/media/games/7b7/7b7f740c7f21ca6028cfc420c3f79a76.jpg",
        title: "Example Game",
        platform: platform,
        discount: "39%",
        oldPrice: "29,99€",
        currentPrice: "10,99€",
        webOffer: store
    },
    {
        gameImage: "https://media.rawg.io/media/games/7b7/7b7f740c7f21ca6028cfc420c3f79a76.jpg",
        title: "Example Game",
        platform: platform,
        discount: "39%",
        oldPrice: "29,99€",
        currentPrice: "10,99€",
        webOffer: store
    },
    {
        gameImage: "https://media.rawg.io/media/games/7b7/7b7f740c7f21ca6028cfc420c3f79a76.jpg",
        title: "Example Game",
        platform: platform,
        discount: "39%",
        oldPrice: "29,99€",
        currentPrice: "10,99€",
        webOffer: store
    }, {
        gameImage: "https://media.rawg.io/media/games/7b7/7b7f740c7f21ca6028cfc420c3f79a76.jpg",
        title: "Example Game",
        platform: platform,
        discount: "39%",
        oldPrice: "29,99€",
        currentPrice: "10,99€",
        webOffer: store
    },
    {
        gameImage: "https://media.rawg.io/media/games/7b7/7b7f740c7f21ca6028cfc420c3f79a76.jpg",
        title: "Example Game",
        platform: platform,
        discount: "39%",
        oldPrice: "29,99€",
        currentPrice: "10,99€",
        webOffer: store
    },
    {
        gameImage: "https://media.rawg.io/media/games/7b7/7b7f740c7f21ca6028cfc420c3f79a76.jpg",
        title: "Example Game",
        platform: platform,
        discount: "39%",
        oldPrice: "29,99€",
        currentPrice: "10,99€",
        webOffer: store
    },
    {
        gameImage: "https://media.rawg.io/media/games/7b7/7b7f740c7f21ca6028cfc420c3f79a76.jpg",
        title: "Example Game",
        platform: platform,
        discount: "39%",
        oldPrice: "29,99€",
        currentPrice: "10,99€",
        webOffer: store
    },
    {
        gameImage: "https://media.rawg.io/media/games/7b7/7b7f740c7f21ca6028cfc420c3f79a76.jpg",
        title: "Example Game",
        platform: platform,
        discount: "39%",
        oldPrice: "29,99€",
        currentPrice: "10,99€",
        webOffer: store
    },
    ];

    return (
        <div className="related-offers-container">
            <h1 className={styles["title"]}>Quizás también te guste</h1>
            <ContentDistributionManager gameInfo={exampleValues} />
        </div>
    )
};

export default RelatedOffers;