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

import { getGameInfoGamePage } from "@/utils/getGamesInfo";
import { slugToGameName } from "@/functions/functions";
import { Metadata } from "next";

interface ParamsGame {
    params: {
        game: string[];
    };
}

// -------------------- METADATA DINÁMICA --------------------
export async function generateMetadata({ params }: ParamsGame): Promise<Metadata> {
    const gameSlug = params.game[0];
    const gameName = slugToGameName(gameSlug);

    // Usamos fetch con revalidate para cache (12 horas)
    const getGameInfo = await getGameInfoGamePage(gameName);

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
    const gameSlug = params.game[0];
    const gameName = slugToGameName(gameSlug);

    // ✅ Mismo fetch que en generateMetadata, solo se hace una vez
    const getGameInfo = await getGameInfoGamePage(gameName);

    return (
        <article className="main-article-gamepage">
            <Presentation
                title={getGameInfo.title}
                offerImageUrl={getGameInfo.bestOffer.offerImage}
                mainImage={getGameInfo.header}
                offer={getGameInfo.bestOffer}
            />

            <div className={styles["game-info-container"]}>
                <GameImagesVideos
                    title={getGameInfo.title}
                    screenshots={getGameInfo.screenshots}
                    trailer={getGameInfo.gameTrailer}
                />

                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-md-7 col-sm-12 p-0">
                            <AboutTheGame description={getGameInfo.description} />
                            <GameTags tags={getGameInfo.about_the_game.tags} />
                        </div>
                        <div className="col-md-5 col-sm-12 p-0">
                            <SafeRender when={getGameInfo.meta_critic}>
                                <MetaCritic metacritic={getGameInfo.meta_critic} />
                            </SafeRender>

                            <GameInfo gameData={getGameInfo.about_the_game} />
                        </div>
                    </div>
                </div>

                <SafeRender when={getGameInfo.restOfTheOffers?.length > 0}>
                    <OfficialStoreList restOfTheOffers={getGameInfo.restOfTheOffers} />
                </SafeRender>

                <SafeRender when={getGameInfo.franchise?.length > 0}>
                    <FranchiseGames title={getGameInfo.title} franchiseData={getGameInfo.franchise} />
                </SafeRender>

                <SafeRender when={getGameInfo.about_the_game?.original_lang_genres}>
                    <RelatedOffers offersData={getGameInfo.sameGenre} />
                </SafeRender>
            </div>
        </article>
    );
};

export default GamePage;
