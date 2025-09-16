import React from "react";
import styles from "@/styles/components/reviews.module.scss"

const MetaCritic = ({ metacritic }: { metacritic: number }) => {

    const statusOfCritic = ["good-critic", "bad-critic", "regular-critic"];
    let critic;

    if (metacritic >= 75) {
        critic = statusOfCritic[0];
    } else if (metacritic <= 74 && metacritic > 49) {
        critic = statusOfCritic[1];
    } else {
        critic = statusOfCritic[2];
    }

    return (
        <div className={styles["metacritic-container"]}>
            <h2>Reviews</h2>
            <div className={styles["rating"]}>
                <span className={`${styles["points"]} ${styles[critic]}`}>{metacritic}</span>
                <div className={styles["text-container"]}>
                    <span className={styles["text"]}>Puntuación</span>
                    <span className={styles["text"]}>en Metacritic</span>
                </div>
            </div>
        </div>
    )
};

export default MetaCritic;