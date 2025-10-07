import React from "react";
import styles from "@/styles/layout/gamepage/gamepage-general-styles.module.scss";
import { Suspense } from "react";

/* Page Sections */
import Presentation from "@/components/pages/game-page/presentation";
import GameImagesVideos from "@/components/pages/game-page/game-images-videos";
import AboutTheGame from "@/components/general/about-this-game/about-this-game";
import MetaCritic from "@/components/general/metacritic";
import GameInfo from "@/components/general/game-info";
import GameTags from "@/components/pages/game-page/game-tags";
import OfficialStoreList from "@/components/pages/game-page/official-store-list";
import FranchiseGames from "@/components/pages/game-page/franchise-games";
import RelatedOffers from "@/components/pages/game-page/related-offers/related-offers";
import ImageCard from "@/components/general/image-card";
import OfferCard from "@/components/general/offer-card";
import { notFound } from "next/navigation";

import { getGameInfoGamePage } from "@/utils/getGamesInfo";
import { slugToGameName } from "@/functions/functions";
import { Metadata } from "next";

interface ParamsGame {
    params: Promise<{ game: string }>;
}

// -------------------- METADATA DINÁMICA --------------------
export async function generateMetadata({ params }: ParamsGame): Promise<Metadata> {
    const { game } = await params;

    const gameSlug = game;
    const gameName = slugToGameName(gameSlug);

    const getGameInfo = await getGameInfoGamePage(gameName);

    if (!getGameInfo || Object.keys(getGameInfo).length === 0 || !getGameInfo.bestOffer) {
        notFound();
    }

    const title = getGameInfo.title;
    const bestOffer = getGameInfo.bestOffer;

    return {
        title: `${title} - Mejor oferta: ${bestOffer.discount} de descuento`,
        description: `Compra ${title} por ${bestOffer.normalPrice} en ${bestOffer.store}. ¡Ahorra ${bestOffer.discount}%!`,
        openGraph: {
            title: `${title} - Mejor oferta: ${bestOffer.discount}% de descuento`,
            description: `Compra ${title} por ${bestOffer.normalPrice} en ${bestOffer.store}. ¡Ahorra ${bestOffer.discount}%!`,
            images: [bestOffer.offerImage],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} - Mejor oferta: ${bestOffer.discount}% de descuento`,
            description: `Compra ${title} por ${bestOffer.normalPrice} en ${bestOffer.store}. ¡Ahorra ${bestOffer.discount}%!`,
            images: [bestOffer.offerImage],
        },
    };
}

// -------------------- COMPONENTE PRINCIPAL --------------------
const GamePage = async ({ params }: ParamsGame) => {

    if (!params) {
        notFound();
    }

    const { game } = await params;
    const gameSlug = game;
    const gameName = slugToGameName(gameSlug);
    const getGameInfo = await getGameInfoGamePage(gameName);

    if (!getGameInfo.bestOffer) {
        notFound();
    }

    if (!getGameInfo.about_the_game && !getGameInfo.title && !getGameInfo.meta_critic && !getGameInfo.description && !getGameInfo.sameGenre && !getGameInfo.franchise) {
        return (
            <article className="main-article-gamepage">
                <div className={styles["game-info-container"]}>
                    <div className={styles["cards-container"]}>
                        <ImageCard gameName={gameName} />
                        <OfferCard gameName={gameName} />
                    </div>
                </div>
            </article>
        )
    }

    return (
        <article className="main-article-gamepage">
            <Presentation gameName={gameName} />

            <div className={styles["game-info-container"]}>

                {/* Screenshots and Trailer */}
                <Suspense fallback={<h3>Loading...</h3>}>
                    <GameImagesVideos gameName={gameName} />
                </Suspense>

                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-md-7 col-sm-12 p-0">

                            {/* About the Game */}
                            <Suspense fallback={<h3>Loading...</h3>}>
                                <AboutTheGame gameName={gameName} />
                            </Suspense>

                            {/* Tags */}
                            <Suspense fallback={<h3>Loading...</h3>}>
                                <GameTags gameName={gameName} />
                            </Suspense>
                        </div>
                        <div className="col-md-5 col-sm-12 p-0">
                            {/* Metacritic */}
                            <Suspense fallback={<h3>Loading...</h3>}>
                                <MetaCritic gameName={gameName} />
                            </Suspense>

                            {/* gameInfo */}
                            <Suspense fallback={<h3>Loading...</h3>}>
                                <GameInfo gameName={gameName} />
                            </Suspense>
                        </div>
                    </div>
                </div>

                {/* Related offers */}
                <Suspense fallback={<h3>Loading...</h3>}>
                    <OfficialStoreList gameName={gameName} />
                </Suspense>

                {/* Franchise Offers */}
                <Suspense fallback={<h3>Loading...</h3>}>
                    <FranchiseGames gameName={gameName} />
                </Suspense>

                {/* Related Offers */}
                <Suspense fallback={<h3>Loading...</h3>}>
                    <RelatedOffers gameName={gameName} />
                </Suspense>
            </div>
        </article>
    );
};

export default GamePage;
