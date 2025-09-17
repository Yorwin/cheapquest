import React from "react";
import styles from "@/styles/layout/gamepage/gamepage-general-styles.module.scss"

/* Page Sections */

import Presentation from "@/components/pages/game-page/presentation"
import GameImagesVideos from "@/components/pages/game-page/game-images-videos"
import AboutTheGame from "@/components/general/about-this-game/about-this-game";
import MetaCritic from "@/components/general/metacritic";
import GameInfo from "@/components/general/game-info";
import GameTags from "@/components/pages/game-page/game-tags";
import OfficialStoreList from "@/components/pages/game-page/official-store-list";
import FranchiseGames from "@/components/pages/game-page/franchise-games";
import RelatedOffers from "@/components/pages/game-page/related-offers/related-offers";
import { getGameInfoGamePage } from "@/utils/getGamesInfo";
import { slugToGameName } from "@/functions/functions";

interface ParamsGame {
    params: {
        game: string[];
    };
}

const GamePage = async ({ params }: ParamsGame) => {
    
    const parameters = params.game[0];
    const formatParemeter = slugToGameName(parameters);
    const getGameInfo = await getGameInfoGamePage(formatParemeter); 

    return (
        <article className="main-article-gamepage">
            <Presentation title={getGameInfo.title} offerImageUrl={getGameInfo.bestOffer.offerImage} mainImage={getGameInfo.header} offer={getGameInfo.bestOffer}/>
            <div className={styles["game-info-container"]}>
                <GameImagesVideos screenshots={getGameInfo.screenshots} trailer={getGameInfo.gameTrailer}/>
                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-md-7 col-sm-12 p-0">
                            <AboutTheGame description={getGameInfo.description}/>
                            <GameTags tags={getGameInfo.about_the_game.tags}/>
                        </div>
                        <div className="col-md-5 col-sm-12 p-0">
                            {getGameInfo.meta_critic && <MetaCritic metacritic={getGameInfo.meta_critic}/>}
                            <GameInfo gameData={getGameInfo.about_the_game} />
                        </div>
                    </div>
                </div>
                <OfficialStoreList restOfTheOffers={getGameInfo.restOfTheOffers}/>
                <FranchiseGames />
                <RelatedOffers />
            </div>
        </article>
    )
};

export default GamePage;