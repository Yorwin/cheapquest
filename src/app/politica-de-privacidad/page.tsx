import React from "react";
import styles from "@/styles/layout/privacy-policy.module.scss";
import Link from "next/link";

export const metadata = {
    title: "Política de Privacidad — CheapQuest",
    robots: {
        index: false,
        follow: false
    }
};

const PrivacyPolicy = () => {
    return (
        <div className={styles["container"]}>
            <header>
                <h1 className={styles["title"]}>Política de Privacidad</h1>
                <p className={styles["date"]}>Última actualización: 6 de octubre de 2025</p>
            </header>

            <section>
                <h2 className={styles["article-title"]}>1. Responsable del tratamiento</h2>
                <p className={styles["article-text"]}>
                    El responsable de este sitio web es <strong>Yorwin Rosales</strong> (NIE: <strong>Y9911885A</strong>).
                    Para cuestiones relacionadas con la privacidad puede contactarnos en:{" "}
                    <a className={styles["link"]} href="mailto:info-privacy@cheapquest.com">info-privacy@cheapquest.com</a>.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>2. Naturaleza del sitio</h2>
                <p className={styles["article-text"]}>
                    CheapQuest es una plataforma informativa que recopila, compara y muestra ofertas de videojuegos ofrecidas por tiendas y plataformas externas.
                    CheapQuest no vende productos ni procesa pagos en el propio sitio web; las compras se realizan en los sitios de terceros que ofertan los juegos.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>3. Usuarios destinatarios</h2>
                <p className={styles["article-text"]}>
                    Nuestro sitio está dirigido al público general, incluidos menores de edad. No obstante, las transacciones y procesos de compra se realizan en las tiendas externas,
                    que aplican sus propias condiciones y políticas de privacidad.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>4. Datos personales tratados</h2>
                <p className={styles["article-text"]}>
                    En la actualidad <strong>CheapQuest no recopila datos personales identificables</strong> de sus visitantes o usuarios.
                    No solicitamos registros de cuenta, formularios con datos personales, información de pago ni datos sensibles a través del sitio.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>5. Cookies y herramientas de análisis</h2>
                <p className={styles["article-text"]}>CheapQuest puede emplear cookies y herramientas de análisis web con el fin de:</p>
                <ul className={styles["list"]}>
                    <li>Mejorar la experiencia de navegación.</li>
                    <li>Obtener datos agregados y anónimos sobre el uso del sitio.</li>
                    <li>Optimizar contenidos y rendimiento.</li>
                </ul>
                <p className={styles["article-text"]}>
                    Actualmente se prevé el uso de <strong>Google Analytics</strong> u otras herramientas similares.
                    Estas herramientas pueden utilizar cookies que recopilan información estadística (por ejemplo: dirección IP anonimizada, navegador, páginas visitadas y tiempo en el sitio).
                    CheapQuest no utiliza dicha información para identificar personalmente a los usuarios.
                </p>
                <p className={styles["article-text"]}>
                    Para más información sobre cómo gestionamos cookies puede consultar nuestro <Link className={styles["link"]} href="/cookies">Aviso de Cookies</Link>.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>6. Comunicación a terceros</h2>
                <p className={styles["article-text"]}>
                    En el momento actual CheapQuest <strong>no comparte datos personales</strong> con terceros.
                    Si en el futuro se considerara compartir datos agregados o estadísticas con empresas del sector (por ejemplo, tiendas de videojuegos),
                    se informará explícitamente y se actualizará esta política.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>7. Transferencias internacionales</h2>
                <p className={styles["article-text"]}>
                    CheapQuest no realiza transferencias internacionales de datos personales. No obstante, las herramientas de terceros (p. ej. Google Analytics)
                    pueden procesar datos en servidores fuera de su jurisdicción; dichas herramientas están sujetas a sus propias políticas de privacidad y condiciones.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>8. Conservación de los datos</h2>
                <p className={styles["article-text"]}>
                    Dado que actualmente no se recopilan datos personales, CheapQuest no conserva datos personales de los usuarios.
                    En caso de que se empiece a recoger información, este apartado especificará los plazos de conservación según la finalidad del tratamiento.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>9. Derechos de los usuarios</h2>
                <p className={styles["article-text"]}>
                    Actualmente, al no almacenarse datos personales, los derechos de acceso, rectificación, supresión, portabilidad, limitación u oposición no son aplicables.
                    En el supuesto de que CheapQuest comience a tratar datos personales, habilitaremos canales y procedimientos para que los interesados puedan ejercer sus derechos conforme a la normativa aplicable.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>10. Medidas de seguridad</h2>
                <p className={styles["article-text"]}>
                    Aunque no se almacenen datos personales, adoptamos medidas razonables para proteger el sitio y la información técnica relacionada, como la utilización del protocolo HTTPS.
                    Si en el futuro se almacenara información personal, se implementarán medidas técnicas y organizativas adecuadas (cifrado, control de accesos, copias de seguridad, etc.)
                    de acuerdo con la normativa vigente.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>11. Cambios en la política</h2>
                <p className={styles["article-text"]}>
                    Esta política de privacidad podrá ser actualizada para adaptarse a cambios legales, técnicos o de funcionamiento del sitio.
                    Las modificaciones relevantes se comunicarán mediante aviso en la web y, si en el futuro existiera una lista de correos de usuarios, también se notificará por correo electrónico.
                </p>
                <p className={styles["article-text"]}>
                    Si desea recibir notificaciones por correo sobre cambios importantes en la política, contacte a través de <a className={styles["link"]} href="mailto:info-privacy@cheapquest.com">info-privacy@cheapquest.com</a>.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>12. Contacto</h2>
                <ul className={styles["list"]}>
                    <li><strong>Responsable:</strong> Yorwin Rosales (NIE: Y9911885A)</li>
                    <li><strong>Correo:</strong> <a className={styles["link"]}>info-privacy@cheapquest.com</a></li>
                </ul>
            </section>

            <footer style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#555" }}>
                <p className={styles["article-text"]}>CheapQuest — Sitio informativo de comparación de ofertas de videojuegos. Esta política refleja la situación actual: no se recogen datos personales identificables en el sitio.</p>
                <p className={styles["article-text"]}>Fecha de última actualización: 6 de octubre de 2025</p>
            </footer>
        </div>
    )
};

export default PrivacyPolicy;