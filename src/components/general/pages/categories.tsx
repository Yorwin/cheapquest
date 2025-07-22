import React from "react";
import styles from "@/styles/layout/homepage/categories.module.scss"
import Image from "next/image";
import Profile from "@/resources/categories/Action/png-image.png"

const Categories = () => {
    return <>
        <div className={styles["categories-container"]}>
            <div className="container-fluid">
                <div className="row">

                    {/* Titulo */}
                    <h1 className={styles["title"]}>CATEGORIAS</h1>

                    <div className="col-md-4 col-sm-12 mb-5 d-flex justify-content-start">
                        <div className={styles["category-container"]}>
                            <h2>Acción</h2>
                            <Image
                                src={Profile}
                                alt="Plataforma de juego"
                                className={styles["image-character"]}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex justify-content-center">
                        <div className={styles["category-container"]}>
                            <h2>Acción</h2>
                            <Image
                                src={Profile}
                                alt="Plataforma de juego"
                                className={styles["image-character"]}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex justify-content-end">
                        <div className={styles["category-container"]}>
                            <h2>Acción</h2>
                            <Image
                                src={Profile}
                                alt="Plataforma de juego"
                                className={styles["image-character"]}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md-4 col-sm-12 d-flex justify-content-start">
                        <div className={styles["category-container"]}>
                            <h2>Acción</h2>
                            <Image
                                src={Profile}
                                alt="Plataforma de juego"
                                className={styles["image-character"]}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex justify-content-center">
                        <div className={styles["category-container"]}>
                            <h2>Acción</h2>
                            <Image
                                src={Profile}
                                alt="Plataforma de juego"
                                className={styles["image-character"]}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex justify-content-end">
                        <div className={styles["category-container"]}>
                            <h2>Acción</h2>
                            <Image
                                src={Profile}
                                alt="Plataforma de juego"
                                className={styles["image-character"]}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md-4 col-sm-12 d-flex justify-content-start">
                        <div className={styles["category-container"]}>
                            <h2>Acción</h2>
                            <Image
                                src={Profile}
                                alt="Plataforma de juego"
                                className={styles["image-character"]}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex justify-content-center">
                        <div className={styles["category-container"]}>
                            <h2>Acción</h2>
                            <Image
                                src={Profile}
                                alt="Plataforma de juego"
                                className={styles["image-character"]}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 d-flex justify-content-end">
                        <div className={styles["category-container"]}>
                            <h2>Acción</h2>
                            <Image
                                src={Profile}
                                alt="Plataforma de juego"
                                className={styles["image-character"]}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default Categories;