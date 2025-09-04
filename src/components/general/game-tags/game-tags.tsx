import React from "react";
import styles from "@/styles/components/user-tags.module.scss"
import Tags from "./tags-controller";

const GameTags = () => {

    const tags = ["Buena trama", "Disparos en primera persona", "Acción y aventura", "Postapocaliptico", "Buena trama", "Disparos en primera persona", "Acción y aventura", "Postapocaliptico"];

    return (
        <div className={styles["user-tags-container"]}>
            <h2>Tags:</h2>
            <Tags tags={tags}/>
        </div>
    )
};

export default GameTags;