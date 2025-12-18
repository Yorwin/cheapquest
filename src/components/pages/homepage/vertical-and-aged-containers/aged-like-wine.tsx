import styles from "@/styles/layout/homepage/vertical-offers.module.module.scss"
import { StaticImageData } from "next/image";
import { GameDealWithoutScore, StoreLogo, VerticalCardWrapperType } from "@/types/types";
import { getCurrency, formatPrice } from "@/lib/currencies";

/* Resources */
import { storeLogos } from "@/resources/stores_icons";

/* Components */
import ContentDistributionManager from "./content-distribution-manager";

/* Utilis */
import searchForStore from "@/utils/seachForStore";
import { getGameInfo } from "@/utils/getGamesInfo";
import { getAgedLikeWineGames } from "@/utils/getOffers";

/* Fallback */
import NoImageFound from "@/resources/no-image-found/no-image-found.webp";
import ErrorGameStandard, { inCaseOfError } from "@/components/general/error-loading-offers-fallback-container";

const AgedLikeWine = async () => {
    try {
        const listOfStores = await searchForStore();
        const AgedLikeWineGames = await getAgedLikeWineGames();
        const currency = await getCurrency();

        if (!AgedLikeWineGames) {
            throw new Error("Error al intentar obtener ofertas de juegos antiguos");
        }

        const platforms = {
            PC: "bi bi-display",
            Xbox: "bi bi-xbox",
            PlayStation: "bi bi-playstation",
        }

        const agedLikeWine: VerticalCardWrapperType[] = [];

        for (let i = 0; i <= AgedLikeWineGames.length - 1; i++) {

            const game = AgedLikeWineGames[i];
            if (!game) throw new Error("Juego no encontrado en la lista");

            const getInfo = await getGameInfo(AgedLikeWineGames[i].title);

            const gameTitle = AgedLikeWineGames[i].title;
            const gameImage = getInfo.results[0].background_image !== null ? getInfo.results[0].background_image : NoImageFound.src;
            const discount = AgedLikeWineGames[i].savings;
            const price: number = Number(AgedLikeWineGames[i].salePrice);
            const regularPrice: number = Number(AgedLikeWineGames[i].normalPrice);

            const store = listOfStores.find((e: GameDealWithoutScore) => e.storeID === AgedLikeWineGames[i].storeID);
            const storeImage = storeLogos.find((e: StoreLogo) => e.name === store.storeName);
            const inCaseOfErrorImage: StaticImageData = listOfStores[Number(inCaseOfError[0].storeID)];

            agedLikeWine.push({
                gameImage: gameImage,
                title: gameTitle,
                oldPrice: `${formatPrice(regularPrice, currency)}`,
                currentPrice: `${formatPrice(price, currency)}`,
                discount: `${Number(discount).toFixed(0)}%`,
                platform: platforms.PC,
                webOffer: storeImage?.image ?? inCaseOfErrorImage,
            })
        }

        return <>
            <section id="aged-like-wine" className={styles["aged-like-wine-offers-main-container"]}>
                <h1 className={styles["title"]}>VINTAGE</h1>
                <ContentDistributionManager gameInfo={agedLikeWine} />
            </section>
        </>

    } catch (error) {
        console.error(`Se ha producido un error al intentar cargar los juegos y las ofertas ${error}`);
        return <section className={styles["aged-like-wine-offers-main-container"]}>
            <ErrorGameStandard />
        </section>

    }
};

export default AgedLikeWine;