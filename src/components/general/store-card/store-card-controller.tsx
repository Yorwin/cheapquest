"use client"

import { useState } from "react"
import StoreCard from "./store-card"
import styles from "@/styles/components/store-card.module.scss"
import { comparisonOfferType } from "@/types/types"

const StoreCardController = ({ offersData }: { offersData: comparisonOfferType[] | undefined }) => {

    if (!offersData) {
        return null;
    }

    const [isExtended, setIsExtended] = useState(false)

    const sortedOffers = [...offersData].sort(
        (a, b) => parseFloat(a.currentPrice) - parseFloat(b.currentPrice)
    );

    const AllStores = sortedOffers.map((e, index) => {
        return <StoreCard offersData={e} key={index} />
    });

    const shouldShowButton = AllStores.length > 3

    const toggleExtended = () => {
        setIsExtended(e => !e)
    }

    return (
        <div className={styles["stores-container"]}>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    {AllStores.map((store, index) => (
                        <div
                            key={index}
                            className={`col-12 p-0  ${index >= 3 && !isExtended ? styles['hidden-store-card'] : ''}`}
                        >
                            {store}
                        </div>
                    ))}
                </div>
                {shouldShowButton && (
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <button
                                className={styles["button-see-offers"]}
                                onClick={toggleExtended}
                            >
                                {isExtended ? 'Resumir' : `Mostrar las ${AllStores.length} ofertas`}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StoreCardController