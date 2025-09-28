import React from "react";
import Link from "next/link";

const LinkItem = ({ itemLabel, itemId, typeOfLink }: { itemLabel: string, itemId: string, typeOfLink: string }) => {
    if (typeOfLink === "same-page") {
        return (
            <a href={`#${itemId}`}>{itemLabel}</a>
        )
    } else {
        return (
            <Link href={`/#${itemId}`}>{itemLabel}</Link>
        )
    }
};

export default LinkItem;