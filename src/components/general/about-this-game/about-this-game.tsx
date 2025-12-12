import styles from "@/styles/components/about-the-game.module.scss"
import Parragraph from "./about-this-game-parragraph";

const AboutTheGame = async ({ gameData }: { gameData: any }) => {
    const description = gameData?.description;

    return (
        <div className={styles["about-the-game-container"]}>
            <h3>Acerca de este juego</h3>
            <Parragraph>
                {description ? description : "Este juego no tiene ninguna descripción disponible"}
            </ Parragraph>
        </div>
    )
};

export default AboutTheGame;