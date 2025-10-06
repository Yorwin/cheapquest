import React from "react";
import styles from "@/styles/layout/search/search-error-message.module.scss";
import errorIconSearch from "@/resources/no-data-found/error-icon-search.svg";
import Image from "next/image";

const ErrorMessage = ({ error }: { error: string }) => {
    return (
        <div className={styles["error-message-container"]}>

            {/* Image */}

            <div className={styles["image-container"]}>
                <Image
                    src={errorIconSearch}
                    alt="search-error-image"
                    className={styles["error-icon"]}
                    sizes="35vw"
                    height={100}
                    width={80}
                />
            </div>

            {/* Text */}

            <div className={styles["text-container"]}>
                <span>Upss...Ha ocurrido un error al intentar obtener los resultados, por favor intenta nuevamente.</span>
                <span>Código de error: <span className={styles["error-code"]}>{error}</span></span>
            </div>
        </div>
    )
};

export default ErrorMessage;