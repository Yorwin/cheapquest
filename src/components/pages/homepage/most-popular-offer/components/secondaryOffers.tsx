import React from "react";
import GameStandardWrapper from "@/components/game-card-wrapper";
import { GameStandardContainerType, Classes } from "@/types/types";

type SecondaryOffersProps = {
    data: {
        games: GameStandardContainerType[];
        classes: Classes;
    };
};

const SecondaryOffers = ({ data }: SecondaryOffersProps) => {
    return data.games.map((e, index) => (
        <GameStandardWrapper
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