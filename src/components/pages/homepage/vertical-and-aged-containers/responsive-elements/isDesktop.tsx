import React from "react";
import { verticalContainerProps } from "@/types/types";
import VerticalGameCardWrapper from "@/components/general/vertical-card/vertical-game-container-wrapper";

const IsDesktop = ({ offersData }: verticalContainerProps) => {

    const verticalCardFirstRow = offersData.slice(0, 5).map((e, index) => {
        return (
            <div className="col">
                <VerticalGameCardWrapper
                    key={index}
                    gameImage={e.gameImage}
                    oldPrice={e.oldPrice}
                    platform={e.platform}
                    discount={e.discount}
                    title={e.title}
                    currentPrice={e.currentPrice}
                    webOffer={e.webOffer}
                />
            </div>
        )
    });

    const verticalCardSecondRow = offersData.slice(5, 10).map((e, index) => {
        return (
            <div className="col">
                <VerticalGameCardWrapper
                    key={index}
                    gameImage={e.gameImage}
                    oldPrice={e.oldPrice}
                    platform={e.platform}
                    discount={e.discount}
                    title={e.title}
                    currentPrice={e.currentPrice}
                    webOffer={e.webOffer}
                />
            </div>
        )
    });

    return <>
        <div className="row row-cols-5 g-3 mb-4">
            {verticalCardFirstRow}
        </div>
        <div className="row row-cols-5 g-3 mb-4">
            {verticalCardSecondRow}
        </div>
    </>
};

export default IsDesktop;