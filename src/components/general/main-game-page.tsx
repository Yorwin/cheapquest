"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/components/main-game-image.module.scss";

const MainGameImage = ({
    children,
    imageUrl,
}: {
    children: React.ReactNode;
    imageUrl: string;
}) => {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (imgRef.current) {
                const speed = 0.3; // ajusta la velocidad
                const wrapper = imgRef.current.parentElement;
                if (!wrapper) return;

                const rect = wrapper.getBoundingClientRect();
                const offset = window.scrollY - rect.top;
                imgRef.current.style.transform = `translateY(${offset * speed}px)`;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={styles["game-image-container"]}>
            <div className={styles["image-container"]}>
                <Image
                    ref={imgRef}
                    src={imageUrl}
                    alt="Game Image"
                    sizes="50vw"
                    fill
                    className={styles["game-image"]}
                />
            </div>
            {children}
        </div>
    );
};

export default MainGameImage;
