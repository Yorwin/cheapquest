import React from "react";
import styles from "@/styles/layout/gamepage/franchise.module.scss"
import FranchiseController from "@/components/general/franchise-games-card/franchise-controller";

const FranchiseGames = () => {
    return (
        <div className={styles["franchise-container"]}>
            <h1 className={styles["title"]}>La Franquicia de Example Games</h1>
            <div className={styles["franchise-cards-container"]}>
                <FranchiseController />
            </div>
        </div>
    )
};

export default FranchiseGames;