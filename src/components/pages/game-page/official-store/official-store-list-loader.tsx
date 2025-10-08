import React from "react";
import styles from "@/styles/layout/gamepage/gamepage-general-styles.module.scss";
import SkeletonLoader from "../skeletonloader";

const OfficialStoreListSkeleton = () => {
    return (
        <div className={styles["official-offers-container-skeleton"]}>
            <SkeletonLoader width="100%" height="100px" />
            <SkeletonLoader width="100%" height="100px" />
            <SkeletonLoader width="100%" height="100px" />
        </div>
    )
};

export default OfficialStoreListSkeleton;