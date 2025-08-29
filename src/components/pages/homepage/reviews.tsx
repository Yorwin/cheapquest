import React from "react";
import styles from "@/styles/layout/homepage/reviews.module.scss"
import Image from "next/image";
import ProfileImg from "@/resources/profile/profile.png"
import ErrorReviewsLoad from "@/resources/error-image/error-review.png"
import StarsReview from "@/components/general/stars-review";

const Reviews = () => {

    const reviewsData = [
        {
            profileImage: ProfileImg,
            rating: 4,
            userName: "Elizabeth",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae.",
            time: "Hace 1 hora"
        },
        {
            profileImage: ProfileImg,
            rating: 5,
            userName: "Elizabeth",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae.",
            time: "Hace 1 hora"
        },
        {
            profileImage: ProfileImg,
            rating: 4,
            userName: "Elizabeth",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae.",
            time: "Hace 1 hora"
        },
        {
            profileImage: ProfileImg,
            rating: 4.5,
            userName: "Elizabeth",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae.",
            time: "Hace 1 hora"
        },
    ]

    /* Given Rating */

    const reviews = reviewsData.map((e: any, index: number) => {
        return (
            <div className="col-xl-3 col-lg-6 col-sm-12" key={index}>
                <div className={`${styles["review-container"]}`}>
                    <div className={styles["profile-section"]}>
                        <div className={styles["image-container"]}>
                            <Image
                                src={e.profileImage}
                                sizes="50vw"
                                alt="Plataforma de juego"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className={styles["user-info"]}>
                            <div className={styles["rating-container"]}>
                                <StarsReview rating={e.rating} />
                            </div>
                            <h3>{e.userName}</h3>
                        </div>
                    </div>
                    <div className={styles["description"]}>
                        {e.description}
                    </div>
                    <div className={styles["published-time"]}>
                        {e.time}
                    </div>
                </div>
            </div>
        )
    });

    try {
        return <section className={styles["reviews-container"]}>
            <article className="container-fluid">
                <div className={`row ${styles["container-reviews"]}`}>
                    {reviews}
                </div>
            </article>
        </section>
    } catch (error) {
        console.error(`Se ha producido un error al intentar cargar las reviews ${error}`)
        return <section className={styles["reviews-container"]}>
            <div className={styles["error-container"]}>
                <div className={styles["container-text"]}>
                    <p>¡Ups! Parece que las reseñas se han ido a tomar un café. Recarga la página o vuelve en un momento.</p>
                </div>
                <Image
                    className={styles["error-load-reviews"]}
                    src={ErrorReviewsLoad}
                    alt="Error al cargar reseñas"
                />
            </div>
        </section>
    }
}

export default Reviews;