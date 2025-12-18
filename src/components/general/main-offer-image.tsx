"use client";

import { useEffect, useRef } from "react";
import { CldImage } from 'next-cloudinary';
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
        <CldImage
            ref={imgRef}
            src={gameImage as string}
            alt="Mejor oferta y más popular del momento"
            className={styles["main-header-image"]}
            fill
            sizes="50vw"
            priority
            crop="fill"
            gravity="auto"
            deliveryType="fetch"
        />
    );
};

export default MainOfferImage;

