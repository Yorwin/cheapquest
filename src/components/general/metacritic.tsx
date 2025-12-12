import styles from "@/styles/components/reviews.module.scss"

const MetaCritic = async ({ gameData }: { gameData: any }) => {
    const metacritic = gameData?.meta_critic;

    const statusOfCritic = ["good-critic", "bad-critic", "regular-critic"];
    let critic;

    if (metacritic) {

        if (metacritic >= 75) {
            critic = statusOfCritic[0];
        } else if (metacritic <= 74 && metacritic > 49) {
            critic = statusOfCritic[1];
        } else {
            critic = statusOfCritic[2];
        }

        return (
            <div className={styles["metacritic-container"]}>
                <h3>Reviews</h3>
                <div className={styles["rating"]}>
                    <span className={`${styles["points"]} ${styles[critic]}`}>{metacritic}</span>
                    <div className={styles["text-container"]}>
                        <span className={styles["text"]}>Puntuación</span>
                        <span className={styles["text"]}>en Metacritic</span>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
};

export default MetaCritic;