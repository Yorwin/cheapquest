"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/layout/homepage/main-offer-header.module.scss";

interface MainOfferImageProps {
    gameImage: string;
}

const MainOfferImage = ({ gameImage }: MainOfferImageProps) => {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (imgRef.current) {
                const speed = 0.3; // ajusta la velocidad del efecto
                const wrapper = imgRef.current.parentElement;
                if (!wrapper) return;

                const rect = wrapper.getBoundingClientRect();
                const offset = window.scrollY - rect.top; // desplazamiento relativo
                imgRef.current.style.transform = `translateY(${offset * speed}px)`;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={styles["main-header-image-wrapper"]}>
            <Image
                ref={imgRef}
                src={gameImage}
                alt="Mejor oferta y más popular del momento"
                className={styles["main-header-image"]}
                width={1920}
                height={1080}
                sizes="100vw"
                priority
            />
        </div>
    );
};

export default MainOfferImage;

