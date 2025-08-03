import React from "react";
import styles from "@/styles/layout/homepage/vertical-offers.module.module.scss"
import Image from "next/image";
import Link from "next/link";
import { storeLogos } from "@/resources/stores_icons"
import { getNewDeals } from "@/utils/getMostPopularOffers";
import getGameInfo from "@/utils/getGamesInfo";
import searchForStore from "@/utils/seachForStore";

const NewOffers = async () => {

    const newDeals = await getNewDeals();
    const listOfStores = await searchForStore();

    const platforms = {
        PC: "bi bi-display",
        Xbox: "bi bi-xbox",
        PlayStation: "bi bi-playstation",
    }

    const newOffers = [];

    for (let i = 0; i < newDeals.length; i++) {

        const store = listOfStores.find((e: any) => e.storeID === newDeals[i].storeID);
        const storeImage = storeLogos.find((e: any) => e.name === store.storeName);

        const gameInfo = await getGameInfo(newDeals[i].title);
        const result = gameInfo.results[0];

        newOffers.push({
            offerImage: result.background_image,
            gameTitle: result.name,
            currentPrice: newDeals[i].salePrice,
            discountPercentage: `${Number(newDeals[i].savings).toFixed(0)}%`,
            platform: platforms.PC,
            page: storeImage ? storeImage.image : store.images.icon,
        })

    }

    const newOffersContainerFirstRow = newOffers.slice(0, 5).map((e, index) => {
        return (
            <div className="col" key={index}>
                <div className={styles["vertical-card-container"]}>
                    <Link href="/producto/black-ops-6" className={styles["click-overlay"]} aria-label="Ver Black Ops 6" />
                    <div className={styles["image-container"]}>
                        <Image
                            src={e.offerImage}
                            sizes="50vw"
                            alt="Plataforma de juego"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <div className={styles["platform-discount-container"]}>
                            <i className={e.platform}></i>
                            <span className={styles["discount"]}>{e.discountPercentage}</span>
                        </div>
                    </div>
                    <div className={styles["info-container"]}>
                        <h3 className={styles["game-title"]}>{e.gameTitle}</h3>
                        <div className={styles["divisor-line-container"]}>
                            <div className={styles["divisor-line"]}></div>
                        </div>
                        <div className={styles["price-and-platform-container"]}>
                            <span className={styles["current-price"]}>{e.currentPrice}</span>

                            <div className={styles["web-offer"]}>
                                <Image
                                    src={e.page}
                                    sizes="50vw"
                                    alt="Plataforma de juego"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    const newOffersContainerSecondRow = newOffers.slice(5, 10).map((e, index) => {
        return (
            <div className="col" key={index}>
                <div className={styles["vertical-card-container"]}>
                    <div className={styles["image-container"]}>
                        <Image
                            src={e.offerImage}
                            sizes="50vw"
                            alt="Plataforma de juego"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <div className={styles["platform-discount-container"]}>
                            <i className={e.platform}></i>
                            <span className={styles["discount"]}>{e.discountPercentage}</span>
                        </div>
                    </div>
                    <div className={styles["info-container"]}>
                        <h3 className={styles["game-title"]}>{e.gameTitle}</h3>
                        <div className={styles["divisor-line-container"]}>
                            <div className={styles["divisor-line"]}></div>
                        </div>
                        <div className={styles["price-and-platform-container"]}>
                            <span className={styles["current-price"]}>{e.currentPrice}</span>

                            <div className={styles["web-offer"]}>
                                <Image
                                    src={e.page}
                                    sizes="50vw"
                                    alt="Plataforma de juego"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    return <>
        <section className={styles["new-offers-main-container"]}>
            <h1 className={styles["title"]}>NUEVAS OFERTAS</h1>
            <div className={styles["container-fluid"]}>
                <div className="row row-cols-5 g-3 mb-4">
                    {newOffersContainerFirstRow}
                </div>

                <div className="row row-cols-5 g-3 mb-4">
                    {newOffersContainerSecondRow}
                </div>
            </div>
        </section>
    </>
};

export default NewOffers;