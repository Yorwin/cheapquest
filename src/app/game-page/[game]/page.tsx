import React from "react";
import styles from "@/styles/layout/gamepage/gamepage-general-styles.module.scss";

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
import SafeRender from "@/components/general/safe-render";
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
    const aboutTheGame = getGameInfo.about_the_game;

    if (!getGameInfo.bestOffer) {
        notFound();
    }

    if (!getGameInfo.about_the_game && !getGameInfo.title && !getGameInfo.meta_critic && !getGameInfo.description && !getGameInfo.sameGenre && !getGameInfo.franchise) {
        return (
            <article className="main-article-gamepage">
                <div className={styles["game-info-container"]}>
                    <div className={styles["cards-container"]}>
                        <ImageCard imageUrl={getGameInfo.bestOffer.offerImage} />
                        <OfferCard title={getGameInfo.bestOffer.gameTitle} offer={getGameInfo.bestOffer} />
                    </div>
                </div>
            </article>
        )
    }

    return (
        <article className="main-article-gamepage">
            <Presentation
                title={getGameInfo.title ? getGameInfo.title : getGameInfo.bestOffer.gameTitle}
                offerImageUrl={getGameInfo.bestOffer.offerImage}
                mainImage={getGameInfo.header}
                offer={getGameInfo.bestOffer}
            />

            <div className={styles["game-info-container"]}>
                <GameImagesVideos
                    title={getGameInfo.title ? getGameInfo.title : getGameInfo.bestOffer.gameTitle}
                    screenshots={getGameInfo.screenshots}
                    trailer={getGameInfo.gameTrailer}
                />

                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-md-7 col-sm-12 p-0">

                            {/* About the Game */}
                            <SafeRender when={getGameInfo.description}>
                                <AboutTheGame description={getGameInfo.description} />
                            </SafeRender>

                            {/* Tags */}
                            <SafeRender when={aboutTheGame?.tags}>
                                <GameTags tags={aboutTheGame?.tags} />
                            </SafeRender>
                        </div>
                        <div className="col-md-5 col-sm-12 p-0">
                            {/* Metacritic */}
                            <SafeRender when={getGameInfo.meta_critic}>
                                <MetaCritic metacritic={getGameInfo.meta_critic} />
                            </SafeRender>

                            {/* gameInfo */}
                            <GameInfo gameData={aboutTheGame} />
                        </div>
                    </div>
                </div>

                {/* Related offers */}
                <SafeRender when={getGameInfo.restOfTheOffers ? getGameInfo.restOfTheOffers?.length > 0 : []}>
                    <OfficialStoreList restOfTheOffers={getGameInfo.restOfTheOffers} />
                </SafeRender>

                {/* Franchise Offers */}
                <SafeRender when={getGameInfo.franchise?.length > 0}>
                    <FranchiseGames title={getGameInfo.title ? getGameInfo.title : ""} franchiseData={getGameInfo.franchise} />
                </SafeRender>

                {/* Related Offers */}
                <SafeRender when={getGameInfo.about_the_game?.original_lang_genres}>
                    <RelatedOffers offersData={getGameInfo.sameGenre} />
                </SafeRender>
            </div>
        </article>
    );
};

export default GamePage;
