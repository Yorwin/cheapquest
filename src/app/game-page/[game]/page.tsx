import React from "react";
import styles from "@/styles/layout/gamepage/gamepage-general-styles.module.scss";
import { Suspense } from "react";

/* Page Sections */
import Presentation from "@/components/pages/game-page/presentation";
import GameImagesVideos from "@/components/pages/game-page/game-images-videos/game-images-videos";
import AboutTheGame from "@/components/general/about-this-game/about-this-game";
import MetaCritic from "@/components/general/metacritic";
import GameInfo from "@/components/general/game-info";
import GameTags from "@/components/pages/game-page/game-tags/game-tags";
import OfficialStoreList from "@/components/pages/game-page/official-store/official-store-list";
import FranchiseGames from "@/components/pages/game-page/franchise-games";
import RelatedOffers from "@/components/pages/game-page/related-offers/related-offers";
import ImageCard from "@/components/general/image-card";
import OfferCard from "@/components/general/offer-card/offer-card";
import { notFound } from "next/navigation";

import { getGameInfoGamePage } from "@/utils/getGamesInfo";
import { slugToGameName } from "@/functions/functions";
import { Metadata } from "next";

/* Loading Components */
import SkeletonLoader from "@/components/pages/game-page/skeletonloader";
import OfficialStoreListSkeleton from "@/components/pages/game-page/official-store/official-store-list-loader";
import GameImagesTrailerSkeleton from "@/components/pages/game-page/game-images-videos/game-img-videos-skeleton";
import GameTagsSkeleton from "@/components/pages/game-page/game-tags/game-tags-skeleton";

interface ParamsGame {
    params: Promise<{ game: string }>;
}

// -------------------- METADATA DINÁMICA --------------------
export async function generateMetadata({ params }: ParamsGame): Promise<Metadata> {
    const { game } = await params;

    const gameSlug = game;
    const gameName = slugToGameName(gameSlug);

    const getGameInfo = await getGameInfoGamePage(gameName);

    if (!getGameInfo || Object.keys(getGameInfo).length === 0) {
        notFound();
    }

    const title = getGameInfo.title;
    const bestOffer = getGameInfo.bestOffer;

    return {
        title: `${title} - Mejor oferta: ${bestOffer ? bestOffer.discount : "0%"} de descuento`,
        description: `Compra ${title} por ${bestOffer ? bestOffer.normalPrice : "Desconocido"} en ${bestOffer ? bestOffer.store : "Desconocido"}. ¡Ahorra ${bestOffer ? bestOffer.discount : "0%"}!`,
        openGraph: {
            title: `${title} - Mejor oferta: ${bestOffer ? bestOffer.discount : "0%"} de descuento`,
            description: `Compra ${title} por ${bestOffer ? bestOffer.normalPrice : "Desconocido"} en ${bestOffer ? bestOffer.store : "Desconocido"}. ¡Ahorra ${bestOffer ? bestOffer.discount : "0%"}!`,
            images: [bestOffer ? bestOffer.offerImage : "/default-image.jpg"],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} - Mejor oferta: ${bestOffer ? bestOffer.discount : "0%"} de descuento`,
            description: `Compra ${title} por ${bestOffer ? bestOffer.normalPrice : "Desconocido"} en ${bestOffer ? bestOffer.store : "Desconocido"}. ¡Ahorra ${bestOffer ? bestOffer.discount : "0%"}!`,
            images: [bestOffer ? bestOffer.offerImage : "/default-image.jpg"],
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

    return (
        <article className="main-article-gamepage">
            <Presentation gameName={gameName} />

            <div className={styles["game-info-container"]}>

                {/* Screenshots and Trailer */}
                <Suspense fallback={<GameImagesTrailerSkeleton />}>
                    <GameImagesVideos gameName={gameName} />
                </Suspense>

                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-md-7 col-sm-12 p-0 mb-3">

                            {/* About the Game */}
                            <Suspense fallback={<SkeletonLoader width="90%" height="150px" />}>
                                <AboutTheGame gameName={gameName} />
                            </Suspense>

                            {/* Tags */}
                            <Suspense fallback={<GameTagsSkeleton />}>
                                <GameTags gameName={gameName} />
                            </Suspense>
                        </div>
                        <div className="col-md-5 col-sm-12 p-0">
                            {/* Metacritic */}
                            <Suspense fallback={<SkeletonLoader width="100%" height="70px" />}>
                                <MetaCritic gameName={gameName} />
                            </Suspense>

                            {/* gameInfo */}
                            <Suspense fallback={<SkeletonLoader width="100%" height="300px" />}>
                                <GameInfo gameName={gameName} />
                            </Suspense>
                        </div>
                    </div>
                </div>

                {/* Related offers */}
                <Suspense fallback={<OfficialStoreListSkeleton />}>
                    <OfficialStoreList gameName={gameName} />
                </Suspense>

                {/* Franchise Offers */}
                <Suspense fallback={<SkeletonLoader width="100%" height="200px" />}>
                    <FranchiseGames gameName={gameName} />
                </Suspense>

                {/* Related Offers */}
                <Suspense fallback={<SkeletonLoader width="100%" height="400px" />}>
                    <RelatedOffers gameName={gameName} />
                </Suspense>
            </div>
        </article>
    );
};

export default GamePage;
