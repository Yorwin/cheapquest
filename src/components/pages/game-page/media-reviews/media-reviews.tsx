import styles from "@/styles/layout/gamepage/media-reviews.module.scss";
import Review from "./review";
import { mediaReview } from "@/types/types";

const MediaReviews = ({ reviews }: { reviews: mediaReview[] | null | undefined }) => {
    if (reviews && reviews.length > 0) {
        return (
            <section id="análisis-de-medios" className={styles["media-reviews-container"]}>
                <h3 className={styles["title"]}>Análisis de medios</h3>
                <div className={styles["reviews"]}>
                    {reviews.map((e: mediaReview, index) => <Review review={e} key={index} />)}
                </div>
            </section>
        )
    } else {
        return null
    }
};

export default MediaReviews;