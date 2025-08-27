import React from "react";
import { listFormatOfferProps } from "@/types/types";

interface ContentDistributionType {
    offersByPercentage: listFormatOfferProps[];
    historicLowsOffers: listFormatOfferProps[];
}

const IsMobile = ({ offersByPercentage, historicLowsOffers }: ContentDistributionType) => {
    return <>
        <h1>Movil</h1>
    </>
};

export default IsMobile;