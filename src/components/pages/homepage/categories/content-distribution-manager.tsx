"use client"

import React from "react";
import useWindowWidth from "@/functions/hooks/useWindowWidth";
import SkeletonLoader from "@/components/general/skelettonLoader";
import Categories from "./categories";
import CategoryItem from "./categoryItem";

/* Categorias */

import characterAction from "@/resources/categories/Action/png-image.png"
import characterArcade from "@/resources/categories/Arcade/png-image.png"
import characterAdventure from "@/resources/categories/Aventura/png-image.png"
import characterStrategy from "@/resources/categories/Estrategia/png-image.png"
import characterFPS from "@/resources/categories/FPS/png-image.png"
import characterFight from "@/resources/categories/Lucha/png-image.png"
import characterRPG from "@/resources/categories/RPG/png-image.png"
import characterSinglePlayer from "@/resources/categories/Un_solo_jugador/png-character.png"
import characterVR from "@/resources/categories/VR/png-character.png"

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

const justifyClasses = [
    "justify-content-start",
    "justify-content-center",
    "justify-content-end",
];

const justifyClassesResponsive = [
    "justify-content-start",
    "justify-content-end",
];

const justifyClassesXtraSmall = ["justify-content-center"]

const ContentDistributionManager = () => {

    const resolution = useWindowWidth();

    if (!resolution) {
        return <SkeletonLoader />
    }

    const isDesktop = resolution > 992;
    const isTablet = resolution <= 992 && resolution > 768;
    const isMobile = resolution <= 768;

    let justifyClass;
    const groupedCategories = [];

    if (isDesktop) {
        justifyClass = justifyClasses;

        for (let i = 0; i < categoriesItems.length; i += 3) {
            groupedCategories.push(categoriesItems.slice(i, i + 3));
        }

    } else if (isTablet || isMobile) {
        justifyClass = justifyClassesXtraSmall;

        for (let i = 0; i < categoriesItems.length; i++) {
            groupedCategories.push(categoriesItems.slice(i, i + 1));
        }
    } else {
        justifyClass = justifyClasses;

        for (let i = 0; i < categoriesItems.length; i += 3) {
            groupedCategories.push(categoriesItems.slice(i, i + 3));
        }
    }

    return <>
        <CategoryItem groupedCategories={groupedCategories} justify={justifyClass} />
    </>
};

export default ContentDistributionManager;