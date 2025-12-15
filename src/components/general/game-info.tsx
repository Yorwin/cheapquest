import styles from "@/styles/components/game-info.module.scss"
import SafeRender from "./safe-render";
import Link from "next/link";

const GameInfo = async ({ gameData }: { gameData: any }) => {
    const gameInfoData = gameData?.about_the_game;

    return (
        <SafeRender when={gameInfoData}>
            <div id="información-del-juego" className={styles["game-info-container"]}>
                <h3>Información del juego</h3>
                <div className={styles["table-container"]}>
                    <table className={styles["table"]}>
                        <tbody>

                            {/* Website */}
                            {gameInfoData.website && (
                                <tr>
                                    <th>Sitio Web</th>
                                    <td>
                                        <Link className={styles["link"]} href={gameInfoData.website} target="_blank">Web oficial</Link>
                                    </td>
                                </tr>
                            )}

                            {/* Reddit */}
                            {gameInfoData.reddit && (
                                <tr>
                                    <th>Reddit</th>
                                    <td>
                                        <Link className={styles["link"]} href={gameInfoData.reddit} target="_blank">Reddit oficial</Link>
                                    </td>
                                </tr>
                            )}

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

                            {/* Release Date */}
                            {gameInfoData.playtime && (
                                <tr>
                                    <th>Tiempo de juego</th>
                                    <td>{gameInfoData?.playtime}h</td>
                                </tr>
                            )}

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