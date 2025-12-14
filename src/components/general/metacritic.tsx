import styles from "@/styles/components/reviews.module.scss"
import { getBackupMetacritic } from '@/lib/firebase-cache'
import Link from "next/link";

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

    /* RAWG Cambio */

    return (
        <section className={styles["metacritic-container"]}>
            <h3>Reviews</h3>

            <div className="container-fluid p-0">
                <div className="row">

                    {/* Metacritic */}
                    {metacritic && (
                        <section className={`col-6 ${styles["review-container"]}`}>
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
                        <section className={`col-6 ${styles["review-container"]}`}>
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
                                        <span className={styles["text"]}>Cantidad</span>
                                        <span className={styles["text"]}>de Reviews</span>
                                    </div>
                                </div>
                            )}
                        </section>
                    )}

                    {/* RAWG */}
                    <section className={`col-6 ${styles["review-container"]}`}>
                        <h4 className={styles["type-of-review"]}>Rating en RAWG</h4>
                        <div className={styles["rating"]}>
                            <span className={`${styles["points"]} ${styles[critic]}`}>{metacritic}</span>
                            <div className={styles["text-container"]}>
                                <span className={styles["text"]}>Puntuación</span>
                                <span className={styles["text"]}>en Metacritic</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    )
};

export default MetaCritic;