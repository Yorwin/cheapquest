import styles from "@/styles/layout/gamepage/related-offers.module.scss"
import ContentDistributionManager from "./content-distribution-manager";
import { getSameGenre, getGameData } from "@/utils/getGamesInfo";
import SafeRender from "@/components/general/safe-render";

/* Example Values */

const RelatedOffers = async ({ gameId }: { gameId: string }) => {

    const id = gameId;
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
                <h3 className={styles["title"]}>Quizás también te guste</h3>
                <ContentDistributionManager gameInfo={offersData} />
            </div>
        </SafeRender>
    )
};

export default RelatedOffers;