import styles from "@/styles/layout/gamepage/media-reviews.module.scss";
import Image from "next/image";
import Link from "next/link";
import { mediaReview } from "@/types/types";

const Review = ({ review }: { review: mediaReview }) => {
    return (
        <div className={styles["review"]}>
            <div className={styles["header"]}>
                {review.logo_img ? (
                    <div className={`${styles["image-container"]}  ${styles[`${review.media.toLowerCase()}`]}`}>
                        <Image
                            className={styles["media-logo"]}
                            src={review.logo_img}
                            alt={`Análisis del juego por ${review.media}`}
                            title={review.media}
                            fill
                        />
                    </div>
                ) : null}
                <h4 className={styles["media"]}>{review.media}</h4>
            </div>
            <p className={styles["content"]}>
                {review.content}
            </p>
            <Link className={styles["link"]} href={`${review.link}`} target="_blank">
                Ir al análisis completo
            </Link>
        </div>
    )
};

export default Review;