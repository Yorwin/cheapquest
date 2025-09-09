"use client"

import React, { useState } from "react";
import styles from "@/styles/components/about-the-game.module.scss"

const Parragraph = ({ children }: { children: string }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const text = `${children}`;
    const wordLimit = 30;
    const words = text.split(' ');
    const shouldShowButton = words.length > wordLimit;

    return (
        <div>
            <p>
                {/* Primeras 30 palabras siempre visibles */}
                <span>{words.slice(0, wordLimit).join(' ')}</span>

                {/* Resto del texto: renderizado pero oculto con CSS */}
                {shouldShowButton && (
                    <>
                        {!isExpanded && <span>...</span>}
                        <span className={isExpanded ? '' : styles['hidden-text']}>
                            {words.slice(wordLimit).join(' ')}
                        </span>
                    </>
                )}
            </p>

            {/* Read More Button */}
            {shouldShowButton && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={styles["read-more-button"]}
                >
                    {isExpanded ? 'Leer menos' : 'Leer más'}
                </button>
            )}
        </div>
    )
};

export default Parragraph;