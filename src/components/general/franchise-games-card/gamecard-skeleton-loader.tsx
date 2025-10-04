// components/loading/GameCardSkeleton.tsx
import styles from "@/styles/components/gamecard-skeleton-loader.module.scss";

export default function GameCardSkeleton() {
    return (
        <div className={styles["skeleton-card"]}>
            <div className={styles["skeleton-image"]}></div>
            <div className={styles["skeleton-content"]}>
                <div className={styles["skeleton-title"]}></div>
                <div className={styles["skeleton-date"]}></div>
                <div className={styles["skeleton-price-row"]}>
                    <div className={styles["skeleton-price"]}></div>
                    <div className={styles["skeleton-discount"]}></div>
                </div>
            </div>
        </div>
    );
}