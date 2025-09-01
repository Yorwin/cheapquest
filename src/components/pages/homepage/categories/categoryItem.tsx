import React from "react";
import styles from "@/styles/layout/homepage/categories.module.scss"
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface CategoriesItem {
    titulo: string,
    className: string,
    character: StaticImageData,
    enlace: string,
}

interface categoryContainer {
    justify: string[];
    groupedCategories: CategoriesItem[][];
}

const CategoryItem = ({ justify, groupedCategories }: categoryContainer) => {
    const categoryContainer = groupedCategories.map((group) => (
        group.map((e: any, index: number) => {
            return (
                <div key={index} className={`col-lg-4 col-md-12 d-flex ${justify[index]} p-0 mb-4`}>
                    <div
                        className={`${styles["category-container"]} ${styles[e.className]}`}
                    >
                        <Link className={styles["enlace-categoria"]} href={e.enlace}></Link>
                        <h2>{e.titulo}</h2>
                        <div className={styles["image-character-container"]}>
                            <Image
                                src={e.character}
                                alt="Plataforma de juego"
                                className={styles["image-character"]}
                            />
                        </div>
                    </div>
                </div>
            )
        })
    ));

    return categoryContainer;
};

export default CategoryItem;