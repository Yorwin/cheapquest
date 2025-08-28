import React from "react";
import styles from "@/styles/layout/homepage/list-format-offers.module.scss"

interface titleProps {
    titleState: string;
}

const Title = ({ titleState }: titleProps) => {
    return (
        <div className={styles["select-offers-container"]}>
            <h1
                className={`${styles["select-offer"]} ${titleState === "best-offers" ? styles["active"] : ""
                    }`}
            >
                MEJORES OFERTAS POR %
            </h1>
            <div className={styles["divisor-line"]}></div>
            <h1
                className={`${styles["select-offer"]} ${titleState === "historical-lows" ? styles["active"] : ""
                    }`}
            >
                BAJOS HISTORICOS
            </h1>
        </div>
    );
};

export default Title;