import React from "react";
import styles from "@/styles/components/user-tags.module.scss"
import Tags from "../../general/game-tags/tags-controller";

interface GameTagsProps {
    tags: string[] | undefined;
}

const GameTags = ({ tags }: GameTagsProps) => {
    return (
        <div className={styles["user-tags-container"]}>
            <h2>Tags:</h2>
            <Tags tags={tags} />
        </div>
    )
};

export default GameTags;