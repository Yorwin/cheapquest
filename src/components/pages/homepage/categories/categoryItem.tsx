import React from "react";
import styles from "@/styles/layout/homepage/categories.module.scss"
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface CategoriesItem {
    titulo: string,
    className: string,
    character: StaticImageData,
    enlace: string,
    slug: string,
}

interface categoryContainer {
    justify: string[];
    groupedCategories: CategoriesItem[][];
}

const CategoryItem = ({ justify, groupedCategories }: categoryContainer) => {
    const categoryContainer = groupedCategories.map((group, groupIndex) => (
        group.map((e: CategoriesItem, index: number) => {
            // Marcar las primeras 3 categorías como prioritarias (above the fold)
            const isAboveFold = groupIndex === 0 && index < 3;

            return (
                <div
                    key={`${e.className}-${index}`}
                    className={`col-lg-4 col-md-12 d-flex ${justify[index] || 'justify-content-center'} p-0 mb-4`}
                >
                    <div
                        className={`${styles["category-container"]} ${styles[e.className]}`}
                    >
                        <Link className={styles["enlace-categoria"]} href={e.enlace} aria-label={`Ver categoría ${e.titulo}`}></Link>
                        <h2>{e.titulo}</h2>
                        <div className={styles["image-character-container"]}>
                            <Image
                                src={e.character}
                                alt={`Personaje de categoría ${e.titulo}`}
                                className={styles["image-character"]}
                                sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                                width={250}
                                height={237}
                                priority={isAboveFold}
                                loading={isAboveFold ? "eager" : "lazy"}
                                quality={85}
                            />
                        </div>
                    </div>
                </div>
            )
        })
    ));

    return <>{categoryContainer}</>;
};

export default CategoryItem;