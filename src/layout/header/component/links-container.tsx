'use client';

import React from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/layout/header.module.scss";
import LinkItem from "./link-item";
import useWindowWidth from "@/functions/hooks/useWindowWidth";

interface NavItem {
    label: string;
    id: string;
}

interface NavItemContainer {
    item: NavItem[]
}

export default function LinksContainer({ item }: NavItemContainer) {
    const width = useWindowWidth();
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        item.map((e: NavItem, index: number) => (
            <li key={e.id} className={styles["item"]}>
                {isHome ? (
                    <LinkItem itemLabel={e.label} itemId={e.id} typeOfLink="same-page" />
                ) : (
                    <LinkItem itemLabel={e.label} itemId={e.id} typeOfLink="different-page" />
                )}

                {index < item.length - 1 && (
                    <div className={`${styles["separator"]} ${styles[width < 1400 ? "show-separator" : "hide-separator"]}`}></div>
                )}
            </li >
        ))
    );
}
