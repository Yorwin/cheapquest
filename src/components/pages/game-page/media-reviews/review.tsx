import styles from "@/styles/layout/gamepage/media-reviews.module.scss";
import Link from "next/link";
import { mediaReview } from "@/types/types";
import { getCldImageUrl } from "next-cloudinary";

const Review = ({ review }: { review: mediaReview }) => {

    const optimizedLogo = getCldImageUrl({
        src: `${review.logo_img}`,
        deliveryType: 'fetch',
        crop: 'fill',       // Llena el espacio 800x600
        gravity: 'auto',    // Centra el contenido importante (IA)
    })

    return (
        <div className={styles["review"]}>
            <div className={styles["header"]}>
                {review.logo_img ? (
                    <div className={`${styles["image-container"]}  ${styles[`${review.media.toLowerCase().replaceAll(' ', '_')}`]}`}>
                        <img
                            className={styles["media-logo"]}
                            src={`${optimizedLogo}`}
                            alt={`Análisis del juego por ${review.media}`}
                            title={review.media}
                        />
                    </div>
                ) : null}
                <h4 className={styles["media"]}>{review.media}</h4>
            </div>
            <p className={styles["content"]}>
                {review.content}
            </p>
            <span className={styles["score"]}>Puntuación: {review.score}</span>
            <Link className={styles["link"]} href={`${review.link}`} target="_blank">
                Ir al análisis completo
            </Link>
        </div>
    )
};

export default Review;