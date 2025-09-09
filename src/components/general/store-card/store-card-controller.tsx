"use client"

import React, { useState } from "react"
import StoreCard from "./store-card"
import styles from "@/styles/components/store-card.module.scss"

const StoreCardController = () => {
    const [isExtended, setIsExtended] = useState(false)

    const AllStores = [
        <StoreCard key={1} />,
        <StoreCard key={2} />,
        <StoreCard key={3} />,
        <StoreCard key={4} />,
        <StoreCard key={5} />,
        <StoreCard key={6} />
    ]

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
                            className={`col-12  ${index >= 3 && !isExtended ? styles['hidden-store-card'] : ''}`}
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