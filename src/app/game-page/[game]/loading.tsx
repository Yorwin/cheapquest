import React from "react";
import Logo from "@/resources/logo/logo.png"
import Image from "next/image";
import styles from "@/styles/layout/loading.module.scss"

const Loading = () => {
    return (
        <div
            id="option-branded"
            className={styles["loading-container"]}
        >
            <Image
                src={Logo}
                alt="Plataforma de juego"
                sizes="60vw"
                className={styles["image-loading-icon"]}
            />

            <div className={styles["brand-bars"]}>
                <div className={styles["brand-bar"]}></div>
                <div className={styles["brand-bar"]}></div>
                <div className={styles["brand-bar"]}></div>
                <div className={styles["brand-bar"]}></div>
            </div>

            <p className="text-muted">Preparando tus ofertas...</p>
        </div>
    )
};

export default Loading;