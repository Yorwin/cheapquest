"use client"

import React, { useState } from "react"
import FranchiseCard from "@/components/general/franchise-games-card/franchise-card"
import styles from "@/styles/layout/gamepage/franchise.module.scss"

const FranchiseController = () => {
    const [isExtended, setIsExtended] = useState(false)

    const allFranchiseElements = [
        <FranchiseCard key={1} />,
        <FranchiseCard key={2} />,
        <FranchiseCard key={3} />,
        <FranchiseCard key={4} />,
        <FranchiseCard key={5} />,
        <FranchiseCard key={6} />
    ]

    const shouldShowButton = allFranchiseElements.length > 3

    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center mb-md-2 mb-lg-0">
                    {allFranchiseElements.map((element, index) => (
                        <div
                            key={index}
                            className={`col-sm-12 col-md-6 col-lg-4  ${index >= 3 && !isExtended ? styles['hidden-franchise-card'] : ''}`}
                        >
                            {element}
                        </div>
                    ))}
                </div>
                {shouldShowButton && (
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <button
                                className={styles["button-see-offers"]}
                                onClick={() => setIsExtended(!isExtended)}
                            >
                                {isExtended ? 'Mostrar menos' : 'Mostrar toda la Franquicia'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default FranchiseController