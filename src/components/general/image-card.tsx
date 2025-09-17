"use client"

import React, { useState } from "react";
import styles from "@/styles/components/image-card.module.scss";
import Image from "next/image";

const ImageCard = ({ imageUrl }: { imageUrl: string }) => {
    const [isValid, setIsValid] = useState(true);

    if (!isValid) return null; 

    return (
        <section className={styles["image-card"]}>
            <Image
                src={imageUrl}
                alt="Game Presentation"
                sizes="35vw"
                fill
                className={styles["image-item"]}
                onError={() => setIsValid(false)}
            />
        </section>
    );
};

export default ImageCard;