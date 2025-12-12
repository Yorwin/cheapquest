import styles from "@/styles/components/store-card.module.scss";
import Image from "next/image";
import Link from "next/link";
import { comparisonOfferType } from "@/types/types";

const StoreCard = ({ offersData }: { offersData: comparisonOfferType }) => {
    return (
        <div className={styles["store-card-container"]}>
            <div className={styles["image-container"]}>
                {offersData.store?.image && (
                    <Image
                        className={styles["image"]}
                        src={offersData.store.image}
                        alt={offersData.store.name ?? "Store"}
                        title={offersData.store.name ?? "Store"}
                        sizes="35vw"
                    />
                )}
            </div>

            <div className={styles["offer-data"]}>
                {/* Offer Info */}
                <div className={styles["offer-info-container"]}>
                    <span className={styles["game-title"]}>{offersData.gameTitle}</span>
                    {offersData.store?.name && (
                        <div className={styles["offer-specs"]}>
                            <h4 className={styles["store-name"]}>{offersData.store.name}</h4>
                        </div>
                    )}
                </div>

                {/* Prices Container */}
                <div className={styles["price-and-cta-container"]}>
                    <div className={styles["prices-container"]}>
                        <span className={styles["discount"]}>
                            <span>{offersData.discount}</span>
                        </span>
                        <div className={styles["prices"]}>
                            <del className={styles["old-price"]}>{offersData.normalPrice}</del>
                            <span className={styles["new-price"]}>{offersData.currentPrice}</span>
                        </div>
                    </div>

                    {/* Go to the Offer Button */}
                    <Link
                        href={`${offersData.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles["action-button"]}
                    >
                        Ir a la oferta
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StoreCard;
