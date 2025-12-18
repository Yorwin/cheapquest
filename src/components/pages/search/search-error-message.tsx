import React from "react";
import styles from "@/styles/layout/search/search-error-message.module.scss";
import { CldImage } from 'next-cloudinary';

const ErrorMessage = ({ error }: { error: string }) => {
    return (
        <div className={styles["error-message-container"]}>

            {/* Image */}

            <div className={styles["image-container"]}>
                <CldImage
                    src="resources/no-data-found/error-icon-search"
                    alt="search-error-image"
                    className={styles["error-icon"]}
                    sizes="35vw"
                    height={100}
                    width={80}
                    crop="fill"
                    gravity="auto"
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