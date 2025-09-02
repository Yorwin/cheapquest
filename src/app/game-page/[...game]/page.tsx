import React from "react";
import Presentation from "@/components/pages/game-page/presentation"

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
        </article>
    )
};

export default GamePage;