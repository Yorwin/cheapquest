import React from "react";
import styles from "@/styles/layout/homepage/categories.module.scss"
import Image, { StaticImageData } from "next/image";
import Profile from "@/resources/categories/Action/png-image.png"
import Link from "next/link";

/* Categorias */

/* Accion */
import characterAction from "@/resources/categories/Action/png-image.png"

/* Arcade */
import characterArcade from "@/resources/categories/Arcade/png-image.png"

/* Adventure */
import characterAdventure from "@/resources/categories/Aventura/png-image.png"

/* Strategy */
import characterStrategy from "@/resources/categories/Estrategia/png-image.png"

/* FPS */
import characterFPS from "@/resources/categories/FPS/png-image.png"

/* Fight */
import characterFight from "@/resources/categories/Lucha/png-image.png"

/* RPG */
import characterRPG from "@/resources/categories/RPG/png-image.png"

/* Single Player */
import characterSinglePlayer from "@/resources/categories/Un_solo_jugador/png-character.png"

/* VR */
import characterVR from "@/resources/categories/VR/png-character.png"


interface Categories {
    titulo: string,
    className: string,
    character: StaticImageData,
    enlace: string,
}

const Categories = () => {

    const categoriesItems: Categories[] = [
        {
            titulo: "Acción",
            className: "action",
            character: characterAction,
            enlace: "#"
        },
        {
            titulo: "Arcade",
            className: "arcade",
            character: characterArcade,
            enlace: "#"
        },
        {
            titulo: "Aventura",
            className: "adventure",
            character: characterAdventure,
            enlace: "#"
        },
        {
            titulo: "Estrategia",
            className: "strategy",
            character: characterStrategy,
            enlace: "#"
        },
        {
            titulo: "FPS",
            className: "fps",
            character: characterFPS,
            enlace: "#"
        },
        {
            titulo: "Lucha",
            className: "fight",
            character: characterFight,
            enlace: "#"
        },
        {
            titulo: "RPG",
            className: "rpg",
            character: characterRPG,
            enlace: "#"
        },
        {
            titulo: "Un solo jugador",
            className: "single-player",
            character: characterSinglePlayer,
            enlace: "#"
        },
        {
            titulo: "VR",
            className: "vr",
            character: characterVR,
            enlace: "#"
        },
    ]

    const categoryContainer = categoriesItems.map((e) => {
        return (
            <div className="col-md-4 col-sm-12 mb-5 d-flex justify-content-start">
                <div className={`${styles["category-container"]} ${styles[e.className]}`}>
                    <Link className={styles["enlace-categoria"]} href={e.enlace}></Link>
                    <h2>{e.titulo}</h2>
                    <Image
                        src={e.character}
                        alt="Plataforma de juego"
                        className={styles["image-character"]}
                    />
                </div>
            </div>
        )
    });

    return <>
        <div className={styles["categories-container"]}>
            <div className="container-fluid">
                <div className="row">

                    {/* Titulo */}
                    <h1 className={styles["title"]}>CATEGORIAS</h1>
                    {categoryContainer}
                </div>
            </div>
        </div>
    </>
};

export default Categories;