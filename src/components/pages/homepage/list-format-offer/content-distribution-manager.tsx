"use client"

import React from "react";
import { listFormatOfferProps } from "@/types/types";
import useWindowWidth from "@/functions/hooks/useWindowWidth";
import SkeletonLoader from "@/components/general/skelettonLoader";

/* Responsive Elements */
import IsDesktop from "./responsive-elements/IsDekstop";
import IsTablet from "./responsive-elements/IsTablet";
import IsMobile from "./responsive-elements/IsMobile";

interface ContentDistributionType {
    offersByPercentage: listFormatOfferProps[];
    historicLowsOffers: listFormatOfferProps[];
}

const ContentDistributionManager = ({ offersByPercentage, historicLowsOffers }: ContentDistributionType) => {
    const width = useWindowWidth();

    if (width === 0) {
        return <SkeletonLoader />;
    }

    const isDesktop = width > 992;
    const isTablet = width <= 992 && width > 768;
    const isMobile = width <= 768;

    return (<>
        {isDesktop &&
            <IsDesktop offersByPercentage={offersByPercentage} historicLowsOffers={historicLowsOffers}></IsDesktop>}

        {isTablet &&
            <IsTablet offersByPercentage={offersByPercentage} historicLowsOffers={historicLowsOffers}></IsTablet>}

        {isMobile &&
            <IsMobile offersByPercentage={offersByPercentage} historicLowsOffers={historicLowsOffers}></IsMobile>}
    </>)

};

export default ContentDistributionManager;
