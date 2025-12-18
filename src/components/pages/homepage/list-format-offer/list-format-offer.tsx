import styles from "@/styles/layout/homepage/list-format-offers.module.scss"
import Image from "@/resources/offer-img/image.jpg"
import { offersByPercentage, historicalLows } from "@/utils/getOffers";
import { getCurrency, formatPrice } from "@/lib/currencies";
import ErrorGameStandard from "@/components/general/error-loading-offers-fallback-container";
import ContentDistributionManager from "./content-distribution-manager";
import NoImageFound from "@/resources/no-image-found/no-image-found.webp";

const ListFormatOffers = async () => {
    try {
        const offers = await offersByPercentage();
        const currency = await getCurrency();

        const bestOffersByPercentage = offers.map((offer: any) => {
            if (offer) {
                return {
                    offerImage: offer.background_image !== null ? offer.background_image : NoImageFound.src,
                    gameTitle: offer.title,
                    gameDescription: "Example Game",
                    oldPrice: `${formatPrice(Number(offer.normalPrice), currency)}`,
                    currentPrice: `${formatPrice(Number(offer.salePrice), currency)}`,
                    discountPercentage: `${Number(offer.savings).toFixed(0)}%`
                };
            } else {
                return {
                    offerImage: Image,
                    gameTitle: "Example Game",
                    gameDescription: "Example Game",
                    oldPrice: `${formatPrice(10.99, currency)}`,
                    currentPrice: `${formatPrice(10.99, currency)}`,
                    discountPercentage: `45%`
                };
            }
        })

        const historical = await historicalLows();

        const historicalLowsOffers = historical.map((offer: any) => {
            if (offer) {
                return {
                    offerImage: offer.background_image !== null ? offer.background_image : NoImageFound.src,
                    gameTitle: offer.title,
                    gameDescription: "Example Game",
                    oldPrice: `${formatPrice(Number(offer.bestDeal.retailPrice), currency)}`,
                    currentPrice: `${formatPrice(Number(offer.bestDeal.price), currency)}`,
                    discountPercentage: `${Number(offer.bestDeal.savings).toFixed(0)}%`
                }
            } else {
                return {
                    offerImage: Image,
                    gameTitle: "Example Game",
                    gameDescription: "Example Game",
                    oldPrice: `${formatPrice(10.99, currency)}`,
                    currentPrice: `${formatPrice(10.99, currency)}`,
                    discountPercentage: `45%`
                }
            }
        });

        return <>
            <section id="historical-and-percentage-offers" className={styles["list-format-offers-container"]}>
                <ContentDistributionManager offersByPercentage={bestOffersByPercentage} historicLowsOffers={historicalLowsOffers}></ContentDistributionManager>
            </section>
        </>
    } catch (error) {
        console.error(`Se ha producido un error al intentar cargar los juegos y las ofertas ${error}`);
        return <>
            <section className={styles["list-format-offers-container"]}>
                <ErrorGameStandard />
            </section>
        </>
    }
}

export default ListFormatOffers;