import React from "react";
import styles from "@/styles/layout/search/search.module.scss";
import { searchForGenres } from "@/utils/search";

// -------------------- COMPONENTE PRINCIPAL --------------------
const Search = async () => {
    const availableGenres = await searchForGenres();

    const genresOptions = availableGenres.map((e: any, index: number) => (
        <option value={e.slug} key={index}>
            {e.name}
        </option>
    ));

    return (
        <article className={styles["search-page-container"]}>
            <section className="container-fluid">
                <form action="/search" method="get">
                    {/* Search Bar */}

                    <div className="row mb-4">
                        <div className={`col-12 ${styles["search-bar-container"]}`}>
                            <div className={styles["search-wrapper"]}>
                                <i className="bi bi-search"></i>
                                <input
                                    type="search"
                                    id="game-search"
                                    name="query"
                                    placeholder="Escribe el nombre del juego"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4 g-4 g-xl-0">

                        {/* Orden */}

                        <div className="col-xl-3 col-6 d-flex justify-content-center">
                            <div className={styles["filter-container"]}>
                                <label className={styles["label"]}>Ordenar por:</label>
                                <div className={styles["select-container"]}>
                                    <select id="orden" name="orden">
                                        <option value="precio-min">Precio más bajo</option>
                                        <option value="precio-max">Precio más alto</option>
                                    </select>
                                    <i className="bi bi-caret-down"></i>
                                </div>
                            </div>
                        </div>

                        {/* Géneros */}

                        <div className="col-xl-3 col-6 d-flex justify-content-center">
                            <div className={styles["filter-container"]}>
                                <label className={styles["label"]}>Géneros:</label>
                                <div className={styles["select-container"]}>
                                    <select id="generos" name="generos">
                                        {genresOptions}
                                    </select>
                                    <i className="bi bi-caret-down"></i>
                                </div>
                            </div>
                        </div>

                        {/* Ordenar por ratings */}

                        <div className="col-xl-3 col-6 d-flex justify-content-center">
                            <div className={styles["checkbox-container"]}>
                                <input type="checkbox" name="steam-rating" id="steam-rating" />
                                <label htmlFor="steam-rating" className={styles["label"]}>
                                    Steam Rating
                                </label>
                            </div>
                        </div>

                        <div className="col-xl-3 col-6 d-flex justify-content-center">
                            <div className={styles["checkbox-container"]}>
                                <input type="checkbox" name="meta-critic" id="meta-critic" />
                                <label htmlFor="meta-critic" className={styles["label"]} >
                                    Metacritic
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Rango de precio */}
                    <div className="row mb-5 g-4">
                        <div className="col-lg-12 col-xl-6 d-flex justify-content-xl-end justify-content-center">
                            <div className={styles["number-limits-container"]}>
                                <label htmlFor="starting-price">Entre</label>
                                <input
                                    type="number"
                                    id="starting-price"
                                    name="starting-price-value"
                                    defaultValue={0}
                                    min={0}
                                    max={120}
                                    step={1}
                                />
                                <label htmlFor="finishing-price">y</label>
                                <input
                                    type="number"
                                    id="finishing-price"
                                    name="finishing-price-value"
                                    defaultValue={200}
                                    min={0}
                                    max={120}
                                    step={1}
                                />
                            </div>
                        </div>
                        <div className={`col-lg-12 col-xl-6 d-flex justify-content-xl-start justify-content-center ${styles["button-search"]}`}>
                            <button className={styles["gradient-animate"]}>
                                Buscar
                            </button>
                        </div>
                    </div>

                </form>
            </section>
        </article>
    );
};

export default Search;
