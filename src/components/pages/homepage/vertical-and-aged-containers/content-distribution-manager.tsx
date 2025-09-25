"use client"

import React from "react";
import useWindowWidth from "@/functions/hooks/useWindowWidth";
import SkeletonLoader from "@/components/general/skelettonLoader";
import { GameStandardContainerType, VerticalCardContainerType, VerticalCardWrapperType } from "@/types/types";

/* Responsive Containers */
import IsDesktop from "../../../general/vertical-card/responsive-elements/isDesktop";
import IsMobile from "../../../general/vertical-card/responsive-elements/isMobile";
import IsTablet from "../../../general/vertical-card/responsive-elements/isTablet";

interface ContentDistributionType {
    gameInfo: VerticalCardWrapperType[];
}

const ContentDistributionManager = ({ gameInfo }: ContentDistributionType) => {

    const width = useWindowWidth();

    if (width === 0) {
        return <SkeletonLoader />;
    }

    const isDesktop = width > 992;
    const isTablet = width <= 992 && width > 768;
    const isMobile = width <= 768;

    return (<>
        {isDesktop &&
            <IsDesktop offersData={gameInfo}></IsDesktop>}

        {isTablet &&
            <IsTablet offersData={gameInfo}></IsTablet>}

        {isMobile &&
            <IsMobile offersData={gameInfo}></IsMobile>}
    </>)
};

export default ContentDistributionManager;