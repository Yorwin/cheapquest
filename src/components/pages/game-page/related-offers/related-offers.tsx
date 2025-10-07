import React from "react";
import styles from "@/styles/layout/gamepage/related-offers.module.scss"
import ContentDistributionManager from "./content-distribution-manager";
import { getGameId, getSameGenre, getGameData } from "@/utils/getGamesInfo";
import SafeRender from "@/components/general/safe-render";

/* Example Values */

const RelatedOffers = async ({ gameName }: { gameName: string }) => {

    const id = await getGameId(gameName);
    let mainGenre;
    let offersData;

    if (id) {
        /* Genre */
        mainGenre = await getGameData(id);
        mainGenre = mainGenre?.about_the_game.original_lang_genres[0].id;

        /* Offers */
        offersData = await getSameGenre(Number(mainGenre), Number(id));
    }

    return (
        <SafeRender when={mainGenre}>
            <div className="related-offers-container">
                <h1 className={styles["title"]}>Quizás también te guste</h1>
                <ContentDistributionManager gameInfo={offersData} />
            </div>
        </SafeRender>
    )
};

export default RelatedOffers;