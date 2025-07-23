import React from "react";
import styles from "@/styles/layout/homepage/vertical-offers.module.module.scss"
import Image from "next/image";
import image from "@/resources/offer-img/images.jpeg"
import Weboffer from "@/resources/pages/greenman-gaming.png"

const AgedLikeWine = () => {

    const platforms = {
        PC: "bi bi-display",
        Xbox: "bi bi-xbox",
        PlayStation: "bi bi-playstation",
    }

    const agedLikeWine = [
        {
            offerImage: image,
            gameTitle: "Example Game",
            currentPrice: "26,99€",
            discountPercentage: "36%",
            platform: platforms.PC,
            page: Weboffer,
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            currentPrice: "26,99€",
            discountPercentage: "36%",
            platform: platforms.PC,
            page: Weboffer,
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            currentPrice: "26,99€",
            discountPercentage: "36%",
            platform: platforms.PC,
            page: Weboffer,
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            currentPrice: "26,99",
            discountPercentage: "36%",
            platform: platforms.PC,
            page: Weboffer,
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            currentPrice: "26,99€",
            discountPercentage: "36%",
            platform: platforms.PC,
            page: Weboffer,
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            currentPrice: "26,99€",
            discountPercentage: "36%",
            platform: platforms.PC,
            page: Weboffer,
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            currentPrice: "26,99€",
            discountPercentage: "36%",
            platform: platforms.PC,
            page: Weboffer,
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            currentPrice: "26,99€",
            discountPercentage: "36%",
            platform: platforms.PC,
            page: Weboffer,
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            currentPrice: "26,99€",
            discountPercentage: "36%",
            platform: platforms.PC,
            page: Weboffer,
        },
        {
            offerImage: image,
            gameTitle: "Example Game",
            currentPrice: "26,99€",
            discountPercentage: "36%",
            platform: platforms.PC,
            page: Weboffer,
        },
    ]

    const agedLikeWineFirstRow = agedLikeWine.slice(0, 5).map((e) => {
        return (
            <div className="col">
                <div className={styles["vertical-card-container"]}>
                    <div className={styles["image-container"]}>
                        <Image
                            src={e.offerImage}
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

    const agedLikeWineSecondRow = agedLikeWine.slice(5, 10).map((e) => {
        return (
            <div className="col">
                <div className={styles["vertical-card-container"]}>
                    <div className={styles["image-container"]}>
                        <Image
                            src={e.offerImage}
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
        <section className={styles["aged-like-wine-offers-main-container"]}>
            <h1 className={styles["title"]}>ENVEJECIDOS COMO EL VINO...</h1>
            <div className={styles["container-fluid"]}>
                <div className="row mb-4">
                    {agedLikeWineFirstRow}
                </div>
                <div className="row mb-4">
                   {agedLikeWineSecondRow}
                </div>
            </div>
        </section>
    </>
};

export default AgedLikeWine;