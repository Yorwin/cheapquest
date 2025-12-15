import styles from "@/styles/layout/gamepage/franchise.module.scss"
import { getGameData, getFranchiseGames } from "@/utils/getGamesInfo";
import SafeRender from "@/components/general/safe-render";
import FranchiseController from "@/components/general/franchise-games-card/franchise-controller";
import { Franchise } from "@/types/types"

const FranchiseGames = async ({ gameId }: { gameId: string }) => {

    const id = gameId;
    let title;
    let franchiseData: Franchise[] = [];

    if (id) {
        let info = await getGameData(id);
        franchiseData = await getFranchiseGames(id);
        title = info?.title;
    }

    return (
        <SafeRender when={franchiseData.length > 0 ? franchiseData.length : franchiseData}>
            <div id="franquicia" className={styles["franchise-container"]}>
                <h3 className={styles["title"]}>La Franquicia de {title}</h3>
                <div className={styles["franchise-cards-container"]}>
                    <FranchiseController franchiseData={franchiseData} />
                </div>
            </div>
        </SafeRender>
    )
};

export default FranchiseGames;