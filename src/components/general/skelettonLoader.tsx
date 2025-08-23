import React from "react";
import styles from "@/styles/components/skeleton-loader-container.module.scss";

const SkeletonLoader = () => {
    return (
        <div className={`${styles["skeleton-container"]} mb-5`}>
            <div className={styles["skeleton-block"]}></div>
        </div>
    );
};

export default SkeletonLoader;