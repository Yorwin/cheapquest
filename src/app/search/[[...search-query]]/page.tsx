"use client"

import React, { useState, useEffect } from "react";
import styles from "@/styles/layout/search/search.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { Genre } from "@/types/types";
import SearchResults from "@/components/pages/search/search-results";
import { Metadata } from "next";
import Head from "next/head";

// -------------------- COMPONENTE PRINCIPAL --------------------
const Search = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [gottenGenres, setGottenGenres] = useState<Genre[] | null>(null);

    //Valores de busqueda por defecto
    const [formData, setFormData] = useState({
        query: '',
        order: 'precio-min',
        genres: searchParams.get('genres') || '',
        steamRating: false,
        metaCritic: false,
        startingPrice: 0,
        finishingPrice: 120,
    });

    //Ejecutar la busqueda
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //Construir los parámetros de la URL. 
        const params = new URLSearchParams();

        if (formData.query) params.append('query', formData.query);
        if (formData.order) params.append('order', formData.order);
        if (formData.genres) params.append('genres', formData.genres);
        if (formData.steamRating) params.append('steam-rating', 'true');
        if (formData.metaCritic) params.append('meta-critic', 'true');

        params.append('starting-price', formData.startingPrice.toString());
        params.append('finishing-price', formData.finishingPrice.toString());

        //Navegar a la URL con los parámetros
        router.push(`/search?${params.toString()}`);
    };

    //Manejar cambios en los campos
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        const checked = target.checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    //Obtener generos disponibles.
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await fetch('/api/genres/');
                const data = await res.json();
                setGottenGenres(data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    // Update formData when search params change
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            genres: searchParams.get('genres') || '',
        }));
    }, [searchParams]);

    return (
        <>
            <Head>
                <title>Buscar Ofertas de Videojuegos | CheapQuest</title>
                <meta name="description" content="Encuentra las mejores ofertas de videojuegos. Busca por nombre, género, precio y calificaciones. Compara precios y ahorra en tus juegos favoritos." />
                <meta name="keywords" content="ofertas videojuegos, juegos baratos, deals gaming, cheap games, buscar ofertas" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Buscar Ofertas de Videojuegos | CheapQuest" />
                <meta property="og:description" content="Encuentra las mejores ofertas de videojuegos. Busca por nombre, género, precio y calificaciones." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://cheapquest.com/search" />
                <meta property="og:image" content="https://cheapquest.com/preview.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Buscar Ofertas de Videojuegos | CheapQuest" />
                <meta name="twitter:description" content="Encuentra las mejores ofertas de videojuegos. Busca por nombre, género, precio y calificaciones." />
                <meta name="twitter:image" content="https://cheapquest.com/preview.png" />
                <link rel="canonical" href="https://cheapquest.com/search" />
            </Head>
            <article className={styles["search-page-container"]}>
                <section className="container-fluid">
                <form onSubmit={handleSubmit}>
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
                                    value={formData.query}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4 g-4 g-xl-0">

                        {/* Orden */}

                        <div className="col-xl-3 col-6 d-flex justify-content-center">
                            <div className={styles["filter-container"]}>
                                <label className={styles["label"]}>Ordenar:</label>
                                <div className={styles["select-container"]}>
                                    <select
                                        id="orden"
                                        name="order"
                                        value={formData.order}
                                        onChange={handleInputChange}>
                                        <option className={styles["options"]} value="precio-min">Precio más bajo</option>
                                        <option className={styles["options"]} value="precio-max">Precio más alto</option>
                                    </select>
                                    <i className="bi bi-caret-down"></i>
                                </div>
                            </div>
                        </div>

                        {/* Géneros */}

                        <div className="col-xl-3 col-6 d-flex justify-content-center">
                            <div className={styles["filter-container"]}>
                                {gottenGenres ? (
                                    <>
                                        <label className={styles["label"]}>Géneros:</label>
                                        <div className={styles["select-container"]}>
                                            <select
                                                id="generos"
                                                name="genres"
                                                value={formData.genres}
                                                onChange={handleInputChange}>
                                                {gottenGenres.map((e: Genre, index: number) => (
                                                    <option className={styles["options"]} value={e.slug} key={index}>
                                                        {e.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <i className="bi bi-caret-down"></i>
                                        </div>
                                    </>
                                ) : <label className={styles["label"]}>Cargando...</label>
                                }
                            </div>
                        </div>

                        {/* Ordenar por ratings */}

                        <div className="col-xl-3 col-6 d-flex justify-content-center">
                            <div className={styles["checkbox-container"]}>
                                <input
                                    type="checkbox"
                                    name="steamRating"
                                    id="steam-rating"
                                    checked={formData.steamRating}
                                    onChange={handleInputChange} />
                                <label htmlFor="steam-rating" className={styles["label"]}>
                                    Steam Rating
                                </label>
                            </div>
                        </div>

                        <div className="col-xl-3 col-6 d-flex justify-content-center">
                            <div className={styles["checkbox-container"]}>
                                <input
                                    type="checkbox"
                                    name="metaCritic"
                                    id="meta-critic"
                                    checked={formData.metaCritic}
                                    onChange={handleInputChange} />
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
                                    name="startingPrice"
                                    value={formData.startingPrice}
                                    onChange={handleInputChange}
                                    min={0}
                                    max={120}
                                    step={1}
                                />
                                <label htmlFor="finishing-price">y</label>
                                <input
                                    type="number"
                                    id="finishing-price"
                                    name="finishingPrice"
                                    value={formData.finishingPrice}
                                    onChange={handleInputChange}
                                    min={0}
                                    max={120}
                                    step={1}
                                />
                            </div>
                        </div>
                        <div className={`col-lg-12 col-xl-6 d-flex justify-content-xl-start justify-content-center ${styles["button-search"]}`}>
                            <button type="submit" className={styles["gradient-animate"]}>
                                Buscar
                            </button>
                        </div>
                    </div>
                </form>
            </section>
            <SearchResults />
        </article>
        </>
    );
};

export default Search;