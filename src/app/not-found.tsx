import React from "react";
import Image from "next/image";
import Link from "next/link";
import Robot from "@/resources/no-data-found/robot.svg";
import styles from "@/styles/layout/page-not-found.module.scss";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Página no encontrada',
        description: 'La ruta no corresponde con ningúna página disponible',
        robots: {
            index: false,
            follow: false,
            nocache: true,
        }
    };
}
const PageNotFound = () => {
    return (
        <article className={styles["no-page-found-container"]}>
            <div className={styles["content-container"]}>
                <div className={styles["image-container"]}>
                    <Image
                        src={Robot}
                        alt="Imágen decorativa - Robot"
                        className={styles["image-error"]}
                        fill
                    />
                </div>
                <h3 className={styles["title"]}>Página no encontrada.</h3>
                <p className={styles["error-text"]}>Lo siento, no pudimos encontrar la página que estabas buscando. Recomendamos que vuelvas a nuestra sección principal.</p>
                <button className={styles["button"]}>
                    Volver a la sección principal
                    <Link href="/" className={styles["click-overlay"]} />
                </button>
            </div>
        </article>
    )
};

export default PageNotFound;