"use client"

import React, { useState } from "react"
import FranchiseCard from "@/components/general/franchise-games-card/franchise-card";
import styles from "@/styles/layout/gamepage/franchise.module.scss"

const FranchiseController = () => {

    const [isExtended, setIsExtended] = useState(false);

    const allFranchiseElements = [<FranchiseCard key={1} />, <FranchiseCard key={2} />, <FranchiseCard key={3} />, <FranchiseCard key={4} />, <FranchiseCard key={5} />, <FranchiseCard key={6} />]

    let shouldShowButton = false;
    const resumeFranchiseGames = [];

    const toggleExtension = () => {
        setIsExtended(e => !e);
    };

    if (allFranchiseElements.length > 3) {
        let resumedGames = allFranchiseElements.slice(0, 3);
        resumeFranchiseGames.push(resumedGames);
        shouldShowButton = true;
    }

    return <>
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                {isExtended ? allFranchiseElements : resumeFranchiseGames}
            </div>
            <div className="row d-flex justify-content-center">
                {shouldShowButton && (
                <button
                    className={styles["button-see-offers"]}
                    onClick={toggleExtension}>
                    Mostrar toda la Franquicia
                </button>
            )}
            </div>
        </div>
    </>
};

export default FranchiseController;