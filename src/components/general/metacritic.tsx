import React from "react";
import styles from "@/styles/components/reviews.module.scss"

const MetaCritic = () => {
    return (
        <div className={styles["metacritic-container"]}>
            <h2>Reviews</h2>
            <div className={styles["rating"]}>
                <span className={styles["points"]}>95</span>
                <div className={styles["text-container"]}>
                    <span className={styles["text"]}>Puntuación</span>
                    <span className={styles["text"]}>en Metacritic</span>
                </div>
            </div>
        </div>
    )
};

export default MetaCritic;