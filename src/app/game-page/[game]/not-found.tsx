import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/layout/gamepage/page-not-found-gamepage.module.scss";
import MissingGameInfo from "@/resources/no-data-found/missing-game-info.svg";

type PageNotFoundProps = {
    params: Promise<{ game: string }>;
};

const PageNotFound = async ({ params }: PageNotFoundProps) => {
    const { game } = await params;

    // Opcional: convertir el slug a un nombre más legible
    const gameName = game.replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <article className={styles["no-page-found-container"]}>
            <div className={styles["content-container"]}>
                <div className={styles["image-container"]}>
                    <Image
                        src={MissingGameInfo}
                        alt="Imágen decorativa - Robot"
                        className={styles["image-error"]}
                        fill
                    />
                </div>
                <h3 className={styles["title"]}>
                    No encontramos información relacionada con "{gameName}".
                </h3>
                <p className={styles["error-text"]}>
                    Lo siento, no pudimos encontrar la página que estabas buscando.
                    Recomendamos que vuelvas a nuestra sección principal.
                </p>
                <button className={styles["button"]}>
                    Volver a la sección principal
                    <Link href="/" className={styles["click-overlay"]} />
                </button>
            </div>
        </article>
    );
};

export default PageNotFound;