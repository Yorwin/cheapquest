import React from "react";
import styles from "@/styles/components/game-info.module.scss"
import { getGameId, getGameData } from "@/utils/getGamesInfo";
import SafeRender from "./safe-render";

const GameInfo = async ({ gameData }: { gameData: any }) => {
    const gameInfoData = gameData?.about_the_game;

    return (
        <SafeRender when={gameInfoData}>
            <div className={styles["game-info-container"]}>
                <h2>Información del juego</h2>
                <div className={styles["table-container"]}>
                    <table className={styles["table"]}>
                        <tbody>

                            {/* Age Required */}

                            <tr>
                                <th>Puntuación US</th>
                                <td>{gameInfoData?.esrb}</td>
                            </tr>

                            {/* Developer */}

                            <tr>
                                <th>Desarrollador</th>
                                <td>{gameInfoData?.developers.join(", ")}</td>
                            </tr>

                            {/* Release Date */}

                            <tr>
                                <th>Fecha de Lanzamiento</th>
                                <td>{gameInfoData?.released_data}</td>
                            </tr>

                            {/* Genres */}

                            {gameInfoData?.genres && gameInfoData.genres.length > 0 && (
                                <tr>
                                    <th>Género</th>
                                    <td>{gameInfoData?.genres.join(", ")}</td>
                                </tr>)}

                            {/* Publishers */}

                            {gameInfoData?.publishers && gameInfoData.publishers.length > 0 && (
                                <tr>
                                    <th>Distribuidores</th>
                                    <td>{gameInfoData?.publishers.join(", ")}</td>
                                </tr>
                            )}

                        </tbody>
                    </table>

                </div>
            </div>
        </SafeRender>
    )
};

export default GameInfo;