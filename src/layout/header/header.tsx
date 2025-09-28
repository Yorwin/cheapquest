import React from "react";
import styles from "@/styles/layout/header.module.scss"
import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/resources/logo/darkbackground-logo.webp";
import OffersButton from "./component/button-offers";
import HeaderMainContainer from "./component/header-main-container";
import LinksContainer from "./component/links-container";

interface NavItem {
    label: string;
    id: string;
}

const navItems: NavItem[] = [
    { label: "Populares", id: "most-popular-offers" },
    { label: "Nuevas Ofertas", id: "new-offers" },
    { label: "Vintage", id: "aged-like-wine" },
    { label: "% de Descuento", id: "historical" },
    { label: "Bajos históricos", id: "historical-and-percentage-offers" },
];

const categories: NavItem[] = [
    { label: "Categorias", id: "Categories" },
];

const Header = () => {

    return (
        <>
            {/* Header Section */}

            <HeaderMainContainer>
                <ul className={styles["headers-list"]}>

                    {/* Logo */}

                    <li className={styles["image-item"]}>
                        <div className={styles["image-container"]}>
                            <Link href="/" className={styles["click-overlay"]} />
                            <Image
                                src={LogoImg}
                                sizes="50vw"
                                alt="Logo"
                                fill
                                style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        </div>
                    </li>

                    <OffersButton>
                        <LinksContainer item={navItems} />
                    </OffersButton>

                    {/* Categorias*/}

                    <li className={styles["next-releases-item"]}>
                        <a href="#categories">Categorías</a>
                    </li>

                    {/* Search */}

                    <li className={styles["search-container"]}>
                        <Link href={"/search"} className={styles["search"]}>
                            <i className="bi bi-search"></i>
                        </Link>
                    </li>
                </ul>
            </HeaderMainContainer>
        </>
    );
}

export default Header;