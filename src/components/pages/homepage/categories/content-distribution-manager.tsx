"use client"

import React from "react";
import CategoryItem from "./categoryItem";
import { StaticImageData } from "next/image";

/* Categorias */
import characterAction from "@/resources/categories/Action/png-image.webp"
import characterArcade from "@/resources/categories/Arcade/png-image.webp"
import characterAdventure from "@/resources/categories/Aventura/png-image.webp"
import characterStrategy from "@/resources/categories/Estrategia/png-image.webp"
import characterFPS from "@/resources/categories/FPS/png-image.webp"
import characterFight from "@/resources/categories/Lucha/png-image.webp"
import characterRPG from "@/resources/categories/RPG/png-image.webp"
import characterSinglePlayer from "@/resources/categories/Un_solo_jugador/png-character.webp"
import characterVR from "@/resources/categories/VR/png-character.webp"

interface Categories {
    titulo: string,
    className: string,
    character: StaticImageData,
    enlace: string,
    slug: string,
}

const categoriesItems: Categories[] = [
    {
        titulo: "Action",
        className: "action",
        character: characterAction,
        enlace: "/search?genres=action",
        slug: "action"
    },
    {
        titulo: "Arcade",
        className: "arcade",
        character: characterArcade,
        enlace: "/search?genres=arcade",
        slug: "arcade"
    },
    {
        titulo: "Adventure",
        className: "adventure",
        character: characterAdventure,
        enlace: "/search?genres=adventure",
        slug: "adventure"
    },
    {
        titulo: "Strategy",
        className: "strategy",
        character: characterStrategy,
        enlace: "/search?genres=strategy",
        slug: "strategy"
    },
    {
        titulo: "Shooter",
        className: "fps",
        character: characterFPS,
        enlace: "/search?genres=shooter",
        slug: "shooter"
    },
    {
        titulo: "Fighting",
        className: "fight",
        character: characterFight,
        enlace: "/search?genres=fighting",
        slug: "fighting"
    },
    {
        titulo: "RPG",
        className: "rpg",
        character: characterRPG,
        enlace: "/search?genres=rpg",
        slug: "rpg"
    },
    {
        titulo: "Casual",
        className: "single-player",
        character: characterSinglePlayer,
        enlace: "/search?genres=casual",
        slug: "casual"
    },
    {
        titulo: "Platformer",
        className: "vr",
        character: characterVR,
        enlace: "/search?genres=platformer",
        slug: "platformer"
    },
];

const ContentDistributionManager = () => {
    const allCategories = categoriesItems.map(item => [item]);

    const justifyClass = ["justify-content-center"];

    return (
        <CategoryItem
            groupedCategories={allCategories}
            justify={justifyClass}
        />
    );
};

export default ContentDistributionManager;