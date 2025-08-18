import React from "react";
import styles from "@/styles/components/list-format.loading.module.scss"

const ListFomatLoading = () => {
    return <>
        <div className={styles["skeleton-card"]}>
            {/* Imagen / Icono */}
            <div className={`${styles["skeleton-box"]} ${styles["skeleton-image"]}`} />

            <div className={styles["skeleton-content"]}>
                {/* Título */}
                <div className={`${styles["skeleton-box"]} ${styles["skeleton-title"]}`} />

                {/* Precios */}
                <div className={styles["skeleton-prices"]}>
                    <div className={`${styles["skeleton-box"]} ${styles["skeleton-discount"]}`} />
                    <div className={styles["prices"]}>
                        <div className={`${styles["skeleton-box"]} ${styles["skeleton-price"]}`} />
                        <div className={`${styles["skeleton-box"]} ${styles["skeleton-price-current"]}`} />
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default ListFomatLoading;