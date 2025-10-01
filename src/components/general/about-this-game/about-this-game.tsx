import React from "react";
import styles from "@/styles/components/about-the-game.module.scss"
import Parragraph from "./about-this-game-parragraph";

interface description {
    description: string | undefined,
}

const AboutTheGame = ({ description }: description) => {
    if (description) return (
        <div className={styles["about-the-game-container"]}>
            <h2>Acerca de este juego</h2>
            <Parragraph>
                {description}
            </ Parragraph>
        </div>
    )
};

export default AboutTheGame;