import React from "react";
import styles from "@/styles/layout/footer.module.scss";

const Footer = () => {
    const aboutUs =
        "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesqu sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla.";
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
                            Lorem ipsum dolor sit amet consectetur adipiscing
                            elit quisque faucibus ex sapien vitae pellentesque
                            sem placerat in id cursus mi pretium tellus duis
                            convallis tempus leo eu aenean sed diam urna tempor
                            pulvinar vivamus fringilla.
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
                                    <a href="#">Sobre Nosotros</a>
                                </li>
                                <li>
                                    <a href="#">Política de Privacidad</a>
                                </li>
                                <li>
                                    <a href="#">Términos y Condiciones</a>
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
                                    <a href="mailto:contactemail@contactemail.com">
                                        contactemail@contactemail.com
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:contactemail@contactemail.com">
                                        contactemail@contactemail.com
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
