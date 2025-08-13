import React from "react";
import GameStandardContainer from "@/components/game-standard-container";
import { GameStandardContainerType, Classes } from "@/types/types";

type SecondaryOffersProps = {
    data: {
        games: GameStandardContainerType[];
        classes: Classes;
    };
};

const SecondaryOffers = ({ data }: SecondaryOffersProps) => {

    return data.games.map((e, index) => (
        <GameStandardContainer
            key={index}
            title={e.title}
            gameImage={e.gameImage}
            platform={e.platform}
            discount={e.discount}
            oldPrice={e.oldPrice}
            currentPrice={e.currentPrice}
            webOffer={e.webOffer}
            classes={data.classes}
        />
    ));
};

export default SecondaryOffers;