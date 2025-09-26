"use client"

import React, { useEffect, useState } from "react";
import styles from "@/styles/layout/header.module.scss"

const HeaderMainContainer = ({ children }: { children: React.ReactNode }) => {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`${styles["header-main-container"]} ${scrolled ? styles["scrolled"] : ""}`}>
            {children}
        </div>
    )
};

export default HeaderMainContainer;
