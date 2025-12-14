import styles from "@/styles/components/reviews.module.scss"
import { getBackupMetacritic } from '@/lib/firebase-cache'
import Link from "next/link";

interface rawgRating {
    id: number,
    title: string,
    count: number,
    percent: number,
}

interface rawgRatingIcons {
    [name: string]: string;
}

const MetaCritic = async ({ gameData }: { gameData: any }) => {

    /* Metacritic */
    let metacritic = gameData?.reviews.meta_critic;
    let backupMetacritic = null;

    if (!metacritic) {
        backupMetacritic = await getBackupMetacritic(gameData.id);
        if (backupMetacritic) {
            metacritic = backupMetacritic.metascore;
        }
    }

    const statusOfCritic = ["good-critic", "bad-critic", "regular-critic"];
    let critic;

    if (metacritic >= 75) {
        critic = statusOfCritic[0];
    } else if (metacritic <= 74 && metacritic > 49) {
        critic = statusOfCritic[1];
    } else {
        critic = statusOfCritic[2];
    }

    /* SteamRating */
    const steamRating = gameData?.reviews.steamRating;

    /* Responsive columns */
    const hasMetacritic = !!metacritic;
    const hasSteam = !!steamRating;
    const colClass = hasMetacritic && hasSteam ? 'col-md-6 col-sm-12' : 'col-md-12 col-sm-12';

    /* RAWG */
    const rawgRatingIcons: rawgRatingIcons = {
        exceptional: "bi bi-emoji-heart-eyes-fill",
        recommended: "bi bi-emoji-laughing-fill",
        meh: "bi bi-emoji-expressionless-fill",
        skip: "bi bi-emoji-angry-fill",
    }

    const { rating_average, rating_count, ratings_percentage } = gameData?.reviews.rawGRating;
    let rawgRatingValue;

    if (rating_average > 4) {
        rawgRatingValue = statusOfCritic[0];
    } else if (rating_average >= 3) {
        rawgRatingValue = statusOfCritic[1];
    } else {
        rawgRatingValue = statusOfCritic[2];
    }

    return (
        <section className={styles["metacritic-container"]}>
            <h3>Reviews</h3>

            <div className="container-fluid p-0">
                <div className="row g-5">

                    {/* Metacritic */}
                    {metacritic && (
                        <section className={`${colClass} ${styles["review-container"]}`}>
                            <h4 className={styles["type-of-review"]}>Metacritic</h4>
                            <div className={styles["rating"]}>
                                {backupMetacritic ? (
                                    <Link href={backupMetacritic.link} target="_blank" rel="noopener noreferrer" className={`${styles["points"]} ${styles[critic]} ${styles["metacritic-link"]}`}>
                                        {metacritic}
                                    </Link>
                                ) : (
                                    <span className={`${styles["points"]} ${styles[critic]}`}>{metacritic}</span>
                                )}
                                <div className={styles["text-container"]}>
                                    <span className={styles["text"]}>Puntuación</span>
                                    <span className={styles["text"]}>en Metacritic</span>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Steam Rating */}
                    {steamRating && (
                        <section className={`${colClass} ${styles["review-container"]}`}>
                            <h4 className={styles["type-of-review"]}>steamRating</h4>

                            {/* SteamRating Percent */}
                            {steamRating.steamRatingPercent && (() => {
                                const statusOfSteamRating = ["bad-steampercentage", "regular-steampercentage", "good-steampercentage", "verygood-steampercentage", "excellent-steampercentage", "any"];
                                let steamRatingCritic;

                                if (steamRating.steamRatingPercent <= 39) {
                                    steamRatingCritic = statusOfSteamRating[0];
                                } else if (steamRating.steamRatingPercent <= 69) {
                                    steamRatingCritic = statusOfSteamRating[1];
                                } else if (steamRating.steamRatingPercent <= 79) {
                                    steamRatingCritic = statusOfSteamRating[2];
                                } else if (steamRating.steamRatingPercent <= 89) {
                                    steamRatingCritic = statusOfSteamRating[3];
                                } else if (steamRating.steamRatingPercent <= 100) {
                                    steamRatingCritic = statusOfSteamRating[4];
                                } else {
                                    steamRatingCritic = statusOfSteamRating[5];
                                }

                                return (
                                    <div className={styles["rating"]}>
                                        <span className={`${styles["points"]} ${styles[steamRatingCritic]}`}>{steamRating.steamRatingPercent}</span>
                                        <div className={styles["text-container"]}>
                                            <span className={styles["text"]}>Puntuación en Steam:</span>
                                            <span className={styles["text"]}>{steamRating.steamRatingText}</span>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* SteamRating Count */}
                            {steamRating.steamRatingCount && (
                                <div className={styles["rating"]}>
                                    <span className={`${styles["reviews-amount"]}`}>{steamRating.steamRatingCount}</span>
                                    <div className={styles["text-container"]}>
                                        <span className={styles["text"]}>Cantidad de Reviews</span>
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {/* RAWG */}
                    {gameData?.reviews.rawGRating && (
                        <section className={`col-md-12 col-sm-12 ${styles["review-container"]}`}>
                            <h4 className={`${styles["type-of-review"]} ${styles["rawg-title"]}`}>Rating en RAWG</h4>

                            {/* Rating */}
                            <div className={`${styles["rating"]} ${styles["rawg-rating"]}`}>
                                <span className={`${styles["points"]} ${styles[rawgRatingValue]}`}>{rating_average}</span>
                                <div className={styles["text-container"]}>
                                    <span className={styles["text"]}><i className="bi bi-star-fill"></i> Puntuación</span>
                                </div>
                            </div>

                            {/* Cantidad de Reviews */}
                            <div className={`${styles["rating"]} ${styles["rawg-rating"]}`}>
                                <span className={`${styles["reviews-amount"]}`}>{rating_count}</span>
                                <div className={styles["text-container"]}>
                                    <span className={styles["text"]}><i className="bi bi-bar-chart-fill"></i> Cantidad de Reviews</span>
                                </div>
                            </div>

                            {/* Reviews divididas */}
                            <div className={styles["divided-reviews"]}>
                                <ul>
                                    {ratings_percentage.map((e: rawgRating, index: number) => {
                                        return (
                                            <li className={styles["list-element"]} key={index}>
                                                <i className={rawgRatingIcons[`${e.title}`]}></i>
                                                <p>
                                                    <span><strong>Rating:</strong> {e.title.toUpperCase()}</span>
                                                    <span><strong>Cantidad:</strong> {e.count}</span>
                                                    <span><strong>Porcentaje:</strong> {e.percent}%</span>
                                                </p>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </section>
                    )}
                </div >
            </div >
        </section >
    )
};

export default MetaCritic;