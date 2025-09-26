import React from "react";
import styles from "@/styles/layout/header.module.scss"
import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/resources/logo/darkbackground-logo.webp";
import OffersButton from "./component/button-offers";
import HeaderMainContainer from "./component/header-main-container";

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

                    {/* Links */}

                    {/* 
                    <li>
                        <OffersButton>
                            Ofertas
                            <i className="bi bi-caret-down"></i>
                        </OffersButton>
                    </li>
                    */}

                    {/* Más Populares */}

                    <li className={styles["next-releases-item"]}>
                        <Link href="/next-releases">Más populares</Link>
                    </li>

                    {/* Nuevas Ofertas */}

                    <li className={styles["next-releases-item"]}>
                        <Link href="/next-releases">Nuevas Ofertas</Link>
                    </li>

                    {/* Vintage */}

                    <li className={styles["next-releases-item"]}>
                        <Link href="/next-releases">Vintage</Link>
                    </li>

                    {/* % de Descuento */}

                    <li className={styles["next-releases-item"]}>
                        <Link href="/next-releases">% de Descuento</Link>
                    </li>

                    {/* Bajos historicos */}

                    <li className={styles["next-releases-item"]}>
                        <Link href="/next-releases">Bajos historicos</Link>
                    </li>

                    {/* Categorias*/}

                    <li className={styles["next-releases-item"]}>
                        <Link href="/next-releases">Categorías</Link>
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