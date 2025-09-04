import React from "react";
import styles from "@/styles/components/about-the-game.module.scss"
import Parragraph from "./about-this-game-parragraph";

const AboutTheGame = () => {

    const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. A repellat in, iusto, doloremque dignissimos excepturi quibusdam eaque consectetur dicta, ipsa assumenda ipsam! Sapiente corporis quaerat perspiciatis iure explicabo consectetur laboriosam! Lorem ipsum dolor sit amet consectetur adipisicing elit. A repellat in, iusto, doloremque dignissimos excepturi quibusdam eaque consectetur dicta, ipsa assumenda ipsam! Sapiente corporis quaerat perspiciatis iure explicabo consectetur laboriosam!";

    return (
        <div className={styles["about-the-game-container"]}>
            <h2>Acerca de este juego</h2>
            <Parragraph>
                {description}
            </ Parragraph>
        </div>
    )
};

export default AboutTheGame;