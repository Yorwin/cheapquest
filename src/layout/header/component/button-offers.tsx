'use client';

import React, { useState, useEffect } from "react";
import styles from "@/styles/layout/header.module.scss"
import Link from "next/link";

const OffersButton = ({ children }: { children: React.ReactNode }) => {

    const [buttonIsClicked, setButtonIsClicked] = useState(false);

    const toggleButton = () => {
        setButtonIsClicked(e => !e);
    };

    const platformsIcon = {
        PC: "bi bi-display",
        Xbox: "bi bi-xbox",
        PlayStation: "bi bi-playstation",
    }

    return (
        <>
            <div className={styles["button-container"]}>
                <button onClick={toggleButton} className={styles["button"]}>
                    {children}
                </button>
                {buttonIsClicked &&
                    <div className={styles["options"]}>
                        <Link href="#">
                            <i className={platformsIcon.PC}></i>
                            PC
                        </Link>
                        <Link href="#">
                            <i className={platformsIcon.PlayStation}></i>
                            PlayStation
                        </Link>
                        <Link href="#">
                            <i className={platformsIcon.Xbox}></i>
                            Xbox
                        </Link>
                    </div>
                }
            </div>
        </>
    )
};

export default OffersButton;
