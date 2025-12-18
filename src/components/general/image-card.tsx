"use client"

import { useState, useEffect } from "react";
import styles from "@/styles/components/image-card.module.scss";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

const ImageCard = ({ gameName }: { gameName: string }) => {
    const [isValid, setIsValid] = useState(true);
    const [offerImage, setOfferImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getGameOfferImage = async (name: string) => {
            try {
                setLoading(true);

                const res = await fetch(`/api/get-game-offer/${encodeURIComponent(name)}`);

                if (!res.ok) {
                    throw new Error(`Error al obtener ofertas: ${res.statusText}`);
                }

                const data = await res.json();

                // Verificamos si hay ofertas disponibles
                if (!data.deals || data.deals.length === 0) {
                    console.warn("No hay ofertas disponibles para este juego.");
                    setOfferImage(null);
                    setIsValid(false); // Ocultamos el componente si no hay ofertas
                    return;
                }

                // Tomamos la primera oferta con imagen
                const bestOffer = data.deals[0];
                const imageUrl = bestOffer.thumb.replace('capsule_sm_120', 'capsule_616x353') || null;

                if (!imageUrl) {
                    console.warn("La oferta no tiene imagen disponible.");
                    setIsValid(false);
                    return;
                }

                setOfferImage(imageUrl);
            } catch (error) {
                console.error(
                    `Ha ocurrido un error al intentar obtener las ofertas:`,
                    error
                );
                setOfferImage(null);
                setIsValid(false);
            } finally {
                setLoading(false);
            }
        };

        if (gameName) {
            getGameOfferImage(gameName);
        } else {
            setLoading(false);
            setIsValid(false);
        }
    }, [gameName]);

    // Renderizado condicional DESPUÉS de los hooks
    if (!isValid) return null;

    if (loading) {
        return (
            <div className={styles["image-card-loading"]}>
                <div className={styles["spinner"]}></div>
            </div>
        );
    }

    if (!offerImage) return null;

    return (
        <section className={styles["image-card"]}>
            <CldImage
                src={`${offerImage}`}
                alt={`Oferta del juego - ${gameName}`}
                title={`${gameName}`}
                sizes="35vw"
                fill
                className={styles["image-item"]}
                deliveryType="fetch"
                onError={() => setIsValid(false)}
            />
        </section>
    );
};

export default ImageCard;