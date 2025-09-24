import React from "react";
import styles from "@/styles/layout/gamepage/related-offers.module.scss"
import ContentDistributionManager from "./content-distribution-manager";
import { verticalContainerProps } from "@/types/types";

/* Example Values */

import platform from "@/resources/platforms/pc.svg"
import store from "@/resources/stores/greenman.png"

const RelatedOffers = ({ offersData }: verticalContainerProps) => {
    return (
        <div className="related-offers-container">
            <h1 className={styles["title"]}>Quizás también te guste</h1>
            <ContentDistributionManager gameInfo={offersData} />
        </div>
    )
};

export default RelatedOffers;