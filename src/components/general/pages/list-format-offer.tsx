import React from "react";
import styles from "@/styles/layout/homepage/list-format-offers.module.scss"
import Image from "next/image";
import Weboffer from "@/resources/pages/greenman-gaming.png"
import image from "@/resources/offer-img/images.jpeg"

const ListFormatOffers = () => {
    return <>
        <section className={styles["list-format-offers-container"]}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <h1 className={styles["title"]}>MEJORES OFERTAS POR %</h1>
                        <article className={styles["list-offer-format-container"]}>
                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        1
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        2
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        3
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        4
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        5
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        6
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        7
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        8
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        9
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        10
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </article>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <h1 className={styles["title"]}>BAJOS HISTORICOS</h1>
                        <article className={styles["list-offer-format-container"]}>
                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        1
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        2
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        3
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        4
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        5
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        6
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        7
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        8
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        9
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles["game-info-container"]}>
                                <div className={styles["offer-number-container"]}>
                                    <span className={styles["offer-number"]}>
                                        10
                                    </span>
                                </div>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={image}
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["details"]}>
                                    <div className={styles["game-title-and-extra-info"]}>
                                        <h3>Example Game</h3>
                                        <p>Standard Edition</p>
                                    </div>
                                    <div className={styles["prices"]}>
                                        <div className={styles["prices-container"]}>
                                            <del className={styles["old-price"]}>39,99€</del>
                                            <span className={styles["current-price"]}>26,99€</span>
                                        </div>
                                        <div className={styles["discount-container"]}>
                                            <span>37%</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default ListFormatOffers;