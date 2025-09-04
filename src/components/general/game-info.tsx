import React from "react";
import styles from "@/styles/components/game-info.module.scss"

const GameInfo = () => {
    return (
        <div className={styles["game-info-container"]}>
            <h2>Información del juego</h2>
            <div className={styles["table-container"]}>
                <table className={styles["table"]}>
                    <tbody>
                        <tr>
                            <th>Puntuación US</th>
                            <td>Mature</td>
                        </tr>
                        <tr>
                            <th>Desarrollador</th>
                            <td>Ejemplo Estudio, Ejemplo Estudio</td>
                        </tr>
                        <tr>
                            <th>Fecha de Lanzamiento</th>
                            <td>01/01/1999</td>
                        </tr>
                        <tr>
                            <th>Género</th>
                            <td>Acción, Aventura</td>
                        </tr>
                        <tr>
                            <th>Distribuidores</th>
                            <td>Distribuidor Genérico</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
};

export default GameInfo;