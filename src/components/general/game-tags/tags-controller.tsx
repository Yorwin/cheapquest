"use client"

import React, { useState } from "react";
import styles from "@/styles/components/user-tags.module.scss"
import TagsItem from "./tags";

const Tags = ({ tags }: { tags: string[] }) => {

    const [isExtended, setIsExtended] = useState(false);
    const shouldShowButton = tags.length > 4;

    const toggleIsExtended = () => {
        setIsExtended((e) => !e);
    };

    return <>
        <TagsItem tags={tags} extended={isExtended} />
        {shouldShowButton ? <button className={styles["button-tags"]} onClick={toggleIsExtended}>{isExtended ? <i className="bi bi-arrow-bar-left"></i> : "..."}</button> : null}
    </>
};

export default Tags;