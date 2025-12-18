"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import styles from "@/styles/components/main-game-image.module.scss";
import Loading from "@/resources/loading-img/loading-offer.webp";

const MainGameImage = ({
    children,
    gameName,
}: {
    children: React.ReactNode;
    gameName: string;
}) => {
    const [isValid, setIsValid] = useState(true);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const imgRef = useRef<HTMLImageElement>(null);

    // Si hubo error cargando la imagen, no renderizamos nada
    if (!isValid) return null;

    useEffect(() => {
        const handleScroll = () => {
            if (imgRef.current) {
                const speed = 0.3;
                const wrapper = imgRef.current.parentElement;
                if (!wrapper) return;

                const rect = wrapper.getBoundingClientRect();
                const offset = window.scrollY - rect.top;
                imgRef.current.style.transform = `translateY(${offset * speed}px)`;
            }
        };

        const getHeaderImage = async (name: string) => {
            try {
                // 🔹 Llamamos al endpoint con el slug del juego
                const res = await fetch(`/api/get-game-data/${name}/`);

                if (!res.ok) {
                    throw new Error(`Error al obtener imagen del header: ${res.statusText}`);
                }

                const data = await res.json();

                if (!data || !data.header) {
                    console.warn("No hay imagen de header para este juego");
                    setImageSrc(null);
                    setLoading(false);
                    return;
                }

                setImageSrc(data.header);
                setLoading(false);
            } catch (error) {
                console.error(`Ha ocurrido un error al intentar mostrar el header - ${error}`);
                setLoading(false);
                setIsValid(false);
            }
        };

        if (gameName) {
            getHeaderImage(gameName);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [gameName]);

    // 🔹 Renderizado condicional
    if (loading && !imageSrc) {
        return (
            <div className={styles["game-image-container"]}>
                <div className={styles["image-container"]}>
                    <Image
                        ref={imgRef}
                        src={Loading}
                        alt={`${gameName} Header`}
                        sizes="50vw"
                        fill
                        className={styles["game-image"]}
                        onError={() => setIsValid(false)}
                        priority
                    />
                </div>
                {children}
            </div>
        );
    }

    if (!loading && !imageSrc) {
        return null;
    }

    if (imageSrc) {
        return (
            <div className={styles["game-image-container"]}>
                <div className={styles["image-container"]}>
                    <CldImage
                        ref={imgRef}
                        src={imageSrc}
                        alt={`${gameName} Header`}
                        sizes="50vw"
                        quality={25}
                        fill
                        className={styles["game-image"]}
                        onError={() => setIsValid(false)}
                        deliveryType="fetch"
                        priority={true}
                    />
                </div>
                {children}
            </div>
        );
    }

    return null; // fallback final
};

export default MainGameImage;
