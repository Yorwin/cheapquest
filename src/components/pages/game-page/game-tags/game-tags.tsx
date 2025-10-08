import React from "react";
import styles from "@/styles/components/user-tags.module.scss"
import Tags from "../../../general/game-tags/tags-controller";
import { getGameId, getGameData } from "@/utils/getGamesInfo";
import SafeRender from "@/components/general/safe-render";

const GameTags = async ({ gameName }: { gameName: string }) => {

    const id = await getGameId(gameName);
    let tags;

    if (id) {
        tags = await getGameData(id);
        tags = tags?.about_the_game.tags;
    }

    return (
        <SafeRender when={tags}>
            <div className={styles["user-tags-container"]}>
                <h2>Tags:</h2>
                <Tags tags={tags} />
            </div>
        </SafeRender>
    )
};

export default GameTags;