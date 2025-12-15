import Link from "next/link";
import styles from "@/styles/layout/gamepage/navigation-menu.module.scss";
import { getGameInfoGamePage } from "@/utils/getGamesInfo";

const NavigationMenu = async ({ gameName }: { gameName: string }) => {

    const getGameInfo = await getGameInfoGamePage(gameName);

    const navigationRefs = {
        trailer: "#tráiler",
        screenshots: "#capturas",
        description: "#descripción",
        game_info: "#información-del-juego",
        tags: "#tags",
        reviews: "#reviews",
        media_reviews: "#análisis-de-medios",
        stores_comparison: "#precios-de-comparación",
        related: "#juegos-relacionados-en-oferta",
        franchise: "#franquicia",
    };

    const hasContent = {
        hasTrailer: Boolean(getGameInfo?.gameTrailer),
        hasScreenshots: Boolean(getGameInfo?.image.screenshots && getGameInfo?.image.screenshots.length > 0),
        hasGameInfo: Boolean(getGameInfo?.about_the_game),
        hasDescription: Boolean(getGameInfo?.description),
        hasReviews: Boolean(getGameInfo?.reviews),
        hasMediaReviews: Boolean(getGameInfo.media_reviews && getGameInfo?.media_reviews?.length > 0),
        hasStoresComparison: Boolean(getGameInfo?.restOfTheOffers && getGameInfo?.restOfTheOffers?.length > 0),
        hasSameGenre: Boolean(getGameInfo.sameGenre && getGameInfo.sameGenre.length > 0),
        hasFranchise: Boolean(getGameInfo.franchise && getGameInfo.franchise.length > 0),
        hasTags: Boolean(getGameInfo.about_the_game?.tags && getGameInfo.about_the_game?.tags.length > 0),
    }

    return (
        <nav className={styles["navigation-container"]}>
            <ul>
                {hasContent.hasTrailer && (
                    <li className={styles["list-item"]}>
                        <Link href={navigationRefs.trailer}>Trailer</Link>
                    </li>
                )}
                {hasContent.hasScreenshots && (
                    <li className={styles["list-item"]}>
                        <Link href={navigationRefs.screenshots}>Capturas del Juego</Link>
                    </li>
                )}
                {hasContent.hasDescription && (
                    <li className={styles["list-item"]}>
                        <Link href={navigationRefs.description}>Descripción</Link>
                    </li>
                )}
                {hasContent.hasGameInfo && (
                    <li className={styles["list-item"]}>
                        <Link href={navigationRefs.game_info}>Información del juego</Link>
                    </li>
                )}
                {hasContent.hasTags && (
                    <li className={styles["list-item"]}>
                        <Link href={navigationRefs.tags}>Tags</Link>
                    </li>
                )}
                {hasContent.hasReviews && (
                    <li className={styles["list-item"]}>
                        <Link href={navigationRefs.reviews}>Reviews</Link>
                    </li>
                )}
                {hasContent.hasMediaReviews && (
                    <li className={styles["list-item"]}>
                        <Link href={navigationRefs.media_reviews}>Análisis de medios</Link>
                    </li>
                )}
                {hasContent.hasStoresComparison && (
                    <li className={styles["list-item"]}>
                        <Link href={navigationRefs.stores_comparison}>Comparador de precios</Link>
                    </li>
                )}
                {hasContent.hasFranchise && (
                    <li className={styles["list-item"]}>
                        <Link href={navigationRefs.franchise}>Franquicia</Link>
                    </li>
                )}
                {hasContent.hasSameGenre && (
                    <li className={styles["list-item"]}>
                        <Link href={navigationRefs.related}>Juegos en oferta relacionados</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
};

export default NavigationMenu;