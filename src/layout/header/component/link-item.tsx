import React from "react";
import Link from "next/link";
import styles from "@/styles/layout/header.module.scss";

const LinkItem = ({ itemLabel, itemId, typeOfLink }: { itemLabel: string, itemId: string, typeOfLink: string }) => {
    const handleScroll = () => {
        const element = document.querySelector(`#${itemId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (typeOfLink === "same-page") {
        return (
            <button onClick={handleScroll} className={styles["link-button"]}>
                {itemLabel}
            </button>
        )
    } else {
        return (
            <Link href={`/#${itemId}`}>{itemLabel}</Link>
        )
    }
};

export default LinkItem;