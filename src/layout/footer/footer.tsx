import React from "react";
import styles from "@/styles/layout/footer.module.scss";
import Link from "next/link";

const Footer = () => {
    const aboutUs =
        "CheapQuest compara y muestra las mejores ofertas de videojuegos online, facilitando a gamers encontrar precios bajos rápidamente, descubrir promociones exclusivas y acceder a información de tiendas confiables de forma visual y sencilla..";
    const copyRightDeclaration =
        "Todos los derechos de autor, marcas comerciales y marcas registradas son propiedad de sus respectivos propietarios.";

    return (
        <>
            {/* Footer Section */}
            <section
                className={styles["footer-main-container"]}
                aria-label="Site footer"
            >
                <div className={styles["content-container"]}>
                    {/* About Us Container */}
                    <div
                        className={styles["about-us-container"]}
                        aria-label="About CheapQuest"
                    >
                        <h3>CheapQuest</h3>
                        <p title={aboutUs}>
                            CheapQuest compara y muestra las mejores ofertas de videojuegos online, 
                            facilitando a gamers encontrar precios bajos rápidamente, descubrir promociones exclusivas y 
                            acceder a información de tiendas confiables de forma visual y sencilla.
                        </p>
                        <p
                            className={styles["legal-remark"]}
                            title={copyRightDeclaration}
                        >
                            {copyRightDeclaration}
                        </p>
                    </div>

                    <div className={styles["line-separation"]}></div>

                    {/* Info Container */}
                    <div className={styles["info-container"]}>
                        {/* Navigation */}
                        <nav
                            className={styles["navigation-container"]}
                            aria-label="Footer site links"
                        >
                            <h4>Navegación</h4>
                            <ul>
                                <li>
                                    <Link href="/aviso-legal">Aviso Legal</Link>
                                </li>
                                <li>
                                    <Link href="/cookies">Aviso de Cookies</Link>
                                </li>
                                <li>
                                    <Link href="/politica-de-privacidad">Política de Privacidad</Link>
                                </li>
                                <li>
                                    <Link href="/terminos">Términos y Condiciones</Link>
                                </li>
                            </ul>
                        </nav>

                        {/* Contact Us */}
                        <address
                            className={styles["contact-us-container"]}
                            aria-label="Contact information"
                        >
                            <h4>Contáctanos</h4>
                            <ul>
                                <li>
                                    <a href="mailto:info@cheapquest.com">
                                        info@cheapquest.com
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:marketing@cheapquest.com">
                                        marketing@cheapquest.com
                                    </a>
                                </li>
                            </ul>
                        </address>
                    </div>
                </div>
            </section>

            {/* Copyright Section */}
            <section className={styles["copyright-container"]}>
                <small>
                    © CheapQuest.com 2025 — Todos los derechos reservados
                </small>
            </section>
        </>
    );
};

export default Footer;
