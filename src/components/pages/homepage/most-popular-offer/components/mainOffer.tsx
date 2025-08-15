import React from "react";
import Game from "@/components/game-card-server";
import GameWrapper from "@/components/game-card-wrapper"
import { GameStandardContainerType } from "@/types/types";

const MainOffer = ({ title, gameImage, platform, discount, oldPrice, currentPrice, webOffer, classes }: GameStandardContainerType) => {
    return <>
        <GameWrapper
            title={title}
            gameImage={gameImage}
            platform={platform}
            discount={discount}
            oldPrice={oldPrice}
            currentPrice={currentPrice}
            webOffer={webOffer}
            classes={classes}
        />
    </>
};

export default MainOffer;