import React from "react";
import styles from "@/styles/layout/homepage/reviews.module.scss"
import Image from "next/image";
import ProfileImg from "@/resources/profile/profile.png"

const Reviews = () => {
    return <>
        <section className={styles["reviews-container"]}>
            <article className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-sm-6">
                        <div className={styles["review-container"]}>
                            <div className={styles["profile-section"]}>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={ProfileImg}
                                        sizes="50vw"
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["user-info"]}>
                                    <div className={styles["rating-container"]}>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                    <h3>Elizabeth</h3>
                                </div>
                            </div>
                            <div className={styles["description"]}>
                                Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae.
                            </div>
                            <div className={styles["published-time"]}>
                                Hace 1 hora
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className={styles["review-container"]}>
                            <div className={styles["profile-section"]}>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={ProfileImg}
                                        sizes="50vw"
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["user-info"]}>
                                    <div className={styles["rating-container"]}>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                    <h3>Elizabeth</h3>
                                </div>
                            </div>
                            <div className={styles["description"]}>
                                Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae.
                            </div>
                            <div className={styles["published-time"]}>
                                Hace 1 hora
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className={styles["review-container"]}>
                            <div className={styles["profile-section"]}>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={ProfileImg}
                                        sizes="50vw"
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["user-info"]}>
                                    <div className={styles["rating-container"]}>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                    <h3>Elizabeth</h3>
                                </div>
                            </div>
                            <div className={styles["description"]}>
                                Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae.
                            </div>
                            <div className={styles["published-time"]}>
                                Hace 1 hora
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className={styles["review-container"]}>
                            <div className={styles["profile-section"]}>
                                <div className={styles["image-container"]}>
                                    <Image
                                        src={ProfileImg}
                                        sizes="50vw"
                                        alt="Plataforma de juego"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles["user-info"]}>
                                    <div className={styles["rating-container"]}>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                    <h3>Elizabeth</h3>
                                </div>
                            </div>
                            <div className={styles["description"]}>
                                Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae.
                            </div>
                            <div className={styles["published-time"]}>
                                Hace 1 hora
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    </>
}

export default Reviews;