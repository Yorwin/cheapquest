import React from "react";
import styles from "@/styles/layout/gamepage/gamepage-general-styles.module.scss";

const SkeletonLoader = ({
    width = "200px",
    height = "150px",
}: {
    width?: string;
    height?: string;
}) => {
    return (
        <div
            className={styles["skeleton"]}
            style={{
                ["--skeleton-width" as any]: width,
                ["--skeleton-height" as any]: height
            }}>
        </div>
    )
};

export default SkeletonLoader;