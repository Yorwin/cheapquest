import React from "react";
import styles from "@/styles/components/error-loading.module.scss"
import Image from "next/image";
import Error from "@/resources/error-image/error.png"
import { GameDealWithoutScore } from "@/types/types";

const ErrorGameStandard = () => {
    return <>
        <div className={styles["content-container"]}>
            <div className={styles["text-info"]}>
                <h2>Ups! Parece que algo salió mal al cargar tus juegos y ofertas favoritas.</h2>
                <p>No te preocupes, estamos trabajando para solucionarlo rápido.</p>
                <p>Mientras tanto, ¿por qué no intentas refrescar la página o volver un poco más tarde?</p>
                <p>Gracias por tu paciencia.</p>
            </div>
            <div className={styles["error-louding-image"]}>
                <Image
                    alt="Error de carga"
                    src={Error}
                    className={styles["error-image"]}
                />
            </div>
        </div>
    </>
};

export default ErrorGameStandard;

export const inCaseOfError: GameDealWithoutScore[] = [{
    dealID: "error-deal-placeholder-id",
    dealRating: "0.0",
    gameID: "000000",
    internalName: "ERROR_GAME_NOT_FOUND",
    isOnSale: "0",
    lastChange: Date.now() / 1000,
    metacriticLink: "/game/error-placeholder/",
    metacriticScore: "0",
    normalPrice: "0.00",
    releaseDate: 0,
    salePrice: "0.00",
    savings: "0.000000",
    steamAppID: "0",
    steamRatingCount: "0",
    steamRatingPercent: "0",
    steamRatingText: "No Reviews",
    storeID: "1",
    thumb: "https://via.placeholder.com/120x45/666666/ffffff?text=No+Image",
    title: "Game Not Found - Error Placeholder"
}]

