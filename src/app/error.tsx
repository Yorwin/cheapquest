'use client';

import React from "react";
import characterImage from "@/resources/error-image/homepage-error.png"
import Image from "next/image";
import errorHomePage from "@/resources/error-image/background-error-homepage.svg"

export default function homePageErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {

    console.error(`Error captura al intentar cargar el homepage ${error}`);

    return <div className="error-container">
        <Image
            className="background"
            src={errorHomePage}
            alt="background-image"
        />
        <div className="content-container">
            <div className="text-and-button-container">
                <h1 className="text-error">Ups, esto no debería verse así… vamos a intentarlo otra vez</h1>
                <button className="button" onClick={reset}>Reintentar</button>
            </div>
            <Image
                src={characterImage}
                alt="Personaje error homepage"
                className="character"
            />
        </div>
    </div>

}
