import React from "react";
import styles from "@/styles/components/about-the-game.module.scss"
import Parragraph from "./about-this-game-parragraph";
import { getGameId } from "@/utils/getGamesInfo";
import { getGameData } from "@/utils/getGamesInfo";

const AboutTheGame = async ({ gameData }: { gameData: any }) => {
    const description = gameData?.description;

    return (
        <div className={styles["about-the-game-container"]}>
            <h2>Acerca de este juego</h2>
            <Parragraph>
                {description ? description : "Este juego no tiene ninguna descripción disponible"}
            </ Parragraph>
        </div>
    )
};

export default AboutTheGame;