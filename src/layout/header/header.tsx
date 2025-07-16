import React from "react";
import styles from "@/styles/layout/header.module.scss"
import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/resources/logo/logo.png"

const Header = () => {
    return (
        <>
            {/* Header Section */}

            <div className={styles["header-main-container"]}>
                <ul className={styles["headers-list"]}>

                    {/* Logo */}

                    <li className={styles["image-item"]}>
                        <div className={styles["image-container"]}>
                            <Link href="/" >
                                <Image
                                    src={LogoImg}
                                    alt="Logo"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </Link>
                        </div>
                    </li>

                    {/* Links */}

                    <li>
                        <button className={styles["button"]}>
                            Ofertas
                            <i className="bi bi-caret-down"></i>
                        </button>
                    </li>
                    <li className={styles["next-releases-item"]}>
                        <Link href="/next-releases">Proximos Lanzamientos</Link>
                    </li>
                    <li>
                        <Link href="/login-page">Iniciar sesión</Link>
                    </li>
                    <li>
                        <Link href={"/search"}>
                            <i className="bi bi-search"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Header;