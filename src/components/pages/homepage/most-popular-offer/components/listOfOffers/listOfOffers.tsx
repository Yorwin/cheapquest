import React from "react";
import { GameStandardContainerType } from "@/types/types";
import ListOfOffersWrapper from "./offer-item/listOfOffersWrapper";

interface RestOfOffersProps {
    groupedCategories: GameStandardContainerType[][];
    resolution: number;
}

const justifyClasses = [
    "justify-content-start",
    "justify-content-center",
    "justify-content-end",
];

const justifyClassesResponsive = [
    "justify-content-start",
    "justify-content-end",
];

const RestOfOffers = ({ groupedCategories, resolution }: RestOfOffersProps) => {
    return groupedCategories.map((group: any) => {
        return group.map((e: any, index: number) => {

            const justifyClass = resolution < 768 ? justifyClassesResponsive[index] : justifyClasses[index];

            return <section className={`col-6 col-md-4 col-sm-6 p-0 mt-4 d-flex ${justifyClass}`} key={index}>
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
        });
    });
};

export default RestOfOffers;
