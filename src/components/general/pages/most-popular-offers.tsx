import React from "react";
import styles from "@/styles/layout/homepage/most-popular-offer.module.scss"
import gameImage from "@/resources/offer-img/image.jpg"
import Monitor from "@/resources/platforms/pc.svg"
import Weboffer from "@/resources/pages/greenman-gaming.png"
import Image from "next/image";


const MostPopularOffer = () => {


    const mainCard = (
        <div className={styles["main-gamecard-offer"]}>
            <div className={styles["gameimage-container"]}>
                <Image
                    src={gameImage}
                    alt="Imágen de juego"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className={styles["gameinfo-container"]}>
                <div className={styles["platform"]}>
                    <div className={styles["icon-container"]}>
                        <Image
                            src={Monitor}
                            alt="Plataforma de juego"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
                <div className={styles["price-offerorigin-container"]}>
                    <div className={styles["offer-container"]}>
                        <span className={styles["discount"]}>-45%</span>
                        <div className={styles["prices"]}>
                            <span className={styles["last-price"]}>65,99€</span>
                            <span className={styles["current-price"]}>29,69€</span>
                        </div>
                    </div>
                    <div className={styles["web-offer"]}>
                        <Image
                            src={Weboffer}
                            alt="Plataforma de juego"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

    const secondaryCards = (
        <>
            <div className={styles["pairs-container"]}>
                <div className={styles["pair"]}>

                    {/* First Item */}

                    <div className={styles["secondary-gamecard-offer"]}>
                        <div className={styles["gameimage-container"]}>
                            <Image
                                src={gameImage}
                                alt="Imágen de juego"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles["gameinfo-container"]}>
                            <div className={styles["platform"]}>
                                <div className={styles["secondary-icon-container"]}>
                                    <Image
                                        src={Monitor}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className={styles["secondary-price-offerorigin-container"]}>
                                <div className={styles["offer-container"]}>
                                    <span className={styles["secondary-discount"]}>-45%</span>
                                    <div className={styles["secondary-prices"]}>
                                        <span className={styles["secondary-last-price"]}>65,99€</span>
                                        <span className={styles["secondary-current-price"]}>29,69€</span>
                                    </div>
                                </div>
                                <div className={styles["secondary-web-offer"]}>
                                    <Image
                                        src={Weboffer}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Item */}

                    <div className={styles["secondary-gamecard-offer"]}>
                        <div className={styles["gameimage-container"]}>
                            <Image
                                src={gameImage}
                                alt="Imágen de juego"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles["gameinfo-container"]}>
                            <div className={styles["platform"]}>
                                <div className={styles["secondary-icon-container"]}>
                                    <Image
                                        src={Monitor}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className={styles["secondary-price-offerorigin-container"]}>
                                <div className={styles["offer-container"]}>
                                    <span className={styles["secondary-discount"]}>-45%</span>
                                    <div className={styles["secondary-prices"]}>
                                        <span className={styles["secondary-last-price"]}>65,99€</span>
                                        <span className={styles["secondary-current-price"]}>29,69€</span>
                                    </div>
                                </div>
                                <div className={styles["secondary-web-offer"]}>
                                    <Image
                                        src={Weboffer}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles["pair"]}>

                    {/* First Item */}

                    <div className={styles["secondary-gamecard-offer"]}>
                        <div className={styles["gameimage-container"]}>
                            <Image
                                src={gameImage}
                                alt="Imágen de juego"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles["gameinfo-container"]}>
                            <div className={styles["platform"]}>
                                <div className={styles["secondary-icon-container"]}>
                                    <Image
                                        src={Monitor}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className={styles["secondary-price-offerorigin-container"]}>
                                <div className={styles["offer-container"]}>
                                    <span className={styles["secondary-discount"]}>-45%</span>
                                    <div className={styles["secondary-prices"]}>
                                        <span className={styles["secondary-last-price"]}>65,99€</span>
                                        <span className={styles["secondary-current-price"]}>29,69€</span>
                                    </div>
                                </div>
                                <div className={styles["secondary-web-offer"]}>
                                    <Image
                                        src={Weboffer}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Item */}

                    <div className={styles["secondary-gamecard-offer"]}>
                        <div className={styles["gameimage-container"]}>
                            <Image
                                src={gameImage}
                                alt="Imágen de juego"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles["gameinfo-container"]}>
                            <div className={styles["platform"]}>
                                <div className={styles["secondary-icon-container"]}>
                                    <Image
                                        src={Monitor}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className={styles["secondary-price-offerorigin-container"]}>
                                <div className={styles["offer-container"]}>
                                    <span className={styles["secondary-discount"]}>-45%</span>
                                    <div className={styles["secondary-prices"]}>
                                        <span className={styles["secondary-last-price"]}>65,99€</span>
                                        <span className={styles["secondary-current-price"]}>29,69€</span>
                                    </div>
                                </div>
                                <div className={styles["secondary-web-offer"]}>
                                    <Image
                                        src={Weboffer}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    return <>
        <section className={styles["most-popular-offer-container"]}>
            <h1 className={styles["title"]}>OFERTAS MÁS POPULARES</h1>
            <div className={styles["offers-container"]}>
                <div className={styles["first-row"]}>
                    {mainCard}
                    {secondaryCards}
                </div>
            </div>
        </section>
    </>
};

export default MostPopularOffer;