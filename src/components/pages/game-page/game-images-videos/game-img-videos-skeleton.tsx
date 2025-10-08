import React from "react";
import styles from "@/styles/layout/gamepage/gamepage-general-styles.module.scss";

const GameImagesTrailerSkeleton = () => {
    return (
        <>
            {/* Game Trailer */}
            <div className={styles["skeleton-game-trailer"]}>
            </div>

            {/* Game Images */}
            <div className="container-fluid p-0">
                <div className={`row d-flex justify-content-between`}>
                    <div className={`col-6`} >
                        <div className={`${styles["skeleton-image-container"]}`}>
                        </div>
                    </div>
                    <div className={`col-6`} >
                        <div className={`${styles["skeleton-image-container"]}`}>
                        </div>
                    </div>
                </div>

                <div className={`row d-flex justify-content-center`}  >
                    <div className={`col-sm-12 col-md-6 mb-3`}>
                        <div className={styles["skeleton-image-container"]} >
                        </div>
                    </div>
                    <div className={`col-sm-12 col-md-6 mb-3`}>
                        <div className={styles["skeleton-image-container"]} >
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default GameImagesTrailerSkeleton;