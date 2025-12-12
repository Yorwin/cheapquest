import styles from "@/styles/layout/gamepage/game-images-videos.module.scss"
import Image from "next/image";
import Script from "next/script";
import VideoPlayer from "@/components/general/video-player";
import { getGameId, getGameTrailer, getHeaderImage, getGameData, getGameOffers } from "@/utils/getGamesInfo";
import { getCompletedGameTrailer } from "@/lib/firebase-cache";

interface GameTrailer {
    data: {
        [quality: string]: string;
    };
    id: number;
    name: string;
    preview: string;
}

interface UnifiedTrailer {
    trailer: GameTrailer | string;
    type: 'rawg' | 'youtube';
}

const GameImagesSection = async ({ gameName }: { gameName: string }) => {

    const id = await getGameId(gameName);
    const gameOffers = await getGameOffers(gameName);
    const imagesData = await getHeaderImage(gameName);
    let title: string;
    let trailerData: UnifiedTrailer | null = null;
    let screenshots;

    if (id) {
        /* Title */
        let gameData = await getGameData(id);
        title = gameData?.title ? gameData.title : gameOffers?.bestOffer.gameTitle;

        /* Screenshots */
        screenshots = imagesData?.screenshots;

        /* Trailer */
        const rawgTrailer = await getGameTrailer(id);

        if (rawgTrailer) {
            trailerData = { trailer: rawgTrailer, type: 'rawg' };
        } else {
            const firebaseTrailerUrl = await getCompletedGameTrailer(id);
            if (firebaseTrailerUrl) {
                const videoId = firebaseTrailerUrl.split('v=')[1];
                trailerData = { trailer: videoId, type: 'youtube' };
            }
        }
    }

    const getVideoObject = () => {
        if (!trailerData) return null;

        const baseObject = {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": `${title} – Tráiler oficial`,
            "description": `Tráiler oficial del videojuego ${title}.`,
            "uploadDate": new Date().toISOString().split('T')[0]
        };

        if (trailerData.type === 'youtube') {
            return {
                ...baseObject,
                "thumbnailUrl": `https://i.ytimg.com/vi/${trailerData.trailer}/hqdefault.jpg`,
                "contentUrl": `https://www.youtube.com/watch?v=${trailerData.trailer}`,
                "embedUrl": `https://www.youtube.com/embed/${trailerData.trailer}`
            };
        } else if (trailerData.type === 'rawg') {
            const rawgTrailer = trailerData.trailer as GameTrailer;
            const videoUrl = rawgTrailer.data.max ||
                rawgTrailer.data['1080'] ||
                Object.values(rawgTrailer.data)[0];

            return {
                ...baseObject,
                "thumbnailUrl": rawgTrailer.preview,
                "contentUrl": videoUrl
            };
        }

        return null;
    };

    const videoObject = getVideoObject();

    return (
        <>
            {videoObject && (
                <Script
                    id="video-structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(videoObject),
                    }}
                />
            )}

            <section className={`${styles["game-images-video-container"]}`}>

                {/* Game Trailer */}

                {trailerData && (
                    <div className={styles["game-trailer-container"]}>
                        {trailerData.type === 'rawg' ? (
                            <VideoPlayer
                                gameName={gameName}
                                trailer={trailerData.trailer as GameTrailer}
                            />
                        ) : (
                            <div className={styles["video-wrapper"]}>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${trailerData.trailer as string}`}
                                    title={`Trailer oficial de ${gameName}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
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
                                            alt={`Imágen del juego - ${gameName} - id de la imágen: ${shot.id}`}
                                            title={`Imágen ${gameName} - ${shot.id}`}
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
                                            alt={`Imágen del juego - ${gameName} - id de la imágen: ${shot.id}`}
                                            title={`Imágen ${gameName} - ${shot.id}`}
                                            sizes="80vw"
                                            fill
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>) : null}
            </section>
        </>
    )
};

export default GameImagesSection;