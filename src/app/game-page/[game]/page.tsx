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
import { notFound } from "next/navigation";

import { getGameId, getGameData, getGameOffers } from "@/utils/getGamesInfo";
import { slugToGameName } from "@/functions/functions";
import { Metadata } from "next";
import { checkCompletedGameData } from "@/lib/firebase-cache";

/* Loading Components */
import SkeletonLoader from "@/components/pages/game-page/skeletonloader";
import OfficialStoreListSkeleton from "@/components/pages/game-page/official-store/official-store-list-loader";
import GameImagesTrailerSkeleton from "@/components/pages/game-page/game-images-videos/game-img-videos-skeleton";
import GameTagsSkeleton from "@/components/pages/game-page/game-tags/game-tags-skeleton";

/* Fallback Components */
import ImageCard from "@/components/general/image-card";
import OfferCard from "@/components/general/offer-card/offer-card";
import OfferCardSkeleton from "@/components/general/offer-card/offer-card-skeleton";

interface ParamsGame {
    params: Promise<{ game: string }>;
}

// -------------------- METADATA DINÁMICA --------------------
export async function generateMetadata({ params }: ParamsGame): Promise<Metadata> {
    const { game } = await params;

    const gameSlug = game;
    const gameName = slugToGameName(gameSlug);

    const gameId = await getGameId(gameName);

    if (!gameId) {
        return {
            title: 'Juego no encontrado',
            description: 'El juego solicitado no existe',
        };
    }

    // For metadata, we need some game data, so fetch minimally
    const gameData = await getGameData(gameId);
    const gameOffers = await getGameOffers(gameName);

    // Check if game exists in completed_game_data collection by RAWG ID for indexation
    const isGameCompleted = await checkCompletedGameData(gameId);

    const title = gameData?.title || gameOffers?.bestOffer?.gameTitle || 'Juego';
    const bestOffer = gameOffers?.bestOffer;

    const canonicalUrl = `https://cheapquest.app/game-page/${gameSlug}`;

    return {
        title: `${title} - Mejor oferta: ${bestOffer ? bestOffer.discount : "0%"} de descuento`,
        description: `Compra ${title} por ${bestOffer ? bestOffer.normalPrice : "Desconocido"} en ${bestOffer ? bestOffer.store : "Desconocido"}. ¡Ahorra ${bestOffer ? bestOffer.discount : "0%"}!`,
        keywords: [title, "ofertas", "juegos", "descuentos", "comprar", "mejor precio"],
        robots: {
            index: isGameCompleted,
            follow: isGameCompleted,
            googleBot: {
                index: isGameCompleted,
                follow: isGameCompleted,
                'max-image-preview': 'large',
                'max-snippet': -1,
            }
        },
        alternates: {
            canonical: canonicalUrl,
        },
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

    const gameId = await getGameId(gameName);

    if (!gameId) {
        return <FallbackPage gameName={gameName} />;
    }

    // Fetch gameData once here to avoid multiple calls
    const gameData = await getGameData(gameId);

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
                                <AboutTheGame gameData={gameData} />
                            </Suspense>

                            {/* Tags */}
                            <Suspense fallback={<GameTagsSkeleton />}>
                                <GameTags gameData={gameData} />
                            </Suspense>
                        </div>
                        <div className="col-md-5 col-sm-12 p-0">
                            {/* Metacritic */}
                            <Suspense fallback={<SkeletonLoader width="100%" height="70px" />}>
                                <MetaCritic gameData={gameData} />
                            </Suspense>

                            {/* gameInfo */}
                            <Suspense fallback={<SkeletonLoader width="100%" height="300px" />}>
                                <GameInfo gameData={gameData} />
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
                    <FranchiseGames gameId={gameId} />
                </Suspense>

                {/* Related Offers */}
                <Suspense fallback={<SkeletonLoader width="100%" height="400px" />}>
                    <RelatedOffers gameId={gameId} />
                </Suspense>
            </div>
        </article>
    );
};

// -------------------- FALLBACK PAGE --------------------
const FallbackPage = ({ gameName }: { gameName: string }) => {
    return (
        <article className="main-article-gamepage">
            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4rem 2rem'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    maxWidth: '1200px',
                    width: '100%'
                }}>
                    <ImageCard gameName={gameName} />
                    <Suspense fallback={<OfferCardSkeleton />}>
                        <OfferCard gameName={gameName} />
                    </Suspense>
                </div>
            </div>
        </article>
    );
};

export default GamePage;
