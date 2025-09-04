import React from "react";
import styles from "@/styles/components/user-tags.module.scss"

const Tags = ({ tags, extended }: { tags: string[], extended: boolean }) => {
    const generateTags = tags.map((e, index) => {
        return (
            <span
                key={index}
                className={styles["tag"]}
            >
                {e}
            </span>
        )
    })

    const notExtendedTags = generateTags.slice(0, 4);

    return <>
        {extended ? generateTags : notExtendedTags}
    </>
};

export default Tags;