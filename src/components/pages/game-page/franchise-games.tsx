import React from "react";
import styles from "@/styles/layout/gamepage/franchise.module.scss"
import { getGameId, getGameData, getFranchiseGames } from "@/utils/getGamesInfo";
import SafeRender from "@/components/general/safe-render";
import FranchiseController from "@/components/general/franchise-games-card/franchise-controller";
import { Franchise } from "@/types/types"

const FranchiseGames = async ({ gameName }: { gameName: string }) => {

    const id = await getGameId(gameName);
    let title;
    let franchiseData: Franchise[] = [];

    if (id) {
        let info = await getGameData(id);
        franchiseData = await getFranchiseGames(id);
        title = info?.title;
    }

    return (
        <SafeRender when={franchiseData.length > 0 ? franchiseData.length : franchiseData}>
            <div className={styles["franchise-container"]}>
                <h1 className={styles["title"]}>La Franquicia de {title}</h1>
                <div className={styles["franchise-cards-container"]}>
                    <FranchiseController franchiseData={franchiseData} />
                </div>
            </div>
        </SafeRender>
    )
};

export default FranchiseGames;