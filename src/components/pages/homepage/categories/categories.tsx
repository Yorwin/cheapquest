import React from "react";
import styles from "@/styles/layout/homepage/categories.module.scss"
import { StaticImageData } from "next/image";
import ContentDistributionManager from "./content-distribution-manager";

interface Categories {
    titulo: string,
    className: string,
    character: StaticImageData,
    enlace: string,
}

const Categories = () => {
    return <>
        <section id="categories" className={styles["categories-container"]}>
            <div className="container-fluid">
                <div className="row">
                    {/* Titulo */}
                    <h1 className={styles["title"]}>CATEGORIAS</h1>
                    <ContentDistributionManager />
                </div>
            </div>
        </section>
    </>
};

export default Categories;