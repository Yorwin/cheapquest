// app/terms/page.tsx
import React from "react";
import styles from "@/styles/layout/privacy-policy.module.scss";

export const metadata = {
    title: "Términos y Condiciones — CheapQuest",
    robots: {
        index: false,
        follow: false,
    },
};

const TermsAndConditions = () => {
    return (
        <div className={styles["container"]}>
            <header>
                <h1 className={styles["title"]}>Términos y Condiciones</h1>
                <p className={styles["date"]}>Última actualización: 6 de octubre de 2025</p>
            </header>

            <section>
                <h2 className={styles["article-title"]}>1. Aceptación de los términos</h2>
                <p className={styles["article-text"]}>
                    Al acceder y utilizar la app CheapQuest, usted acepta cumplir con estos Términos y Condiciones.
                    Si no está de acuerdo con alguno de ellos, no debe usar esta aplicación.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>2. Objeto de la app</h2>
                <p className={styles["article-text"]}>
                    CheapQuest es una plataforma informativa que recopila, compara y muestra ofertas de videojuegos provenientes de tiendas y plataformas externas.
                    La app no realiza ventas directas ni procesa pagos; las compras se efectúan únicamente en los sitios web de terceros que ofrecen los productos.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>3. Uso permitido y prohibido</h2>
                <p className={styles["article-text"]}>
                    Usted se compromete a utilizar la app de manera responsable y conforme a la ley. Se prohíbe expresamente:
                </p>
                <ul className={styles["list"]}>
                    <li>Redistribuir, modificar o alterar la app sin autorización expresa de CheapQuest.</li>
                    <li>Intentar acceder a áreas no autorizadas de la app o de los servidores de terceros.</li>
                    <li>Usar la app para fines ilegales o que infrinjan derechos de terceros.</li>
                </ul>
            </section>

            <section>
                <h2 className={styles["article-title"]}>4. Propiedad intelectual</h2>
                <p className={styles["article-text"]}>
                    Todos los derechos de propiedad intelectual relacionados con la app, incluyendo textos, gráficos, logos, diseño, estructura y código,
                    son propiedad de CheapQuest o de sus licenciantes. El uso de la información obtenida a través de la app no confiere derechos de propiedad sobre ella.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>5. Limitación de responsabilidad</h2>
                <p className={styles["article-text"]}>
                    CheapQuest no garantiza la exactitud, actualidad o integridad de los precios, ofertas o disponibilidad de los productos mostrados.
                    Las ofertas pueden cambiar o desaparecer sin previo aviso, ya que dependen de terceros.
                </p>
                <p className={styles["article-text"]}>
                    La app se proporciona “tal cual” y no asumimos responsabilidad por errores, interrupciones del servicio, pérdidas de datos o daños derivados del uso de la app.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>6. Disclaimer / Exención de responsabilidad</h2>
                <p className={styles["article-text"]}>
                    La información mostrada en CheapQuest tiene fines informativos únicamente. No garantizamos la compra, entrega ni disponibilidad de los productos.
                    Los enlaces incluidos en la app redirigen a sitios externos, sobre los cuales CheapQuest no ejerce control ni asume responsabilidad.
                </p>
                <p className={styles["article-text"]}>
                    Los precios, promociones y condiciones pueden variar según la tienda externa. Se recomienda verificar siempre la información directamente en la página del proveedor.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>7. Modificaciones de los términos</h2>
                <p className={styles["article-text"]}>
                    CheapQuest se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento para adaptarlos a cambios legales, técnicos o de funcionamiento.
                    Las modificaciones serán publicadas en esta página y entrarán en vigor inmediatamente después de su publicación.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>8. Ley aplicable y jurisdicción</h2>
                <p className={styles["article-text"]}>
                    Estos Términos y Condiciones se rigen por la legislación española. Cualquier conflicto derivado del uso de la app se someterá a los tribunales competentes en España.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>9. Contacto</h2>
                <p className={styles["article-text"]}>
                    Para consultas legales o incidencias, puede contactarnos a través de:
                    <br />
                    <strong>Responsable:</strong> Yorwin Rosales (NIE: Y9911885A) <br />
                    <strong>Correo:</strong> <a className={styles["link"]} href="mailto:info-privacy@cheapquest.com">info-privacy@cheapquest.com</a>
                </p>
            </section>

            <footer>
                <p className={styles["article-text"]}>CheapQuest — Plataforma informativa de comparación de ofertas de videojuegos.</p>
                <p className={styles["article-text"]}>Fecha de última actualización: 6 de octubre de 2025</p>
            </footer>
        </div>
    );
};

export default TermsAndConditions;
