import React from "react";
import styles from "@/styles/layout/gamepage/game-images-videos.module.scss"
import Image from "next/image";
import VideoPlayer from "@/components/general/video-player";

interface imageArrayProps {
    id: number,
    image: string
}

interface GameTrailer {
    data: {
        [quality: string]: string;
    };
    id: number;
    name: string;
    preview: string;
}

interface GameImagesSectionProps {
    trailer: GameTrailer,
    screenshots: imageArrayProps[]
}

const GameImagesSection = ({ trailer, screenshots }: GameImagesSectionProps) => {
    return (
        <section className={styles["game-images-video-container"]}>
            <h1 className={styles["title"]}>Obten un vistazo a fondo de Black Ops 6</h1>

            {/* Game Trailer */}

            {trailer && (
                <div className={styles["game-trailer-container"]}>
                    <VideoPlayer
                        trailer={trailer}
                    />
                </div>
            )}

            {/* Game Images */}

            <div className={styles["main-images-container"]}>
                {screenshots.slice(1, 3).map((shot) => (
                    <div className={styles["image-container"]} key={shot.id}>
                        <Image
                            className={styles["image"]}
                            src={shot.image}
                            alt={`Game Image ${shot.id}`}
                            sizes="35vw"
                            fill
                        />
                    </div>
                ))}
            </div>

            <div className={styles["rest-images-container"]}>
                {screenshots.slice(3, 7).map((shot) => (
                    <div className={styles["image-container"]} key={shot.id}>
                        <Image
                            className={styles["image"]}
                            src={shot.image}
                            alt={`Game Image ${shot.id}`}
                            sizes="35vw"
                            fill
                        />
                    </div>
                ))}
            </div>
        </section>
    )
};

export default GameImagesSection;