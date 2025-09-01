import styles from "@/styles/layout/homepage/most-popular-offer.module.scss"
import { responsiveMobileDesignProps, GameStandardContainerType } from "@/types/types";

/* Kind of Offers */
import MainOffer from "@/components/pages/homepage/most-popular-offer/components/mainOffer";
import RestOfOffers from "../components/listOfOffers/listOfOffers";

const IsMobile = ({ gameInfo, mainClasses, width }: responsiveMobileDesignProps) => {

    const bigOffer: GameStandardContainerType = gameInfo[0];
    const slicedROL = gameInfo.slice(2, 10);
    const secondBigOffer: GameStandardContainerType = gameInfo[10];

    const groupedGames = [];

    for (let i = 0; i < slicedROL.length; i += 2) {
        groupedGames.push(slicedROL.slice(i, i + 2));
    }

    return (
        <div className={`${styles["offers-container"]} mb-5`}>

            <div className={styles["first-row"]}>
                <MainOffer
                    title={bigOffer.title}
                    gameImage={bigOffer.gameImage}
                    platform={bigOffer.platform}
                    discount={bigOffer.discount}
                    oldPrice={bigOffer.oldPrice}
                    currentPrice={bigOffer.currentPrice}
                    webOffer={bigOffer.webOffer}
                    classes={mainClasses}
                />
            </div>

            <section className="container-fluid mb-4">
                <div className="row">
                    <RestOfOffers groupedCategories={groupedGames} resolution={width} />
                </div>
            </section>

            <div className={styles["first-row"]}>
                <MainOffer
                    title={secondBigOffer.title}
                    gameImage={secondBigOffer.gameImage}
                    platform={secondBigOffer.platform}
                    discount={secondBigOffer.discount}
                    oldPrice={secondBigOffer.oldPrice}
                    currentPrice={secondBigOffer.currentPrice}
                    webOffer={secondBigOffer.webOffer}
                    classes={mainClasses}
                />
            </div>
        </div>
    )
};

export default IsMobile;