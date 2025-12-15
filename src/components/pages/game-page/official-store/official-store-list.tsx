import styles from "@/styles/layout/gamepage/official-store-list.module.scss"
import { getGameOffers } from "@/utils/getGamesInfo";
import StoreCardController from "@/components/general/store-card/store-card-controller";
import SafeRender from "@/components/general/safe-render";

const OfficialStoreList = async ({ gameName }: { gameName: string }) => {

    const gameOffers = await getGameOffers(gameName);
    const restOfTheOffers = gameOffers?.restOfTheOffers;

    return (
        <SafeRender when={restOfTheOffers ? restOfTheOffers?.length > 0 : []}>
            <div id="precios-de-comparación" className={styles["official-stores-container"]}>
                <h3 className={styles["title"]}>COMPARA PRECIOS EN TIENDAS OFICIALES</h3>
                <div className={styles["offers-container"]}>
                    <StoreCardController offersData={restOfTheOffers} />
                </div>
            </div>
        </SafeRender>
    )
};
    
export default OfficialStoreList;