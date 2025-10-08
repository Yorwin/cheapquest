import React from "react";
import styles from "@/styles/layout/gamepage/gamepage-general-styles.module.scss"

const GameTagsSkeleton = () => {
    return <>
        <div className={styles["skeleton-tags-container"]}>
            <div className={styles["skeleton-tags"]}></div>
            <div className={styles["skeleton-tags"]}></div>
            <div className={styles["skeleton-tags"]}></div>
            <div className={styles["skeleton-tags"]}></div>
            <div className={styles["skeleton-tags"]}></div>
        </div>
    </>
};

export default GameTagsSkeleton;