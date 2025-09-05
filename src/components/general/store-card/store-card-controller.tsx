"use client"

import React, { useState } from "react"
import StoreCard from "./store-card";
import styles from "@/styles/components/store-card.module.scss"

const StoreCardController = () => {

    const AllStores = [<StoreCard key={1} />, <StoreCard key={2} />, <StoreCard key={3} />, <StoreCard key={4} />, <StoreCard key={5} />, <StoreCard key={6} />]
    const storesResumed = AllStores.slice(0, 3);

    const [isExtended, setIsExtended] = useState(false);
    const shouldShowButton = AllStores.length > 3;

    const toggleExtended = () => {
        setIsExtended(e => !e);
    };

    return (
        <div className={styles["stores-container"]}>
            {isExtended ? AllStores : storesResumed}
            {shouldShowButton ?
                <button
                    className={styles["button-see-offers"]}
                    onClick={toggleExtended}>
                    {isExtended ? 'Resumir' : `Mostrar las ${AllStores.length} ofertas`}
                </button>
                : null}
        </div>
    )
};

export default StoreCardController;