import styles from "@/styles/components/offer-card.module.scss"
import Image from "next/image";
import Link from "next/link";

/* Utils */
import { getGameOffers } from "@/utils/getGamesInfo";

/* SVG */
import NoOffersFound from "@/resources/error-image/no-offer-found.svg";

const OfferCard = async ({ gameName }: { gameName: string }) => {

    const getOffers = await getGameOffers(gameName);
    const bestOffer = getOffers?.bestOffer;

    if (!bestOffer) {
        return (
            <section className={styles["offer-card"]}>
                <h3>{gameName}</h3>
                <div className={styles["no-offer-found"]}>
                    <Image
                        src={NoOffersFound}
                        alt={`No offers found for ${gameName}`}
                        sizes="20vw"
                        fill
                        className={styles["image"]}
                    />
                </div>
                <h3>No tenemos ofertas disponibles</h3>
            </section>
        );
    }

    const titleOffer = bestOffer.gameTitle;
    const discount = bestOffer.discount;
    const normalPrice = bestOffer.normalPrice;
    const currentPrice = bestOffer.currentPrice;
    const storeImage = bestOffer.store?.image;
    const storeName = bestOffer.store?.name;
    const url = bestOffer.url;

    return (
        <section className={styles["offer-card"]}>
            <h1>
                <span className={styles["title"]}> MEJOR OFERTA </span>
                <div className={styles["title-spacing"]}></div>
                <span className={styles["game-title"]}>{titleOffer}</span>
            </h1>
            <div className={styles["offer-info-container"]}>
                {storeImage && (
                    <div className={styles["offer-info"]}>
                        <Image
                            src={storeImage}
                            alt={`Mejor oferta para ${bestOffer.gameTitle} dada por ${storeName}`}
                            title={`${bestOffer.store}`}
                            sizes="20vw"
                            fill
                            className={styles["image"]}
                        />
                    </div>
                )}
            </div>
            <div className={styles["prices"]}>
                <div className={styles["old-discount-container"]}>
                    <span className={styles["old-price"]}>{normalPrice}</span>
                    <span className={styles["discount"]}>{discount}</span>
                </div>
                <span className={styles["current-price"]}>{currentPrice}</span>
            </div>
            <Link
                href={`${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["offer-button"]}
            >
                Ir a la oferta
            </Link>
        </section>
    )
};

/* const OfferCard = ({ gameName }: { gameName: string }) => {
    const [offers, setOffers] = useState<any>(null);
    const [gameData, setGameData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);

                // Fetch offers
                const offersRes = await fetch(`/api/get-game-offers/${encodeURIComponent(gameName)}`);
                if (!offersRes.ok) throw new Error('Failed to fetch offers');
                const offersData = await offersRes.json();

                // Fetch game data
                const gameRes = await fetch(`/api/get-game-data/${encodeURIComponent(gameName)}`);
                if (!gameRes.ok) throw new Error('Failed to fetch game data');
                const gameDataResult = await gameRes.json();

                setOffers(offersData);
                setGameData(gameDataResult);
            } catch (err) {
                console.error('Error fetching offer card data:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (gameName) {
            fetchData();
        }
    }, [gameName]);

    if (loading) {
        return (
            <section className={styles["offer-card"]}>
                <div className={styles["loading-placeholder"]}>
                    <div className={styles["spinner"]}></div>
                </div>
            </section>
        );
    }

    if (error || !offers?.bestOffer) {
        return (
            <section className={styles["offer-card"]}>
                <h3>{gameData?.title || gameName}</h3>
                <div className={styles["no-offer-found"]}>
                    <Image
                        src={NoOffersFound}
                        alt={`No offers found for ${gameData?.title || gameName}`}
                        sizes="20vw"
                        fill
                        className={styles["image"]}
                    />
                </div>
                <h3>No tenemos ofertas disponibles</h3>
            </section>
        );
    }

    const titleOffer = offers.bestOffer.gameTitle;
    const gameTitle = gameData?.title;
    const discount = offers.bestOffer.discount;
    const normalPrice = offers.bestOffer.normalPrice;
    const currentPrice = offers.bestOffer.currentPrice;
    const storeImage = offers.bestOffer.store?.image;
    const storeName = offers.bestOffer.store?.name;
    const url = offers.bestOffer.url;

    return (
        <section className={styles["offer-card"]}>
            <h1>
                <span className={styles["title"]}> MEJOR OFERTA </span>
                <div className={styles["title-spacing"]}></div>
                <span className={styles["game-title"]}>{gameTitle || titleOffer}</span>
            </h1>
            <div className={styles["offer-info-container"]}>
                {storeImage && (
                    <div className={styles["offer-info"]}>
                        <Image
                            src={storeImage}
                            alt={`Mejor oferta para ${gameTitle || titleOffer} dada por ${storeName}`}
                            title={storeName}
                            sizes="20vw"
                            fill
                            className={styles["image"]}
                        />
                    </div>
                )}
            </div>
            <div className={styles["prices"]}>
                <div className={styles["old-discount-container"]}>
                    <span className={styles["old-price"]}>{normalPrice}</span>
                    <span className={styles["discount"]}>{discount}</span>
                </div>
                <span className={styles["current-price"]}>{currentPrice}</span>
            </div>
            <Link
                href={`${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["offer-button"]}
            >
                Ir a la oferta
            </Link>
        </section>
    );
}; */

export default OfferCard;