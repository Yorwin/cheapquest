// app/cookies/page.tsx
import React from "react";
import styles from "@/styles/layout/privacy-policy.module.scss";

export const metadata = {
    title: "Aviso de Cookies — CheapQuest",
    robots: {
        index: false,
        follow: false
    }
};

const CookieNotice = () => {
    return (
        <div className={styles["container"]}>
            <header>
                <h1 className={styles["title"]}>Aviso de Cookies</h1>
                <p className={styles["date"]}>
                    En CheapQuest utilizamos cookies propias y de terceros con el objetivo de mejorar la experiencia de navegación, analizar el uso del sitio y optimizar nuestros contenidos.
                    Al continuar navegando por nuestra página, se entenderá que acepta el uso de cookies conforme a este aviso.
                </p>
            </header>

            <section>
                <h2 className={styles["article-title"]}>1. ¿Qué son las cookies?</h2>
                <p className={styles["article-text"]}>
                    Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario cuando visita un sitio web.
                    Permiten que la página recuerde información sobre su visita, como idioma preferido o configuraciones, para facilitar la próxima navegación y hacer que el sitio sea más útil.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>2. Tipos de cookies que utilizamos</h2>
                <p className={styles["article-text"]}>
                    En CheapQuest se utilizan principalmente los siguientes tipos de cookies:
                </p>
                <ul className={styles["list"]}>
                    <li><strong>Cookies técnicas o necesarias:</strong> Permiten el correcto funcionamiento del sitio web y no requieren consentimiento.</li>
                    <li><strong>Cookies de análisis (Google Analytics):</strong> Nos ayudan a entender cómo interactúan los usuarios con nuestra web, recopilando información de manera agregada y anónima (ej. páginas visitadas, tiempo en el sitio, dispositivo utilizado).</li>
                </ul>
            </section>

            <section>
                <h2 className={styles["article-title"]}>3. Cookies de terceros</h2>
                <p className={styles["article-text"]}>
                    Nuestro sitio puede usar cookies de terceros, como Google Analytics, que recopilan información de manera anónima sobre la interacción de los usuarios con el sitio.
                    Estos terceros pueden almacenar datos en servidores fuera de la Unión Europea, sujetos a sus propias políticas de privacidad.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>4. Gestión de cookies</h2>
                <p className={styles["article-text"]}>
                    El usuario puede aceptar, rechazar o configurar el uso de cookies en cualquier momento mediante la configuración de su navegador.
                    Cada navegador ofrece diferentes mecanismos de control:
                </p>
                <ul className={styles["list"]}>
                    <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                    <li><strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
                    <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos de sitios web</li>
                    <li><strong>Microsoft Edge:</strong> Configuración → Privacidad, búsqueda y servicios → Cookies y datos del sitio</li>
                </ul>
                <p className={styles["article-text"]}>
                    Tenga en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad de la página.
                </p>
            </section>

            <section>
                <h2 className={styles["article-title"]}>5. Actualizaciones del aviso</h2>
                <p className={styles["article-text"]}>
                    CheapQuest podrá actualizar este Aviso de Cookies en cualquier momento para adaptarlo a cambios normativos, técnicos o en los servicios ofrecidos.
                    Las modificaciones serán publicadas en este mismo apartado, con la fecha de la última actualización.
                </p>
            </section>

            <footer>
                <p className={styles["article-text"]}>Fecha de última actualización: 6 de octubre de 2025</p>
            </footer>
        </div>
    );
};

export default CookieNotice;
