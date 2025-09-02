import React from "react";
import Image from "next/image";
import mainOfferImage from "@/resources/main-offer/image.webp"
import styles from "@/styles/components/main-game-image.module.scss"

const MainGameImage = ({ children }: { children: React.ReactNode }) => {
    return <>
        <div className={styles["game-image-container"]}>
            <Image
                src={mainOfferImage}
                alt="Game Image"
                sizes="50vw"
                fill
                className={styles["game-image"]}
            />

            {children}
        </div>
    </>
};

export default MainGameImage;
