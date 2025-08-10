import React from "react";
import styles from "@/styles/components/error-loading.module.scss"
import Image from "next/image";
import Error from "@/resources/error-image/error.png"

const ErrorGameStandard = () => {
    return <>
        <div className={styles["content-container"]}>
            <div className={styles["text-info"]}>
                <h2>Ups! Parece que algo salió mal al cargar tus juegos y ofertas favoritas.</h2>
                <p>No te preocupes, estamos trabajando para solucionarlo rápido.</p>
                <p>Mientras tanto, ¿por qué no intentas refrescar la página o volver un poco más tarde?</p>
                <p>Gracias por tu paciencia.</p>
            </div>
            <div className={styles["error-louding-image"]}>
                <Image
                    alt="Error de carga"
                    src={Error}
                    className={styles["error-image"]}
                />
            </div>
        </div>
    </>
};

export default ErrorGameStandard;

