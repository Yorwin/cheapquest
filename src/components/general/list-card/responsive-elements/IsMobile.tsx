import React, { useState } from "react";
import { listFormatOfferProps } from "@/types/types";
import ListFormatOffersWrapper from "@/components/general/list-card/list-format-offer-wrapper";
import Title from "../components/title";
import styles from "@/styles/layout/homepage/list-format-offers.module.scss"

interface ContentDistributionType {
    offersByPercentage: listFormatOfferProps[];
    historicLowsOffers: listFormatOfferProps[];
}

const IsMobile = ({ offersByPercentage, historicLowsOffers }: ContentDistributionType) => {

    const [buttonState, setButtonState] = useState("best-offers");

    const toggleOffers = () => {

        if (buttonState === "best-offers") {
            setButtonState("historical-lows");
        } else {
            setButtonState("best-offers")
        }
    }

    const listOffersByPercentage = offersByPercentage.map((e, index) => {
        return (
            <ListFormatOffersWrapper
                key={index}
                index={index}
                offerImage={e.offerImage}
                gameTitle={e.gameTitle}
                oldPrice={e.oldPrice}
                currentPrice={e.currentPrice}
                discountPercentage={e.discountPercentage}
            />
        )
    });

    const listHistoricLows = historicLowsOffers.map((e, index) => {
        return (
            <ListFormatOffersWrapper
                key={index}
                index={index}
                offerImage={e.offerImage}
                gameTitle={e.gameTitle}
                oldPrice={e.oldPrice}
                currentPrice={e.currentPrice}
                discountPercentage={e.discountPercentage}
            />
        )
    });

    return (
        <div className="container-fluid p-0">
            <div className="row">
                <div className="col-12 d-flex flex-column align-items-center">
                    <button onClick={toggleOffers} className={styles["button-title"]}>
                        <Title titleState={buttonState} />
                    </button>
                    <article className={styles["list-offer-format-container"]}>
                        {buttonState === "best-offers" ? listOffersByPercentage : listHistoricLows}
                    </article>
                </div>
            </div>
        </div>
    )
};

export default IsMobile;