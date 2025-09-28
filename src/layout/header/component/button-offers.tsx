'use client';

import React, { useState } from "react";
import styles from "@/styles/layout/header.module.scss"
import useWindowWidth from "@/functions/hooks/useWindowWidth";

const OffersButton = ({ children }: { children: React.ReactNode }) => {

    const width = useWindowWidth();
    const [buttonIsClicked, setButtonIsClicked] = useState(false);

    const toggleButton = () => {
        setButtonIsClicked(e => !e);
    };

    if (width > 1400) {
        return (
            <>
                {children}
            </>
        )
    } else {
        return (
            <>
                <div className={styles["button-container"]}>
                    <button onClick={toggleButton} className={styles["button"]}>
                        OFERTAS
                        <i className="bi bi-caret-down"></i>
                    </button>
                    <ul className={`${styles["options"]} ${styles[buttonIsClicked ? "show" : "hide"]}`}>
                        {children}
                    </ul>
                </div>
            </>
        )
    }
};

export default OffersButton;
