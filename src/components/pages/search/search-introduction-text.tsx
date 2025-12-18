import styles from "@/styles/layout/search/search-intro.module.scss";
import SearchIcon from "@/resources/search-icon.svg";
import Image from "next/image";

const SearchIntroductionText = () => {
    return <div className={styles["introduction-container"]}>
        <h3>Busca tu juego favorito y descubre las mejores ofertas disponibles. Los resultados te mostrarán dónde puedes conseguirlo al mejor precio.</h3>
        <div className={styles["image-container"]}>
            <Image
                src={SearchIcon}
                alt="Simbolo Explicación Sección"
                className={styles["image"]}
                sizes="30vw"
                fill
            />
        </div>
    </div>
};

export default SearchIntroductionText;