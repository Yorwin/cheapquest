import React from "react";
import styles from "@/styles/layout/privacy-policy.module.scss";

export const metadata = {
  title: "Aviso Legal — CheapQuest",
  robots: {
    index: false,
    follow: false,
  },
};

const LegalNotice = () => {
  return (
    <div className={styles["container"]}>
      <header>
        <h1 className={styles["title"]}>Aviso Legal</h1>
        <p className={styles["date"]}>Última actualización: 6 de octubre de 2025</p>
      </header>

      <section>
        <h2 className={styles["article-title"]}>1. Identificación del responsable</h2>
        <p className={styles["article-text"]}>
          El responsable de este sitio web y de la app CheapQuest es <strong>Yorwin Rosales</strong> (NIE: <strong>Y9911885A</strong>).
          Puede contactarnos a través del correo electrónico: <a className={styles["link"]} href="mailto:info@cheapquest.com">info@cheapquest.com</a>.
        </p>
      </section>

      <section>
        <h2 className={styles["article-title"]}>2. Objeto de la app</h2>
        <p className={styles["article-text"]}>
          CheapQuest es una plataforma informativa que recopila, compara y muestra ofertas de videojuegos de tiendas y plataformas externas.
          La app no realiza ventas directas ni procesa pagos; las compras se efectúan únicamente en los sitios de terceros que ofrecen los productos.
        </p>
      </section>

      <section>
        <h2 className={styles["article-title"]}>3. Condiciones de uso</h2>
        <p className={styles["article-text"]}>
          El acceso y uso de la app implica la aceptación de estas condiciones. Se prohíbe:
        </p>
        <ul className={styles["list"]}>
          <li>Utilizar la app para fines ilegales o que infrinjan derechos de terceros.</li>
          <li>Redistribuir, modificar o alterar la app sin autorización expresa de CheapQuest.</li>
          <li>Intentar acceder a áreas no autorizadas de la app o de los servidores de terceros.</li>
        </ul>
      </section>

      <section>
        <h2 className={styles["article-title"]}>4. Propiedad intelectual</h2>
        <p className={styles["article-text"]}>
          Todos los derechos de propiedad intelectual relacionados con la app, incluyendo textos, gráficos, logos, diseño, estructura y código,
          son propiedad de CheapQuest o de sus licenciantes. El uso de la información obtenida no confiere derechos de propiedad sobre ella.
        </p>
      </section>

      <section>
        <h2 className={styles["article-title"]}>5. Exención de responsabilidad</h2>
        <p className={styles["article-text"]}>
          CheapQuest no garantiza la exactitud, disponibilidad ni actualidad de los precios, ofertas o información mostrada.
          Los precios y promociones dependen de terceros y pueden variar sin previo aviso.
        </p>
        <p className={styles["article-text"]}>
          Los enlaces incluidos en la app redirigen a sitios externos, sobre los cuales CheapQuest no ejerce control ni asume responsabilidad.
          El uso de estos enlaces es bajo la propia responsabilidad del usuario.
        </p>
      </section>

      <section>
        <h2 className={styles["article-title"]}>6. Legislación aplicable y jurisdicción</h2>
        <p className={styles["article-text"]}>
          Este Aviso Legal se rige por la legislación española. Cualquier conflicto derivado del uso de la app se someterá a los tribunales competentes en España.
        </p>
      </section>

      <section>
        <h2 className={styles["article-title"]}>7. Contacto</h2>
        <p className={styles["article-text"]}>
          Para consultas legales o reclamaciones, puede contactarnos en: <br />
          <strong>Responsable:</strong> Yorwin Rosales (NIE: Y9911885A) <br />
          <strong>Correo:</strong> <a className={styles["link"]} href="mailto:info@cheapquest.com">info@cheapquest.com</a>
        </p>
      </section>

      <footer style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#555" }}>
        <p className={styles["article-text"]}>CheapQuest — Plataforma informativa de comparación de ofertas de videojuegos.</p>
        <p className={styles["article-text"]}>Fecha de última actualización: 6 de octubre de 2025</p>
      </footer>
    </div>
  );
};

export default LegalNotice;
