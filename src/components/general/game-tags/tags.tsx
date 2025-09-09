import React from "react";
import styles from "@/styles/components/user-tags.module.scss"

const TagsItem = ({ tags, extended }: { tags: string[], extended: boolean }) => {
    return (
        <>
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className={`${styles["tag"]} ${index >= 4 && !extended ? styles["hidden-tag"] : ''}`}
                >
                    {tag}
                </span>
            ))}
        </>
    );
};

export default TagsItem;