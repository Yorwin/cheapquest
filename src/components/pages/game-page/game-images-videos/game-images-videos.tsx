import React from "react";
import styles from "@/styles/layout/gamepage/game-images-videos.module.scss"
import Image from "next/image";
import VideoPlayer from "@/components/general/video-player";
import { getGameId, getGameTrailer, getHeaderImage, getGameData, getGameOffers } from "@/utils/getGamesInfo";

const GameImagesSection = async ({ gameName }: { gameName: string }) => {

    const id = await getGameId(gameName);
    const gameOffers = await getGameOffers(gameName);
    const imagesData = await getHeaderImage(gameName);
    let title;
    let trailer;
    let screenshots;

    if (id) {
        /* Title */
        let gameData = await getGameData(id);
        title = gameData?.title ? gameData.title : gameOffers?.bestOffer.gameTitle;

        /* Screenshots */
        screenshots = imagesData?.screenshots;

        /* Trailer */
        trailer = await getGameTrailer(id);
    }

    return (
        <section className={`${styles["game-images-video-container"]}`}>

            {/* Title */}

            <h1 className={styles["title"]}>Obten un vistazo a fondo de {title}</h1>

            {/* Game Trailer */}

            {trailer && (
                <div className={styles["game-trailer-container"]}>
                    <VideoPlayer
                        trailer={trailer}
                    />
                </div>
            )}

            {/* Game Images */}
            {screenshots ?
                (<div className="container-fluid p-0">
                    <div className={`row d-flex justify-content-between ${styles["main-images-container"]}`}>
                        {screenshots.slice(1, 3).map((shot: any) => (
                            <div className={`col-6`} key={shot.id}>
                                <div className={`${styles["image-container"]}`}>
                                    <Image
                                        className={styles["image"]}
                                        src={shot.image}
                                        alt={`Game Image ${shot.id}`}
                                        sizes="80vw"
                                        fill
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`row d-flex justify-content-center ${styles["rest-images-container"]}`}  >
                        {screenshots.slice(3).map((shot: any) => (
                            <div className={`col-sm-12 col-md-6 mb-3`} key={shot.id}>
                                <div className={styles["image-container"]} key={shot.id}>
                                    <Image
                                        className={styles["image"]}
                                        src={shot.image}
                                        alt={`Game Image ${shot.id}`}
                                        sizes="80vw"
                                        fill
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>) : null}
        </section>
    )
};

export default GameImagesSection;