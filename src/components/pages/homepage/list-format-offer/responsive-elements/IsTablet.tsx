"use client"

import React, { useState, useEffect } from "react";
import { listFormatOfferProps } from "@/types/types";
import Title from "../components/title";

interface ContentDistributionType {
    offersByPercentage: listFormatOfferProps[];
    historicLowsOffers: listFormatOfferProps[];
}

const IsTablet = ({ offersByPercentage, historicLowsOffers }: ContentDistributionType) => {

    const [buttonState, setButtonState] = useState("best-offers");

    const toggleOffers = () => {

        if (buttonState === "best-offers") {
            setButtonState("historical-lows");
        } else {
            setButtonState("best-offers")
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <button onClick={toggleOffers}>
                        <Title titleState={buttonState} />
                    </button>
                    {/* <article className={styles["list-offer-format-container"]}>
                        {listHistoricLows}
                    </article> */}
                </div>
            </div>
        </div>
    )
};

export default IsTablet;