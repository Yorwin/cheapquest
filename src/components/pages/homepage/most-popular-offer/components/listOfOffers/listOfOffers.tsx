import React from "react";
import { GameStandardContainerType } from "@/types/types";
import ListOfOffersWrapper from "./offer-item/listOfOffersWrapper";

interface RestOfOffersProps {
    groupedCategories: GameStandardContainerType[][];
}

const justifyClasses = [
    "justify-content-start",
    "justify-content-center",
    "justify-content-end",
];

const RestOfOffers = ({ groupedCategories }: RestOfOffersProps) => {
    return groupedCategories.map((group: any) => {
        return group.map((e: any, index: number) => {
            return (
                <section className={`col-md-4 col-sm-12 p-0 mt-4 d-flex ${justifyClasses[index]}`} key={index}>
                    <ListOfOffersWrapper
                        key={index}
                        title={e.title}
                        gameImage={e.gameImage}
                        platform={e.platform}
                        discount={e.discount}
                        oldPrice={e.oldPrice}
                        currentPrice={e.currentPrice}
                        webOffer={e.webOffer}
                        classes={e.classes}
                    />
                </section>
            );
        });
    });
};

export default RestOfOffers;
