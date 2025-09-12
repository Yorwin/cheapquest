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
import { getHeaderImage, getGameInfoGamePage } from "@/utils/getGamesInfo";

interface ParamsGame {
    params: {
        game: string[];
    };
}

const GamePage = async ({ params }: ParamsGame) => {
    const parameters = params.game[0];

    const headerImage = await getHeaderImage(parameters);
    const getGameInfo = await getGameInfoGamePage(parameters);

    console.log(getGameInfo);

    return (
        <article className="main-article-gamepage">
            <Presentation />
            <div className={styles["game-info-container"]}>
                <GameImagesVideos />
                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-md-7 col-sm-12 p-0">
                            <AboutTheGame />
                            <GameTags />
                        </div>
                        <div className="col-md-5 col-sm-12 p-0">
                            <MetaCritic />
                            <GameInfo />
                        </div>
                    </div>
                </div>
                <OfficialStoreList />
                <FranchiseGames />
                <RelatedOffers />
            </div>
        </article>
    )
};

export default GamePage;