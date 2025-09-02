import React from "react";
import styles from "@/styles/components/image-card.module.scss"
import Image from "next/image";
import gameImage from "@/resources/offer-img/image.jpg"

const ImageCard = () => {
    return (
        <section className={styles["image-card"]}>
            <Image 
                src={gameImage}
                alt="Game Presentation"
                sizes="35vw"
                fill
                className={styles["image-item"]}
            />
        </section>
    )
};

export default ImageCard;