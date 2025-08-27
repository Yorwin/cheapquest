import React from "react";
import { listFormatOfferProps } from "@/types/types";
import ListFormatOfferWrapper from "@/components/general/list-card/list-format-offer-wrapper";
import styles from "@/styles/layout/homepage/list-format-offers.module.scss"

interface ContentDistributionType {
    offersByPercentage: listFormatOfferProps[];
    historicLowsOffers: listFormatOfferProps[];
}

const IsDesktop = ({ offersByPercentage, historicLowsOffers }: ContentDistributionType) => {

    const listOffersByPercentage = offersByPercentage.map((e, index) => {
        return (
            <ListFormatOfferWrapper
                key={index}
                index={index}
                link="#"
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
            <ListFormatOfferWrapper
                key={index}
                index={index}
                link="#"
                offerImage={e.offerImage}
                gameTitle={e.gameTitle}
                oldPrice={e.oldPrice}
                currentPrice={e.currentPrice}
                discountPercentage={e.discountPercentage}
            />
        )
    });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <h1 className={styles["title"]}>MEJORES OFERTAS POR %</h1>
                    <article className={styles["list-offer-format-container"]}>
                        {listOffersByPercentage}
                    </article>
                </div>
                <div className="col-md-6 col-sm-12">
                    <h1 className={styles["title"]}>BAJOS HISTORICOS</h1>
                    <article className={styles["list-offer-format-container"]}>
                        {listHistoricLows}
                    </article>
                </div>
            </div>
        </div>
    )
};

export default IsDesktop;