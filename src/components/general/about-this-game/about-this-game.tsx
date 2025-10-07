import React from "react";
import styles from "@/styles/components/about-the-game.module.scss"
import Parragraph from "./about-this-game-parragraph";
import { getGameId } from "@/utils/getGamesInfo";
import { getGameData } from "@/utils/getGamesInfo";

interface description {
    description: string | undefined,
}

const AboutTheGame = async ({ gameName }: { gameName: string }) => {
    const id = await getGameId(gameName);
    let description;

    if (id) {
        description = await getGameData(id);
        description = description?.description;
    }

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