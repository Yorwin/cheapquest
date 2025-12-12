import styles from "@/styles/components/user-tags.module.scss"
import Tags from "../../../general/game-tags/tags-controller";
import SafeRender from "@/components/general/safe-render";

const GameTags = async ({ gameData }: { gameData: any }) => {
    const tags = gameData?.about_the_game.tags;

    return (
        <SafeRender when={tags}>
            <div className={styles["user-tags-container"]}>
                <h3>Tags:</h3>
                <Tags tags={tags} />
            </div>
        </SafeRender>
    )
};

export default GameTags;