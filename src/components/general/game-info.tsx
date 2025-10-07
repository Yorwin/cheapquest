import React from "react";
import styles from "@/styles/components/game-info.module.scss"
import { getGameId, getGameData } from "@/utils/getGamesInfo";
import SafeRender from "./safe-render";

const GameInfo = async ({ gameName }: { gameName: string }) => {

    const id = await getGameId(gameName);
    let gameData;

    if (id) {
        gameData = await getGameData(id);
        gameData = gameData?.about_the_game;
    }

    return (
        <SafeRender when={gameData}>
            <div className={styles["game-info-container"]}>
                <h2>Información del juego</h2>
                <div className={styles["table-container"]}>
                    <table className={styles["table"]}>
                        <tbody>

                            {/* Age Required */}

                            <tr>
                                <th>Puntuación US</th>
                                <td>{gameData?.esrb}</td>
                            </tr>

                            {/* Developer */}

                            <tr>
                                <th>Desarrollador</th>
                                <td>{gameData?.developers.join(", ")}</td>
                            </tr>

                            {/* Release Date */}

                            <tr>
                                <th>Fecha de Lanzamiento</th>
                                <td>{gameData?.released_data}</td>
                            </tr>

                            {/* Genres */}

                            {gameData?.genres && gameData.genres.length > 0 && (
                                <tr>
                                    <th>Género</th>
                                    <td>{gameData?.genres.join(", ")}</td>
                                </tr>)}

                            {/* Publishers */}

                            {gameData?.publishers && gameData.publishers.length > 0 && (
                                <tr>
                                    <th>Distribuidores</th>
                                    <td>{gameData?.publishers.join(", ")}</td>
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