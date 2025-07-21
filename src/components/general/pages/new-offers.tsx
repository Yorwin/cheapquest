import React from "react";
import styles from "@/styles/layout/homepage/new-offers.module.module.scss"
import Image from "next/image";
import Weboffer from "@/resources/pages/greenman-gaming.png"

const NewOffers = () => {
    return <>
        <section className={styles["new-offers-main-container"]}>
            <h1 className={styles["title"]}>NUEVAS OFERTAS</h1>
            <div className={styles["container-fluid"]}>
                <div className="row">
                    <div className="col">
                        <div className={styles["vertical-card-container"]}>
                            <h3>Contenedor</h3>
                            <div className={styles["info-container"]}>
                                <h3 className={styles["game-title"]}>Example game name</h3>
                                <div className={styles["divisor-line-container"]}>
                                    <div className={styles["divisor-line"]}></div>
                                </div>
                                <div className={styles["price-and-platform-container"]}>
                                    <span className={styles["current-price"]}>10,79€</span>
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
                    <div className="col">
                        <div className={styles["vertical-card-container"]}>
                            <h3>Contenedor</h3>
                        </div>
                    </div>
                    <div className="col">
                        <div className={styles["vertical-card-container"]}>
                            <h3>Contenedor</h3>
                        </div>
                    </div>
                    <div className="col">
                        <div className={styles["vertical-card-container"]}>
                            <h3>Contenedor</h3>
                        </div>
                    </div>
                    <div className="col">
                        <div className={styles["vertical-card-container"]}>
                            <h3>Contenedor</h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h3>Contenedor</h3>
                    </div>
                    <div className="col">
                        <h3>Contenedor</h3>
                    </div>
                    <div className="col">
                        <h3>Contenedor</h3>
                    </div>
                    <div className="col">
                        <h3>Contenedor</h3>
                    </div>
                    <div className="col">
                        <h3>Contenedor</h3>
                    </div>
                </div>
            </div>
        </section>
    </>
};

export default NewOffers;