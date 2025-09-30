"use client"

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/layout/header.module.scss"

const HeaderMainContainer = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (pathname !== "/" && !pathname.startsWith("/game-page")) {
            setScrolled(true);
        } else {
            setScrolled(window.scrollY > 0);
        }

        const handleScroll = () => {
            if (pathname === "/" || pathname.startsWith("/game-page")) {
                setScrolled(window.scrollY > 0);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    return (
        <div className={`${styles["header-main-container"]} ${scrolled ? styles["scrolled"] : ""}`}>
            {children}
        </div>
    )
};

export default HeaderMainContainer;
