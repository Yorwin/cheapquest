'use client';

import React from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/layout/header.module.scss";
import LinkItem from "./link-item";

interface NavItem {
    label: string;
    id: string;
}

interface NavItemContainer {
    item: NavItem[]
}

export default function LinksContainer({ item }: NavItemContainer) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        item.map(item => (
            <li key={item.id} className={styles["item"]}>
                {isHome ? (
                    <LinkItem itemLabel={item.label} itemId={item.id} typeOfLink="same-page" />
                ) : (
                    <LinkItem itemLabel={item.label} itemId={item.id} typeOfLink="different-page" />
                )}
            </li>
        ))
    );
}
