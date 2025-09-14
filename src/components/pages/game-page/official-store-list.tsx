import React from "react";
import styles from "@/styles/layout/gamepage/official-store-list.module.scss"
import StoreCardController from "@/components/general/store-card/store-card-controller";
import { comparisonOfferType } from "@/types/types";

const OfficialStoreList = ({ restOfTheOffers }: { restOfTheOffers: comparisonOfferType[] }) => {    
    return (
        <div className={styles["official-stores-container"]}>
            <h2>COMPARA PRECIOS EN TIENDAS OFICIALES</h2>
            <div className={styles["offers-container"]}>
                <StoreCardController offersData={restOfTheOffers}/>
            </div>
        </div>
    )
};

export default OfficialStoreList;