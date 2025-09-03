import React from "react";
import styles from "@/styles/layout/gamepage/gamepage-general-styles.module.scss"
import Presentation from "@/components/pages/game-page/presentation"
import GameImagesVideos from "@/components/pages/game-page/game-images-videos"
import AboutTheGame from "@/components/general/about-this-game";

interface ParamsGame {
    params: {
        game: string[];
    };
}

const GamePage = ({ params }: ParamsGame) => {
    const parameters = params.game[0];

    return (
        <article className="main-article-gamepage">
            <Presentation />
            <div className={styles["game-info-container"]}>
                <GameImagesVideos />
                <AboutTheGame />
               
            </div>
        </article>
    )
};

export default GamePage;