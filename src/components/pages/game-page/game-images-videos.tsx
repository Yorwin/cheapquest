import React from "react";
import styles from "@/styles/layout/gamepage/game-images-videos.module.scss"
import Image from "next/image";

/* Images */

import ImageExample from "@/resources/offer-img/image.jpg"

const GameImagesSection = () => {
    return (
        <section className={styles["game-images-video-container"]}>
            <h1 className={styles["title"]}>Obten un vistazo a fondo de Black Ops 6</h1>

            {/* Game Trailer */}
            <div className={styles["game-trailer-container"]}>
                <iframe
                    className={styles["game-trailer"]}
                    src="https://www.youtube.com/embed/K7wW6V0OiIU?si=capLIbbpZ_U1kGV6"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </div>

            {/* Game Images */}

            <div className={styles["main-images-container"]}>
                <div className={styles["image-container"]}>
                    <Image
                        className={styles["image"]}
                        src={ImageExample}
                        alt="Game Image"
                        sizes="35vw"
                        fill
                    />
                </div>

                <div className={styles["image-container"]}>
                    <Image
                        className={styles["image"]}
                        src={ImageExample}
                        alt="Game Image"
                        sizes="35vw"
                        fill
                    />
                </div>
            </div>

            <div className={styles["rest-images-container"]}>
                <div className={styles["image-container"]}>
                    <Image
                        className={styles["image"]}
                        src={ImageExample}
                        alt="Game Image"
                        sizes="35vw"
                        fill
                    />
                </div>

                <div className={styles["image-container"]}>
                    <Image
                        className={styles["image"]}
                        src={ImageExample}
                        alt="Game Image"
                        sizes="35vw"
                        fill
                    />
                </div>

                <div className={styles["image-container"]}>
                    <Image
                        className={styles["image"]}
                        src={ImageExample}
                        alt="Game Image"
                        sizes="35vw"
                        fill
                    />
                </div>

                <div className={styles["image-container"]}>
                    <Image
                        className={styles["image"]}
                        src={ImageExample}
                        alt="Game Image"
                        sizes="35vw"
                        fill
                    />
                </div>
            </div>
        </section>
    )
};

export default GameImagesSection;