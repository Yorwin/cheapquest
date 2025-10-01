import React from "react";
import styles from "@/styles/layout/gamepage/related-offers.module.scss"
import ContentDistributionManager from "./content-distribution-manager";
import { VerticalCardWrapperType } from "@/types/types";

/* Example Values */

const RelatedOffers = ({ offersData }: { offersData: VerticalCardWrapperType[] | null }) => {
    if (offersData) return (
        <div className="related-offers-container">
            <h1 className={styles["title"]}>Quizás también te guste</h1>
            <ContentDistributionManager gameInfo={offersData} />
        </div>
    )
};

export default RelatedOffers;