import React from "react";
import styles from "@/styles/layout/gamepage/franchise.module.scss"
import FranchiseController from "@/components/general/franchise-games-card/franchise-controller";
import { Franchise } from "@/types/types"

interface FranchiseComponent {
    title: string,
    franchiseData: Franchise[],
}

const FranchiseGames = ({ title, franchiseData }: FranchiseComponent) => {
    return (
        <div className={styles["franchise-container"]}>
            <h1 className={styles["title"]}>La Franquicia de {title}</h1>
            <div className={styles["franchise-cards-container"]}>
                <FranchiseController franchiseData={franchiseData}/>
            </div>
        </div>
    )
};

export default FranchiseGames;