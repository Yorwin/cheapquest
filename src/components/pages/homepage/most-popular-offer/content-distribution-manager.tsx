"use client"

import React from "react";
import useWindowWidth from "@/functions/hooks/useWindowWidth";
import { GameStandardContainerType } from "@/types/types";
import SkeletonLoader from "@/components/general/skelettonLoader";

/* Responsive Elements */

import IsDesktop from "./responsive-elements/isDesktop";
import IsTablet from "./responsive-elements/isTablet";
import IsMobile from "./responsive-elements/isMobile";

import { mainClasses, secondaryClasses } from "@/functions/classes";

interface gameInfo {
    gameInfo: GameStandardContainerType[];
}

const ContentDistributionManager = ({ gameInfo }: gameInfo) => {

    const width = useWindowWidth();

    if (width === 0) {
        return <SkeletonLoader />;
    }

    const isDesktop = width > 992;
    const isTablet = width <= 992 && width > 768;
    const isMobile = width <= 768;

    return (<>
        {
            isDesktop &&
            <IsDesktop
                gameInfo={gameInfo}
                mainClasses={mainClasses}
                secondaryClasses={secondaryClasses}
                width={width}
            />
        }

        {
            isTablet &&
            <IsTablet
                gameInfo={gameInfo}
                mainClasses={mainClasses}
                width={width}
            />
        }

        {
            isMobile &&
            <IsMobile
                gameInfo={gameInfo}
                mainClasses={mainClasses}
                width={width}
            />
        }
    </>)
};

export default ContentDistributionManager;